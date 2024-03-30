const { ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js");
const coin = require("../../../../src/schemas/coin");
const yetkis = require("../../../../src/schemas/yetkis");
const conf = require("../../../../src/configs/sunucuayar.json")
const stfucum = require("../../../../../../stfu_config.json");
const { red, green} = require("../../../../src/configs/emojis.json")
const client = global.bot;
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["yetki-aldır", "yetkialdır", "yetkili"],
    name: "yetki-aldır",
    help: "yetki-aldır <@stfu/ID>",
    category: "yetkili",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!conf.staffs.some(x => message.member.roles.cache.has(x))) return 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.channel.send({ content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const yetkiData = await yetkis.findOne({ guildID: message.guild.id });
    if (yetkiData && yetkiData.oldStaff.some(x => x === member.id )) { 
    message.channel.send({ content: `${member.toString()} isimli üye zaten bir başkası tarafından yetkili olarak belirlenmiş.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

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

    const yetkiliembed = new EmbedBuilder() 
    .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
    .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
    .setFooter({ text: `60 saniye içerisinde butonlara basılmazsa işlem iptal edilecektir.`, iconURL: message.author.avatarURL({ dynamic: true })})
    .setDescription(`${member.toString()}, ${message.member.toString()} üyesi sana yetki vermek istiyor. Kabul ediyor musun?`)

    const msg = await message.reply({ content: `${member.toString()}`, embeds: [yetkiliembed], components: [row]});


var filter = button => button.user.id === member.user.id;

let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })

    collector.on("collect", async (button) => {

      if(button.customId === "onay") {
        await button.deferUpdate();
      
      const embeds = new EmbedBuilder() 
      .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
      .setTimestamp()
      .setDescription(`${message.author}, ${member.toString()} Adlı kullanıcı senin yetki aldırma isteğini onayladı. :white_check_mark:`)
      
      await coin.findOneAndUpdate({ guildID: member.guild.id, userID: message.author.id }, { $inc: { coin: stfucum.Bots.yetkiCoin } }, { upsert: true });       
      await yetkis.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { yetkis: member.user.id } }, { upsert: true });
      await yetkis.findOneAndUpdate({ guildID: message.guild.id }, { $push: { oldStaff: member.user.id }}, {upsert: true});

      client.channels.cache.find(x => x.name == "yetki_log").wsend({ content:`${message.author} \`(${message.author.id})\` kişisi ${member} \`(${member.id})\` kişisini yetkiye aldı! :white_check_mark:`})
      member.roles.add(conf.yetkiRolleri)

      msg.edit({
      embeds: [embeds],
      components : [row2]
      })
      
      }
      
      if(button.customId === "red") {
        await button.deferUpdate();
      
      const embedss = new EmbedBuilder() 
      .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
      .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
      .setTimestamp()
      .setDescription(`${message.author}, ${member} Adlı kullanıcı senin yetki aldırma isteğini onaylamadı. :x:`)
      
      msg.edit({
        embeds: [embedss],
        components : [row3]
      })
          }
       });

  }
}
