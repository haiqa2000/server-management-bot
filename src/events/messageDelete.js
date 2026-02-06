import config from "../config.json" assert { type: "json" };

export default {
  name: "messageDelete",
  once: false,
  async execute(message, client) {
    if (!message.guild || !message.content) return;
    const logChannelId = process.env.LOG_CHANNEL_ID || config.logChannelId;
    const logChannel = message.guild.channels.cache.get(logChannelId);
    if (!logChannel) return;

    logChannel.send({
      embeds: [
        {
          title: "Message Deleted",
          description: `Author: <@${message.author.id}>\nChannel: <#${message.channel.id}>\nContent:\n\`\`\`\n${message.content}\n\`\`\``,
          color: 0xff0000,
          timestamp: new Date().toISOString()
        }
      ]
    });
  }
};
