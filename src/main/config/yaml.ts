import YAML, { Document, YAMLMap, YAMLSeq, Scalar, Pair, isScalar } from 'yaml'

type QuoteType =
  | 'QUOTE_SINGLE'
  | 'QUOTE_DOUBLE'
  | 'PLAIN'
  | 'BLOCK_LITERAL'  // |
  | 'BLOCK_FOLDED'   // >

interface Comment {
  before?: string // comment above the key
  inline?: string // comment at end of line
  quote?: QuoteType
}

type CommentMap = Record<string, Comment | CommentMap>

/**
 * Recursively crea un nodo YAML (Scalar, Map, Seq) con comentarios y estilos.
 */
function createNodeWithComments(value: any, comment?: Comment | CommentMap): any {
  // Objetos normales → YAMLMap (mapeo de claves y valores)
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const map = new YAMLMap()
    for (const [k, v] of Object.entries(value)) {
      const childComment = (comment as CommentMap)?.[k] as Comment | undefined
      const node = createNodeWithComments(v, childComment)
      const pair = new Pair(k, node)

      // Comentario inline para la clave hija (si existe)
      if (childComment?.inline) {
        if (isScalar(node)) node.comment = childComment.inline
        else if (node && node.items && node.items.length) {
          // No se suele poner comentario inline en maps o seq, se ignora
        }
      }
      map.add(pair)
    }
    return map
  }

  // Arrays → YAMLSeq
  if (Array.isArray(value)) {
    const seq = new YAMLSeq()
    for (const item of value) {
      const node = createNodeWithComments(item)
      seq.add(node)
    }
    // No admite comentarios inline en secuencias para ítems individuales con esta librería
    return seq
  }

  // Scalars (strings, números, booleanos)
  const scalar = new Scalar(value)

  if (comment && typeof comment === 'object') {
    // Tipo de comillas
    if (comment.quote) {
      switch (comment.quote) {
        case 'BLOCK_LITERAL':
          scalar.type = 'BLOCK_LITERAL'
          break
        case 'BLOCK_FOLDED':
          scalar.type = 'BLOCK_FOLDED'
          break
        case 'QUOTE_SINGLE':
          scalar.type = 'QUOTE_SINGLE'
          break
        case 'QUOTE_DOUBLE':
          scalar.type = 'QUOTE_DOUBLE'
          break
        case 'PLAIN':
        default:
          scalar.type = 'PLAIN'
          break
      }
    }

    // Comentario inline
    if (comment.inline) {
      scalar.comment = comment.inline
    }
  }

  return scalar
}

/**
 * Genera un YAML completo con soporte para:
 * - Comentarios antes e inline, también en claves anidadas
 * - Control de tipo de comillas y strings multilínea
 * - Arrays y objetos anidados
 * - Encabezado global
 * 
 * NOTA: Los comentarios "before" se insertan en el output final con regex.
 */
export function generateYamlAdvanced(
  data: Record<string, any>,
  comments: CommentMap = {},
  header?: string
): string {
  const doc = new Document()
  const rootMap = new YAMLMap()

  // Construir el contenido YAML con comentarios e info de comillas
  for (const [key, value] of Object.entries(data)) {
    const node = createNodeWithComments(value, comments[key])
    rootMap.add(new Pair(key, node))
  }
  doc.contents = rootMap

  let output = doc.toString()

  // Función recursiva para añadir comentarios "before" usando regex en el output
  function addBeforeCommentsRec(
    obj: CommentMap,
    pathKeys: string[] = [],
    indentLevel = 0
  ) {
    for (const [key, val] of Object.entries(obj)) {
      const indent = '  '.repeat(indentLevel)
      if (val && typeof val === 'object' && ('before' in val || 'inline' in val || 'quote' in val)) {
        // val es un Comment (no CommentMap)
        if (val.before) {
          const regex = new RegExp(`(^|\\n)(\\s*)${key}:`, 'g')
          output = output.replace(
            regex,
            `$1${indent}# ${val.before}\n${indent}${key}:`
          )
        }
      } else if (val && typeof val === 'object') {
        // val es CommentMap (anidado)
        if ('before' in val && typeof val.before === 'string') {
          const regex = new RegExp(`(^|\\n)(\\s*)${key}:`, 'g')
          output = output.replace(
            regex,
            `$1${indent}# ${val.before}\n${indent}${key}:`
          )
        }
        addBeforeCommentsRec(val as CommentMap, [...pathKeys, key], indentLevel + 1)
      }
    }
  }

  addBeforeCommentsRec(comments)

  if (header) {
    output = `${header.trim()}\n\n${output.trim()}\n`
  }

  return output
}
