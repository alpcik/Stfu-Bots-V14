const Discord = require("discord.js");
const messageUser = require("../../../../src/schemas/messageUser");
const voiceUser = require("../../../../src/schemas/voiceUser");
const voiceUserParent = require("../../../../src/schemas/voiceUserParent");
const inviterSchema = require("../../../../src/schemas/inviter");
const inviteMemberSchema = require("../../../../src/schemas/inviteMember");
const nameData = require("../../../../src/schemas/names")
const stfucum = require("../../../../../../stfu_config.json");
const ayarlar = require("../../../../src/configs/sunucuayar.json")
const { miniicon, voice, mesaj2, star } = require("../../../../src/configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: [],
    name: "buttonpanel",
    help: "buttonpanel",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {
message.channel.send({ content:`**${message.guild.name}** Sunucusunun Kısayolları;\n\n\`1.\` Sunucuya giriş tarihinizi öğrenin.\n\`2.\` Üstünüzde bulunan rollerin listesini alın.\n\`3.\` Hesabınızın açılış tarihini öğrenin.\n\`4.\` Davet bilgilerinizi öğrenin.\n\`5.\` Tekrardan sesli kayıt olun.\n\`6.\` Sunucunun anlık aktif listesini görüntüleyin.\n\`7.\` Sunucudaki eski isim bilgilerinizi görüntüleyin.\n\`8.\` Sunucudaki toplam mesaj sayınızı öğrenin.\n\`9.\` Sunucu ses kanallarında toplam geçirdiğiniz süreyi öğrenin.\n\n:wine_glass: **Level Sistemi Tanıtımı;**\nXP (Puan) toplayarak level atlayabilir, level ödüllerine sahip olabilirsiniz. XP toplamak için sohbet kanallarında ve ses kanallarında aktiflik göstermeniz gerekmektedir ve bu aktifliğiniz sizin istatistiğinize yansıyacaktır.\n\n:cup_with_straw: **Rank Sistemi Tanıtımı;**\nSunucunun en iyilerinin bulunduğu rank sistemi. Rank sistemi yöneticiler tarafından haftada bir aktifleştirilen bir yarıştır. Bu yarışta en yüksek ranka sahip olan üyemiz ödül kazanacaktır ve ona özel rol atanacaktır.`,
"components":[{
"type":1,"components":[
                         {"type":2,"style":3,"custom_id":"I","label":"1",},
                         {"type":2,"style":3,"custom_id":"II","label":"2"},
                         {"type":2,"style":3,"custom_id":"III","label":"3"},
       ]}, {  "type":1,"components":[
                         {"type":2,"style":3,"custom_id":"IV","label":"4"},
                         {"type":2,"style":3,"custom_id":"V","label":"5"},
                         {"type":2,"style":3,"custom_id":"VI","label":"6"}
       ]}, {  "type":1,"components":[
                         {"type":2,"style":3,"custom_id":"VII","label":"7"},
                         {"type":2,"style":3,"custom_id":"VIII","label":"8"},
                         {"type":2,"style":3,"custom_id":"IX","label":"9"}
       ]}
]})
  },
};


client.on('interactionCreate', async interaction => {
const tagges = ayarlar.tag;

const member = interaction.user;
const inviterData = await inviterSchema.findOne({ guildID: stfucum.GuildID, userID: interaction.user.id });
const total = inviterData ? inviterData.total : 0;
const regular = inviterData ? inviterData.regular : 0;
const bonus = inviterData ? inviterData.bonus : 0;
const leave = inviterData ? inviterData.leave : 0;
const fake = inviterData ? inviterData.fake : 0;
const invMember = await inviteMemberSchema.find({ guildID: stfucum.GuildID, inviter: interaction.user.id });
const daily = invMember ? interaction.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
const weekly = invMember ? interaction.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
const tagged = invMember ? interaction.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && tagges.some(tag => m.user.tag.includes(tag))).size : 0;

////////////////////////////////////////////////////////////////////////////////////////////

const data = await nameData.findOne({ guildID: stfucum.GuildID, userID: member.id });

////////////////////////////////////////////////////////////////////////////////////////////

const messageData = await messageUser.findOne({ guildID: stfucum.GuildID, userID: interaction.user.id });
const voiceData = await voiceUser.findOne({ guildID: stfucum.GuildID, userID: interaction.user.id });

  const messageWeekly = messageData ? messageData.weeklyStat : 0;
  const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
  const messageDaily = messageData ? messageData.dailyStat : 0;
  const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");

////////////////////////////////////////////////////////////////////////////////////////////

const category = async (parentsArray) => {
  const data = await voiceUserParent.find({ guildID: stfucum.GuildID, userID: member.id });
  const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
  let voiceStat = 0;
  for (var i = 0; i <= voiceUserParentData.length; i++) {
    voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
  }
  return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
};

////////////////////////////////////////////////////////////////////////////////////////////

if(interaction.customId === "I")
{
await interaction.reply({ content: `Sunucuya Katılma Tarihiniz : <t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:R>`, ephemeral: true });
}

if(interaction.customId === "II")
{
await interaction.reply({ content: `Üzerinde Bulunan Rollerin Listesi ;
        
${(await interaction.guild.members.cache.get(member.id).roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? await interaction.guild.members.cache.get(member.id).roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Hiç yok.')}`, ephemeral: true });
}

if(interaction.customId === "III")
{
await interaction.reply({ content: `Hesabınızın Açılış Tarihi :  <t:${Math.floor(member.createdTimestamp / 1000)}:R>`, ephemeral: true });
}

if(interaction.customId === "IV")
{
await interaction.reply({ content: `
${member.toString()}, üyesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\` tarihinden  itibaren \`${interaction.guild.name}\` sunucusunda toplam invite bilgileri aşağıda belirtilmiştir.
Toplam **${regular}** davet.

${miniicon} \`(${total} gerçek, ${bonus} bonus, ${leave} ayrılmış, ${fake} fake)\`
      
${miniicon} \`Günlük: ${daily}, Haftalık: ${weekly}, Taglı: ${tagged}\`
`, ephemeral: true });
}

if(interaction.customId === "V")
{
await interaction.guild.members.cache.get(member.id).roles.cache.has(ayarlar.boosterRolu) ? interaction.guild.members.cache.get(member.id).roles.set([ayarlar.boosterRolu, ayarlar.unregRoles[0]]) : interaction.guild.members.cache.get(member.id).roles.set(ayarlar.unregRoles)
await interaction.reply({ content: `${member.toString()} üyesi başarıyla kayıtsıza atıldı!`, ephemeral: true });
}

if(interaction.customId === "VI")
{
await interaction.reply({ content: `
${miniicon} Sesli kanallardaki üye sayısı : \`${(interaction.guild.members.cache.filter((x) => x.voice.channel).size)}\`
${miniicon} Sunucudaki toplam üye sayısı : \`${(interaction.guild.memberCount)}\`
${miniicon} Sunucunun oluşturulma tarihi: \`${moment(interaction.guild.createdAt).locale("tr").format("LLL")}\`
${miniicon} Sunucu destek numarası : \`${(interaction.guild.id)}\`
`, ephemeral: true });
}

if(interaction.customId === "VII")
{
const ambed = new Discord.EmbedBuilder()
.setAuthor({ name: `${member.username} üyesinin isim bilgileri;`})
.setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
.setDescription(data ? data.names.splice(0, 10).map((x, i) => `\` ${i + 1} \` \` ${x.name} \` ${x.sebep ? `(${x.sebep})` : ""} ${x.rol ? `(${x.rol})` : ""} ${x.yetkili ? `(<@${x.yetkili}>)` : ""} <t:${Math.floor(x.date / 1000)}:R>`).join("\n") : "Bu kullanıcıya ait isim geçmişi bulunmuyor!")         
await interaction.reply({ embeds: [ambed], ephemeral: true });
}

if(interaction.customId === "VIII")
{
await interaction.reply({ content: `
${member.toString()}, üyesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\` tarihinden  itibaren \`${interaction.guild.name}\` sunucusunda toplam mesaj bilgileri aşağıda belirtilmiştir.

:star2: **Mesaj İstatistiği**
${miniicon} Toplam: \`${messageData ? messageData.topStat : 0}\`

${miniicon} Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
${miniicon} Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
`, ephemeral: true });
}

if(interaction.customId === "IX")
{
await interaction.reply({ content: `
${member.toString()}, üyesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\` tarihinden  itibaren \`${interaction.guild.name}\` sunucusunda toplam ses bilgileri aşağıda belirtilmiştir.

:star2: **Sesli Sohbet İstatistiği**
${miniicon} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika] s [saniye]")}\`

${miniicon} Haftalık Ses: \`${voiceWeekly}\`
${miniicon} Günlük Ses: \`${voiceDaily}\`
`, ephemeral: true });
}

})