import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createTask, toggleTask, removeTask, summarize } from '../src/tasks.js';

test('crea una tarea y normaliza espacios', () => {
  assert.deepEqual(createTask('  Estudiar  ', 'a'), { id: 'a', title: 'Estudiar', completed: false });
  assert.equal(createTask('x'.repeat(120), 'b').title.length, 120);
});
test('rechaza títulos inválidos', () => {
  for (const title of ['', '  ', null, 42, 'x'.repeat(121)]) {
    assert.throws(() => createTask(title, 'a'));
  }
});
test('alterna solo la tarea indicada sin mutar la entrada', () => {
  const tasks = [createTask('Uno', 'a'), createTask('Dos', 'b')];
  const updated = toggleTask(tasks, 'a');
  assert.equal(updated[0].completed, true);
  assert.equal(updated[1].completed, false);
  assert.equal(tasks[0].completed, false);
  assert.deepEqual(toggleTask(updated, 'a'), tasks);
  assert.deepEqual(toggleTask(tasks, 'ausente'), tasks);
});
test('elimina por id y resume lista vacía y mixta', () => {
  const tasks = [createTask('Uno', 'a'), { ...createTask('Dos', 'b'), completed: true }];
  assert.equal(summarize([]), '0 de 0 completadas');
  assert.equal(summarize(tasks), '1 de 2 completadas');
  assert.deepEqual(removeTask(tasks, 'a'), [tasks[1]]);
  assert.deepEqual(removeTask(tasks, 'ausente'), tasks);
});
