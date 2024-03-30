const conf = require("../../../../src/configs/sunucuayar.json")
const moment = require("moment");
moment.locale("tr");
const { red } = require("../../../../src/configs/emojis.json")
let table = require("string-table");
const ayar = require("../../../../src/configs/ayarName.json");
const stfucum = require("../../../../../../stfu_config.json");
const { MessageEmbed, PermissionsBitField } = require("discord.js");
module.exports = {
  conf: {
    aliases: ["ysay","yetkilises","sesteolmayan"],
    name: "ysay",
    help: "ysay",
    category: "yönetim",
  },

  run: async (client, message, args, embed, durum) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
  if (!message.guild) return;
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return

    const sec = args[0]

    if (sec) {
      if(!client.guilds.cache.get(stfucum.GuildID).roles.cache.get(sec)) {
        return message.reply({ content: ":x: Sunucuda belirttiğiniz rol bulunmamaktadır. Lütfen Kontrol Ediniz.", ephemeral: true })
      }

      var ToplamYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(sec)).size
      var SesteOlanYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(sec)).filter(yetkilises => yetkilises.voice.channel).size
      var AktifYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(sec) && yetkili.presence && yetkili.presence.status !== "offline").size
      let SesteOlmayanYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(sec)).filter(yetkilises => !yetkilises.voice.channel && yetkilises.presence && yetkilises.presence.status != "offline").size

      let stfu = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(sec)).filter(yetkilises => !yetkilises.voice.channel  && yetkilises.presence && yetkilises.presence.status != "offline")

      let tablo = [{
        "TOPLAM": ToplamYetkili + " kişi",
        "AKTİF": AktifYetkili + " kişi",
        "SESTE": SesteOlanYetkili + " kişi",
        "SESTE OLMAYAN": SesteOlmayanYetkili + " kişi"
      }]

      message.channel.send({ content: `\`\`\`js\n${table.create(tablo)}\`\`\`\n\`\`\`\n${stfu.map(yetkili => `${yetkili}`).join(', ')}\n\`\`\``})

    } else if (!sec) {

      var ToplamYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).size
      var SesteOlanYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).filter(yetkilises => yetkilises.voice.channel).size
      var AktifYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0]) && yetkili.presence && yetkili.presence.status !== "offline").size
      let SesteOlmayanYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).filter(yetkilises => !yetkilises.voice.channel && yetkilises.presence && yetkilises.presence.status != "offline").size

      let stfu = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).filter(yetkilises => !yetkilises.voice.channel  && yetkilises.presence && yetkilises.presence.status != "offline")

      let tablo = [{
        "TOPLAM": ToplamYetkili + " kişi",
        "AKTİF": AktifYetkili + " kişi",
        "SESTE": SesteOlanYetkili + " kişi",
        "SESTE OLMAYAN": SesteOlmayanYetkili + " kişi"
      }]

      message.channel.send({ content: `\`\`\`js\n${table.create(tablo)}\`\`\`\n\`\`\`\n${stfu.map(yetkili => `${yetkili}`).join(', ')}\n\`\`\``})
    }

    
}}