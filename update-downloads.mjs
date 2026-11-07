// Refreshes downloads.json with CurseForge counts, logos, and summaries plus Modrinth counts.
// Runs in GitHub Actions; the key is read from the CURSEFORGE_API_KEY secret
// and never reaches the browser. Needs Node 18+ (built-in fetch).
import { readFile, writeFile } from 'node:fs/promises';

const KEY = process.env.CURSEFORGE_API_KEY;
if (!KEY) {
  console.error('Missing CURSEFORGE_API_KEY');
  process.exit(1);
}

// Folder that holds mods.json and downloads.json (set DATA_DIR in the workflow).
const DIR = (process.env.DATA_DIR || '.').replace(/\/$/, '');
const MODS_FILE = `${DIR}/mods.json`;
const OUT_FILE = `${DIR}/downloads.json`;

const { mods } = JSON.parse(await readFile(MODS_FILE, 'utf8'));
let previous = {};
try { previous = JSON.parse(await readFile(OUT_FILE, 'utf8')).mods || {}; } catch {}

const sleep = ms => new Promise(r => setTimeout(r, ms));
const cfGet = async path => {
  const res = await fetch('https://api.curseforge.com/v1' + path, {
    headers: { 'x-api-key': KEY, Accept: 'application/json' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
  return (await res.json()).data;
};

// gameId 432 = Minecraft. Try the exact slug first, then a looser text search.
async function curseforge(slug) {
  const q = encodeURIComponent(slug);
  for (const path of [
    `/mods/search?gameId=432&slug=${q}`,
    `/mods/search?gameId=432&searchFilter=${q}`
  ]) {
    const data = await cfGet(path);
    const mod = data.find(item => item.slug === slug);
    if (mod) return {
      cf: mod.downloadCount,
      img: mod.logo?.thumbnailUrl || mod.logo?.url || '',
      desc: typeof mod.summary === 'string' ? mod.summary.trim() : ''
    };
  }
  throw new Error(`no CurseForge project with slug "${slug}"`);
}

async function modrinth(slugs) {
  const out = {};
  for (let i = 0; i < slugs.length; i += 100) {
    const ids = encodeURIComponent(JSON.stringify(slugs.slice(i, i + 100)));
    const res = await fetch(`https://api.modrinth.com/v2/projects?ids=${ids}`, {
      headers: { 'User-Agent': 'changed-addons-list (github actions)' }
    });
    if (!res.ok) throw new Error(`Modrinth: HTTP ${res.status}`);
    for (const project of await res.json()) {
      const value = { dl: project.downloads, icon: project.icon_url || '' };
      out[project.slug.toLowerCase()] = value;
      out[project.id.toLowerCase()] = value;
    }
  }
  return out;
}

let mr = {};
try {
  mr = await modrinth(mods.filter(mod => mod.mr).map(mod => mod.mr));
} catch (error) {
  console.warn(error.message, '- keeping previous Modrinth numbers');
}

const result = {};
const failed = [], noImage = [];
for (const mod of mods) {
  const old = previous[mod.cf] || {};
  const lv = mod.mr ? mr[mod.mr.toLowerCase()] : null;
  let cf = { cf: old.cf ?? 0, img: '', desc: '' };
  try {
    cf = await curseforge(mod.cf);
  } catch (error) {
    failed.push(mod.cf);
    console.warn(`${mod.cf}: ${error.message} - keeping previous values`);
  }

  // Keep the last known summary if CurseForge temporarily fails or has no summary.
  const desc = cf.desc || old.desc || old.summary || '';
  const img = cf.img || (lv && lv.icon) || old.img || '';
  if (!img) noImage.push(mod.cf);

  result[mod.cf] = { cf: cf.cf, img, desc };
  if (mod.mr) result[mod.cf].mr = lv ? lv.dl : (old.mr ?? 0);
  await sleep(200); // be polite to the API
}

await writeFile(
  OUT_FILE,
  JSON.stringify({ updated: new Date().toISOString().slice(0, 10), mods: result }, null, 2) + '\n'
);
console.log(`Updated ${Object.keys(result).length} mods with available CurseForge summaries`);
if (failed.length) console.log('CurseForge lookup failed for:', failed.join(', '));
if (noImage.length) console.log('No image found for:', noImage.join(', '));
if (failed.length === mods.length) {
  console.error('Every CurseForge lookup failed - check the API key.');
  process.exit(1);
}
