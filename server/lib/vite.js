//Bibliotea file stream
import fs from 'node:fs'
//Biblioteca de rutas
import path from 'node:path' 
import { fileURLToPath } from 'node:url'
//creando la variables de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/**
 * Helper para handlebars que genera las etiquetas de vite
 * EnDESARROLLO: Conecta al servidor  de desarrollo de vite
 * EN PRODUCCION: Usa los compilados de Vite
 */
export function vitAssets() {
  // Obtener modo de ejecución
  const isDev = process.env.NODE_ENV !== 'production';
  //Rescatando la URL del servidor de desarrollo
  const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173';

  //Si estamos en modo desarrollo
  if (isDev) {
    //En desarrollo, cargamos los archivos
    //del fornt-end directamente del servidor
    //de Desarrollo de Vite
    return `
      <script type="module" src="${viteDevServer}/@vite/client"></script>
      <script type="module" src="${viteDevServer}/main.js"></script>`;      
  }
//EN produccion leemos el manifest
//y generamos las etiquetas finales de producción
const manifest = path.join(__dirname, '..','..','dist','vite','manifest.json');
//si no existe el manifest
if (!fs.existsSync(manifest)) {
    console.error('Vite manifest not found. Run `npm run build`.');
    return '';
}
}