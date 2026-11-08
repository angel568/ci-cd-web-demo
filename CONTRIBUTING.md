# Guía de contribución

1. Crear una rama desde `main`: `git switch -c feat/mi-cambio`.
2. Hacer cambios pequeños y mantener la interfaz accesible en español.
3. Añadir o actualizar pruebas cuando cambie el comportamiento.
4. Ejecutar `npm run test:coverage` y `npm run build` con Node.js 24.
5. Abrir una PR a `main` con descripción del problema, solución y validación.
6. Revisar el estado de Actions antes de fusionar.

Usar mensajes claros, por ejemplo `feat: añadir filtro de tareas`. Evitar subir `dist/`, credenciales o archivos `.env`. La lógica de negocio vive en `src/tasks.js`; los eventos y el DOM, en `src/app.js`. Utilizar `textContent` para contenido introducido por el usuario.

Se recomienda proteger `main` y exigir el check **Pruebas y cobertura** antes de fusionar. Esta protección es una configuración del repositorio y no la activa el YAML.
