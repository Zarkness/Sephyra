// // src/events/interactionCreate.ts
// import { Events } from 'discord.js';
// import * as commands from '../events/deployCommands';

// export const name = Events.InteractionCreate;
// export const once = false;

// export async function execute(interaction: any) {
//   if (!interaction.isChatInputCommand()) return;

//   const command = (commands as any)[interaction.commandName];
//   if (!command) {
//     await interaction.reply({ content: '❌ Unknown command.', ephemeral: true });
//     return;
//   }

//   try {
//     await command.execute(interaction);
//   } catch (error) {
//     console.error(error);
//     await interaction.reply({ content: '⚠️ There was an error executing this command.', ephemeral: true });
//   }
// }


// import {
//   REST,
//   Routes,
//   type ApplicationCommandData,
//   type RESTPostAPIChatInputApplicationCommandsJSONBody,
// } from 'discord.js';
// import { readdirSync } from 'fs';
// import path from 'path';
// import { discordClientID, discordGuildID, discordToken } from 'main/utils/utils';

// export const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

// const commandFiles = readdirSync(path.join(__dirname, '../commands')).filter(file =>
//   file.endsWith('.ts') || file.endsWith('.js')
// );

// for (const file of commandFiles) {
//   const command = require(`../commands/${file}`);
//   if ('data' in command && 'execute' in command) {
//     commands.push(command.data.toJSON());
//   }
// }

// const rest = new REST({ version: '10' }).setToken(discordToken!);

// export async function registerAndCleanCommands(
//   commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]
// ) {
//   try {
//     console.log('🔁 Obteniendo comandos registrados...');

//     const existingCommands = await rest.get(
//       Routes.applicationGuildCommands(discordClientID, discordGuildID)
//     ) as any[];

//     const currentNames = commands.map(cmd => cmd.name);
//     const commandsToDelete = existingCommands.filter(cmd => !currentNames.includes(cmd.name));

//     for (const cmd of commandsToDelete) {
//       console.log(`❌ Eliminando comando obsoleto: ${cmd.name}`);
//       await rest.delete(Routes.applicationGuildCommand(discordClientID, discordGuildID, cmd.id));
//     }

//     console.log('✅ Registrando comandos actualizados...');
//     await rest.put(
//       Routes.applicationGuildCommands(discordClientID, discordGuildID),
//       { body: commands }
//     );

//     console.log('✅ Registro completo.');
//   } catch (error) {
//     console.error('❌ Error al registrar comandos:', error);
//   }
// }


import {
  REST,
  Routes,
  type RESTPostAPIChatInputApplicationCommandsJSONBody
} from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import { discordClientID, discordGuildID, discordToken } from 'main/utils/utils';

const rest = new REST({ version: '10' }).setToken(discordToken!);

export async function registerAndCleanCommands() {
  try {
    console.log("📦 Cargando comandos...");
    
    const commandFiles = readdirSync(path.join(__dirname, '../commands')).filter(file =>
      file.endsWith('.ts') || file.endsWith('.js')
    );

    const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
      }
    }

    console.log("🔁 Obteniendo comandos registrados...");

    const existingCommands = await rest.get(
      Routes.applicationGuildCommands(discordClientID, discordGuildID)
    ) as any[];

    const currentNames = commands.map(cmd => cmd.name);
    const commandsToDelete = existingCommands.filter(cmd => !currentNames.includes(cmd.name));

    for (const cmd of commandsToDelete) {
      console.log(`❌ Eliminando comando obsoleto: ${cmd.name}`);
      await rest.delete(Routes.applicationGuildCommand(discordClientID, discordGuildID, cmd.id));
    }

    console.log("✅ Registrando comandos actualizados...");
    await rest.put(
      Routes.applicationGuildCommands(discordClientID, discordGuildID),
      { body: commands }
    );

    console.log("✅ Registro completo.");
  } catch (error) {
    console.error("❌ Error al registrar comandos:", error);
  }
}
