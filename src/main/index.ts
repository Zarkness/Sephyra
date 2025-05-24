// import { Client, Events } from "discord.js";
// import { CLIENT } from "./events/ready";
// import { HEX, log, NameConsole } from "./utils/utils";
// import { config } from 'dotenv';
// import fs, { readFile } from 'fs'
// import YAML from 'yaml'
// config();

import { ready } from "./events/ready";


// const file = fs.readFileSync('./test.yml', 'utf8');
// const data = YAML.parse(file);
// const tokenYaml = data['token'];

// CLIENT.once(Events.ClientReady, readyClient => {
//     NameConsole
//     log(HEX.darkTurquoise(`🤖 Discord Bot Ready ✅`));
// });

// const token = process.env.BOT_TOKEN

// CLIENT.login(tokenYaml);

ready()