const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const stfucum = require("../../../../../../stfu_config.json");
const conf = require("../../../../../App/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (oldRole, newRole) => {
let entry = await newRole.guild.fetchAuditLogs({ type: AuditLogEvent.RoleUpdate }).then(audit => audit.entries.first());
if (entry.executor.bot) return;
if (!entry || !entry.executor || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "role") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;

let member = role.guild.members.cache.get(entry.executor.id); 

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
      .setCustomId("cezaac")
      .setDisabled(conf.jailRole.some(x => member.roles.cache.has(x)) ? true : false)
      .setLabel("Ceza Kaldır").setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
      .setCustomId("yetkileriac")
      .setLabel("Yetki Aç").setStyle(ButtonStyle.Danger)
    )

const stfu = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} üyesi rol güncelledi, rolü eski haline getirip yetkiliyi jail attım. Kalsın orda aklı başına gelene kadar...
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Güncellenen Rol: ${oldRole.name} - \`${oldRole.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

let stfuGuardLog = await role.guild.channels.cache.find(x => x.name == "guard_log").send({ embeds: [stfu], components: [row] });

var filter = (button) => conf.sahipRolu.some(x => x == button.member.roles.cache.has(x)) || stfucum.StfuID.includes(button.user.id);
const collector = await stfuGuardLog.createMessageComponentCollector({ filter });

collector.on('collect', async (button) => {
  if (button.customId == "cezaac") {
      member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.unregRoles[0]]) : member.roles.set(conf.unregRoles)
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde ${entry.executor} (\`${entry.executor.id}\`) kişisinin jailini kaldırdın!`, ephemeral: true })
  }
  if (button.customId == "yetkileriac") {
      client.allPermissionOpen();
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde sunucudaki rollerin yetkilerini açtın!`, ephemeral: true })
  }
})
return;
};

module.exports.conf = {
  name: "roleUpdate",
};