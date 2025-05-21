import YAML, { YAMLMap, isMap } from 'yaml'

const doc = new YAML.Document({ a: 1, b: [2, 3] }) // { a: 1, b: [ 2, 3 ] }
doc.add({ key: 'c', value: 4 }) // { a: 1, b: [ 2, 3 ], c: 4 }
doc.addIn(['b'], 5)             // { a: 1, b: [ 2, 3, 5 ], c: 4 }
doc.set('c', 42)                // { a: 1, b: [ 2, 3, 5 ], c: 42 }
//doc.setIn(['c', 'x']) // Error: Expected YAML collection at c. Remaining path: x
doc.delete('c')                 // { a: 1, b: [ 2, 3, 5 ] }
doc.deleteIn(['b', 1])          // { a: 1, b: [ 2, 5 ] }

doc.get('a') // 1
doc.get('a', true) // Scalar { value: 1 }
doc.getIn(['b', 1]) // 5
doc.has(doc.createNode('a')) // true
doc.has('c') // false
doc.hasIn(['b', '0']) // true