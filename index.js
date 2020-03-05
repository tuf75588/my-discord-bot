const Discord = require("discord.js");
const greet = require("./lib/commands/greet");
const client = new Discord.Client();
require("dotenv").config();
client.on("ready", () => {
  // all users in the discord server my bot resides in
  const channel = client.guilds.cache
    .array()
    .map(collection => collection.members.cache);
  const userNames = Array.from(channel, id => {
    const entries = [...id].map(user => {
      const usernames = user.map(id => {
        return id.user;
      });

      return usernames[1];
    });
    return entries.filter(user => !user.bot);
  });
});

client.on("message", greet);

client.login(process.env.DISCORD_TOKEN);