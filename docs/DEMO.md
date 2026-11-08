# Guion de demostración (3–5 minutos)

1. Mostrar el repositorio y explicar `src/`, `test/`, `scripts/` y el workflow.
2. Ejecutar `npm run test:coverage`; identificar pruebas unitarias, de integración y umbral.
3. Abrir una PR con un pequeño cambio visible en `public/index.html`. Mostrar pruebas y build; deploy debe omitirse.
4. Fusionar la PR y abrir la ejecución en Actions. Mostrar la cadena test → build → deploy.
5. Abrir el sitio desde el environment. Añadir dos tareas, completar una, reabrirla y eliminarla. Probar una entrada vacía.
6. En una rama de demostración, cambiar temporalmente una expectativa en `test/tasks.test.js` para que sea incorrecta. Subir y mostrar que el test falla y build no continúa. Restaurar el archivo y mostrar la recuperación. No fusionar la versión fallida.

## Evidencias para la entrega

- URL del repositorio: https://github.com/angel568/ci-cd-web-demo
- URL exacta de ejecución remota exitosa: registrar después de ejecutarla.
- URL del sitio publicado: registrar después de verificarlo.
- Captura del resumen con los tres jobs correctos.
- Captura del log con cobertura y del sitio funcionando.
- Opcional: enlace de la PR fallida y su corrección.

No presentar pasos propuestos como si ya hubieran ocurrido. El informe distingue la validación local de la remota.
