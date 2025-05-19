import fs, { readFile } from 'fs'
import YAML from 'yaml'
import { log } from '../utils/utils';
import { Client, Events, GatewayIntentBits } from "discord.js";
  // Leer archivo YAML
  const file = fs.readFileSync('./test.yml', 'utf8')
  
  // Parsear contenido YAML a objeto JS
  const data = YAML.parse(file);
  
  console.log('Datos originales:', data);


// import fs, { readFile } from 'fs/promises';
// import YAML from 'yaml';

// async function getYamlValue(key: string, filePath: string) {
//   const fileContent = await readFile(filePath, 'utf8');
//   const data = YAML.parse(fileContent);
  
//   // Retornamos solo el valor de la clave que queremos
//   return data[key];
// }

// (async () => {
//   const author = await getYamlValue('author', './test.yml');
//   console.log(author);
// })();

// const file = fs.read
// const data = YAML.parse(file);

const testfile = fs.readFileSync('./test.yml', 'utf8');
const testdata = YAML.parse(testfile);

const testauthor = testdata['token'];

log(testauthor);

const CLIENT = new Client({ intents: [GatewayIntentBits.Guilds] });

const rawYaml = fs.readFileSync('./test.yml', 'utf8');
const parsed = YAML.parse(rawYaml);
const asciiTemplate = parsed.prueba;
const tag = CLIENT.user?.tag ?? 'Unknown#0000';
const NAME = asciiTemplate.replace('${tag}', tag);

console.log(NAME);