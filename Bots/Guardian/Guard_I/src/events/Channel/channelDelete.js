const { EmbedBuilder, AuditLogEvent, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const stfucum = require("../../../../../../stfu_config.json");
const conf = require("../../../../../App/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;

module.exports = async (channel) => {
let entry = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete }).then(audit => audit.entries.first());
let member = channel.guild.members.cache.get(entry.executor.id); 
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "channel") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) {
if ((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement) || (channel.type === ChannelType.GuildVoice)) {

const stfu = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} üyesi kanal sildi, güvenli listede olduğu için işlem yapmadım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Silinen Kanal: ${channel.name} - \`${channel.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return channel.guild.channels.cache.find(x => x.name == "guard_log").send({ embeds: [stfu] });
} else if (channel.type === ChannelType.GuildCategory) {

const stfu = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} üyesi kategori sildi, güvenli listede olduğu için işlem yapmadım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Silinen Kategori: ${channel.name} - \`${channel.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return channel.guild.channels.cache.find(x => x.name == "guard_log").send({ embeds: [stfu] });

}
}

if ((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement)) {

  let member = channel.guild.members.cache.get(entry.executor.id); 

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId("cezaac")
    .setDisabled(member.bannable ? false : true)
    .setLabel("Ceza Kaldır").setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
    .setCustomId("yetkileriac")
    .setLabel("Yetki Aç").setStyle(ButtonStyle.Danger)
  )
  
const stfu = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} üyesi kanal sildi, sunucudan yasaklayıp, silinen kanalı izinleriyle birlikte yeniden oluşturdum.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Silinen Kanal: ${channel.name} - \`${channel.id}\`
Kanal Türü: \` Yazı Kanalı \`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

let stfuGuardLog = await channel.guild.channels.cache.find(x => x.name == "guard_log").send({ embeds: [stfu], components: [row] });

var filter = (button) => conf.sahipRolu.some(x => x == button.member.roles.cache.has(x)) || stfucum.StfuID.includes(button.user.id);
const collector = await stfuGuardLog.createMessageComponentCollector({ filter });

collector.on('collect', async (button) => {
  if (button.customId == "cezaac") {
      button.guild.members.unban(entry.executor.id, `Buton Üzerinden Guard Banı Kaldırıldı!`)
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde ${entry.executor} (\`${entry.executor.id}\`) kişisinin banını kaldırdın!`, ephemeral: true })
  }
  if (button.customId == "yetkileriac") {
      client.allPermissionOpen();
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde sunucudaki rollerin yetkilerini açtın!`, ephemeral: true })
  }
})
} else if (channel.type === ChannelType.GuildVoice) {

  let member = channel.guild.members.cache.get(entry.executor.id); 

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId("cezaac")
    .setDisabled(member.bannable ? false : true)
    .setLabel("Ceza Kaldır").setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
    .setCustomId("yetkileriac")
    .setLabel("Yetki Aç").setStyle(ButtonStyle.Danger)
  )

const stfu = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} üyesi kanal sildi, sunucudan yasaklayıp, silinen kanalı izinleriyle birlikte yeniden oluşturdum.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Silinen Kanal: ${channel.name} - \`${channel.id}\`
Kanal Türü: \` Ses Kanalı \`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

let stfuGuardLog = await channel.guild.channels.cache.find(x => x.name == "guard_log").send({ embeds: [stfu], components: [row] });

var filter = (button) => conf.sahipRolu.some(x => x == button.member.roles.cache.has(x)) || stfucum.StfuID.includes(button.user.id);
const collector = await stfuGuardLog.createMessageComponentCollector({ filter });

collector.on('collect', async (button) => {
  if (button.customId == "cezaac") {
      button.guild.members.unban(entry.executor.id, `Buton Üzerinden Guard Banı Kaldırıldı!`)
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde ${entry.executor} (\`${entry.executor.id}\`) kişisinin banını kaldırdın!`, ephemeral: true })
  }
  if (button.customId == "yetkileriac") {
      client.allPermissionOpen();
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde sunucudaki rollerin yetkilerini açtın!`, ephemeral: true })
  }
})
} else if (channel.type === ChannelType.GuildCategory) {

  let member = channel.guild.members.cache.get(entry.executor.id); 
  
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId("cezaac")
    .setDisabled(member.bannable ? false : true)
    .setLabel("Ceza Kaldır").setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
    .setCustomId("yetkileriac")
    .setLabel("Yetki Aç").setStyle(ButtonStyle.Danger)
  )

const stfu = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} üyesi kategori sildi, sunucudan yasaklayıp, silinen kategoriyi izinleriyle birlikte yeniden oluşturup kanallarını içine taşıdım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Silinen Kategori: ${channel.name} - \`${channel.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

let stfuGuardLog = await channel.guild.channels.cache.find(x => x.name == "guard_log").send({ embeds: [stfu], components: [row] });

var filter = (button) => conf.sahipRolu.some(x => x == button.member.roles.cache.has(x)) || stfucum.StfuID.includes(button.user.id);
const collector = await stfuGuardLog.createMessageComponentCollector({ filter });

collector.on('collect', async (button) => {
  if (button.customId == "cezaac") {
      button.guild.members.unban(entry.executor.id, `Buton Üzerinden Guard Banı Kaldırıldı!`)
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde ${entry.executor} (\`${entry.executor.id}\`) kişisinin banını kaldırdın!`, ephemeral: true })
  }
  if (button.customId == "yetkileriac") {
      client.allPermissionOpen();
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde sunucudaki rollerin yetkilerini açtın!`, ephemeral: true })
  }
})
}
};

module.exports.conf = {
  name: "channelDelete",
};