const conf = require("../../../src/configs/sunucuayar.json")
const { green } = require("../../../src/configs/emojis.json");

module.exports = async (message) => {
  if (message.content.toLowerCase() === "tag" || message.content.toLowerCase() === "!tag" || message.content.toLowerCase() === ".tag") {
    message.react("✅");
    message.reply({ content: `${conf.tag}`});
  }
};
module.exports.conf = {
  name: "messageCreate"
};