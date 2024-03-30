const stfu = require("../../../../src/schemas/dolar");
let limit = new Map();
let ms = require("ms");
const { altin, altin2, red, green, kirmiziok } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
    conf: {
      aliases: ["cf"],
      name: "coinflip",
      help: "coinflip <Miktar>",
      category: "market",
    },
  
run: async (client, message, args, embed, prefix) => {

  if (!message.guild) return;

  let dolarData = await stfu.findOne({ guildID: message.guild.id, userID: message.author.id });  
  if (!dolarData || dolarData && !dolarData.hesap.length) return await message.reply({ content: `Komutu kullanabilmek için Hesap oluşturmanız gerekmektedir. ${kirmiziok} \` !hesapoluştur \``})
  if (!dolarData || dolarData && !dolarData.dolar) return await message.reply({ content: `Komutu kullanabilmek için coine ihtiyacınız var. Günlük coininizi almadıysanız ${kirmiziok} \` !daily \``})

  let kanallar = ayar.KomutKullanımKanalİsim;
	if (!kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
	
	  let data = limit.get(message.author.id) || {dailyCoinTime: 0};
    let timeout = 1000*8
    let gunluk = data.dailyCoinTime
    if (gunluk !== null && timeout - (Date.now() - gunluk) > 0) {
        let time = ms(timeout - (Date.now() - gunluk));
        message.reply({ content:`:stopwatch: **|** Hata! **${message.author.username}** Bu komutu ${time} sonra kullanabilirsin.`})
	} else {
	limit.set(message.author.id, {dailyCoinTime: Date.now()})
	setTimeout(() => {
		limit.delete(message.author.id)
	}, 1000*8)

       let sec = args[0];
       
        if(!sec || !Number(args[0])) return message.reply({ content:`Kaç dolar ile oynamak istiyorsun?`})
        if(sec >= 50000) return message.reply({ content:"50.000 dolardan fazla bir dolar ile oyun oynamayazsın"})

    let res = await stfu.findOne({guildID: message.guild.id, userID: message.author.id})
    if(!res.dolar) return message.reply(`Hiç doların yok!`) 
    if(res.dolar < sec) return message.reply({ content:`:no_entry: | **${message.author.username}**, Yeterli miktar da paran yoktur!\nBelirttiğin miktarda dolar ile oynayabilmek için \`${sec - res.dolar}\` daha dolar ihtiyacın var. Dolarınız: (**${res.dolar}** ${altin})`}) 
    let carpma = sec * 2

            let mesaj = await message.reply({ content:`
**Bahis Devam Ediyor!** ${altin2}
\` ${carpma} Market Parası \` için bahis döndürülüyor!

Belirlenen Miktar: \` ${sec} Market Parası \``})

            let randomizeCoinCal = Math.floor(Math.random() * 10) + 1;
            if(randomizeCoinCal <= 5) {
            await stfu.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { dolar: -sec } }, { upsert: true });
            setTimeout(() => { 
              mesaj.edit({ content:`
**Bahis Bitti!** ${altin}
\` ${carpma} Market Parası \` için bahis döndürülme durdu ve kaybettin!

:x: **Kaybettin!** Bu oyunu kazanamadın!
Kaybedilen Miktar: \` ${sec} Market Parası \``})
            }, 2000)
            } else {
            await stfu.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { dolar: +carpma } }, { upsert: true });
            setTimeout(() => { 
              mesaj.edit({ content:`
**Bahis Bitti!** ${altin}
\` ${carpma} Market Parası \` için bahis döndürülme durdu ve kazandın!
             
:tada: **Tebrikler!** Bu oyunu kazandın!
Kazanılan Miktar: \` ${carpma} Market Parası \``})
            }, 2000)
              
            }
}
}}
