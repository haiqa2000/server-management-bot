import config from "../config.json" assert { type: "json" };
import { readJson, writeJson } from "../utils/database.js";

export default {
  name: "messageCreate",
  once: false,
  async execute(message, client) {
    if (!message.guild || message.author.bot) return;

    const prefix = client.prefix;
    const countingChannelId = process.env.COUNTING_CHANNEL_ID || config.countingChannelId;

    // rank system: +1 xp per message, simple
    const ranks = readJson("ranks.json", {});
    const userId = message.author.id;
    const guildId = message.guild.id;
    if (!ranks[guildId]) ranks[guildId] = {};
    if (!ranks[guildId][userId]) ranks[guildId][userId] = { xp: 0, level: 1 };
    ranks[guildId][userId].xp += 1;
    writeJson("ranks.json", ranks);

    // counting system
    if (message.channel.id === countingChannelId) {
      const counting = readJson("counting.json", {
        current: 0,
        lastUserId: null,
        mistakes: {}
      });

      const state = counting;
      const contentNum = Number(message.content.trim());
      if (!Number.isInteger(contentNum)) {
        await message.react("❌");
        return;
      }

      const mistakes = state.mistakes;
      if (!mistakes[userId]) mistakes[userId] = 0;

      const expected = state.current + 1;
      if (contentNum === expected && message.author.id !== state.lastUserId) {
        state.current = contentNum;
        state.lastUserId = userId;
        await message.react("✅");
      } else {
        mistakes[userId] += 1;
        await message.react("❌");
        if (mistakes[userId] >= 3) {
          state.current = 0;
          state.lastUserId = null;
          mistakes[userId] = 0;
          await message.channel.send("Count has been reset due to 3 mistakes.");
        } else {
          await message.reply(`Wrong number! You have ${mistakes[userId]} mistake(s).`);
        }
      }

      state.mistakes = mistakes;
      writeJson("counting.json", state);
      return;
    }

    // prefix commands
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (err) {
      console.error(err);
      message.reply("There was an error executing that command.");
    }
  }
};
