const { ButtonStyle, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require('discord.js');
const { red, green, Mute, revusome, kirmiziok, Cezaa, Revuu } = require("../../../../src/configs/emojis.json")
const stfucum = require("../../../../../../stfu_config.json");
const conf = require("../../../../src/configs/sunucuayar.json")
const ceza = require("../../../../src/schemas/ceza");
const forceBans = require("../../../../src/schemas/forceBans");
const cezapuan = require("../../../../src/schemas/cezapuan")
const coin = require("../../../../src/schemas/coin");
const moment = require("moment");
moment.locale("tr");
const ms = require("ms");
const client = global.bot;
const banLimit = new Map();
const humanizeDuration = require('humanize-duration');
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["punish","yoket"],
    name: "punish",
    help: "punish <@stfu/ID>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.banHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react("❌")
    message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return } 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) { message.channel.send({ content:"Bir üye belirtmelisin!"}) 
    message.react("❌")
    return }
    if (message.member.roles.highest.position <= member.roles.highest.position) 
    {
    message.react("❌")
    message.channel.send({ content:"Kendinle aynı yetkide ya da daha yetkili olan birini cezalandıramazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return
    }
    if (!member.manageable) 
    {
    message.react("❌")
    message.channel.send({ content:"Bu üyeye ceza uygulayamıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return
    }

    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: message.author.id });
    const ban = await forceBans.findOne({ guildID: message.guild.id, userID: member.user.id });

const row = new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId("bir").setLabel("1").setStyle(ButtonStyle.Primary),
new ButtonBuilder().setCustomId("iki").setLabel("2").setStyle(ButtonStyle.Primary),
new ButtonBuilder().setCustomId("üç").setLabel("3").setStyle(ButtonStyle.Primary),
new ButtonBuilder().setCustomId("iptal").setLabel("X").setStyle(ButtonStyle.Danger)
);

let stfu = new EmbedBuilder()
.setDescription(`Merhabalar ${message.member.toString()}, aşağıdan cezalandırmak istediğiniz ${member.toString()} adlı kullanıcı için bir cezalandırma şekli seçiniz.

\` 1 \` __Sunucudan kalıcı şekilde yasaklamak.__
\` 2 \` __Sunucu içerisinde cezalandırılma.__
\` 3 \` __Reklamdan dolayı yasaklamak.__

(Sunucu içerisinde mute ve voicemute manuel olarak kullanılmaktadır.)
\`\`\`fix\nDaha Önce Verilen Cezalar :\n(Ban: ${cezaData ? cezaData.BanAmount : 0} - Mute: ${cezaData ? cezaData.MuteAmount : 0} - Ses Mute: ${cezaData ? cezaData.VoiceMuteAmount : 0} - Jail: ${cezaData ? cezaData.JailAmount : 0})\n\`\`\`
    `)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
.setFooter({ text: `Bu cezalandırma şekillerinden birini başlarındaki numarayı tıklayarak seçmek için 1 dakika süreniz mevcuttur.` })

 let msg = await message.channel.send({ embeds: [stfu], components : [row] })

 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })

      collector.on("collect", async (button) => {

if(button.customId === "bir") {
if (ban) {
button.reply({ content :"Bu üye zaten banlı!", ephemeral: true })
return }
const reason = args.slice(1).join(" ") || "Açılmaz Ban";

if (stfucum.Bots.dmMessages) member.send({ content :`**${message.guild.name}** sunucusundan, **${message.author.tag}** tarafından, **${reason}** sebebiyle **kalıcı olarak** banlandınız!`}).catch(() => {});

message.guild.members.ban(member.user.id, { reason }).catch(() => {});
await new forceBans({ guildID: message.guild.id, userID: member.user.id, staff: message.author.id }).save();
const penal = await client.penalize(message.guild.id, member.user.id, "FORCE-BAN", true, message.author.id, reason);

msg.edit({ content :`:white_check_mark: ${member ? member.toString() : member.user.username} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **kalıcı olarak** banlandı! \`(Ceza ID: #${penal.id})\``, embeds: [], components: []})

const log = new EmbedBuilder() 
.setDescription(`
${Cezaa} Banlanan Üye: **${member ? member.toString() : member.user.username}** \`${member.user.id}\`
${Revuu} Banlayan Yetkili: ${message.author} \`${message.author.id}\`
${kirmiziok} Ban Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
message.guild.channels.cache.get(conf.banLogChannel).send({ embeds: [log]});
}

if(button.customId === "iki") {
  await member.disableCommunicationUntil(Date.now() + ms("1d"), `Yetkili: ${message.author.tag}`).catch(console.error);
  msg.edit({ content: `${member} kullanıcısına **${humanizeDuration(ms("1d"), { round: true })}.** timeout cezası uygulandı.`, embeds: [], components:[], ephemeral: true })

}

if(button.customId === "üç") {
  const ban = await client.fetchBan(message.guild, args[0]);
  const reason = args.slice(1).join(" ") || "Reklam";
  if (ban) { message.channel.send({ content:"Bu üye zaten banlı!", ephemeral: true })
  return }
  if (stfucum.Bots.banlimit > 0 && banLimit.has(message.author.id) && banLimit.get(message.author.id) == stfucum.Bots.banlimit) return message.channel.send({ content:"Saatlik ban sınırına ulaştın!", ephemeral: true })

  if (stfucum.Bots.dmMessages) member.send({ content:`**${message.guild.name}** sunucusundan, **${message.author.tag}** tarafından, **Reklam** sebebiyle banlandınız!`}).catch(() => {});
  message.guild.members.ban(member.user.id, { reason: `Reklam | Yetkili: ${message.author.tag}` , days:1}).catch(() => {});
  const penal = await client.penalize(message.guild.id, member.user.id, "BAN", true, message.author.id, reason);

  msg.edit({ content :`:white_check_mark: ${member ? member.toString() : member.user.username} üyesi, ${message.author} tarafından, \`Reklam\` nedeniyle banlandı! \`(Ceza ID: #${penal.id})\``, embeds: [], components: []})

  const log = embed
  .setDescription(`
${Cezaa} Banlanan Üye: **${member ? member.toString() : member.user.username}** \`${member.user.id}\`
${Revuu} Banlayan Yetkili: ${message.author} \`${message.author.id}\`
${kirmiziok} Ban Sebebi: \`Reklam\`
  `)
  .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
  message.guild.channels.cache.get(conf.banLogChannel).send({ embeds: [log]});

await coin.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { coin: -100 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { BanAmount: 1 } }, {upsert: true});
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 100 } }, { upsert: true });

const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi ban cezası alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});


  if (stfucum.Bots.banlimit > 0) {
    if (!banLimit.has(message.author.id)) banLimit.set(message.author.id, 1);
    else banLimit.set(message.author.id, banLimit.get(message.author.id) + 1);
    setTimeout(() => {
      if (banLimit.has(message.author.id)) banLimit.delete(message.author.id);
    }, 1000 * 60 * 60);
  }
}

if(button.customId === "iptal") {
  if(msg) msg.delete().catch({})
  button.reply({ content :"Cezalandırma işlemi başarıyla iptal edildi.", ephemeral: true })
}


})
  },
};
