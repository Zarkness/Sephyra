import { discordSort, REST, Routes } from 'discord.js'
import { loadCommands } from '../handler/commandHandler'
import { discordClient, discordGuild, discordToken } from '../utils/utils'

async function deploy() {
  const commands = await loadCommands
  const body = Array.from(commands.values()).map(cmd => cmd.data.toJSON())

  const rest = new REST({ version: '10' }).setToken(discordToken!)

  console.log('🔄 Registrando comandos...')

  await rest.put(
    Routes.applicationGuildCommands(discordClient!, discordGuild!), // o applicationCommands() si es global
    { body }
  )

  console.log('✅ Comandos registrados con éxito')
}

deploy().catch(console.error)
