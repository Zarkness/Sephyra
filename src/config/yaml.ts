import YAML, { Document } from 'yaml'
import {
  isAlias, isCollection, isMap, isNode,
  isPair, isScalar, isSeq, Scalar,
  visit, visitAsync, YAMLMap, YAMLSeq
} from 'yaml'
import fs from 'fs'
import path from 'path'
const doc = new YAML.Document()

export function createDocumentWithHeader(headerComment: string = '') {
    if (headerComment) {
        doc.commentBefore = headerComment
    }
    return doc
}


export function createCommentedScalar(value: string, comment: string) {
    const node = doc.createNode(value)
    node.comment = comment
    return node
}

export function saveYAML(doc: YAML.Document, filePath: string) {
    const fullPath = path.resolve(filePath)
    fs.writeFileSync(fullPath, String(doc), 'utf8')   
}