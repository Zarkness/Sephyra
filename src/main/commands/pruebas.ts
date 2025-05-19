// src/utils/lang.ts
import fs from 'fs';
import YAML from 'yaml';
import path from 'path';

// Cargar idioma desde config.yml
const config = YAML.parse(fs.readFileSync('./src/resources/config.yml', 'utf8'));
const selectedLang = config.lang || 'en_EN';

const langPath = path.resolve(`./src/resources/lang/${selectedLang}.yml`);

// Validar existencia
if (!fs.existsSync(langPath)) {
  throw new Error(`Idioma no encontrado: ${selectedLang}`);
}

// Cargar traducciones
const LANG = YAML.parse(fs.readFileSync(langPath, 'utf8'));

/**
 * Devuelve un mensaje traducido con reemplazos.
 */
export function t(key: string, replacements: Record<string, string> = {}): string {
  let text = LANG[key];

  if (!text) return `⚠️ Missing translation: ${key}`;

  // Reemplazo de variables tipo %user%
  for (const [placeholder, value] of Object.entries(replacements)) {
    const regex = new RegExp(`%${placeholder}%`, 'g');
    text = text.replace(regex, value);
  }

  return text;
}
