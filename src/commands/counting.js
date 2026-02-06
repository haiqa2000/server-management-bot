import { readJson, writeJson } from "../utils/database.js";
import { basicEmbed } from "../utils/embedBuilder.js";

export default {
  name: "counting",
  description: "Show or reset counting game.",
  async execute(message, args) {
    const sub = args[0];
    const data = readJson("counting.json", {
      current: 0,
      lastUserId: null,
      mistakes: {}
    });

    if (!sub || sub === "status") {
      const embed = basicEmbed({
        title: "Counting Status",
        description: `Current number: **${data.current}**`
      });
      return message.channel.send({ embeds: [embed] });
    }

    if (sub === "reset") {
      if (!message.member.permissions.has("ManageChannels")) {
        return message.reply("You need Manage Channels permission to reset counting.");
      }
      data.current = 0;
      data.lastUserId = null;
      data.mistakes = {};
      writeJson("counting.json", data);
      return message.channel.send("Counting has been reset.");
    }

    return message.reply("Usage: `!counting` or `!counting reset`.");
  }
};
