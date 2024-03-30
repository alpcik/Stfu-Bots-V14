const { MessageFlags, PermissionsBitField } = require("discord.js");
const {red, green} = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["toplutaşı","allmove"],
    name: "toplutaşı",
    help: "toplutaşı",
    category: "yönetim",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.guild) return;
    if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        let kanal_1 = message.guild.channels.cache.get(args[0]);
        let kanal_2 = message.guild.channels.cache.get(args[1]);
        if (kanal_1 && kanal_2) {
        [...kanal_1.members.values()].forEach((member,index) => {
        setTimeout(async () => {
        await member.voice.setChannel(kanal_2)
        },index*1500)
        })
        message.channel.send({ content: `**${kanal_1.members.size}** adet üyeyi başarılı bir şekilde ${kanal_2} kanalına taşıdınız!`})
        } else return message.reply({ content:`Doğru kullanım: \`!toplutaşı <taşınacak-kanal> <taşıyacağınız-kanal>\``});
    }
  },
};
