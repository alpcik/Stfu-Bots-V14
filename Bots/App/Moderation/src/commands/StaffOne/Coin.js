const { Discord, EmbedBuilder, AttachmentBuilder, ClientUser } = require("discord.js");
const dolar = require("../../../../src/schemas/dolar");
const Canvas = require("canvas")
const { altin2, kirmiziok } = require("../../../../src/configs/emojis.json");

const { registerFont } = require("canvas");
registerFont('./MarlinGeo-Black.otf', { family: 'Marlin Geo Black' })

module.exports = {
    conf: {
      aliases: ["cash","para"],
      name: "para",
      help: "para",
      category: "market",
    },

    run: async (client, message, args,embed) => {
let dolarData = await dolar.findOne({ guildID: message.guild.id, userID: message.author.id });  
if (!dolarData || dolarData && !dolarData.hesap.length) return await message.reply({ content: `Komutu kullanabilmek için Hesap oluşturmanız gerekmektedir. ${kirmiziok} \` !hesapoluştur \``})
if (!dolarData || dolarData && !dolarData.dolar) return await message.reply({ content: `Komutu kullanabilmek için coine ihtiyacınız var. Günlük coininizi almadıysanız ${kirmiziok} \` !daily \``})

  const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 70;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
};
    const canvas = Canvas.createCanvas(388, 234);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/938786568175513660/990564563441307698/card-stfucum.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font ='20px "Marlin Geo Black"',
    ctx.fillStyle = '#cac8c8';
    ctx.fillText(`${member.id}`, canvas.width / 6, canvas.height / 1.15);

    ctx.font ='30px "Marlin Geo Black"',
    ctx.fillStyle = '#cac8c8';
    ctx.fillText(`${dolarData ? Math.floor(parseInt(dolarData.dolar)) : 0} Dolar`, canvas.width / 4, canvas.height / 1.60);

    const avatar = await Canvas.loadImage(member.displayAvatarURL({ extension: 'png' }));
 ctx.save();
    roundedImage(ctx, 145, 20, 80, 80, 25);
    ctx.clip();
  ctx.drawImage(avatar, 145, 20, 80, 80);
  ctx.closePath();

    // Clip off the region you drew on
    ctx.clip();

  function roundedImage(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

  const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'stfucum.png'});
  message.channel.send({ content: `[ __${member}__ ] kişisinin bakiyesi ;`, files: [attachment]})
}
    }