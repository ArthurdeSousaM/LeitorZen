import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';

const dist = 'dist';
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

// Copia arquivos essenciais
for (const f of ['manifest.json']) {
  fs.copyFileSync(f, path.join(dist, f));
}
fs.cpSync('src', path.join(dist, 'src'), { recursive: true });
if (fs.existsSync('icons')) fs.cpSync('icons', path.join(dist, 'icons'), { recursive: true });

// Gera ZIP
const outZip = path.join(dist, 'extension.zip');
const output = fs.createWriteStream(outZip);
const archive = archiver('zip', { zlib: { level: 9 } });
archive.directory(dist, false);
archive.pipe(output);
await archive.finalize();

console.log('✅ Build pronto em dist/ e dist/extension.zip');
