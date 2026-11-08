# Informe de implementación

Fecha: 8 de noviembre de 2026. Autor(es): completar con nombre y matrícula.

## Objetivo y solución

Automatizar pruebas y despliegue de una aplicación web simple mediante GitHub Actions y GitHub Pages. Se implementó un gestor de tareas con JavaScript modular, HTML semántico y CSS adaptable. La información vive en memoria. No hay backend, autenticación ni persistencia.

La aplicación separa reglas de negocio de los eventos de interfaz. El build copia solo los recursos públicos y módulos de aplicación a `dist/`. Las rutas relativas soportan el subdirectorio de GitHub Pages.

## Implementación

1. Estructura de proyecto con Node.js 24 y cero dependencias externas.
2. Pruebas unitarias de validación, actualización inmutable, eliminación y resumen.
3. Integración de controladores de UI y modelo mediante adaptador DOM, e integración del build con el sistema de archivos.
4. Cobertura nativa V8 con umbrales globales del 90 % sobre `src/`.
5. Workflow con jobs dependientes de test, build y deploy. Publicación restringida a main y eventos distintos de PR.
6. Documentación de contribución, pipeline, despliegue y demostración.

## Validación local realizada

Entorno: Windows, Node.js v24.22.1. Se ejecutó el comando completo de cobertura de `package.json` directamente con Node porque npm no está disponible en el PATH de este entorno.

- 6 pruebas ejecutadas; 6 aprobadas y 0 fallidas.
- Cobertura global inicial de `src/`: líneas 100 %, ramas 100 %, funciones 92,31 %.
- `node scripts/build.js` generó `dist/` correctamente.
- El caso de integración verifica que los recursos relativos del sitio se copien.

## Estado remoto

Repositorio creado por el usuario: https://github.com/angel568/ci-cd-web-demo.

La validación remota y la publicación requieren consultar una ejecución real y el sitio. Este apartado se actualizará con evidencia si se completa durante la implementación. No se afirma un despliegue remoto con base únicamente en las pruebas locales.

## Limitaciones y mejoras

La plantilla de la consigna no se adjuntó y la imagen del aula no pudo recuperarse. La solución sigue los requisitos textuales. La integración DOM usa un adaptador mínimo; queda una comprobación manual en navegador y pueden añadirse pruebas de navegador automatizadas en una siguiente versión. La cobertura de scripts de infraestructura no se mide por el umbral de `src/`. Añadir persistencia, filtrado y fijación de acciones por SHA serían mejoras futuras.

## Relación con la evaluación

| Criterio | Evidencia |
| --- | --- |
| Pipeline (40 %) | Workflow y ejecución remota cuando esté disponible |
| Código y pruebas (30 %) | Separación de módulos, pruebas y cobertura |
| Documentación (20 %) | README, CONTRIBUTING y docs/ |
| Presentación (10 %) | Guion y evidencias de DEMO.md |
