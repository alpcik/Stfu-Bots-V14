const { ButtonStyle, EmbedBuilder, Client, Message, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const Discord = require('discord.js');
const dolar = require("../../../../src/schemas/dolar")
const conf = require("../../../../src/configs/sunucuayar.json")
const stfucum = require("../../../../../../stfu_config.json");
const { red, green, star, kirmiziok } = require("../../../../src/configs/emojis.json")
const table = require("table");
const client = global.bot;
module.exports = {
    conf: {
      aliases: ["market","shop"],
      name: "market",
      help: "market",
      category: "market",
    },

 run: async (client, message, embed) => {

  let dolarData = await dolar.findOne({ guildID: message.guild.id, userID: message.author.id });  
  if (!dolarData || dolarData && !dolarData.dolar) return await message.reply({ content: `Komutu kullanabilmek için coine ihtiyacınız var. Günlük coininizi almadıysanız ${kirmiziok} \` !daily \``})

  let spotify = new ButtonBuilder()
  .setStyle(ButtonStyle.Success)
  .setLabel("Spotify Premium")
  .setCustomId("stfuspotify")
  .setEmoji("941993326700265512")

  let netflix = new ButtonBuilder()
  .setStyle(ButtonStyle.Success)
  .setLabel("Netflix UHD")
  .setCustomId("stfunetflix")
  .setEmoji("941993358518284298")

  let youtube = new ButtonBuilder()
  .setStyle(ButtonStyle.Success)
  .setLabel("Youtube Premium")
  .setCustomId("stfuyoutube")
  .setEmoji("941993963013935115")

  let cnitro = new ButtonBuilder()
  .setStyle(ButtonStyle.Success)
  .setLabel("Discord Classic Nitro")
  .setCustomId("stfucnitro")
  .setEmoji("941993712978890752")

  let bnitro = new ButtonBuilder()
  .setStyle(ButtonStyle.Success)
  .setLabel("Discord Boost Nitro")
  .setCustomId("stfubnitro")
  .setEmoji("941993742934614047")

  var çıkış = new ButtonBuilder()
  .setStyle(ButtonStyle.Danger)
  .setLabel('Market Çıkış')
  .setCustomId('çıkış')
  .setEmoji("920412153712889877");


 if (dolarData.dolar > 40000) {
    spotify.setStyle(ButtonStyle.Success);
  } else {
    spotify.setStyle(ButtonStyle.Secondary).setDisabled(true);
  }

 if (dolarData.dolar > 50000) {
    netflix.setStyle(ButtonStyle.Success);
  } else {
    netflix.setStyle(ButtonStyle.Secondary).setDisabled(true);
  }

 if (dolarData.dolar > 60000) {
    youtube.setStyle(ButtonStyle.Success);
  } else {
    youtube.setStyle(ButtonStyle.Secondary).setDisabled(true);
  }

 if (dolarData.dolar > 125000) {
    cnitro.setStyle(ButtonStyle.Success);
  } else {
    cnitro.setStyle(ButtonStyle.Secondary).setDisabled(true);
  }

 if (dolarData.dolar > 150000) {
    bnitro.setStyle(ButtonStyle.Success);
  } else {
    bnitro.setStyle(ButtonStyle.Secondary).setDisabled(true);
  }


   const market = new ActionRowBuilder()
  .addComponents([ spotify, netflix, youtube ]);

   const market2 = new ActionRowBuilder()
  .addComponents([ cnitro, bnitro, çıkış ]);


  let urundata = [
        { Id: "1", urunAdi: "Spotify Premium", urunDetayi: "1 Ay", urunFiyati: "40000"},
        { Id: "2", urunAdi: "Netflix UHD", urunDetayi: "1 Ay", urunFiyati: "50000"},
        { Id: "3", urunAdi: "Youtube Premium", urunDetayi: "3 Ay", urunFiyati: "60000"},
        { Id: "4", urunAdi: "Discord Classic Nitro", urunDetayi: "1 Ay", urunFiyati: "125000"},
        { Id: "5", urunAdi: "Discord Boostlu Nitro", urunDetayi: "1 Ay", urunFiyati: "150000"}
    ]

    let urunler = [["ID", "Ürün İsmi", "Ürün Detayı" ,"Ürün Fiyatı"]];
       urunler = urunler.concat(urundata.map(value => { 
         let urunfiyatioku = `${value.urunFiyati} 💵`	
          return [
          `#${value.Id}`,
          `${value.urunAdi}`,
          `${value.urunDetayi}`,
          `${urunfiyatioku}`
        ]
    }))


    let stfu = new EmbedBuilder()
.setDescription(`\n🤑 **${message.guild.name}** mağazasına hoş geldin ${message.member}, \nBurada kendine çeşitli eşyalar ve sunucumuz için işine yarayabilecek \nbelirli özelliklerden satın alabilirsin.`)
.addFields(
  { name: `:star2: Mağaza (\`Bakiye: ${dolarData ? Math.floor(parseInt(dolarData.dolar)) : 0} 💵\`)`,  value: `\`\`\`css
  ${table.table(urunler, {
    border: table.getBorderCharacters(`void`),
    columnDefault: {
      paddingLeft: 0,
      paddingRight: 1,
  },
  columns: {
    0: {
        paddingLeft: 1
    },
    1: {
        paddingLeft: 1
    },
    2: {
        paddingLeft: 1,
        alignment: "center"
    },
    3: {
        paddingLeft: 1,
        paddingRight: 1,
    },
},

  /**
  * @typedef {function} drawHorizontalLine
  * @param {number} index
  * @param {number} size
  * @return {boolean}
  */

  drawHorizontalLine: (index, size) => {
    return index === 0 || index === 1 || index === size;
}
})}\`\`\``, inline: false },
{ name: `:star2: Ürün nasıl satın alabilirim?`,  value: `Aşağıda beliren butonlardan yeşil olanlara \`30 Saniye\` içerisinde tıklayarak satın alabilirsin.`, inline: false },
  )
   
let stfuingo = await message.channel.send({ embeds: [stfu],  components: [market, market2] });
    var filter = (xd) => xd.user.id === message.author.id;
   
    let collector = await stfuingo.createMessageComponentCollector({filter,  time: 30000 })

      collector.on("collect", async (button) => {

    if (button.customId === "stfuspotify") {
      await button.deferUpdate();

      let spotify = new EmbedBuilder()
.setDescription(`:tada: Tebrikler! Başarıyla \`Spotify Premium\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`)
.setFooter({ text: `Satın Alma İşlemi Başarılı`})
.setTimestamp()
.setAuthor({ name:  message.author.tag, iconURL:  message.author.avatarURL({ dynamic: true })})
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

        client.channels.cache.find(x => x.name == "market_log").send(`${message.author} kişisi \`Spotify Premium\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
         await dolar.findOneAndUpdate({ guildID: stfucum.GuildID, userID: message.author.id }, { $inc: { dolar: -40000 } }, { upsert: true });
         
      stfuingo.edit({ embeds: [spotify], components: []}); 

        }

      if (button.customId === "stfunetflix") {
        await button.deferUpdate();

      let netflix = new EmbedBuilder()
.setDescription(`:tada: Tebrikler! Başarıyla \`Netflix UHD\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`)
.setFooter({ text: `Satın Alma İşlemi Başarılı`})
.setTimestamp()
.setAuthor({ name:  message.author.tag, iconURL:  message.author.avatarURL({ dynamic: true })})
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

client.channels.cache.find(x => x.name == "market_log").send(`${message.author} kişisi \`Netflix UHD\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
         await dolar.findOneAndUpdate({ guildID: stfucum.GuildID, userID: message.author.id }, { $inc: { dolar: -50000 } }, { upsert: true });
         
      stfuingo.edit({ embeds: [netflix], components: []}); 

        }

      if (button.customId === "stfuyoutube") {
        await button.deferUpdate();

      let youtube = new EmbedBuilder()
.setDescription(`:tada: Tebrikler! Başarıyla \`Youtube Premium\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`)
.setFooter({ text: `Satın Alma İşlemi Başarılı`})
.setTimestamp()
.setAuthor({ name:  message.author.tag, iconURL:  message.author.avatarURL({ dynamic: true })})
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

client.channels.cache.find(x => x.name == "market_log").send(`${message.author} kişisi \`Youtube Premium\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
         await dolar.findOneAndUpdate({ guildID: stfucum.GuildID, userID: message.author.id }, { $inc: { dolar: -60000 } }, { upsert: true });

      stfuingo.edit({ embeds: [youtube], components: []}); 

        }

       if (button.customId === "stfucnitro") {
        await button.deferUpdate();

      let cnitro = new EmbedBuilder()
.setDescription(`:tada: Tebrikler! Başarıyla \`Discord Classic Nitro\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`)
.setFooter({ text: `Satın Alma İşlemi Başarılı`})
.setTimestamp()
.setAuthor({ name:  message.author.tag, iconURL:  message.author.avatarURL({ dynamic: true })})
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

client.channels.cache.find(x => x.name == "market_log").send(`${message.author} kişisi \`Classic Nitro\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
         await dolar.findOneAndUpdate({ guildID: stfucum.GuildID, userID: message.author.id }, { $inc: { dolar: -125000 } }, { upsert: true });

      stfuingo.edit({ embeds: [cnitro], components: []}); 

        }

      if (button.customId === "stfubnitro") {
        await button.deferUpdate();

      let bnitro = new EmbedBuilder()
.setDescription(`:tada: Tebrikler! Başarıyla \`Discord Nitro Boost\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`)
.setFooter({ text: `Satın Alma İşlemi Başarılı`})
.setTimestamp()
.setAuthor({ name:  message.author.tag, iconURL:  message.author.avatarURL({ dynamic: true })})
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

client.channels.cache.find(x => x.name == "market_log").send(`${message.author} kişisi \`Boostlu Nitro\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
         await dolar.findOneAndUpdate({ guildID: stfucum.GuildID, userID: message.author.id }, { $inc: { dolar: -150000 } }, { upsert: true });

      stfuingo.edit({ embeds: [bnitro], components: []}); 

        }

      if (button.customId == "çıkış") {
      await stfuingo.delete({ timeout: 1500 });
      }

}
)}

}  
