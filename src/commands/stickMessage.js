export default {
  name: "stick",
  description: "Create or remove a sticky message in a channel (admin only).",
  async execute(message, args, client) {
    if (!message.member.permissions.has("ManageMessages")) {
      return message.reply("You need Manage Messages to use this.");
    }

    const sub = (args[0] || "").toLowerCase();
    const key = `stick_${message.channel.id}`;

    if (sub === "set") {
      const text = args.slice(1).join(" ");
      if (!text) return message.reply("Provide text for the sticky message.");
      client[key] = text;
      await message.reply("Sticky message set for this channel.");
      await message.channel.send(text);
      return;
    }

    if (sub === "clear") {
      delete client[key];
      return message.reply("Sticky message cleared for this channel.");
    }

    return message.reply("Usage: `!stick set <text>`, `!stick clear`.");
  }
};
