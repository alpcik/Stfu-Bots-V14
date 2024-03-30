const Discord = require('discord.js') 
const stfu = require("../../../../src/schemas/dolar");
const { altin, altin2, rewards } = require("../../../../src/configs/emojis.json")
let ms = require("discord.js");
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
    conf: {
      aliases: ["hesapoluştur","hesap-oluştur"],
      name: "hesapoluştur",
      help: "hesapoluştur",
      category: "market",
    },
  
run: async (client, message, args) => {

   if (!message.guild) return;

   let kanallar = ayar.KomutKullanımKanalİsim;
   if (!kanallar.includes(message.channel.name)) return message.reply({ content:`${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
	
	let data = await stfu.findOne({userID: message.author.id, guildID: message.guild.id});

  if(!data || data && !data.hesap.length) {
    await stfu.findOneAndUpdate({userID: message.author.id, guildID: message.guild.id}, {$push: {hesap: 1}}, {upsert: true})
    await stfu.findOneAndUpdate({userID: message.author.id, guildID: message.guild.id}, {$inc: {dolar: 500}}, {upsert: true})
    message.reply({ content:`Başarı ile coin hesabını oluşturdun, oyunlarımızı deneyimlemen için hesabına **500** hediye coin yolladım. İyi eğlenceler!`})
     } else if(data) {
    message.reply({ content:"Zaten daha önceden bir hesap oluşturmuşsun!"})
  }
}}
