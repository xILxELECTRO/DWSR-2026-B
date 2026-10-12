import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
 
export default defineConfig([
  //1)Ignora los build de front
  {ignores:["dist/**",//ignora carpeta de dist
   "node_modules/**"
  ]
},
//2) codig del back-end
  {
  files: ["server/**/*.{js,mjs,cjs}"],
  plugins: { js },
  extends: ["js/recommended"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  globals: {
     ...globals.node
    }
  }
},
//2.1) cofig de vite
  {
  files: ["vite.config.js"],
  plugins: { js },
  extends: ["js/recommended"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  globals: {
     ...globals.node
    }
  }
},
 
//3) codig del front-end
  {
  files: ["src/**/*.{js,mjs,cjs}"],
  plugins: { js },
  extends: ["js/recommended"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  globals: {
     ...globals.browser
    }
  }
},
//4) Opcional si hay js en public
  {
  files: ["public/**/*.{js,mjs}"],
  plugins: { js },
  extends: ["js/recommended"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  globals: {
     ...globals.browser
    }
  }
},
 
]);
 