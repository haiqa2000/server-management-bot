import { SlashCommandBuilder } from "discord.js";
import { basicEmbed } from "../utils/embedBuilder.js";

export default {
  name: "help",
  description: "Show all bot commands.",
  data: new SlashCommandBuilder().setName("help").setDescription("Show all bot commands."),
  async execute(message, args, client) {
    const prefix = client.prefix;
    const commands = [...new Set(client.commands.values())];
    const list = commands
      .filter(c => !c.hidden)
      .map(c => `\`${prefix}${c.name}\` - ${c.description}`)
      .join("\n");

    const embed = basicEmbed({
      title: "Help",
      description: list || "No commands registered.",
      footer: `Use ${prefix} before each command.`
    });

    await message.channel.send({ embeds: [embed] });
  },

  async slashExecute(interaction, client) {
    const prefix = client.prefix;
    const commands = [...new Set(client.commands.values())];
    const list = commands
      .filter(c => !c.hidden)
      .map(c => `\`${prefix}${c.name}\` - ${c.description}`)
      .join("\n");

    const embed = basicEmbed({
      title: "Help",
      description: list || "No commands registered.",
      footer: `Use ${prefix} before each command.`
    });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
