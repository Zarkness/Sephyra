import fs from 'fs'
import { createCommentedScalar, saveYAML } from '../config/yaml'
import YAML from 'yaml'
import type { Pair } from 'yaml'


type CommentMap = Record<string, { before?: string; inline?: string }>

function createYamlWithComments(data: Record<string, any>, comments: CommentMap) {
  const doc = new YAML.Document()
  doc.contents = new YAML.YAMLMap()

  for (const [key, value] of Object.entries(data)) {
    const node = doc.createNode(value)
    const pair = new YAML.Pair(key, node)

    // Comentario en línea
    if (comments[key]?.inline) {
      node.comment = comments[key].inline
    }

    // Agregamos el par al documento
    doc.contents.add(pair)
  }

  let output = doc.toString()

  // Insertar los comentarios antes de cada clave
  for (const [key, value] of Object.entries(comments)) {
    if (value.before) {
      const regex = new RegExp(`(^|\\n)(\\s*)${key}:`, 'g')
      output = output.replace(
        regex,
        `$1$2# ${value.before}\n$2${key}:`
      )
    }
  }

  return output
}

// ---------------------- USO ----------------------

const data = {
  lang: 'en',
  token: 'YOUR_BOT_TOKEN',
  prefix: '!',
}

const comments: CommentMap = {
  lang: {
    before: 'Este es el idioma por defecto',
    inline: 'Ej: en, es, fr...',
  },
  token: {
    before: 'Tu token de bot de Discord. ¡No lo compartas!',
  },
  prefix: {
    before: 'El prefijo usado antes de cada comando',
    inline: 'Ej: !, $, %, etc.',
  },
}

const result = createYamlWithComments(data, comments)

fs.writeFileSync('./src/resources/config213.yml', result, 'utf-8')

// const existFile = fs.existsSync('./src/resources/prueba.yml')

// if (!existFile) {
//   const header = `
//   ╔══════════════════════════════════════════════════════════════════════════════════════╗
//   ║                                                                                      ║
//   ║               ███████╗███████╗██████╗ ██╗  ██╗██╗   ██╗██████╗  █████╗               ║
//   ║               ██╔════╝██╔════╝██╔══██╗██║  ██║╚██╗ ██╔╝██╔══██╗██╔══██╗              ║
//   ║               ███████╗█████╗  ██████╔╝███████║ ╚████╔╝ ██████╔╝███████║              ║
//   ║               ╚════██║██╔══╝  ██╔═══╝ ██╔══██║  ╚██╔╝  ██╔══██╗██╔══██║              ║
//   ║               ███████║███████╗██║     ██║  ██║   ██║   ██║  ██║██║  ██║              ║
//   ║               ╚══════╝╚══════╝╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝              ║
//   ║                                                                                      ║
//   ║                     ✦✦✦ DISCORD BOT — V 0.0.1 ✦✦✦                                  ║
//   ║                                                                                      ║   
//   ╚══════════════════════════════════════════════════════════════════════════════════════╝

//   Tutorial for Discord Bot Settings in Developer Portal
//   1. Create a New Application in the Discord Developer Portal. https://discord.com/developers/applications
//   2. In the application, navigate to the 'Bot' section and click 'Add Bot'.
//   3. After creating the bot, locate the 'TOKEN' section and click 'Copy' to get your bot token.

//   Important Bot Settings:
//   - Disable 'PUBLIC BOT'
//   - Enable 'PRESENCE INTENT'
//   - Enable 'SERVER MEMBERS INTENT'
//   - Enable 'MESSAGE CONTENT INTENT'

//   Remember to keep your bot token secure and never share it publicly.
//   `

//   const doc = new YAML.Document()
//   //doc.contents = new YAML.YAMLMap()
//   doc.commentBefore = header.trim() // Añade el encabezado al inicio del archivo

//   const map = new YAML.YAMLMap()
//   doc.contents = map
  
//   // Crear valor con comentario inline
//   const langValue = doc.createNode('en') // Scalar con comentario de línea
//   langValue.comment = 'Ej: en, es, fr...'
  
//   // Crear par clave: valor
//   const langPair = new YAML.Pair('lang', langValue)
  
//   // Forzar el comentario encima de `lang:`
//   // NOTA: TypeScript no permite directamente `.commentBefore`, así que lo forzamos así:
//   ;(langPair as any).commentBefore = 'Este es el idioma por defecto'
  
//   // Agregar el par al mapa raíz
//   map.items.push(langPair)

  
//   // const langNode = createCommentedScalar('en', 'Ej: en, es, fr...');
//   // langNode.commentBefore = 'Este es el idioma por defecto'; // encima de la línea
//   // langNode.comment = "prueba"
//   // doc.set('lang', langNode)
//   // const prueba = doc.add({ key: "c", value: "a" })
  
  
//   // --- token con comentario en línea ---
//   doc.set('token', createCommentedScalar('YOUR_BOT_TOKEN', 'Token del bot (oculto)'))

//   // --- prefix con comentario en línea ---
//   doc.set('prefix', createCommentedScalar('!', 'Prefijo para comandos'))

//   saveYAML(doc, './src/resources/config213.yml')
// } else {
//   console.log('los archivos existen')
// }
