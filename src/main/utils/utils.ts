import chalk from "chalk";
import gradient from "gradient-string";
import { ConfigReader } from "../config/filesYaml/configReader";


export const NAME = `
            ╔══════════════════════════════════════════════════════════════════════════════════════╗
            ║                                                                                      ║
            ║               ███████╗███████╗██████╗ ██╗  ██╗██╗   ██╗██████╗  █████╗               ║
            ║               ██╔════╝██╔════╝██╔══██╗██║  ██║╚██╗ ██╔╝██╔══██╗██╔══██╗              ║
            ║               ███████╗█████╗  ██████╔╝███████║ ╚████╔╝ ██████╔╝███████║              ║
            ║               ╚════██║██╔══╝  ██╔═══╝ ██╔══██║  ╚██╔╝  ██╔══██╗██╔══██║              ║
            ║               ███████║███████╗██║     ██║  ██║   ██║   ██║  ██║██║  ██║              ║
            ║               ╚══════╝╚══════╝╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝              ║
            ║                                                                                      ║
            ║                                ✦✦✦ DISCORD BOT ✦✦✦                                   ║
            ║                                                                                      ║   
            ╚══════════════════════════════════════════════════════════════════════════════════════╝                                                      
`

export const configFile = new ConfigReader('./src/resources/config.yml');
export const langDir = './src/resources/lang';
export const discordToken = configFile.get('Token');
export const discordGuildID = configFile.get('GuildID');
export const discordClientID = configFile.get('ClientID')

export const HEX = {
    darkTurquoise: chalk.hex('#2daead'),
    mediumAquamarine: chalk.hex('#80cf91'),
    text: chalk.hex('#ace9b0'),
    info: chalk.hex('2196F3'),
    warn: chalk.hex('#FFD54F'),
    error: chalk.hex('#FF0000'),
    success: chalk.hex('#388E3C'),
    gradient: gradient(['#2daead', '#80cf91', '#b171ce']),
}; 

const log = console.log

export const prefix = {
    empty: '',
    info: HEX.info('[ Info ] '),
    warn: HEX.warn('[ Warning ] '),
    error: HEX.error('[ Error ] '),
    success: HEX.success('[ Succcess ] '),
}

export function createLogger(prefix: any, message: any) {
    return log(prefix, message)
}



//export const NameConsole = log(HEX.mediumAquamarine(NAME));