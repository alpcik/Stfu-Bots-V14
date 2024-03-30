const { EmbedBuilder, ActivityType } = require("discord.js")
const stfucum = require("../../../../../../stfu_config.json");
const setup = require("../../../../../App/src/configs/sunucuayar.json");
const request = require('request');
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
      url: "https://www.twitch.tv/stfuux"}), 10000);

        setInterval(async () => {
        if(guild.vanityURLCode == setup.serverUrl) {
        return } else {
          request({method: "PATCH", url: `https://discord.com/api/v9/guilds/${stfucum.GuildID}/vanity-url`,
          headers: { 
              "Authorization": `${stfucum.Guard.Token.GuardFour}`,
              "User-Agent": `stfu Url Guard`,
              "Content-Type": `application/json`,
              "X-Audit-Log-Reason": `Hello i am under the watter`
          },
          body: { "code": setup.serverUrl },
          json: true
          });
        }}, 1000)
};

module.exports.conf = {
  name: "ready",
};
