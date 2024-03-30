const Canvas = require("canvas");
const { AttachmentBuilder, PermissionsBitField } = require("discord.js") 
const conf = require("../../../../src/configs/sunucuayar.json");
const voiceUserParent = require("../../../../src/schemas/voiceUserParent");
const messageUser = require("../../../../src/schemas/messageUser");
const voiceUser = require("../../../../src/schemas/voiceUser"); 
const toplams = require("../../../../src/schemas/toplams");
const inviterSchema = require("../../../../src/schemas/inviter");
const moment = require('moment');
require("moment-duration-format");
moment.locale('tr');

const { registerFont } = require("canvas");
registerFont('./MarlinGeo-Black.otf', { family: 'Marlin Geo Black' })
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
    conf: {
      aliases: ["profil","kart","stfu"],
      name: "profil",
      help: "profil",
      category: "stat",
    },
  
run: async (client, message, args, embed, prefix) => {
  let kanallar = ayar.KomutKullanımKanalİsim;
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

  const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const messageWeekly = messageData ? messageData.weeklyStat : 0;
    const messageDaily = messageData ? messageData.dailyStat : 0;
 
    const toplamData = await toplams.findOne({ guildID: message.guild.id, userID: member.user.id });


const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;

        const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dk]");
      };
      
       
  const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    let fontSize = 70;

    do {
        ctx.font = `${fontSize -= 10}px sans-serif`;
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
};
const canvas = Canvas.createCanvas(600, 700);
    const ctx = canvas.getContext('2d');

 let stfuingo = ['https://media.discordapp.net/attachments/938786568175513660/938786691202830386/Untitled_design.png?width=405&height=473','https://media.discordapp.net/attachments/938786568175513660/938786691559358474/Untitled_design_1.png?width=405&height=473','https://media.discordapp.net/attachments/938786568175513660/938786703093694464/Untitled_design_3.png?width=405&height=473','https://media.discordapp.net/attachments/938786568175513660/938786703362097172/Untitled_design_4.png?width=405&height=473']
 let stfu = Math.floor((Math.random() * stfuingo.length));

    const background = await Canvas.loadImage(stfuingo[stfu]);  
    ctx.save();
    roundedImage(ctx, 0, 0, 600, 700, 50);
    ctx.clip();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.closePath();

    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);


 

  const yazı = [] 
  if(member.user.username.length > 8) {
    let stfuux = member.user.username.slice(0, 8)
     yazı.push(`${stfuux}...`)  
        } else {
    yazı.push(`${member.user.username}`)
            }
 

    ctx.font = '34px "Marlin Geo Black"',
    ctx.fillStyle = '#e0e0e0';
    ctx.fillText(`${yazı} Sunucu Verileri`, canvas.width / 6.7, canvas.height / 3.7);

    ctx.font = '30px "Marlin Geo Black"',
    ctx.fillStyle = '#e0e0e0';
    ctx.fillText(`Ses & Yazı İstatistikleri`, canvas.width / 4.6, canvas.height / 3.05);

    ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`◂ Toplam: ${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dk]")}.Ses & ${messageData ? messageData.topStat : 0} Yazı ▸`, canvas.width / 6.7, canvas.height / 2.67);
  
  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`  ▸ Public Kanallar:`, canvas.width / 15, canvas.height / 2.30);

  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`  ▸ Streamer Odalar:`, canvas.width / 15, canvas.height / 2.03);

  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`  ▸ Kayıt Odaları:`, canvas.width / 15, canvas.height / 1.82);

  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`  ▸ Secret of Immortal:`, canvas.width / 15, canvas.height / 1.65);

  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`  ▸ Alone of Immortal:`, canvas.width / 15, canvas.height / 1.50);

  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`  ▸ Terapi/Sorun Çözme Odaları:`, canvas.width / 15, canvas.height / 1.37);

  ctx.font = '24px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`   Yazı İstatistiği:`, canvas.width / 15, canvas.height / 1.24);

  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`  ▸ Haftalık Yazı:`, canvas.width / 15, canvas.height / 1.16);

  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`  ▸ Günlük Yazı:`, canvas.width / 15, canvas.height / 1.10);



  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`${await category(conf.publicParents)}.`, canvas.width / 1.45, canvas.height / 2.30);

  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`${await category(conf.funParents)}.`, canvas.width / 1.45, canvas.height / 2.05);

  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`${await category(conf.registerParents)}.`, canvas.width / 1.45, canvas.height / 1.82);

  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`${await category(conf.privateParents)}.`, canvas.width / 1.45, canvas.height / 1.65);

  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`${await category(conf.aloneParents)}.`, canvas.width / 1.45, canvas.height / 1.50);

  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`${await category(conf.solvingParents)}.`, canvas.width / 1.45, canvas.height / 1.37);
 
  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`${Number(messageWeekly).toLocaleString()} Yazı`, canvas.width / 1.45, canvas.height / 1.16);

  ctx.font = '20px "Marlin Geo Black"',
  ctx.fillStyle = '#e0e0e0';
  ctx.fillText(`${Number(messageDaily).toLocaleString()} Yazı`, canvas.width / 1.45, canvas.height / 1.10);


const avatar = await Canvas.loadImage(member.displayAvatarURL({ extension: 'png' }));
  ctx.save();
  roundedImage(ctx, 235, 25, 125, 125, 25);
  ctx.clip();
  ctx.drawImage(avatar, 235, 25, 125, 125);
  ctx.closePath();
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
  message.reply({ content:`> **[** \`${member.user.tag}\` **]** kullanıcısının sunucu veri kartı!`, files:  [attachment]})
     }}