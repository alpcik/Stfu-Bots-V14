const client = global.bot;
const conf = require("../../../src/configs/sunucuayar.json");
const stfucum = require("../../../../../stfu_config.json");
const penals = require("../../../src/schemas/penals");
const bannedTag = require("../../../src/schemas/bannedTag");
const regstats = require("../../../src/schemas/registerStats");
const { EmbedBuilder, ActivityType } = require("discord.js")
module.exports = async () => {

let guild = client.guilds.cache.get(stfucum.GuildID);
await guild.members.fetch();

const { joinVoiceChannel, getVoiceConnection} = require("@discordjs/voice");

const connection = getVoiceConnection(stfucum.GuildID);
if (connection) return;
setInterval(async () => {
const VoiceChannel = client.channels.cache.get(stfucum.VoiceChannel);
if (VoiceChannel) { joinVoiceChannel({
  channelId: VoiceChannel.id,
  guildId: VoiceChannel.guild.id,
  adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
  selfDeaf: true
})}},
5000);

    let activities = stfucum.BotStatus, i = 0;
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`,
      type: ActivityType.Streaming,
      url: "https://www.twitch.tv/stfuux"}), 10000);
 
};

module.exports.conf = {
  name: "ready",
};
