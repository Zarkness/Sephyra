// import YAML, { YAMLMap, isMap } from 'yaml'
// import fs from 'fs'
// import path from 'path'
// const doc = new YAML.Document()

// export function createDocumentWithHeader(headerComment: string = '') {
//     if (headerComment) {
//         doc.commentBefore = headerComment
//     }
//     return doc
// }

// export function createSimpleComment(commentText: string): void {
//     doc.commentBefore = commentText;
//   }


// export function createCommentedScalar(value: string, comment: string) {
//     const node = doc.createNode(value)
//     node.comment = comment
//     return node
// }

// export function saveYAML(doc: YAML.Document, filePath: string) {
//     const fullPath = path.resolve(filePath)
//     fs.writeFileSync(fullPath, String(doc), 'utf8')   
// }

import YAML, { Document, YAMLMap, Pair, Scalar } from 'yaml'
import fs from 'fs'

type Comment = {
    before?: string
    inline?: string
}

type CommentMap = Record<string, Comment>


/**
 * Genera un YAML con comentarios antes e inline para cada clave.
 * @param data Objeto plano con las claves y valores
 * @param comments Comentarios por clave
 * @param header Encabezado opcional (insertado arriba del todo)
 * @returns YAML como string
 */

export function generateYaml(
    data: Record<string, any>,
    comments: CommentMap = {},
    header?: string
): string {

    const doc = new YAML.Document()
    doc.contents = new YAML.YAMLMap()

    for (const [key, value] of Object.entries(data)) {
        //const node = doc.createNode(value)
        const scalarNode = new Scalar(value)
        scalarNode.type = 'QUOTE_SINGLE'
        if (comments[key]?.inline) {
            scalarNode.comment = comments[key].inline            
        }
        doc.contents.add(new YAML.Pair(key, scalarNode))
    }

    let output = doc.toString()

    for (const [key, comment] of Object.entries(comments)) {
        if (comment.before) {
            const regex = new RegExp(`(^|\\n)(\\s*)${key}:`, 'g')
            output = output.replace(
                regex,
                `$1$2# ${comment.before}\n$2${key}:`
            )
        }
        
    }


    if (header) {
        output = `${header.trim()}\n\n${output.trim()}\n`
    }

    return output
}