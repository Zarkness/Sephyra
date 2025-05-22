import { Client, Events, GatewayIntentBits } from "discord.js";
import { createLogger, HEX, log, NAME, prefix } from "../utils/utils";
import fs from 'fs'
import YAML from 'yaml'
import { ConfigReader } from "../config/filesYaml/configReader";
//import { ConfigReader } from './configReader'



export function ready() {
    const config = new ConfigReader('./src/resources/config.yml');
    const tokenYaml = config.get('Token')  //ata['Token'];
    const CLIENT = new Client({ intents: [GatewayIntentBits.Guilds] });
    const asciiName = NAME


    CLIENT.once(Events.ClientReady, readyClient => {
        createLogger(prefix.empty, HEX.gradient(asciiName));
    });
    
    CLIENT.login(tokenYaml);
    
}