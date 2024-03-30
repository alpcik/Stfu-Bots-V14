const { ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js");
const coin = require("../../../../src/schemas/coin");
const taggeds = require("../../../../src/schemas/taggeds");
const tagli = require("../../../../src/schemas/taggorev");
const conf = require("../../../../src/configs/sunucuayar.json")
const stfucum = require("../../../../../../stfu_config.json");
const { red, green} = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["tag-aldır", "taglıaldır", "taglı"],
    name: "tagaldır",
    help: "tagaldır <@stfu/ID>",
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
    if (!member.user.username.includes(conf.tag)) 
    { 
    message.channel.send({ content:"Bu üye taglı değil!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const taggedData = await taggeds.findOne({ guildID: message.guild.id });
    if (taggedData && taggedData.oldTagged.some(x => x === member.id )) { 
    message.channel.send({ content: `${member.toString()} isimli üye zaten bir başkası tarafından taglı olarak belirlenmiş.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
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

    const taglıembed = new EmbedBuilder() 
    .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
    .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
    .setFooter({ text: `60 saniye içerisinde butonlara basılmazsa işlem iptal edilecektir.`, iconURL: message.author.avatarURL({ dynamic: true })})
    .setDescription(`${member.toString()}, ${message.member.toString()} üyesi sana tag aldırmak istiyor. Kabul ediyor musun?`)

    const msg = await message.reply({ content: `${member.toString()}`, embeds: [taglıembed], components: [row]});


var filter = button => button.user.id === member.user.id;

let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })

    collector.on("collect", async (button) => {

      if(button.customId === "onay") {
        await button.deferUpdate();
      
      const embeds = new EmbedBuilder() 
      .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
      .setTimestamp()
      .setDescription(`${message.author}, ${member.toString()} Adlı kullanıcı senin taglı aldırma isteğini onayladı. :white_check_mark:`)
            
      await coin.findOneAndUpdate({ guildID: member.guild.id, userID: message.author.id }, { $inc: { coin: stfucum.Bots.taggedCoin } }, { upsert: true });
      await tagli.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { tagli: 1 } }, { upsert: true });
      await taggeds.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { taggeds: member.user.id } }, { upsert: true });
      await taggeds.findOneAndUpdate({ guildID: message.guild.id }, { $push: { oldTagged: member.user.id } }, { upsert: true });

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
      .setDescription(`${message.author}, ${member} Adlı kullanıcı senin taglı aldırma isteğini onaylamadı. :x:`)
      
      msg.edit({
        embeds: [embedss],
        components : [row3]
      })
          }
       });

  }
}