import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from '../scripts/build.js';

test('build genera HTML y todos los recursos relativos para Pages', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'ci-demo-'));
  try {
    const destination = pathToFileURL(`${directory}/`);
    await build(destination);
    const html = await readFile(new URL('index.html', destination), 'utf8');
    assert.match(html, /lang="es"/);
    for (const resource of ['./styles.css', './src/app.js']) {
      assert.ok(html.includes(resource));
      assert.ok((await readFile(new URL(resource, destination))).length > 0);
    }
    assert.match(await readFile(new URL('src/tasks.js', destination), 'utf8'), /export function createTask/);
  } finally { await rm(directory, { recursive: true, force: true }); }
});
