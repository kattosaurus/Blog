// Refreshes downloads.json with CurseForge counts + logos and Modrinth counts.
// Runs in GitHub Actions; the key is read from the CURSEFORGE_API_KEY secret
// and never reaches the browser. Needs Node 18+ (built-in fetch).
import { readFile, writeFile } from 'node:fs/promises';

const KEY = process.env.CURSEFORGE_API_KEY;
if (!KEY) {
  console.error('Missing CURSEFORGE_API_KEY');
  process.exit(1);
}

// Paths are relative to where the script runs (the repo root in the workflow).
const MODS_FILE = 'mods.json';
const OUT_FILE = 'downloads.json';

const { mods } = JSON.parse(await readFile(MODS_FILE, 'utf8'));
let prev = {};
try { prev = JSON.parse(await readFile(OUT_FILE, 'utf8')).mods || {}; } catch {}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function curseforge(slug) {
  // gameId 432 = Minecraft, classId 6 = mods
  const url = `https://api.curseforge.com/v1/mods/search?gameId=432&classId=6&slug=${encodeURIComponent(slug)}`;
  const res = await fetch(url, { headers: { 'x-api-key': KEY, Accept: 'application/json' } });
  if (!res.ok) throw new Error(`CurseForge ${slug}: HTTP ${res.status}`);
  const { data } = await res.json();
  const m = data.find(d => d.slug === slug) || data[0];
  if (!m) throw new Error(`CurseForge ${slug}: not found`);
  return { cf: m.downloadCount, img: m.logo?.thumbnailUrl || m.logo?.url || '' };
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
      out[p.slug.toLowerCase()] = p.downloads;
      out[p.id.toLowerCase()] = p.downloads;
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
for (const m of mods) {
  const old = prev[m.cf] || {};
  let cf = { cf: old.cf ?? 0, img: old.img ?? '' };
  try {
    cf = await curseforge(m.cf);
  } catch (e) {
    console.warn(e.message, '- keeping previous values');
  }
  result[m.cf] = { cf: cf.cf, img: cf.img };
  if (m.mr) result[m.cf].mr = mr[m.mr.toLowerCase()] ?? old.mr ?? 0;
  await sleep(200); // be polite to the API
}

await writeFile(
  OUT_FILE,
  JSON.stringify({ updated: new Date().toISOString().slice(0, 10), mods: result }, null, 2) + '\n'
);
console.log(`Updated ${Object.keys(result).length} mods`);
