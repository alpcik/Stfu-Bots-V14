const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
const conf = require("../../../../src/configs/sunucuayar.json");
const voiceUserParent = require("../../../../src/schemas/voiceUserParent");
const messageUser = require("../../../../src/schemas/messageUser");
const voiceUser = require("../../../../src/schemas/voiceUser");
const inviterSchema = require("../../../../src/schemas/inviter");
const {  miniicon, star, mesaj2 } = require("../../../../src/configs/emojis.json");
const { ButtonStyle, TeamMember, EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js");
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["stat", "me", "istatistik"],
    name: "me",
    help: "me",
    category: "stat",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [Saat], m [Dakika]");
    const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [Saat], m [Dakika]");
    const voiceMonthly = moment.duration(voiceData ? voiceData.monthlyStat : 0).format("H [Saat], m [Dakika]");
    const messageWeekly = messageData ? messageData.weeklyStat : 0;
    const messageMonthly = messageData ? messageData.monthlyStat : 0;
    const messageDaily = messageData ? messageData.dailyStat : 0;
const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });

        const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.user.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dakika]");
      };
      

      let buttonRow = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
       .setCustomId("duzgun")
       .setStyle(ButtonStyle.Secondary)
       .setLabel("Düzgünleştir (Mobil)")
       .setEmoji("1221053394144329810")
       .setDisabled(false)
   )
      .addComponents(
           new ButtonBuilder()
          .setCustomId("stfubaba")
          .setStyle(ButtonStyle.Success)
          .setLabel("Detaylı Bilgiler")
          .setEmoji("779938364929081405")
          .setDisabled(true)
      )

      let pcbutton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
       .setCustomId("duzgunpc")
       .setStyle(ButtonStyle.Secondary)
       .setLabel("Düzgünleştir (PC)")
       .setEmoji("1221053394144329810")
       .setDisabled(false)
   )
   .addComponents(
    new ButtonBuilder()
   .setCustomId("stfubaba")
   .setStyle(ButtonStyle.Success)
   .setLabel("Detaylı Bilgiler")
   .setEmoji("779938364929081405")
   .setDisabled(true)
)

embed.setDescription(`:star2: ${member.toString()} üyesinin __${moment(Date.now()).format("LLL")}__ tarihinden  itibaren **${message.guild.name}** sunucusunda toplam ses ve mesaj bilgileri aşağıda belirtilmiştir.`)
.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
embed.addFields({ name: `<a:mesaj2:1220734047672598588> **Kullanıcı Bilgileri;**\n\n`, value: `

:jellyfish: \`  Hesap:                   \` ${member}
:jellyfish: \`  Kullanıcı ID:            \` \` ${member.id} \`
:jellyfish: \`  Sunucu İsmi:             \` \` ${member.guild.name} \`
:jellyfish: \`  Hesap Kuruluş Tarihi:    \` <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>
:jellyfish: \`  Sunucuya Katılım Tarihi: \` <t:${Math.floor(member.joinedAt / 1000)}:R>
\n\n
`, inline: false },

  { name: `<a:mesaj2:1220734047672598588> **Günlük / Haftalık / Toplam Ses İstatistikleri;**\n\n`, value: `

:jellyfish: \`  Toplam Ses İstatistiği:   \` \`${voiceDaily}\`
:jellyfish: \`  Aylık Ses İstatistiği:    \` \`${voiceMonthly}\`
:jellyfish: \`  Haftalık Ses İstatistiği: \` \`${voiceWeekly}\`
:jellyfish: \`  Günlük Ses İstatistiği:   \` \`${voiceDaily}\`
\n\n
`, inline: false },

{ name: `<a:mesaj2:1220734047672598588> **Günlük / Haftalık / Toplam Mesaj İstatistikleri;**\n\n`, value: `

:jellyfish: \`  Toplam Mesaj İstatistiği:   \` \`${messageData ? messageData.topStat : 0} Mesaj\`
:jellyfish: \`  Aylık Mesaj İstatistiği:    \` \`${Number(messageMonthly).toLocaleString()} Mesaj\`
:jellyfish: \`  Haftalık Mesaj İstatistiği: \` \`${Number(messageWeekly).toLocaleString()} Mesaj\`
:jellyfish: \`  Günlük Mesaj İstatistiği:   \` \`${Number(messageDaily).toLocaleString()} Mesaj\`
\n\n
`, inline: false },

{ name:`<a:mesaj2:1220734047672598588> **En Çok Vakit Geçirilen Ses Kanalları;**\n\n`,value: `

:jellyfish: \`  Public Odalar:   \` \`${await category(conf.publicParents)}\`
:jellyfish: \`  Register Odalar: \` \`${await category(conf.registerParents)}\`
:jellyfish: \`  Secret Odalar:   \` \`${await category(conf.secretroomParent)}\`
:jellyfish: \`  Alone Odalar:    \` \`${await category(conf.aloneParents)}\`
:jellyfish: \`  Etkinlik Odalar: \` \`${await category(conf.funParents)}\`
\n\n
`, inline: false })

var filter = (button) => button.user.id === message.author.id;
let msg = await message.channel.send({ embeds: [embed], components: [buttonRow] });
let collector = await msg.createMessageComponentCollector({ filter, time: 99999999 })

collector.on("collect", async (button) => {
  if(button.customId === "duzgun") {
    await button.deferUpdate();
    const duzgunlestir = new EmbedBuilder()
    .setDescription(`:star2: ${member.toString()} üyesinin __${moment(Date.now()).format("LLL")}__ tarihinden  itibaren **${message.guild.name}** sunucusunda toplam ses ve mesaj bilgileri aşağıda belirtilmiştir.`)
    .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
    .addFields(
      { name: `<a:mesaj2:1220734047672598588> **Ses İstatistikleri;**\n\n`, value: `
    
    \`Toplam Ses:\` \`${voiceDaily}\`
    \`Aylık Ses:\` \`${voiceMonthly}\`
    \`Haftalık Ses:\` \`${voiceWeekly}\`
    \`Günlük Ses:\` \`${voiceDaily}\`
    \n\n
    `, inline: false },
    
    { name: `<a:mesaj2:1220734047672598588> **Mesaj İstatistikleri;**\n\n`, value: `
    
    \`Toplam Mesaj:\` \`${messageData ? messageData.topStat : 0} Mesaj\`
    \`Aylık Mesaj:\` \`${Number(messageMonthly).toLocaleString()} Mesaj\`
    \`Haftalık Mesaj:\` \`${Number(messageWeekly).toLocaleString()} Mesaj\`
    \`Günlük Mesaj:\` \`${Number(messageDaily).toLocaleString()} Mesaj\`
    \n\n
    `, inline: false },
    
    { name:`<a:mesaj2:1220734047672598588> **Vakit Geçirilen Ses Kanalları;**\n\n`,value: `
    
    \`Public Odalar:\` \`${await category(conf.publicParents)}\`
    \`Register Odalar:\` \`${await category(conf.registerParents)}\`
    \`Secret Odalar:\` \`${await category(conf.secretroomParent)}\`
    \`Alone Odalar:\` \`${await category(conf.aloneParents)}\`
    \`Etkinlik Odalar:\` \`${await category(conf.funParents)}\`
    \n\n
    `, inline: false })

    msg.edit({
      embeds : [duzgunlestir],
      components : [pcbutton]
    })
  
  }

  if(button.customId === "duzgunpc") {
    await button.deferUpdate();
    const duzgunlestirpc = new EmbedBuilder()
    .setDescription(`:star2: ${member.toString()} üyesinin __${moment(Date.now()).format("LLL")}__ tarihinden  itibaren **${message.guild.name}** sunucusunda toplam ses ve mesaj bilgileri aşağıda belirtilmiştir.`)
    .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
    .addFields({ name: `<a:mesaj2:1220734047672598588> **Kullanıcı Bilgileri;**\n\n`, value: `
    
    :jellyfish: \`  Hesap:                   \` ${member}
    :jellyfish: \`  Kullanıcı ID:            \` \` ${member.id} \`
    :jellyfish: \`  Sunucu İsmi:             \` \` ${member.guild.name} \`
    :jellyfish: \`  Hesap Kuruluş Tarihi:    \` <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>
    :jellyfish: \`  Sunucuya Katılım Tarihi: \` <t:${Math.floor(member.joinedAt / 1000)}:R>
    \n\n
    `, inline: false },
    
      { name: `<a:mesaj2:1220734047672598588> **Günlük / Haftalık / Toplam Ses İstatistikleri;**\n\n`, value: `
    
    :jellyfish: \`  Toplam Ses İstatistiği:   \` \`${voiceDaily}\`
    :jellyfish: \`  Aylık Ses İstatistiği:    \` \`${voiceMonthly}\`
    :jellyfish: \`  Haftalık Ses İstatistiği: \` \`${voiceWeekly}\`
    :jellyfish: \`  Günlük Ses İstatistiği:   \` \`${voiceDaily}\`
    \n\n
    `, inline: false },
    
    { name: `<a:mesaj2:1220734047672598588> **Günlük / Haftalık / Toplam Mesaj İstatistikleri;**\n\n`, value: `
    
    :jellyfish: \`  Toplam Mesaj İstatistiği:   \` \`${messageData ? messageData.topStat : 0} Mesaj\`
    :jellyfish: \`  Aylık Mesaj İstatistiği:    \` \`${Number(messageMonthly).toLocaleString()} Mesaj\`
    :jellyfish: \`  Haftalık Mesaj İstatistiği: \` \`${Number(messageWeekly).toLocaleString()} Mesaj\`
    :jellyfish: \`  Günlük Mesaj İstatistiği:   \` \`${Number(messageDaily).toLocaleString()} Mesaj\`
    \n\n
    `, inline: false },
    
    { name:`<a:mesaj2:1220734047672598588> **En Çok Vakit Geçirilen Ses Kanalları;**\n\n`,value: `
    
    :jellyfish: \`  Public Odalar:   \` \`${await category(conf.publicParents)}\`
    :jellyfish: \`  Register Odalar: \` \`${await category(conf.registerParents)}\`
    :jellyfish: \`  Secret Odalar:   \` \`${await category(conf.secretroomParent)}\`
    :jellyfish: \`  Alone Odalar:    \` \`${await category(conf.aloneParents)}\`
    :jellyfish: \`  Etkinlik Odalar: \` \`${await category(conf.funParents)}\`
    \n\n
    `, inline: false })

    msg.edit({
      embeds : [duzgunlestirpc],
      components : [buttonRow]
    })
  
  }
  if(button.customId === "duzgun")
{
await interaction.reply({ content: `\`-\` İstatistik mesajı **Mobil/Telefon** olarak güncellendi!`, ephemeral: true });
}
if(button.customId === "duzgunpc")
{
await interaction.reply({ content: `\`-\` İstatistik mesajı **Bilgisayar/PC** olarak güncellendi!`, ephemeral: true });
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
  }
