const { EmbedBuilder, ActivityType } = require("discord.js")
const stfucum = require("../../../../../../stfu_config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
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
      url: "https://www.twitch.tv/baranayztas"}), 10000);

      client.rolbackup();
      client.kanalbackup();
      setInterval(async () => {
          await client.rolbackup();
          await client.kanalbackup();
      }, 1000 * 60 * 60 * 3)

};

module.exports.conf = {
  name: "ready",
};
