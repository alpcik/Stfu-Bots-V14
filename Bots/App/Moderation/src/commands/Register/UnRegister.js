const { PermissionsBitField, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ayar = require("../../../../src/configs/sunucuayar.json")
const conf = require("../../../../src/configs/sunucuayar.json")
const { red, green } = require("../../../../src/configs/emojis.json")
const moment = require("moment")
moment.locale("tr")

module.exports = {
  conf: {
    aliases: ["kayıtsız","ks","kayitsiz","unregister","unreg"],
    name: "kayitsiz",
    help: "kayitsiz  <@stfu/ID>",
    category: "kayıt",
  },
  
  run: async (client, message, args, embed, prefix) => { 
    if(!ayar.teyitciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 

    {
    message.react("❌")
    message.reply({ content:`Yetkin bulunmamakta.\Yetkili olmak istersen başvurabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react("❌")
    message.reply({ content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react("❌") 
    message.reply({ content:"Kendinle aynı yetkide ya da daha yetkili olan birini kayıtsıza atamazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!member.manageable) 
    {
    message.react("❌")
    message.reply({ content: "Bu üyeyi kayıtsıza atamıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    message.react("✅")
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])

 const logEmbed = new EmbedBuilder()
    .setAuthor({ name: uye.user.tag, iconURL: uye.displayAvatarURL({ dynamic: true }) })
    .setDescription(`${uye} kullanıcısı ${message.member} tarafından **kayıtsız** atıldı.`)
    .addFields([
      { name: 'Kayıtsız Atılan Kullanıcı', value: `${uye.toString()}`, inline: true },
      { name: 'Kayıtsız Atan Kullanıcı', value: `${message.member.toString()}`, inline: true },
      { name: 'Atılma Tarihi', value: `<t:${Math.floor(Date.now() / 1000)}:R>` }
    ])
    .setFooter({ text: 'Üyenin geçmiş isimlerini görüntülemek için .isim komutunu kullanabilirsiniz.' })

  if (client.channels.cache.find(c => c.name === "register_log")) client.channels.cache.find(c => c.name === "register_log").send({ embeds: [logEmbed] })


    member.roles.set(conf.unregRoles);
    member.setNickname(`${member.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} İsim | Yaş`)
    message.reply({ content:`${member} üyesi, ${message.author} tarafından, kayıtsıza atıldı! :white_check_mark:`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
   
  


  },
};