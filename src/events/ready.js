import { logInfo } from "../utils/logger.js";

export default {
  name: "ready",
  once: true,
  execute(client) {
    logInfo(`Logged in as ${client.user.tag}`);
    client.user.setActivity("your server | !help", { type: 0 });
  }
};
