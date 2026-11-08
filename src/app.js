import { createTask, toggleTask, removeTask, summarize } from './tasks.js';

export function mountApp(root, nextId = () => crypto.randomUUID()) {
  let tasks = [];
  const form = root.querySelector('form');
  const input = root.querySelector('#title');
  const list = root.querySelector('#tasks');
  const status = root.querySelector('#status');
  const error = root.querySelector('#error');

  function render() {
    list.replaceChildren();
    for (const task of tasks) {
      const item = root.ownerDocument.createElement('li');
      const toggle = root.ownerDocument.createElement('button');
      toggle.type = 'button';
      toggle.textContent = task.title;
      toggle.setAttribute('aria-pressed', String(task.completed));
      toggle.addEventListener('click', () => {
        tasks = toggleTask(tasks, task.id);
        render();
      });
      const remove = root.ownerDocument.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Eliminar';
      remove.setAttribute('aria-label', `Eliminar ${task.title}`);
      remove.addEventListener('click', () => {
        tasks = removeTask(tasks, task.id);
        render();
      });
      item.append(toggle, remove);
      list.append(item);
    }
    status.textContent = summarize(tasks);
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    try {
      tasks = [...tasks, createTask(input.value, nextId())];
      input.value = '';
      error.textContent = '';
      render();
    } catch (cause) {
      error.textContent = cause.message;
    }
  });
  render();
}
