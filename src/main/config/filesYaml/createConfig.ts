// import { generateYaml } from "./yaml"
import fs from 'fs'

import { generateYamlAdvanced } from "./yaml"

export function createConfigYaml() {
  
const file = "./src/resources/config_Example.yml"

if (fs.existsSync(file)) {
  console.log("existe")
} else {
  const quote = {
    double: "QUOTE_SINGLE",
    simple: "QUOTE_DOUBLE"
  }
  
  const configFile = {
    Lang: "en_EN",
    Token: "Your Bot Token",
    GuildID: "Your Guild ID",
    BotName: "Sephyra",
    TimeZone: "Europe/Madrid"
  
  }
  
  const comments = {
    Lang: {
      before: "Set bot lenguage",
      inline: "Ej: en_EN, es_ES...",
      quote: quote.double,
    },
    Token: {
      before: "Set your bot token",
      quote: quote.double,
    },
    GuildID: {
      before: "set your guild id",
      inline: "example 1342464197560373343",
      quote: quote.double,
    },
    BotName: {
      inline: "Set bot name",
      quote: quote.double,
    },
    TimeZone: {
      inline: "set your timezone",
      quote: quote.double,
    },
  }
  
  const header = `
      #  ╔══════════════════════════════════════════════════════════════════════════════════════╗
      #  ║                                                                                      ║
      #  ║               ███████╗███████╗██████╗ ██╗  ██╗██╗   ██╗██████╗  █████╗               ║
      #  ║               ██╔════╝██╔════╝██╔══██╗██║  ██║╚██╗ ██╔╝██╔══██╗██╔══██╗              ║
      #  ║               ███████╗█████╗  ██████╔╝███████║ ╚████╔╝ ██████╔╝███████║              ║
      #  ║               ╚════██║██╔══╝  ██╔═══╝ ██╔══██║  ╚██╔╝  ██╔══██╗██╔══██║              ║
      #  ║               ███████║███████╗██║     ██║  ██║   ██║   ██║  ██║██║  ██║              ║
      #  ║               ╚══════╝╚══════╝╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝              ║
      #  ║                                                                                      ║
      #  ║                     ✦✦✦ DISCORD BOT — V 0.0.1 ✦✦✦                                  ║
      #  ║                                                                                      ║   
      #  ╚══════════════════════════════════════════════════════════════════════════════════════╝
      #  
  
  
      #  Tutorial for Discord Bot Settings in Developer Portal
      #  1. Create a New Application in the Discord Developer Portal. https://discord.com/developers/applications
      #  2. In the application, navigate to the 'Bot' section and click 'Add Bot'.
      #  3. After creating the bot, locate the 'TOKEN' section and click 'Copy' to get your bot token.
  
      #  Important Bot Settings:
      #  - Disable 'PUBLIC BOT'
      #  - Enable 'PRESENCE INTENT'
      #  - Enable 'SERVER MEMBERS INTENT'
      #  - Enable 'MESSAGE CONTENT INTENT'
  
      #  Remember to keep your bot token secure and never share it publicly.
  `
  
  const yamlString = generateYamlAdvanced(configFile, comments, header)
  
  fs.writeFileSync(file, yamlString)
}
}

