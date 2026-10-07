//Bibliotea file stream
import fs from 'node:fs'
//Biblioteca de rutas
import path from 'node:path' 
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path';
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
const manifestPath = path.join(__dirname, '..','..','dist','vite','manifest.json');
//si no existe el manifest
if (!fs.existsSync(manifestPath)) {
    console.error('Vite manifest not found. Run `npm run build`.');
    return '';
  }
  /*leyendo y parseando a JSEN el archivo
  *de manifiesto que genera vit en la complilacion
  *de os archivos de front-end
  */
  const manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  //obteniendo la ruta del punto de entrada del front-end
  const mainEntry = mainfest['main.js']; 
  //Guardar el main.js
  if(!mainEntry){
     console.warn('Archivo main.js no esta disponible en el manifiesto de vite');
     return ''
  }
  let tags = ''
  if(mainEntry.css){
    mainEntry.css.forEach(cssFiles => {
        tags += `<link rel="stylesheet" href="/
        ${cssFile}">\n`
    });
  } 
  //js files
  tags += `<script type="module" src="/${mainEntry.file}"defer>
  </script>`;

  return tags;
}

/*
funcion registradora del Helper de Handlebars
*/
export function registerViteHelper(hbs){
  hbs.registerHelper('viteAssets',() => {
 //sanitizando la salida del helper
     return new hbs.SafeString(vitAssets())
  })
}