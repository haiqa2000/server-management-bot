export default {
  name: "interactionCreate",
  once: false,
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === "help") {
      const cmd = client.commands.get("help");
      if (!cmd) return interaction.reply({ content: "Help command missing.", ephemeral: true });
      return cmd.slashExecute(interaction, client);
    }
  }
};
