import { readJson } from "../utils/database.js";
import { basicEmbed } from "../utils/embedBuilder.js";

export default {
  name: "rank",
  description: "Show your rank or the leaderboard.",
  aliases: ["level", "lb"],
  async execute(message, args) {
    const sub = (args[0] || "").toLowerCase();
    const ranks = readJson("ranks.json", {});
    const guildId = message.guild.id;
    if (!ranks[guildId]) ranks[guildId] = {};

    if (sub === "top" || sub === "leaderboard" || message.content.includes("lb")) {
      const arr = Object.entries(ranks[guildId]);
      arr.sort((a, b) => (b[1].xp || 0) - (a[1].xp || 0));
      const top = arr.slice(0, 10);

      const lines = await Promise.all(
        top.map(async ([userId, data], i) => {
          const user = await message.guild.members.fetch(userId).catch(() => null);
          const name = user ? user.user.username : "Unknown";
          return `**${i + 1}.** ${name} - XP: ${data.xp}`;
        })
      );

      const embed = basicEmbed({
        title: "Leaderboard",
        description: lines.join("\n") || "No data yet."
      });
      return message.channel.send({ embeds: [embed] });
    }

    const target =
      message.mentions.members.first() ||
      message.member;
    const userId = target.id;

    if (!ranks[guildId][userId]) ranks[guildId][userId] = { xp: 0, level: 1 };

    const data = ranks[guildId][userId];
    const embed = basicEmbed({
      title: `${target.user.username}'s Rank`,
      description: `XP: **${data.xp}**\nLevel: **${data.level}**`
    });
    return message.channel.send({ embeds: [embed] });
  }
};
