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

client.on("raw", async payload => {
  // payload will contain the type of event emitted and the user who triggered it

  const { t } = payload;
  if (t === "MESSAGE_REACTION_ADD") {
    const msgId = payload.d.message_id;
    // hard coded temporarily for testing purposes
    if (msgId === "685565044125335715") {
      const channelId = payload.d.channel_id;
      let channel = client.channels.cache.get(channelId);
      if (channel) {
        if (client.channels.cache.has(msgId)) {
          return;
        } else {
          let message = await channel.messages.fetch(msgId);
          let reactions = message.reactions.cache.get("📷");
          let user = client.users.cache.get(payload.d.user_id);
          // emit a new message
          client.emit("messageReactionAdd", reactions, user);
        }
      }
    }
  }
});

client.on("messageReactionAdd", (reaction, { username }) => {
  console.log(`${username} reacted with ${reaction._emoji.name}`);
});

client.login(process.env.DISCORD_TOKEN);

// 685284188546662513
