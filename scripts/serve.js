import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { build } from './build.js';

await build();
const files = new Map([
  ['/', ['index.html', 'text/html']],
  ['/index.html', ['index.html', 'text/html']],
  ['/styles.css', ['styles.css', 'text/css']],
  ['/src/app.js', ['src/app.js', 'text/javascript']],
  ['/src/tasks.js', ['src/tasks.js', 'text/javascript']]
]);
createServer(async (request, response) => {
  const asset = files.get(new URL(request.url, 'http://localhost').pathname);
  if (!asset) { response.writeHead(404).end('No encontrado'); return; }
  try {
    const body = await readFile(new URL(`../dist/${asset[0]}`, import.meta.url));
    response.writeHead(200, { 'Content-Type': `${asset[1]}; charset=utf-8` }).end(body);
  } catch {
    response.writeHead(500).end('Error al leer el archivo');
  }
}).listen(3000, '127.0.0.1', () => console.log('http://localhost:3000'));
