// import fs from 'fs'
// import path from 'path'
// import YAML from 'yaml'
// import { createLogger, HEX, prefix } from '../../utils/utils'

// export class ConfigReader {
//   private config: any = {}

//   constructor(filePath: string) {
//     const resolvedPath = path.resolve(filePath)
//     // if (!fs.existsSync(resolvedPath)) {
//     //   throw new Error(`No se encontró el archivo de configuración en: ${resolvedPath}`)
//     // }
//     try {
//       const file = fs.readFileSync(resolvedPath, 'utf8')
//       this.config = YAML.parse(file)
//     } catch (error) {
//       createLogger(prefix.error, HEX.error((error as Error).message))
//     }

//     const file = fs.readFileSync(resolvedPath, 'utf8')
//     this.config = YAML.parse(file)
//   }

//   get<T = any>(keyPath: string, fallback?: T): T {
//     const value = keyPath.split('.').reduce((acc, part) => acc?.[part], this.config)
//     return (value !== undefined ? value : fallback) as T
//   }
// }

// import fs from 'fs'
// import path from 'path'
// import YAML from 'yaml'
// import { createLogger, HEX, prefix } from '../../utils/utils'

// export class ConfigReader {
//   private config: any = {}

//   constructor(filePath: string) {
//     const resolvedPath = path.resolve(filePath)

//     try {
//       const file = fs.readFileSync(resolvedPath, 'utf8')
//       this.config = YAML.parse(file)
//     } catch (error) {
//       createLogger(prefix.error, HEX.error((error as Error).message))
//       // Opcional: salir del programa si el archivo no se pudo leer o parsear
//       process.exit(1)
//     }
//   }

//   get<T = any>(keyPath: string, fallback?: T): T {
//     const value = keyPath.split('.').reduce((acc, part) => acc?.[part], this.config)
//     return (value !== undefined ? value : fallback) as T
//   }
// }

import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import { createLogger, HEX, prefix } from '../../utils/utils'

export class ConfigReader {
  private config: any = {}

  constructor(filePath: string) {
    const resolvedPath = path.resolve(filePath)

    try {
      const file = fs.readFileSync(resolvedPath, 'utf8')
      this.config = YAML.parse(file) || {}

    } catch (error) {
      const err = error as NodeJS.ErrnoException

      if (err.code === 'ENOENT') {
        // Error crítico: archivo no encontrado
        createLogger(prefix.error, HEX.error(`Config file not found at: ${resolvedPath}`))
        process.exit(1)
      } else {
        // Warning: error de lectura o parseo, pero no crítico
        createLogger(prefix.warn, HEX.warn(`Config file at ${resolvedPath} could not be loaded correctly.`))
        createLogger(prefix.warn, HEX.warn(err.message))
        this.config = {} // Dejar config vacía
      }
    }
  }

  get<T = any>(keyPath: string, fallback?: T): T {
    const value = keyPath.split('.').reduce((acc, part) => acc?.[part], this.config)
    return (value !== undefined ? value : fallback) as T
  }
}
