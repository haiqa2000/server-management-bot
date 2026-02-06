import { basicEmbed } from "../utils/embedBuilder.js";

export default {
  name: "util",
  description: "Utility commands (ping, info).",
  async execute(message, args, client) {
    const sub = (args[0] || "").toLowerCase();

    if (sub === "ping") {
      const sent = await message.channel.send("Pinging...");
      const diff = sent.createdTimestamp - message.createdTimestamp;
      return sent.edit(`Pong! Latency: ${diff}ms.`);
    }

    if (sub === "info") {
      const embed = basicEmbed({
        title: "Bot Info",
        description: `Servers: **${client.guilds.cache.size}**\nUsers: **${client.users.cache.size}**`
      });
      return message.channel.send({ embeds: [embed] });
    }

    return message.reply("Usage: `!util ping`, `!util info`.");
  }
};
