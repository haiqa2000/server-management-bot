import config from "../config.json" assert { type: "json" };
import { basicEmbed } from "../utils/embedBuilder.js";

export default {
  name: "role",
  description: "Custom booster roles (create/share/unshare).",
  async execute(message, args) {
    const boosterRoleId = process.env.BOOSTER_ROLE_ID || config.boosterRoleId;
    const boosterRole = message.guild.roles.cache.get(boosterRoleId);
    if (!boosterRole) return message.reply("Booster role not configured.");

    const isBooster = message.member.roles.cache.has(boosterRoleId);
    if (!isBooster) {
      return message.reply("Only boosters can use this command.");
    }

    const sub = (args[0] || "").toLowerCase();

    // !role create <name> [#hexcolor]
    if (sub === "create") {
      const name = args[1];
      const color = args[2] || "#ffffff";
      if (!name) return message.reply("Provide a role name: `!role create MyRole #ff0000`.");

      const role = await message.guild.roles.create({
        name,
        color,
        reason: `Custom booster role for ${message.author.tag}`
      });

      await message.member.roles.add(role);
      const embed = basicEmbed({
        title: "Custom Role Created",
        description: `Role ${role} created and assigned to you.`
      });
      return message.channel.send({ embeds: [embed] });
    }

    // !role share @user
    if (sub === "share") {
      const target = message.mentions.members.first();
      if (!target) return message.reply("Mention a user to share your role with.");
      const highest = message.member.roles.highest;
      if (!highest || !highest.editable) {
        return message.reply("Unable to detect a shareable custom role.");
      }
      await target.roles.add(highest);
      return message.channel.send(`Shared role ${highest} with ${target}.`);
    }

    // !role unshare @user
    if (sub === "unshare") {
      const target = message.mentions.members.first();
      if (!target) return message.reply("Mention a user to unshare your role from.");
      const highest = message.member.roles.highest;
      if (!highest) return message.reply("No custom role found.");
      await target.roles.remove(highest).catch(() => {});
      return message.channel.send(`Removed role ${highest} from ${target}.`);
    }

    return message.reply(
      "Usage: `!role create <name> [#hex]`, `!role share @user`, `!role unshare @user`."
    );
  }
};
