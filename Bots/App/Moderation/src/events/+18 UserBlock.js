const { EmbedBuilder } = require("discord.js");
const stfucum = require("../../../../../stfu_config.json");
const { green, red } = require("../../../src/configs/emojis.json")
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
const client = global.bot;

module.exports = async (oldState, newState) => {
if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
const member = client.guilds.cache.get(stfucum.GuildID).members.cache.get(oldState.id);
const xd = await client.guilds.cache.get(stfucum.GuildID).channels.cache.find(x => x.name.includes("+18"))?.id

const channel = client.channels.cache.find(x => x.name == "voice_log");
if (!channel) return;
if (member.displayName.split("|")[1] < 18 && (member.voice.channelId === xd)) {
channel.wsend({ embeds: [new EmbedBuilder().setAuthor({ name: client.guilds.cache.get(stfucum.GuildID).name, iconURL: client.guilds.cache.get(stfucum.GuildID).iconURL({dynamic:true})}).setThumbnail(newState.member.displayAvatarURL({ dynamic: true, size: 2048 })) 
.setDescription(`
:x: ${newState.member} isimli kullanıcı yaşı yetmediği halde **+18 yaş** üstü kanallara girdiği için sesten otomatik atıldı.

\` ➥ \` Ses Kanalı: <#${newState.channel.id}>
\` ➥ \` Girdiği Zaman: <t:${Math.floor(Date.now() / 1000)}:R>
`)]})
member.send(`Sevgili ${newState.member} yaşınız yetmediği için **+18 yaş** üstü kanallara girişiniz engellenmiştir.`).catch(() => {})
.then(async () => {
member.voice.disconnect();
})
}
};

module.exports.conf = {
  name: "voiceStateUpdate",
};