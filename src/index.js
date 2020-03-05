const discord = require("discord.js");

const client = new discord.Client();
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

client.on("message", async message => {
  if (message.author.bot) return;
  let embed = new discord.MessageEmbed();
  embed.setTitle("Create a support ticket");
  embed.setDescription(
    "React to this message to open a support ticket with server Admins"
  );
  embed.setColor("RANDOM");
  embed.setTimestamp();
  embed.setFooter("Ticket bot system v-1.0.0");
  try {
    const embedMessage = await message.channel.send(embed);
    const reaction = await embedMessage.react("😄");
  } catch (error) {
    throw new Error(error.message);
  }
});

client.login(process.env.DISCORD_TOKEN);
