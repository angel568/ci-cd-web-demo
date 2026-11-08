import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mountApp } from '../src/app.js';

// Adaptador DOM mínimo: integra los controladores reales con el modelo.
// No sustituye una prueba en un navegador real (ver docs/DEMO.md).
class Element {
  value = ''; textContent = ''; children = []; attributes = {}; listeners = {};
  setAttribute(name, value) { this.attributes[name] = value; }
  addEventListener(name, callback) { this.listeners[name] = callback; }
  append(...children) { this.children.push(...children); }
  replaceChildren() { this.children = []; }
  fire(name) { this.listeners[name]({ preventDefault() {} }); }
}

test('formulario → modelo → lista: añadir, completar, reabrir y eliminar', () => {
  const nodes = Object.fromEntries(['form', '#title', '#tasks', '#status', '#error'].map(key => [key, new Element()]));
  const root = { querySelector: key => nodes[key], ownerDocument: { createElement: () => new Element() } };
  let id = 0;
  mountApp(root, () => String(++id));
  assert.equal(nodes['#status'].textContent, '0 de 0 completadas');
  nodes['#title'].value = '  ';
  nodes.form.fire('submit');
  assert.equal(nodes['#error'].textContent, 'Escribe una tarea.');
  for (const title of ['Estudiar', '<script>alert(1)</script>']) {
    nodes['#title'].value = title;
    nodes.form.fire('submit');
  }
  assert.equal(nodes['#error'].textContent, '');
  assert.equal(nodes['#title'].value, '');
  assert.equal(nodes['#tasks'].children[1].children[0].textContent, '<script>alert(1)</script>');
  nodes['#tasks'].children[0].children[0].fire('click');
  assert.equal(nodes['#status'].textContent, '1 de 2 completadas');
  assert.equal(nodes['#tasks'].children[0].children[0].attributes['aria-pressed'], 'true');
  nodes['#tasks'].children[0].children[0].fire('click');
  assert.equal(nodes['#status'].textContent, '0 de 2 completadas');
  nodes['#tasks'].children[0].children[1].fire('click');
  assert.equal(nodes['#status'].textContent, '0 de 1 completadas');
});
