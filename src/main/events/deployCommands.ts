// import { discordSort, REST, Routes } from 'discord.js'
// import { loadCommands } from '../handler/commandHandler'
// import { discordClient, discordGuild, discordToken } from '../utils/utils'

// async function deploy() {
//   const commands = await loadCommands
//   const body = Array.from(commands.values()).map(cmd => cmd.data.toJSON())

//   const rest = new REST({ version: '10' }).setToken(discordToken!)

//   console.log('🔄 Registrando comandos...')

//   await rest.put(
//     Routes.applicationGuildCommands(discordClient!, discordGuild!), // o applicationCommands() si es global
//     { body }
//   )

//   console.log('✅ Comandos registrados con éxito')
// }

// deploy().catch(console.error)


// src/utils/registerCommands.ts
// import { REST, Routes } from 'discord.js';
// import { readdirSync } from 'fs';
// import path from 'path';
// import { discordToken } from 'main/utils/utils';

// const commands: any[] = [];
// const commandsPath = path.join(__dirname, '../commands');
// const files = readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

// for (const file of files) {
//   const command = require(path.join(commandsPath, file));
//   if ('data' in command && 'execute' in command) {
//     commands.push(command.data.toJSON());
//   }
// }

// const rest = new REST({ version: '10' }).setToken(discordToken!);

// export async function registerGlobalCommands(clientId: string) {
//   try {
//     console.log('⏳ Registering application (slash) commands...');
//     await rest.put(Routes.applicationCommands(clientId), { body: commands });
//     console.log('✅ Successfully registered commands globally.');
//   } catch (error) {
//     console.error('❌ Error registering commands:', error);
//   }
// }


import { Events, type Interaction } from 'discord.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargamos dinámicamente todos los comandos de src/commands
const commands = new Map<string, any>();
const commandFiles = readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

for (const file of commandFiles) {
  const command = await import(`../commands/${file}`);
  if (command.data?.name && typeof command.execute === 'function') {
    commands.set(command.data.name, command);
  }
}

export const name = Events.InteractionCreate;
export const once = false;

export async function execute(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) {
    await interaction.reply({ content: '⚠️ Este comando ya no está disponible.', ephemeral: true });
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`❌ Error ejecutando /${interaction.commandName}`, error);
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply({ content: '❌ Ha ocurrido un error.' });
    } else {
      await interaction.reply({ content: '❌ Ha ocurrido un error.', ephemeral: true });
    }
  }
}

