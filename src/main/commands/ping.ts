import { SlashCommandBuilder } from 'discord.js'
import type { Command } from '../types/command'


const ping: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde con Pong!'),

  async execute(interaction) {
    await interaction.reply('🏓 Pong!')
  },
}

export default ping
