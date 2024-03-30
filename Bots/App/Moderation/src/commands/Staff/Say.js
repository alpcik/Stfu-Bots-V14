const { PermissionsBitField } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const { red } = require("../../../../src/configs/emojis.json")
const emoji = require("../../../../src/configs/emojis.json")
const stfucum = require("../../../../../../stfu_config.json");
const moment = require("moment");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["say"],
    name: "say",
    help: "say",
    category: "yetkili",
  },

  run: async (client, message, args, embed) => {
    if(!conf.staffs.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
      message.react("❌")
      return
    }

    var takviye = message.guild.premiumSubscriptionCount;
    var takviyesayı = message.guild.premiumTier;
    var TotalMember = message.guild.memberCount;
    var AktifMember = message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size;
    var sesli = message.guild.members.cache.filter((x) => x.voice.channel).size;

  const stfu = message.channel.send({ embeds: [embed
               .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
               .setDescription(`
<t:${Math.floor(Date.now() / 1000)}:R> **Tarihli Sunucu Verisi**

\` - \` Şu anda toplam **${sesli}** kişi seslide.
\` - \` Sunucuda **${TotalMember}** adet üye var (**${AktifMember}** Aktif)
\` - \` Toplamda **${takviye}** adet boost basılmış!
`)
           ]})
 },
 };
