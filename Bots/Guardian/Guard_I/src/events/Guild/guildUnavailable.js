const { EmbedBuilder, AuditLogEvent, PermissionsBitField } = require("discord.js");
const stfucum = require("../../../../../../stfu_config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (guild) => {

let entry = await guild.guild.fetchAuditLogs({ type: AuditLogEvent.GuildUpdate }).then(audit => audit.entries.first());

const stfu = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))   
.setDescription(`
Sunucu kullanılmaz hale getirildiği için otomatik olarak sunucu içerisindeki tüm yönetici, rol yönet, kanal yönet ve diğer izinleri tamamiyle kapattım.
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)
   
return guild.guild.channels.cache.find(x => x.name == "guard_log").send({ embeds: [stfu] });
};

module.exports.conf = {
  name: "guildUnavailable",
};