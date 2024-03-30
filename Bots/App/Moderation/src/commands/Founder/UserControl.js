const { PermissionsBitField, ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { star, kirmiziok } = require("../../../../src/configs/emojis.json")
let ayar = require("../../../../src/configs/sunucuayar.json"); 
const conf = require("../../../../src/configs/ayarName.json");
const stfucum = require("../../../../../../stfu_config.json");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    conf: {
      aliases: ["control", "kontrol"],
      name: "kontrol",
      help: "kontrol",
      category: "yönetim",
    },
  
    run: async (client, message, args, durum, kanal) => {

    if(!ayar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    { 
    message.reply({ content:`Yetkin bulunmamakta dostum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
 
       let guild = client.guilds.cache.get(stfucum.GuildID);
       await guild.members.fetch();

       const etkinlik = await client.guilds.cache.get(stfucum.GuildID).roles.cache.find(x => x.name.includes(conf.etkinlik)).id
       const cekilis = await client.guilds.cache.get(stfucum.GuildID).roles.cache.find(x => x.name.includes(conf.cekilis)).id
       
    let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tag) && !s.roles.cache.get(ayar.ekipRolu))
    let et = message.guild.members.cache.filter(member => !member.roles.cache.has(cekilis) || !member.roles.cache.has(etkinlik)).size;
    let stfucim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

const row = new ActionRowBuilder()
.addComponents(
new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Etkinlik/Çekiliş Rol Dağıt').setCustomId('ecdagit'),
new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Tag Rol Dağıt').setCustomId('tagrol'),
new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Kayıtsız Rol Dağıt').setCustomId('kayıtsızdagit'),
);

let stfu = new EmbedBuilder()
.setDescription(`
${message.member.toString()}, \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` rolü olmayan üyelerin rol dağıtım tablosu aşağıda belirtilmiştir.
`)

.addFields(
{ name: "__**Etkinlik/Çekiliş Rol**__", value: `
\`\`\`fix
${et} kişi
\`\`\`
`, inline: true },
{ name: "__**Taglı Rol**__", value: `
\`\`\`fix
${taglilar.size} kişi
\`\`\`
`, inline: true },
{ name: "__**Kayıtsız Rol**__", value: `
\`\`\`fix
${stfucim.size} kişi
\`\`\`
`, inline: true }
)

.setFooter({ text: message.author.tag, iconURL: message.author.avatarURL()})
.setTimestamp()
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
 
 
  let msg = await message.channel.send({ embeds: [stfu], components: [row]})
 
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

      collector.on("collect", async (button) => {

    if (button.customId === 'ecdagit') {
 
    let stfu = message.guild.members.cache.filter(member => !member.roles.cache.has(etkinlik) || !member.roles.cache.has(cekilis))
    button.reply({ content:`
Etkinlik/Çekiliş rolü olmayan ${stfu.size} kullanıcıya etkinlik, çekiliş rolleri verildi !`})
        message.guild.members.cache.filter(member => !member.roles.cache.has(etkinlik) || !member.roles.cache.has(cekilis)).map(x=> x.roles.add([etkinlik, cekilis]));
    }


    if (button.customId === 'tagrol') {
 
      let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tag) && !s.roles.cache.has(ayar.ekipRolu))

    button.reply({ content:`
Tagı olup rolü olmayan ${taglilar.size} kullanıcıya rol verildi.

Tag Rolü verilen kullanıcılar;
${taglilar.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")}`})

    message.guild.members.cache.filter(s => s.user.username.includes(ayar.tag) && !s.roles.cache.has(ayar.ekipRolu)).map(x=> x.roles.add(ayar.ekipRolu))                
    }

    if (button.customId === 'kayıtsızdagit') {
 
    let stfucim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

    button.reply({ content:`
Kayıtsız rolü olmayan ${stfucim.size} kullanıcıya kayıtsız rolü verildi !

Kayıtsız Rolü verilen kullanıcılar;
${stfucim.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")} `})

    message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0).map(x=> x.roles.add(ayar.unregRoles))

    }

  });
}
}
