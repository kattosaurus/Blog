// Refreshes downloads.json with CurseForge counts + logos and Modrinth counts.
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
let prev = {};
try { prev = JSON.parse(await readFile(OUT_FILE, 'utf8')).mods || {}; } catch {}

const sleep = ms => new Promise(r => setTimeout(r, ms));
const cfGet = async path => {
  const res = await fetch('https://api.curseforge.com/v1' + path, {
    headers: { 'x-api-key': KEY, Accept: 'application/json' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
  return (await res.json()).data;
};

// gameId 432 = Minecraft. Try the exact slug first, then a looser text search.
// No classId filter, so a mod listed under a different category is still found.
async function curseforge(slug) {
  const q = encodeURIComponent(slug);
  for (const path of [
    `/mods/search?gameId=432&slug=${q}`,
    `/mods/search?gameId=432&searchFilter=${q}`
  ]) {
    const data = await cfGet(path);
    const m = data.find(d => d.slug === slug);
    if (m) return { cf: m.downloadCount, img: m.logo?.thumbnailUrl || m.logo?.url || '' };
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
    for (const p of await res.json()) {
      const v = { dl: p.downloads, icon: p.icon_url || '' };
      out[p.slug.toLowerCase()] = v;
      out[p.id.toLowerCase()] = v;
    }
  }
  return out;
}

let mr = {};
try {
  mr = await modrinth(mods.filter(m => m.mr).map(m => m.mr));
} catch (e) {
  console.warn(e.message, '- keeping previous Modrinth numbers');
}

const result = {};
const failed = [], noImage = [];
for (const m of mods) {
  const old = prev[m.cf] || {};
  const lv = m.mr ? mr[m.mr.toLowerCase()] : null;
  let cf = { cf: old.cf ?? 0, img: '' };
  try {
    cf = await curseforge(m.cf);
  } catch (e) {
    failed.push(m.cf);
    console.warn(`${m.cf}: ${e.message} - keeping previous values`);
  }
  // CurseForge logo, else Modrinth icon, else whatever was saved last time
  const img = cf.img || (lv && lv.icon) || old.img || '';
  if (!img) noImage.push(m.cf);
  result[m.cf] = { cf: cf.cf, img };
  if (m.mr) result[m.cf].mr = lv ? lv.dl : (old.mr ?? 0);
  await sleep(200); // be polite to the API
}

await writeFile(
  OUT_FILE,
  JSON.stringify({ updated: new Date().toISOString().slice(0, 10), mods: result }, null, 2) + '\n'
);
console.log(`Updated ${Object.keys(result).length} mods`);
if (failed.length) console.log('CurseForge lookup failed for:', failed.join(', '));
if (noImage.length) console.log('No image found for:', noImage.join(', '));
if (failed.length === mods.length) {
  console.error('Every CurseForge lookup failed - check the API key.');
  process.exit(1);
}
