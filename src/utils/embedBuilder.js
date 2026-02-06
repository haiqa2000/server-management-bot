import { EmbedBuilder } from "discord.js";

export function basicEmbed({ title, description, color = 0x111827, footer }) {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color);

  if (footer) embed.setFooter({ text: footer });
  return embed;
}
