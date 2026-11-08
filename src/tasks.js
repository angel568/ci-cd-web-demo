export function createTask(title, id) {
  if (typeof title !== 'string' || !title.trim()) {
    throw new Error('Escribe una tarea.');
  }
  if (title.trim().length > 120) {
    throw new Error('Usa como máximo 120 caracteres.');
  }
  return { id, title: title.trim(), completed: false };
}

export function toggleTask(tasks, id) {
  return tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
}

export function removeTask(tasks, id) {
  return tasks.filter(task => task.id !== id);
}

export function summarize(tasks) {
  const completed = tasks.filter(task => task.completed).length;
  return `${completed} de ${tasks.length} completadas`;
}
