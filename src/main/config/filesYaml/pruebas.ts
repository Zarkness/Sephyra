import { createLogger, HEX, prefix } from "../../utils/utils";
import { ConfigReader } from "./configReader";

createLogger(prefix.empty, HEX.text('hola'));
//const config = new ConfigReader('./src/resources/config_Example.yml')
createLogger(prefix.warn, HEX.text('hola'));
createLogger(prefix.error, HEX.text('hola'));
createLogger(prefix.success, HEX.text('hola'));

const config = new ConfigReader('./src/main/config/filesYaml/config.yml')

console.log('Servidor:', config.get('server.name'))
console.log('Puerto:', config.get('server.port'))
console.log('No existe:', config.get('server.modo', 'survival'))

const testing = new ConfigReader('./ruta/inexistente.yml')