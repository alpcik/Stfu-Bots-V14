const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const setup = require("../../../../../App/src/configs/sunucuayar.json");
const stfucum = require("../../../../../../stfu_config.json");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");
const client = global.bot;

module.exports = async (oldGuild, newGuild) => {
  let entry = await newGuild.fetchAuditLogs({ type: AuditLogEvent.GuildUpdate }).then(audit => audit.entries.first());
  if (!entry || entry.executor.bot) return;

  let member = newGuild.members.cache.get(entry.executor.id);

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("cezaac")
      .setDisabled(member.bannable ? false : true)
      .setLabel("Ceza Kaldır")
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId("yetkileriac")
      .setLabel("Yetki Aç")
      .setStyle(ButtonStyle.Danger)
  );

  const stfu = new EmbedBuilder()
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
    .setDescription(`
      ${entry.executor} adlı yetkili URL'yi Elledi ve sunucudan banlayıp urlyi spamladım.
      ─────────────────────
      Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
      ─────────────────────
      Tarih: \`${moment(Date.now()).format("LLL")}\`
    `);

  let stfuGuardLog = await newGuild.channels.cache.find(x => x.name == "guard_log").send({ content: "@here", embeds: [stfu], components: [row] });

  var filter = (button) => conf.sahipRolu.some(x => x == button.member.roles.cache.has(x)) || stfucum.StfuID.includes(button.user.id);
  const collector = await stfuGuardLog.createMessageComponentCollector({ filter });

  collector.on('collect', async (button) => {
    if (button.customId == "cezaac") {
      button.guild.members.unban(entry.executor.id, `Buton Üzerinden Guard Banı Kaldırıldı!`);
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde ${entry.executor} (\`${entry.executor.id}\`) kişisinin banını kaldırdın!`, ephemeral: true });
    }
    if (button.customId == "yetkileriac") {
      client.allPermissionOpen();
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde sunucudaki rollerin yetkilerini açtın!`, ephemeral: true });
    }
  });
  return;
};

module.exports.conf = {
  name: "guildUpdate"
};
