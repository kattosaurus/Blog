import { readFile, writeFile } from 'node:fs/promises';

const UA = 'changed-addons-list/1.0 (downloads updater)';
const KEY = process.env.CURSEFORGE_API_KEY;
const { mods } = JSON.parse(await readFile('mods.json', 'utf8'));

if (process.argv.includes('--discover')) {
  for (const m of mods.filter(m => !m.mr)) {
    const facets = encodeURIComponent('[["project_type:mod"]]');
    const r = await fetch(`https://api.modrinth.com/v2/search?query=${encodeURIComponent(m.name)}&limit=3&facets=${facets}`, { headers: { 'User-Agent': UA } });
    const hits = (await r.json()).hits || [];
    console.log(`\n${m.name}\n` + (hits.map(h => `   ${h.slug}  -  ${h.title} (${h.downloads} dl)`).join('\n') || '   (no results)'));
  }
  console.log('\nCheck the matches, then add the right slug as "mr" in mods.json.');
  process.exit(0);
}

let prev = { mods: {} };
try { prev = JSON.parse(await readFile('downloads.json', 'utf8')); } catch {}

const out = { updated: new Date().toISOString().slice(0, 10), mods: {} };
for (const m of mods) {
  const old = prev.mods[m.cf] || {};
  let cf = old.cf ?? null, mr = old.mr ?? null;

  if (KEY) {
    try {
      const r = await fetch(`https://api.curseforge.com/v1/mods/search?gameId=432&classId=6&slug=${m.cf}`, { headers: { 'x-api-key': KEY, Accept: 'application/json' } });
      const hit = (await r.json()).data?.[0];
      if (hit) cf = hit.downloadCount;
    } catch (e) { console.warn('CurseForge failed for', m.cf, e.message); }
  }
  if (m.mr) {
    try {
      const r = await fetch(`https://api.modrinth.com/v2/project/${m.mr}`, { headers: { 'User-Agent': UA } });
      if (r.ok) mr = (await r.json()).downloads;
    } catch (e) { console.warn('Modrinth failed for', m.mr, e.message); }
  }
  out.mods[m.cf] = { cf, mr };
  console.log(m.name.padEnd(28), 'CF', cf, ' MR', mr);
}
await writeFile('downloads.json', JSON.stringify(out, null, 1));
