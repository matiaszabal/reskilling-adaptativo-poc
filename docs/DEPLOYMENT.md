# Guía de Despliegue - PoC Reskilling Adaptativo

Esta demo está construida con **Next.js** y un servicio secundario en **Python**. Aquí tienes las mejores opciones para deployarla:

## Opción 1: Railway.app (Recomendada)
Railway es ideal para proyectos que mezclan Node.js y Python.

1. Conecta tu repositorio de GitHub a [Railway](https://railway.app/).
2. Railway detectará automáticamente el `Dockerfile` que he creado.
3. El despliegue será automático y configurará ambos entornos (Node y Python).

## Opción 2: Vercel (Rápida, solo Frontend)
Vercel es excelente para Next.js, pero el servicio de sincronización real de NotebookLM podría no funcionar debido a las restricciones de procesos de las Serverless Functions.

1. Conecta tu repo a [Vercel](https://vercel.com/).
2. Configura el framework como **Next.js**.
3. El dashboard funcionará perfectamente usando los **datos de demostración (mock fallback)** que implementé.

## Opción 3: Docker (Auto-hosteado)
Si tienes un servidor propio o prefieres AWS/Google Cloud:

```bash
# Construir la imagen
docker build -t ai-security-poc .

# Ejecutar el contenedor
docker run -p 3000:3000 ai-security-poc
```

### Notas Importantes
- **Sincronización Real**: La sincronización real con NotebookLM requiere `uv` y `Chrome` instalados en el servidor. El `Dockerfile` ya incluye `uv`. 
- **Mock Fallback**: Si el entorno de despliegue no soporta la ejecución de Chrome (como Vercel), la demo seguirá funcionando perfectamente mostrando datos realistas de investigación gracias al sistema de respaldo que añadimos.
