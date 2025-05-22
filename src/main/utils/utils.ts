import chalk from "chalk";
import gradient from "gradient-string";


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