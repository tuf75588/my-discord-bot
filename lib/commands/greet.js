async function greet(message) {
  if (message.content === "!hello") {
    message.channel.send("Hello!");
  }
}

module.exports = greet;
