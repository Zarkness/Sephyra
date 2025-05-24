// import { Client, Events, GatewayIntentBits } from "discord.js";
// import { configFile, createLogger, discordClient, discordToken, HEX, NAME, prefix } from "../utils/utils";
// import type { Command } from "../types/command";
// //import { registerGlobalCommands } from "./deployCommands";
// import { registerAndCleanCommands } from "main/handler/commandHandler";



// export function ready() {
//     const CLIENT = new Client({ intents: [GatewayIntentBits.Guilds] });
//     const asciiName = NAME

//     CLIENT.once(Events.ClientReady, () => {
//         createLogger(prefix.empty, HEX.gradient(asciiName));

//         registerAndCleanCommands();
//     });

//     CLIENT.login(discordToken);
// }


import { Events } from "discord.js";
import { client } from "../core/client"; // usa la instancia compartida
import { createLogger, discordToken, HEX, NAME, prefix } from "../utils/utils";
import { registerAndCleanCommands } from "main/handler/commandHandler";
import { registerEvents } from "./eventHandler";
import { execute } from "./deployCommands";

export async function ready() {
  const asciiName = NAME;

  await registerEvents();

  client.once(Events.ClientReady, () => {
    createLogger(prefix.empty, HEX.gradient(asciiName));
    registerAndCleanCommands();
  });

  client.login(discordToken);
}
