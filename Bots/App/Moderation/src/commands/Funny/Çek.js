const { PermissionsBitField, ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const moment = require("moment");
moment.locale("tr");
const stfuayar = require('../../../../src/configs/sunucuayar.json')
const { green, red } = require("../../../../src/configs/emojis.json")
const client = global.bot;
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["çek"],
    name: "çek",
    help: "çek <@stfu/ID>",
    category: "kullanıcı",
  },

  run: async (client, message, args, embed, prefix) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (!message.member.voice.channel) {
      return message.reply({ content: "Bir ses kanalında olmalısın!" });
  }
    if (!member) {
      return message.reply({ content: "Bir üye etiketle ve tekrardan dene!" });
  }
    if (!member.voice.channel) {
      return message.reply({ content: "Bu kullanıcı herhangi bir ses kanalında bulunmuyor!" });
  }
    if (message.member.voice.channel === member.voice.channel) {
      return message.reply({ content: "Zaten aynı kanaldasınız!" });
  }

  const row = new ActionRowBuilder()
  .addComponents(

  new ButtonBuilder()
  .setCustomId("onay")
  .setLabel("Kabul Et")
  .setStyle(ButtonStyle.Success)
  .setEmoji("915754671728132126"),

  new ButtonBuilder()
  .setCustomId("red")
  .setLabel("Reddet")
  .setStyle(ButtonStyle.Danger)
  .setEmoji("920412153712889877"),
  );


  const row2 = new ActionRowBuilder()
  .addComponents(
  new ButtonBuilder()
  .setCustomId("onayy")
  .setLabel("İşlem Başarılı")
  .setStyle(ButtonStyle.Success)
  .setDisabled(true),
  );
  
  const row3 = new ActionRowBuilder()
  .addComponents(
  new ButtonBuilder()
  .setCustomId("redd") 
  .setLabel("İşlem Başarısız")
  .setStyle(ButtonStyle.Danger)
  .setDisabled(true),
  );


    if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      member.voice.setChannel(message.member.voice.channel.id);
      message.react("✅")
      message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })).setDescription(`${message.author}, ${member} kişisini yanınıza taşıdınız.`)] });
      const log = embed
        .setDescription(`
      Bir Transport işlemi gerçekleşti.
    
      Odaya Taşınan Kullanıcı: ${member} - \`${member.id}\`
      Odasına Taşıyan Yetkili: ${message.author} - \`${message.author.id}\``)
      .setFooter({ text: `${moment(Date.now()).format("LLL")}`})
      client.channels.cache.find(x => x.name == "voice_log").wsend({ embeds: [log] });
    } else {

      let stfu = new EmbedBuilder()  
        .setDescription(`${member}, ${message.author} \`${message.member.voice.channel.name}\` odasına seni çekmek istiyor. Kabul ediyor musun?`)
        .setFooter({ text: `30 saniye içerisinde işlem iptal edilecektir.`})
        .setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL({ dynamic: true }) })

      let msg = await message.channel.send({ content: `${member}`, embeds: [stfu], components: [row] })

      var filter = button => button.user.id === member.user.id;

      let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

      collector.on("collect", async (button) => {

        if (button.customId === "onay") {
          await button.deferUpdate();

          const embeds = new EmbedBuilder()
            .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true }) })
            .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) })
            .setTimestamp()
            .setDescription(`${message.author}, ${member} kişisini yanınıza taşıdınız.`)
          member.voice.setChannel(message.member.voice.channel.id);
          msg.edit({ embeds: [embeds], components: [row2] })
        }

        if (button.customId === "red") {
          await button.deferUpdate();

          const embedss = new EmbedBuilder()
            .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
            .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
            .setTimestamp()
            .setDescription(`${message.author}, ${member} yanına taşıma işlemi iptal edildi.`)
          msg.edit({ embeds: [embedss], components: [row3] })
        }

      });
    }
  }
}