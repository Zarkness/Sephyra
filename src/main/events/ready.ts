import { Client, Events, GatewayIntentBits } from "discord.js";
import { HEX, log } from "../utils/utils";
import fs from 'fs'
import YAML from 'yaml'


export function ready() {
    const file = fs.readFileSync('./src/resources/config.yml', 'utf8');
    const data = YAML.parse(file);
    const tokenYaml = data['Token'];
    const CLIENT = new Client({ intents: [GatewayIntentBits.Guilds] });
    const asciiName = data.AsciiConsole;


    CLIENT.once(Events.ClientReady, readyClient => {
        const tag = CLIENT.user?.tag ?? 'Unknown#0000';
        const NAME = asciiName.replace('%sephyra_nametag%', tag);
        log(HEX.darkTurquoise(NAME));
    });
    
    CLIENT.login(tokenYaml);
    
}