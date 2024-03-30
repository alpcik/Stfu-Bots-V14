const { green, red} = require("../../../../src/configs/emojis.json")
const Stat = require("../../../../src/schemas/level");
const { Client, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { Canvas } = require('canvas-constructor');
const { loadImage } = require('canvas');
const client = global.bot;
const { registerFont } = require("canvas");
registerFont('./MarlinGeo-Black.otf', { family: 'Marlin Geo Black' })

module.exports = {
    conf: {
      aliases: ["level","seviye"],
      name: "level",
      help: "level",
      category: "stat",
    },
  
run: async (client, message, args, prefix) => {
    if (!message.guild) return;
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		let data = await Stat.findOne({ guildID: message.guild.id, userID: target.id });
        if (!data || data && !data.messageLevel) {
            return message.reply({ content: "Herhangi Bir Seviye veriniz bulunmamaktadır." });
        }
        const yazı = [] 
        if(target.user.username.length > 12) {
        let stfuux = target.user.username.slice(0, 12)
          yazı.push(`${stfuux}..`)  
        } else {
          yazı.push(`${target.user.tag}`)
        }

        let loading = await message.channel.send({ content: `Seviye Verileri Yükleniyor...`})
        const background = await loadImage("https://cdn.discordapp.com/attachments/938786568175513660/993950117621141534/stfucumrank.png")
        const avatar = await loadImage(target.user.displayAvatarURL({ extension: 'png' }));
        const image = new Canvas(478, 180)
        image.printImage(background, 0, 0, 478, 180)
		image.printCircularImage(avatar, 100.5, 64.5, 58.5, 58.5, 5)
        image.setColor("#fff")
		image.setTextFont('36px "Marlin Geo Black"')
        image.printText(`${yazı}`, 8, 170, 150)
        image.setColor("#fff")
		image.setTextFont('14px "Marlin Geo Black"')
        image.printText(`${data.messageLevel} Level`, 380, 110, 150)
        image.setColor("#fff")
		image.setTextFont('14px "Marlin Geo Black"')
        image.printText(`${data.voiceLevel} Level`, 380, 150, 150)
		image.save()
		image.createRoundedClip(214.5, 114, getProgressBarWidth(data.messageXP, data.messageLevel*643, 232), 17, 25)
        image.setColor("#fffa00")
        image.fill()
        image.restore()
		image.setColor("#5238fc")
		image.setTextFont('12px LEMON MILK Bold')
        image.printText(`${data.messageXP}/${data.messageLevel*643} XP`, 220, 128, 150)
		image.createRoundedClip(214.5, 153.5, getProgressBarWidth(data.voiceXP, data.voiceLevel*643, 232), 17, 25)
        image.setColor("#fffa00")
		image.fill()
		image.restore()
        image.setColor("#5238fc")
		image.setTextFont('12px LEMON MILK Bold')
        image.printText(`${data.voiceXP}/${data.voiceLevel*643} XP`, 220.5, 168, 150)
        loading.delete();
        const attachment = new AttachmentBuilder(image.toBuffer(), { name: 'stfucum.png'});
        message.channel.send({ content: `> **[** \`${target.user.tag}\` **]** kullanıcısının sunucu level kartı!`, files:  [attachment] });
}
};
  
function getProgressBarWidth(currentXP, requiredXP, maxWidth) {
    if ((currentXP+0.1) > requiredXP) return maxWidth;
    let width = currentXP <= 0 ? 0 : ((currentXP+0.1) * maxWidth) / requiredXP;
    if (width > maxWidth) width = maxWidth;
    return width;
}