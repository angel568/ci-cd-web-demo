# Instrucciones de despliegue

## Primera publicación

1. Crear el repositorio público `angel568/ci-cd-web-demo` y subir los archivos, incluyendo `.github/`.
2. En el repositorio, abrir **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Abrir **Actions → CI/CD → Run workflow**, elegir `main` y ejecutar. También sirve un nuevo push a `main`.
4. Esperar a que `test`, `build` y `deploy` finalicen correctamente.
5. Abrir la URL que muestra el environment `github-pages`: normalmente https://angel568.github.io/ci-cd-web-demo/.

No crear ni guardar un PAT para el workflow. GitHub proporciona `GITHUB_TOKEN` y la identidad OIDC al job de despliegue.

## Cambios y recuperación

Trabajar en una rama, abrir PR y comprobar CI. Al fusionar en `main`, se publica la nueva versión. Para recuperar una versión anterior, revertir el commit problemático mediante una nueva PR y fusionarla; el pipeline vuelve a publicar el código restaurado.

## Diagnóstico

| Síntoma | Acción |
| --- | --- |
| Pruebas fallan | Revisar aserción en logs y ejecutar `npm run test:coverage` localmente |
| Cobertura insuficiente | Añadir casos de comportamiento; no reducir el umbral para ocultar fallos |
| Pages no está habilitado | Seleccionar GitHub Actions como Source en Settings → Pages |
| Deploy espera aprobación | Revisar reglas del environment `github-pages` |
| 404 al abrir el sitio | Usar URL del environment y esperar propagación tras deploy correcto |
| CSS o JS no cargan | Mantener rutas `./styles.css` y `./src/app.js` relativas |
| Workflow no aparece | Comprobar que el YAML esté en `.github/workflows/` y en `main` |

Para entregar evidencia, consultar [DEMO.md](DEMO.md). Un build local correcto no demuestra que Pages haya publicado: se debe conservar la URL de una ejecución remota y comprobar el sitio.
