# Mi día · CI/CD Web Demo

[![CI/CD](https://github.com/angel568/ci-cd-web-demo/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/angel568/ci-cd-web-demo/actions/workflows/ci-cd.yml)

Aplicación web estática para añadir, completar, reabrir y eliminar tareas. Demuestra integración continua con pruebas unitarias, integración, cobertura y despliegue condicionado a GitHub Pages.

- [Repositorio](https://github.com/angel568/ci-cd-web-demo)
- [Ejecuciones del pipeline](https://github.com/angel568/ci-cd-web-demo/actions)
- URL prevista del sitio tras activar Pages y completar el despliegue: https://angel568.github.io/ci-cd-web-demo/

## Requisitos y ejecución

Node.js 24 y Git. No hay dependencias externas ni paso de instalación: npm viene incluido en la distribución oficial de Node.js.

```sh
git clone https://github.com/angel568/ci-cd-web-demo.git
cd ci-cd-web-demo
npm test
npm run test:coverage
npm run build
npm start
```

Abrir http://localhost:3000. Detener con Ctrl+C. Si solo se dispone de `node`, los comandos equivalentes son `node --test`, `node scripts/build.js` y `node scripts/serve.js`; el comando completo de cobertura está en `package.json`.

## Uso

Escribir una tarea de 1 a 120 caracteres y pulsar **Añadir tarea**. Pulsar su título para alternar el estado o **Eliminar** para borrarla. El contador se actualiza y los errores aparecen junto al formulario. Los datos se mantienen en memoria y se pierden al recargar; no requiere backend ni base de datos.

## Estructura

```text
.github/workflows/ci-cd.yml  # test → build → deploy
public/                     # HTML y CSS
src/tasks.js                # reglas de negocio puras
src/app.js                  # controladores y renderizado seguro con textContent
scripts/                    # build y servidor local
test/                       # pruebas unitarias e integración
docs/                       # pipeline, despliegue, demo e informe
```

## Calidad y pipeline

Cada PR a `main` ejecuta pruebas y build. Cada push a `main`, y una ejecución manual sobre `main`, ejecutan también el despliegue si las etapas anteriores pasan. La cobertura exige al menos 90 % global en líneas, ramas y funciones de `src/`; un incumplimiento detiene el pipeline. Los informes se consultan en el paso de pruebas de Actions.

El build copia exclusivamente `public/` y `src/` a `dist/`. Las rutas relativas permiten alojarlo bajo el subdirectorio del repositorio. Pages recibe solo ese directorio, nunca las pruebas ni la documentación. No se requieren secretos personales: el despliegue utiliza los permisos temporales de GitHub Actions.

## Documentación

- [Pipeline](docs/PIPELINE.md)
- [Despliegue y solución de problemas](docs/DEPLOYMENT.md)
- [Guion de demostración](docs/DEMO.md)
- [Informe de implementación](docs/IMPLEMENTATION_REPORT.md)
- [Guía de contribución](CONTRIBUTING.md)

## Alcance y recursos

No se adjuntó la plantilla mencionada en la consigna; se creó una aplicación original. La imagen del aula no pudo recuperarse y no se presume su contenido. Se implementó la secuencia descrita en los requisitos textuales.

Referencias oficiales: [workflows para Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [configurar la fuente de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [runner de pruebas de Node](https://nodejs.org/docs/latest-v24.x/api/test.html).
