import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import { configFile, langDir } from '../../utils/utils'

type LangData = Record<string, any>

export class LangManager {
  private langs: Record<string, LangData> = {}
  private currentLang: string | undefined
  private fallbackLang: string = 'en_US'
  private langDir: string

  constructor() {
    this.langDir = path.resolve(langDir)
    const config = configFile

    this.loadAllLanguages()
    this.setLanguage(config.get<string>('lang', this.fallbackLang))
  }

  private loadAllLanguages() {
    if (!fs.existsSync(this.langDir)) {
      console.warn(`No se encontró la carpeta de idiomas en: ${this.langDir}`)
      return
    }

    const files = fs.readdirSync(this.langDir).filter(file => /^[a-z]{2}_[A-Z]{2}\.ya?ml$/.test(file))
    for (const file of files) {
      const langCode = path.basename(file, path.extname(file))
      const filePath = path.join(this.langDir, file)
      const content = fs.readFileSync(filePath, 'utf8')
      this.langs[langCode] = YAML.parse(content)
    }
  }

  public setLanguage(langCode: string) {
    if (this.langs[langCode]) {
      this.currentLang = langCode
    } else {
      console.warn(`Idioma '${langCode}' no encontrado. Usando '${this.fallbackLang}' como fallback.`)
      this.currentLang = this.fallbackLang
    }
  }

  public setFallback(langCode: string) {
    this.fallbackLang = langCode
  }

  public get(key: string, replacements: Record<string, string | number> = {}): string {
    const text = this.resolvePath(this.langs[this.currentLang], key)
      ?? this.resolvePath(this.langs[this.fallbackLang], key)
      ?? key

    return this.replacePlaceholders(text, replacements)
  }

  private resolvePath(obj: any, keyPath: string): string | undefined {
    return keyPath.split('.').reduce((acc, part) => acc?.[part], obj)
  }

  private replacePlaceholders(text: string, replacements: Record<string, string | number>): string {
    if (typeof text !== 'string') return String(text)
    return Object.entries(replacements).reduce(
      (result, [key, value]) => result.replace(new RegExp(`{${key}}`, 'g'), String(value)),
      text
    )
  }

  public availableLanguages(): string[] {
    return Object.keys(this.langs)
  }
}

export const lang = new LangManager()
