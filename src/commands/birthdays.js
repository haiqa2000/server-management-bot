import { readJson, writeJson } from "../utils/database.js";
import { basicEmbed } from "../utils/embedBuilder.js";

export default {
  name: "birthday",
  description: "Set or view birthdays.",
  async execute(message, args) {
    const sub = (args[0] || "").toLowerCase();
    const birthdays = readJson("birthdays.json", {});

    if (sub === "set") {
      const dateStr = args[1]; // format: DD-MM or DD/MM
      if (!dateStr || !/^\d{1,2}[-/]\d{1,2}$/.test(dateStr)) {
        return message.reply("Provide a date like `!birthday set 25-12`.");
      }
      birthdays[message.author.id] = dateStr;
      writeJson("birthdays.json", birthdays);
      return message.reply(`Your birthday is set to **${dateStr}**.`);
    }

    if (sub === "get") {
      const user = message.mentions.users.first() || message.author;
      const date = birthdays[user.id];
      if (!date) return message.reply("No birthday set for that user.");
      return message.reply(`${user.username}'s birthday is **${date}**.`);
    }

    if (sub === "list") {
      const lines = Object.entries(birthdays).map(
        ([id, date]) => `<@${id}> - **${date}**`
      );
      const embed = basicEmbed({
        title: "Birthdays",
        description: lines.join("\n") || "No birthdays set."
      });
      return message.channel.send({ embeds: [embed] });
    }

    return message.reply(
      "Usage: `!birthday set DD-MM`, `!birthday get [@user]`, `!birthday list`."
    );
  }
};
