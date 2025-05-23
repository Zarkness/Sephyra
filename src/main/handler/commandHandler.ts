import path from 'path'
import fs from 'fs'
import type { Command } from '../types/command'

export async function loadCommands(): Promise<Map<string, Command>> {
  const commands = new Map<string, Command>()
  const commandsPath = path.join(__dirname, '..', 'commands')
  const files = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'))

  for (const file of files) {
    const filePath = path.join(commandsPath, file)
    const commandModule = await import(filePath)
    const command: Command = commandModule.default
    commands.set(command.data.name, command)
  }

  return commands
}
