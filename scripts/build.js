import { mkdir, copyFile, cp, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export async function build(destination = new URL('../dist/', import.meta.url)) {
  await mkdir(destination, { recursive: true });
  for (const name of await readdir(new URL('../public/', import.meta.url))) {
    await copyFile(new URL(`../public/${name}`, import.meta.url), new URL(name, destination));
  }
  await cp(new URL('../src/', import.meta.url), new URL('src/', destination), { recursive: true });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await build();
  console.log('Build generado en dist/');
}
