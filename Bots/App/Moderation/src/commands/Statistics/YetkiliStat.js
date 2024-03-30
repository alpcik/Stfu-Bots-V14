const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
const conf = require("../../../../src/configs/sunucuayar.json");
const voiceUserParent = require("../../../../src/schemas/voiceUserParent");
const messageUser = require("../../../../src/schemas/messageUser");
const voiceUser = require("../../../../src/schemas/voiceUser");
const cezapuan = require("../../../../src/schemas/cezapuan");
const coin = require("../../../../src/schemas/coin");
const taggeds = require("../../../../src/schemas/taggeds");
const yetkis = require("../../../../src/schemas/yetkis");
const ceza = require("../../../../src/schemas/ceza");
const toplams = require("../../../../src/schemas/toplams");
const inviterSchema = require("../../../../src/schemas/inviter");
const {  fill, empty, fillStart, emptyEnd, fillEnd } = require("../../../../src/configs/emojis.json");
const { ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js");
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["ystat"],
    name: "yetkim",
    help: "yetkim",
    category: "stat",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if(!conf.staffs.some(rol => message.member.roles.cache.has(rol))) return message.react("❌")
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!conf.staffs.some(rol => member.roles.cache.has(rol))) return message.react("❌")

    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const messageWeekly = messageData ? messageData.weeklyStat : 0;
    const messageDaily = messageData ? messageData.dailyStat : 0;
    
    const coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });

 

    const maxValue = client.ranks[client.ranks.indexOf(client.ranks.find(x => x.coin >= (coinData ? coinData.coin : 0)))] || client.ranks[client.ranks.length-1];
    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: member.user.id });
    const toplamData = await toplams.findOne({ guildID: message.guild.id, userID: member.user.id });
    const yetkiData = await yetkis.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: member.user.id });


const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;

        const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.user.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dakika]");
      };
      
      let currentRank = client.ranks.filter(x => (coinData ? coinData.coin : 0) >= x.coin);
      currentRank = currentRank[currentRank.length-1];

      const coinStatus = message.member.hasRole(conf.staffs, false) && client.ranks.length > 0 ?
      `${currentRank ?`
      ${currentRank !== client.ranks[client.ranks.length-1] ? `Şu an ${Array.isArray(currentRank.role) ? `<@&${currentRank.role[0]}>` : `<@&${currentRank.role[0]}>`} rolündesiniz. ${Array.isArray(maxValue.role) ? `<@&${maxValue.role[0]}>` : `<@&${maxValue.role[0]}>`} rolüne ulaşmak için \`${maxValue.coin-coinData.coin}\` puan daha kazanmanız gerekiyor!` : "Şu an son yetkidesiniz! Emekleriniz için teşekkür ederiz. :)"}` : ` 
      Şuan ${message.member.roles.highest} rolündesiniz. ${Array.isArray(maxValue.role) ? `<@&${maxValue.role[0]}>` : `<@&${maxValue.role[0]}>`} rolüne ulaşmak için \`${maxValue.coin - (coinData ? coinData.coin : 0)}\`  Puan daha kazanmanız gerekiyor!`}` : ""
      
    var PuanDetaylari = new ButtonBuilder()
    .setLabel("Yetki Puan Bilgi")
    .setCustomId("puan_detaylari")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("1219634625891008593")

    var GenelPuanDetaylari = new ButtonBuilder()
    .setLabel("Ceza Puan Bilgi")
    .setCustomId("ceza_puan_detaylari")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("1219634625891008593")

    var Iptal = new ButtonBuilder()
    .setLabel("İptal")
    .setCustomId("iptal_button")
    .setStyle(ButtonStyle.Danger)
    .setEmoji("920412153712889877")

    const row = new ActionRowBuilder()
    .addComponents([PuanDetaylari, GenelPuanDetaylari, Iptal])

embed.setDescription(`${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam ses ve mesaj bilgileri aşağıda belirtilmiştir.`)
.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
.addFields(
  { name: `<a:mesaj2:1220734047672598588> **Günlük / Haftalık / Aylık / Toplam Ses İstatistikleri;**\n\n`, value: `

:jellyfish: \`  Toplam Ses İstatistiği:   \` \`${voiceDaily}\`
:jellyfish: \`  Aylık Ses İstatistiği:    \` \`${voiceMonthly}\`
:jellyfish: \`  Haftalık Ses İstatistiği: \` \`${voiceWeekly}\`
:jellyfish: \`  Günlük Ses İstatistiği:   \` \`${voiceDaily}\`
\n\n
`, inline: false },

{ name: `<a:mesaj2:1220734047672598588> **Günlük / Haftalık / Aylık / Toplam Mesaj İstatistikleri;**\n\n`, value: `

:jellyfish: \`  Toplam Mesaj İstatistiği:   \` \`${messageData ? messageData.topStat : 0} Mesaj\`
:jellyfish: \`  Aylık Mesaj İstatistiği:    \` \`${Number(messageMonthly).toLocaleString()} Mesaj\`
:jellyfish: \`  Haftalık Mesaj İstatistiği: \` \`${Number(messageWeekly).toLocaleString()} Mesaj\`
:jellyfish: \`  Günlük Mesaj İstatistiği:   \` \`${Number(messageDaily).toLocaleString()} Mesaj\`
\n\n
`, inline: false },

{ name:`<a:mesaj2:1220734047672598588> **En Çok Vakit Geçirilen Ses Kanalları;**\n\n`,value: `

:jellyfish: \`  Public Odalar:           \` \`${await category(conf.publicParents)}\`
:jellyfish: \`  Register Odalar:         \` \`${await category(conf.registerParents)}\`
:jellyfish: \`  Secret Odalar:           \` \`${await category(conf.secretroomParent)}\`
:jellyfish: \`  Alone Odalar:            \` \`${await category(conf.aloneParents)}\`
:jellyfish: \`  Etkinlik Odalar:         \` \`${await category(conf.funParents)}\`
:jellyfish: \`  Yönetim Yetkili Odaları: \` \`${await category(conf.funParents)}\`
:jellyfish: \`  Register Odaları:        \` \`${await category(conf.registerParents)}\`
\n\n
`, inline: false },
{ name:`<a:mesaj2:1220734047672598588> **Yetkili İstatistikleri;**\n\n`,value: `

:jellyfish: \`  Toplam Kayıt İstatistiği:        \` \`${toplamData ? `${toplamData.toplams.length} Kişi`: "Kayıt Verisi Bulunamadı!"}\`
:jellyfish: \`  Toplam Davet İstatistiği:        \` \`${inviterData ? `${total} Davet`: "Davet Verisi Bulunamadı!"}\`
:jellyfish: \`  Toplam Yetkili Alma İstatistiği: \` \`${yetkiData ? `${yetkiData.yetkis.length} Yetkili` : "Yetkili Alma Verisi Bulunamadı!"}\`
\n\n
`, inline: false })

   

    let msg = await message.channel.send({ embeds: [embed], components: [row] });

    var filter = (button) => button.user.id === message.author.id;
    let collector = await msg.createMessageComponentCollector({ filter, time: 99999999 })

    collector.on("collect", async (button) => {
      if(button.customId === "puan_detaylari") {
        await button.deferUpdate();

const puan = new EmbedBuilder()
.setDescription(`${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda puanlama tablosu aşağıda belirtilmiştir.`) 
.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
.addFields({ name:`:star2: **Puan Detayları:**`, value:`
\`-\` Kayıt: (\`Puan Etkisi: +${toplamData ? toplamData.toplams.length*5.5 : 0}\`)
\`-\` Taglı: (\`Puan Etkisi: +${taggedData ? taggedData.taggeds.length*25 : 0}\`)
\`-\` Davet: (\`Puan Etkisi: +${total*15}\`)
\`-\` Yetkili: (\`Puan Etkisi: +${yetkiData ? yetkiData.yetkis.length*30 : 0}\`)
\`-\` Toplam Ses: (\`Puan Etkisi: +${moment.duration(voiceData ? voiceData.topStat : 0).format("h")*240}\`)
\`-\` Toplam Mesaj: (\`Puan Etkisi: +${messageData ? messageData.topStat*2 : 0}\`)
\`-\` Toplam Aldığın Cezalar : ${cezapuanData ? cezapuanData.cezapuan.length : 0} (\`Toplam ${cezaData ? cezaData.ceza.length : 0}\`)
`, inline: false },
{ name:`:star2: **Net Puanlama Bilgisi**`, value:`
\`-\` Kayıt işlemi yaparak, \`+5.5\` puan kazanırsın.
\`-\` Taglı üye belirleyerek, \`+25\` puan kazanırsınız.
\`-\` İnsanları davet ederek, \`+15\` puan kazanırsın.
\`-\` İnsanları yetkili yaparak, \`+30\` puan kazanırsın.
\`-\` Seste kalarak, ortalama olarak \`+4\` puan kazanırsınız.
\`-\` Yazı yazarak, ortalama olarak, \`+2\` puan kazanırsınız.
`, inline: false },
{ name:`:star2: **Puan Durumu:**`, value:`
Puanınız: \`${coinData ? Math.floor(coinData.coin) : 0}\`, Gereken Puan: \`${maxValue.coin}\`
${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)} \`${coinData ? coinData.coin : 0} / ${maxValue.coin}\`
`, inline: false },
{ name:`:star2: **Yetki Durumu:**`, value:`
${coinStatus}
`, inline: false })

msg.edit({
  embeds : [puan],
  components : [row]
})
      
      }

  if(button.customId === "ceza_puan_detaylari") {
    await button.deferUpdate();
    const ceza = new EmbedBuilder()
    .setDescription(`
    ${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden itibaren \`${message.guild.name}\` sunucusunda genel puanlama tablosu aşağıda belirtilmiştir.
`) 
.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
.addFields({ name:`:star2: **Ceza Kullanımı**`, value: `\`\`\`fix
( Ban: ${cezaData ? cezaData.BanAmount : 0} - Mute: ${cezaData ? cezaData.MuteAmount : 0} - Ses Mute: ${cezaData ? cezaData.VoiceMuteAmount : 0} - Jail: ${cezaData ? cezaData.JailAmount : 0} )\`\`\`
`, inline: false },
{ name:`:star2: **Ceza Puan Detayları:**`, value: `
\`-\` (\` Ban işlemi \`) yerseniz, \`-100\` puan kaybedersiniz.
\`-\` (\` Underworld \`) işlemi yerseniz, \`-75\` puan kaybedersiniz.
\`-\` (\` Karantina/Jail \`) işlemi yerseniz, \`-50\` puan kaybedersiniz.
\`-\` (\` Ses/Yazı \`) Mute işlemi yerseniz, \`-20\` puan kaybedersiniz.
`, inline: false },
{ name:`:star2: **Ceza Puan Detayları:**`, value:`
\`-\` (\` Ban işlemi \`) yerseniz, \`-100\` puan kaybedersiniz.
\`-\` (\` Underworld \`) işlemi yerseniz, \`-75\` puan kaybedersiniz.
\`-\` (\` Karantina/Jail \`) işlemi yerseniz, \`-50\` puan kaybedersiniz.
\`-\` (\` Ses/Yazı \`) Mute işlemi yerseniz, \`-20\` puan kaybedersiniz.
\`\`\`fix
Toplam Aldığın Cezalar : ${cezapuanData ? cezapuanData.cezapuan.length : 0} (Toplam ${cezaData ? cezaData.ceza.length : 0})
\`\`\`
`, inline: false },
{ name:`:star2: **Puan Durumu:**`, value: `
Puanınız: \`${coinData ? Math.floor(coinData.coin) : 0}\`, Gereken Puan: \`${maxValue.coin}\`
${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)} \`${coinData ? coinData.coin : 0} / ${maxValue.coin}\`
`, inline: false },
{ name:`:star2: **Yetki Durumu:**`, value:`
${coinStatus}
`, inline: false })

msg.edit({
  embeds: [ceza],
  components : [row]
})  
    }

      if(button.customId === "iptal_button") {
        await button.deferUpdate();
        const iptal = new EmbedBuilder()
        .setDescription(`${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam ses ve mesaj bilgileri aşağıda belirtilmiştir.`)
        .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
        .addFields({ name: `<a:mesaj2:1220734047672598588> **Kullanıcı Bilgileri;**\n\n`, value: `
        
        :jellyfish: \`  Hesap:                   \` ${member}
        :jellyfish: \`  Kullanıcı ID:            \` \` ${member.id} \`
        :jellyfish: \`  Sunucu İsmi:             \` \` ${member.guild.name} \`
        :jellyfish: \`  Hesap Kuruluş Tarihi:    \` <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>
        :jellyfish: \`  Sunucuya Katılım Tarihi: \` <t:${Math.floor(member.joinedAt / 1000)}:R>
        \n\n
        `, inline: false },
        
          { name: `<a:mesaj2:1220734047672598588> **Günlük / Haftalık / Aylık / Toplam Ses İstatistikleri;**\n\n`, value: `
        
        :jellyfish: \`  Toplam Ses İstatistiği:   \` \`${voiceDaily}\`
        :jellyfish: \`  Aylık Ses İstatistiği:    \` \`${voiceMonthly}\`
        :jellyfish: \`  Haftalık Ses İstatistiği: \` \`${voiceWeekly}\`
        :jellyfish: \`  Günlük Ses İstatistiği:   \` \`${voiceDaily}\`
        \n\n
        `, inline: false },
        
        { name: `<a:mesaj2:1220734047672598588> **Günlük / Haftalık / Aylık / Toplam Mesaj İstatistikleri;**\n\n`, value: `
        
        :jellyfish: \`  Toplam Mesaj İstatistiği:   \` \`${messageData ? messageData.topStat : 0} Mesaj\`
        :jellyfish: \`  Aylık Mesaj İstatistiği:    \` \`${Number(messageMonthly).toLocaleString()} Mesaj\`
        :jellyfish: \`  Haftalık Mesaj İstatistiği: \` \`${Number(messageWeekly).toLocaleString()} Mesaj\`
        :jellyfish: \`  Günlük Mesaj İstatistiği:   \` \`${Number(messageDaily).toLocaleString()} Mesaj\`
        \n\n
        `, inline: false },
        
        { name:`<a:mesaj2:1220734047672598588> **En Çok Vakit Geçirilen Ses Kanalları;**\n\n`,value: `
        
        :jellyfish: \`  Public Odalar:           \` \`${await category(conf.publicParents)}\`
        :jellyfish: \`  Register Odalar:         \` \`${await category(conf.registerParents)}\`
        :jellyfish: \`  Secret Odalar:           \` \`${await category(conf.secretroomParent)}\`
        :jellyfish: \`  Alone Odalar:            \` \`${await category(conf.aloneParents)}\`
        :jellyfish: \`  Etkinlik Odalar:         \` \`${await category(conf.funParents)}\`
        :jellyfish: \`  Yönetim Yetkili Odaları: \` \`${await category(conf.funParents)}\`
        :jellyfish: \`  Register Odaları:        \` \`${await category(conf.registerParents)}\`
        \n\n
        `, inline: false },
        { name:`<a:mesaj2:1220734047672598588> **Yetkili İstatistikleri;**\n\n`,value: `
        
        :jellyfish: \`  Toplam Kayıt İstatistiği:        \` \`${toplamData ? `${toplamData.toplams.length} Kişi`: "Kayıt Verisi Bulunamadı!"}\`
        :jellyfish: \`  Toplam Davet İstatistiği:        \` \`${inviterData ? `${total} Davet`: "Davet Verisi Bulunamadı!"}\`
        :jellyfish: \`  Toplam Yetkili Alma İstatistiği: \` \`${yetkiData ? `${yetkiData.yetkis.length} Yetkili` : "Yetkili Alma Verisi Bulunamadı!"}\`
        \n\n
        `, inline: false });

   row.components[0].setDisabled(true) 
   row.components[1].setDisabled(true) 
   row.components[2].setDisabled(true)
   
    msg.edit({
      embeds: [iptal],
      components : [row]
    })
        
        }

  })
  }
};

function progressBar(value, maxValue, size) {
const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
const emptyProgress = size - progress > 0 ? size - progress : 0;

const progressText = fill.repeat(progress);
const emptyProgressText = empty.repeat(emptyProgress);

return emptyProgress > 0 ? fillStart+progressText+emptyProgressText+emptyEnd : fillStart+progressText+emptyProgressText+fillEnd;
};
