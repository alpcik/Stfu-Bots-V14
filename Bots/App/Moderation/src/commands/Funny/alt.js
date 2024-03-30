const { red } = require("../../../../src/configs/emojis.json")
module.exports = {
  conf: {
    aliases: [],
    name: "sahip",
    help: "sahip",
  },

  run: async (client, message, args) => {
    message.channel.send({ content: `Bu Altyapi Stfu Tarafindan Yapılmıştır!`});
  },
};

  