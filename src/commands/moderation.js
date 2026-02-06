import config from "../config.json" assert { type: "json" };

export default {
  name: "mod",
  description: "Moderation commands (kick/ban/nick).",
  async execute(message, args) {
    const sub = (args[0] || "").toLowerCase();
    const staffRoleId = process.env.STAFF_ROLE_ID || config.staffRoleId;
    const adminRoleId = process.env.ADMIN_ROLE_ID || config.adminRoleId;

    const isStaff = message.member.roles.cache.has(staffRoleId);
    const isAdmin = message.member.roles.cache.has(adminRoleId) || message.member.permissions.has("Administrator");

    if (!isStaff && !isAdmin) {
      return message.reply("You must be staff to use moderation commands.");
    }

    if (sub === "kick") {
      const target = message.mentions.members.first();
      if (!target) return message.reply("Mention a user to kick.");
      const reason = args.slice(2).join(" ") || "No reason provided";
      await target.kick(reason).catch(() => message.reply("Failed to kick user."));
      return message.channel.send(`Kicked ${target.user.tag}. Reason: ${reason}`);
    }

    if (sub === "ban") {
      const target = message.mentions.members.first();
      if (!target) return message.reply("Mention a user to ban.");
      const reason = args.slice(2).join(" ") || "No reason provided";
      await target.ban({ reason }).catch(() => message.reply("Failed to ban user."));
      return message.channel.send(`Banned ${target.user.tag}. Reason: ${reason}`);
    }

    if (sub === "nick") {
      // staff: only their own nickname; admins: anyone
      const target = message.mentions.members.first() || message.member;
      const newNick = args.slice(1).join(" ");
      if (!newNick) return message.reply("Provide a nickname.");
      if (target.id !== message.author.id && !isAdmin) {
        return message.reply("Staff can only change their own nicknames. Admins can change anyone's.");
      }
      await target.setNickname(newNick).catch(() => message.reply("Failed to change nickname."));
      return message.channel.send(`Changed nickname of ${target} to **${newNick}**.`);
    }

    return message.reply(
      "Usage: `!mod kick @user [reason]`, `!mod ban @user [reason]`, `!mod nick [@user] <new nick>`."
    );
  }
};
