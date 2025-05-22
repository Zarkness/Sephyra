import { lang } from './lang'
import { ConfigReader } from './configReader'

console.log(lang.get('messages.welcome', { name: 'Sephyra' }))

const config = new ConfigReader('./src/resources/config.yml')
console.log(config.get('server.name')) // → 'Sephyra'
console.log(config.get('debug'))       // → true
