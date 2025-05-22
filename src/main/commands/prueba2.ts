// import { t } from "./pruebas";

// console.log(t('welcome', {
//   user: 'Zarkness',
//   prefix: t('prefix')
// }));


import YAML, { Document } from 'yaml'
import {
  isAlias, isCollection, isMap, isNode,
  isPair, isScalar, isSeq, Scalar,
  visit, visitAsync, YAMLMap, YAMLSeq
} from 'yaml'
import fs from 'fs'
import { createDocumentWithHeader, createCommentedScalar, saveYAML } from '../config/filesYaml/yaml'

const existFile = fs.existsSync('./src/resources/prueba.yml')

if (!existFile) {
  const header = `
  ╔════════════════════════════════════════════════════════════════╗
  ║     ✦✦✦ Archivo de Configuración de Sephyra ✦✦✦              ║
  ╚════════════════════════════════════════════════════════════════╝
  `

  const doc = createDocumentWithHeader(header)

  doc.set('lang', createCommentedScalar('en', 'Idioma por defecto'))
  doc.set('prefix', createCommentedScalar('!', 'Prefijo para comandos'))
  doc.set('token', createCommentedScalar('YOUR_BOT_TOKEN', 'Token del bot (oculto)'))

  saveYAML(doc, './src/resources/prueba.yml')  
} else {
  console.log('los archivos existen')
}























// const doc = new YAML.Document()

// doc.commentBefore = `
//   ╔══════════════════════════════════════════════════════════════════════════════════════╗
//   ║                                                                                      ║
//   ║               ███████╗███████╗██████╗ ██╗  ██╗██╗   ██╗██████╗  █████╗               ║
//   ║               ██╔════╝██╔════╝██╔══██╗██║  ██║╚██╗ ██╔╝██╔══██╗██╔══██╗              ║
//   ║               ███████╗█████╗  ██████╔╝███████║ ╚████╔╝ ██████╔╝███████║              ║
//   ║               ╚════██║██╔══╝  ██╔═══╝ ██╔══██║  ╚██╔╝  ██╔══██╗██╔══██║              ║
//   ║               ███████║███████╗██║     ██║  ██║   ██║   ██║  ██║██║  ██║              ║
//   ║               ╚══════╝╚══════╝╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝              ║
//   ║                                                                                      ║
//   ║                     ✦✦✦ DISCORD BOT — %sephyra_nametag% ✦✦✦                               ║
//   ║                                                                                      ║   
//   ╚══════════════════════════════════════════════════════════════════════════════════════╝
// `


//  const prueba = doc.createNode({ lang: "en" })
// // prueba.comment = 'esto es una prueba'
// // doc.set('lang', prueba)
// // fs.writeFileSync('./src/resources/prueba.yml', doc.toString(), 'utf8')

// doc.commentBefore = `
//   ╔══════════════════════════════════════════════════════════════════════════════════════╗
//   ║                                                                                      ║
//   ║               ███████╗███████╗██████╗ ██╗  ██╗██╗   ██╗██████╗  █████╗               ║
//   ║               ██╔════╝██╔════╝██╔══██╗██║  ██║╚██╗ ██╔╝██╔══██╗██╔══██╗              ║
//   ║               ███████╗█████╗  ██████╔╝███████║ ╚████╔╝ ██████╔╝███████║              ║
//   ║               ╚════██║██╔══╝  ██╔═══╝ ██╔══██║  ╚██╔╝  ██╔══██╗██╔══██║              ║
//   ║               ███████║███████╗██║     ██║  ██║   ██║   ██║  ██║██║  ██║              ║
//   ║               ╚══════╝╚══════╝╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝              ║
//   ║                                                                                      ║
//   ║                     ✦✦✦ DISCORD BOT — %sephyra_nametag% ✦✦✦                       ║
//   ║                                                                                      ║   
//   ╚══════════════════════════════════════════════════════════════════════════════════════╝
// `

// // Crear un nodo escalar con comentario en la misma línea
// const langNode = new YAML.Scalar('en')  // NOTA: esto es equivalente a new YAML.Scalar('en')
// langNode.comment = 'esto es una prueba'

// doc.set('lang', langNode)

// // Guardar el YAML
// fs.writeFileSync('./src/resources/prueba.yml', String(doc), 'utf8')