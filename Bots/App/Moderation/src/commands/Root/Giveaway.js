const { PermissionsBitField, ButtonStyle, Discord, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const stfucum = require("../../../../../../stfu_config.json");
const giveaway = require('../../../../src/schemas/giveaway.js')
const { green, red, cekilis } = require("../../../../src/configs/emojis.json")
const moment = require("moment");
const ms = require("ms")

module.exports = {
  conf: {
    aliases: ["giveaway", "gstart", "ç"],
    name: "çekiliş",
    help: "çekiliş [sure] [kazanan sayisi] [ödül]",
    category: "sahip"
  },

  run: async (client, message, args) => {

    if (
      !message.member.permissions.has(PermissionsBitField.Flags.ManageMessages) &&
      !message.member.roles.cache.some(r => r.name === "Sponsor")
    ) {
      return message.reply({ content: `:x: Çekiliş başlatmak için Sponsor yada Mesaj Yönet yetkisine sahip olmalısın.`});
    }

    let zaman = args[0]
    let kazanan = args[1]
    let odul = args.slice(2).join(" ");
    let arr = [];
    if (!zaman) return message.reply({ content: `:x: Lütfen komutu doğru kullanın! \`.çekiliş 10m 1 Spotify\`` })
    if (!kazanan) return message.reply({ content: `:x: Lütfen komutu doğru kullanın! \`.çekiliş 10m 1 Spotify\`` })
    if (isNaN(kazanan)) return message.reply({ content: `:x: Lütfen komutu doğru kullanın! \`.çekiliş 10m 1 Spotify\`` })
    if (!odul) return message.reply({ content: `:x: Lütfen komutu doğru kullanın! \`.çekiliş 10m 1 Spotify\`` })
    let sure = ms(zaman)
    let kalan = Date.now() + sure
    if (message) message.delete();

      let xd = new ButtonBuilder()
      .setCustomId("katil")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("1220734076185608192")
      .setLabel(`${arr.length}`)
    
      const row = new ActionRowBuilder()
      .addComponents([ xd ]);

let msg = await message.channel.send({ content: `:tada: **ÇEKİLİŞ BAŞLADI!!!** :tada:`,
embeds: [
new EmbedBuilder()
.setTitle(`${odul}`)
.setFooter({ text : `Kazanacak kişi sayısı: ${kazanan} | Bitiş Süresi • ${moment(kalan).format("LLL")}` })
.setDescription(`
Katılmak için butona tıklayın!
Süre: <t:${Math.floor(kalan / 1000)}:R> (<t:${Math.floor(kalan / 1000)}:f>)
Başlatan : ${message.author}
`)], components: [row]
    })

    setTimeout(() => {
      if (arr.length <= 1) {
      if (msg) msg.edit({
embeds: [
new EmbedBuilder()
.setTitle(`${odul}`)
.setDescription(`
Çekilişe katılım olmadığından çekiliş iptal edildi!
`)], components: []
        })
        return;
      }
let random = arr[Math.floor(Math.random() * arr.length)]
message.channel.send({ content: `<@${random}> tebrikler kazandın!` })
if (msg) msg.edit({
embeds: [
new EmbedBuilder()
.setTitle(`${odul}`)
.setFooter({ text : `Katılımcı Sayısı: ${arr.length}` })
.setDescription(`
:tada: Çekiliş Sonuçlandı!
Çekilişi Başlatan : ${message.author}
  
Kazanan Katılımcı : <@${random}>
`)], components: []
      })
    }, sure)

    let collector = await msg.createMessageComponentCollector({})
    collector.on("collect", async (button) => {
      button.deferUpdate(true)
      if (button.customId == "katil") {
        let tikdata = await giveaway.findOne({ messageID: button.message.id })
        if (tikdata?.katilan.includes(button.member.id)) return;
        await giveaway.findOneAndUpdate({ messageID: button.message.id }, { $push: { katilan: button.member.id } }, { upsert: true })
        arr.push(button.member.id)
        let stfucum = tikdata?.katilan.length + 1 || 1
        xd.setLabel(`${stfucum}`)

        if (msg) msg.edit({
embeds: [
new EmbedBuilder()
.setTitle(`${odul}`)
.setFooter({ text : `Kazanacak kişi sayısı: ${kazanan} | Bitiş Süresi • ${moment(kalan).format("LLL")}` })
.setDescription(`
Katılmak için butona tıklayın!
Süre: <t:${Math.floor(kalan / 1000)}:R> (<t:${Math.floor(kalan / 1000)}:f>)
Başlatan : ${message.author}
Son Katılan Üye: ${button.member}
`)], components: [row]
        })
      }
    })
  },
};