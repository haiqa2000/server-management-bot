import config from "../config.json" assert { type: "json" };
import { readJson, writeJson } from "../utils/database.js";

export default {
  name: "ticket",
  description: "Ticket system commands.",
  async execute(message, args) {
    const sub = (args[0] || "").toLowerCase();
    const guild = message.guild;
    const member = message.member;
    const categoryId = process.env.TICKET_CATEGORY_ID || config.ticketCategoryId;
    const logChannelId = process.env.LOG_CHANNEL_ID || config.logChannelId;
    const logChannel = guild.channels.cache.get(logChannelId);

    const tickets = readJson("tickets.json", {});

    if (sub === "open") {
      const reason = args.slice(1).join(" ") || "No reason provided";
      const channel = await guild.channels.create({
        name: `ticket-${message.author.username}`,
        type: 0,
        parent: categoryId,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: ["ViewChannel"]
          },
          {
            id: message.author.id,
            allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"]
          },
          {
            id: guild.roles.everyone.id,
            deny: ["ViewChannel"]
          }
        ]
      });

      tickets[channel.id] = {
        ownerId: message.author.id,
        claimedBy: null,
        open: true
      };
      writeJson("tickets.json", tickets);

      await channel.send(
        `Ticket created for <@${message.author.id}>.\nReason: **${reason}**\nStaff can use \`!ticket claim\`, \`!ticket add @user\`, \`!ticket close\`.`
      );
      await message.reply(`Your ticket has been created: ${channel}`);

      if (logChannel) {
        logChannel.send(
          `Ticket opened by <@${message.author.id}>: ${channel} | Reason: ${reason}`
        );
      }
      return;
    }

    if (!tickets[message.channel.id]) {
      return message.reply("This is not a ticket channel.");
    }

    const ticket = tickets[message.channel.id];

    if (sub === "claim") {
      if (!member.permissions.has("ManageMessages")) {
        return message.reply("You need Manage Messages to claim a ticket.");
      }
      ticket.claimedBy = member.id;
      writeJson("tickets.json", tickets);
      await message.channel.send(`Ticket claimed by <@${member.id}>.`);
      if (logChannel)
        logChannel.send(`Ticket ${message.channel} claimed by <@${member.id}>.`);
      return;
    }

    if (sub === "add") {
      const user = message.mentions.members.first();
      if (!user) return message.reply("Mention a user to add.");
      await message.channel.permissionOverwrites.edit(user.id, {
        ViewChannel: true,
        SendMessages: true,
        ReadMessageHistory: true
      });
      await message.channel.send(`<@${user.id}> added to this ticket.`);
      return;
    }

    if (sub === "close") {
      if (
        message.author.id !== ticket.ownerId &&
        !member.permissions.has("ManageMessages")
      ) {
        return message.reply("Only ticket owner or staff can close this ticket.");
      }
      ticket.open = false;
      writeJson("tickets.json", tickets);
      await message.channel.send("Ticket will be closed in 5 seconds.");
      setTimeout(() => message.channel.delete().catch(() => {}), 5000);

      if (logChannel)
        logChannel.send(`Ticket ${message.channel.name} closed by <@${message.author.id}>.`);
      return;
    }

    return message.reply(
      "Ticket commands: `!ticket open [reason]`, `!ticket claim`, `!ticket add @user`, `!ticket close`."
    );
  }
};
