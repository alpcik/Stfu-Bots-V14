const client = global.bot;
const conf = require("../../../src/configs/sunucuayar.json");
const stfucum = require("../../../../../stfu_config.json");
const penals = require("../../../src/schemas/penals");
const bannedTag = require("../../../src/schemas/bannedTag");
const regstats = require("../../../src/schemas/registerStats");
const meetings = require("../../../src/schemas/meeting");
const { EmbedBuilder, ActivityType } = require("discord.js")
module.exports = async () => {

  client.guilds.cache.forEach(guild => {
    guild.invites.fetch()
    .then(invites => {
      const codeUses = new Map();
      invites.each(inv => codeUses.set(inv.code, inv.uses));
      client.invites.set(guild.id, codeUses);
  })
})

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
 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const newData = new bannedTag({ guildID: stfucum.GuildID })
  newData.save().catch(e => console.log(e))

  const newData2 = new regstats({ guildID: stfucum.GuildID })
  newData2.save().catch(e => console.log(e))

  let MeetingData = await meetings.findOne({ guildID: stfucum.GuildID })
  if(!MeetingData) {await meetings.updateOne({guildID: stfucum.GuildID}, {$set: {Toplantı: false}}, {upsert: true})}

setInterval(() => { TagAlıncaKontrol(); }, 20 * 1000);
setInterval(() => { TagBırakanKontrol(); }, 25 * 1000);
setInterval(() => { RolsuzeKayitsizVerme(); }, 10 * 1000);

async function TagAlıncaİsimKontrol() { // Tag alınca tarama
  const guild = client.guilds.cache.get(stfucum.GuildID)
  const members = [...guild.members.cache.filter(member => member.user.tag.includes(conf.tag) && member.displayName.includes(conf.ikinciTag)).values()].splice(0, 10)
  for await (const member of members) {
  await members.setNickname(member.displayName.replace(conf.ikinciTag, conf.tag))
}
};

async function RolsuzeKayitsizVerme()  { // Rolü olmayanı kayıtsıza atma
const guild = client.guilds.cache.get(stfucum.GuildID);
let stfu = guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== guild.id).size == 0)
   stfu.forEach(r => {
   if (conf.unregRoles) r.roles.add(conf.unregRoles)
   })
};

async function TagAlıncaKontrol() { // Tag alınca tarama
const guild = client.guilds.cache.get(stfucum.GuildID)
const members = [...guild.members.cache.filter(member => member.user.tag.includes(conf.tag) && !member.roles.cache.has(conf.jailRole) && !member.roles.cache.has(conf.ekipRolu)).values()].splice(0, 10)
for await (const member of members) {
if (conf.ekipRolu) await member.roles.add(conf.ekipRolu);
}
};

async function TagBırakanKontrol() { // Tagı olmayanın family rol çekme
const tagModedata = await regstats.findOne({ guildID: stfucum.GuildID })
const guild = client.guilds.cache.get(stfucum.GuildID)
const memberss = [...guild.members.cache.filter(member => !member.user.tag.includes(conf.tag) && member.roles.cache.has(conf.ekipRolu)).values()].splice(0, 10)
for await (const member of memberss) {
if (conf.unregRoles) {
if (tagModedata && tagModedata.tagMode === true) {
if(!member.roles.cache.has(conf.vipRole) && !member.roles.cache.has(conf.boosterRolu)) {
await member.roles.set(conf.unregRoles)
return}
}
} 
if (conf.ekipRolu) {
await member.roles.remove(conf.ekipRolu);
}
}
};
};

module.exports.conf = {
  name: "ready",
};