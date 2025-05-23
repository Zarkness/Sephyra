import { Client, Events, GatewayIntentBits } from "discord.js";
import { configFile, createLogger, discordToken, HEX, NAME, prefix } from "../utils/utils";
import { loadCommands } from '../handler/commandHandler'
import type { Command } from "../types/command";



export function ready() {
    const CLIENT = new Client({ intents: [GatewayIntentBits.Guilds] });
    const asciiName = NAME
    let commands: Map<string, Command>

    CLIENT.once(Events.ClientReady, readyClient => {
        createLogger(prefix.empty, HEX.gradient(asciiName));

        loadCommands()
    });
    
    CLIENT.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return
      
        const command: Command | undefined = commands.get(interaction.commandName)
        if (!command) return
      
        try {
          await command.execute(interaction)
        } catch (err) {
          console.error(err)
          await interaction.reply({
            content: '❌ Ha habido un error al ejecutar el comando.',
            ephemeral: true,
          })
        }
      })

    CLIENT.login(discordToken);
}
