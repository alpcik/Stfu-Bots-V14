const { PermissionsBitField, ComponentType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const coin = require("../../../../src/schemas/coin");
const ceza = require("../../../../src/schemas/ceza");
const cezapuan = require("../../../../src/schemas/cezapuan")
const vmuteLimit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms");
const conf = require("../../../../src/configs/sunucuayar.json")
const stfucum = require("../../../../../../stfu_config.json");
const { red, green, Mute, revusome, kirmiziok } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["vmute","voicemute"],
    name: "vmute",
    help: "vmute <@stfu/ID> <Süre> <Sebep>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.vmuteHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react("❌")
    message.channel.send({content: "Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
    message.react("❌")
    message.channel.send({content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (conf.voiceMute.some(x => member.roles.cache.has(x))) 
    {
    message.react("❌")
    message.channel.send({content: "Bu üye zaten susturulmuş!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (message.member.roles.highest.position <= member.roles.highest.position) 
    {
    message.react("❌")
    message.channel.send({content:"Kendinle aynı yetkide ya da daha yetkili olan birini susturamazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!member.manageable) 
    {
    message.react("❌")
    message.channel.send({ content:"Bu üyeyi susturamıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (stfucum.Bots.voicemutelimit > 0 && vmuteLimit.has(message.author.id) && vmuteLimit.get(message.author.id) == stfucum.Bots.voicemutelimit) 
    {
    message.react("❌")
    message.channel.send({ content:"Saatlik susturma sınırına ulaştın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

    const yazı = [] 
    if(member.user.username.length > 15) {
    let stfuux = member.user.username.slice(0, 15)
      yazı.push(`${stfuux}...`)  
    } else {
      yazı.push(`${member.user.tag}`)
    }

    const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('vmute')
            .setPlaceholder(`${yazı}'n Ses-Mute Atılma Sebebi?`)
            .addOptions([
                { label: 'Kışkırtma, Trol ve Dalgacı Davranış (5 Dakika)', value: 'vmute1', emoji: {id: "997835429447479296"}},
                { label: 'Özel Odalara İzinsiz Giriş ve Trol (1 Saat)', value: 'vmute2', emoji: {id: "997820375389962260"}},
                { label: 'Küfür, Argo, Hakaret ve Rahatsız Edici Davranış (5 Dakika)', value: 'vmute3', emoji: {id: "997820377076076564"}},
                { label: 'Abartı, Küfür ve Taciz Kullanımı (30 Dakika)', value: 'vmute4', emoji: {id: "997820379898843147"}},
                { label: 'Dini, Irki ve Siyasi değerlere Hakaret (2 Hafta)', value: 'vmute5', emoji: {id: "997820365915037776"}},
                { label: 'Sunucu Kötüleme ve Kişisel Hakaret (1 Saat)', value: 'vmute6', emoji: {id: "997835425051848705"}},
                { label: 'Soundpad, Bass gibi Uygulama Kullanmak (30 Dakika)', value: 'vmute7', emoji: {id: "997820370709127188"}},
                { label: `İşlem İptal`, value: 'vmute8', emoji: {id: "909485171240218634"}},
             ]),
    );

    const duration = args[1] ? ms(args[1]) : undefined;
 
    if (duration) {
      const reason = args.slice(2).join(" ") || "Belirtilmedi!";
    
      await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
      await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
      await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
      await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
      await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
      const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
      if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
      member.roles.add(conf.voiceMute);
      if (member.voice.channelId && !member.voice.serverMute) {
        member.voice.setMute(true);
        member.roles.add(conf.voiceMute);
      }
      const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
      message.react("✅")
      if(msg) msg.delete();
      await message.channel.send({ content:`:white_check_mark: ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
       message.react("✅")
      if (stfucum.Bots.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});
  
      const log = new EmbedBuilder()
      .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
      .addFields(
        { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
        { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
        { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
        { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
        )
      .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
      message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
   
      if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
        if (stfucum.Bots.voicemutelimit > 0) {
          if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
          else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
          setTimeout(() => {
            if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
          }, 1000 * 60 * 60);
        }}
    } else if (!duration) {
      var msg = await message.channel.send({ content: `${member.toString()} isimli kullanıcıyı **sesli kanallarda** susturma sebebinizi menüden seçiniz.`, components: [row]})
    }
    
    if (msg) {
    var filter = (xd) => xd.user.id === message.author.id;
    let collector =  msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, time: 30000 })
        
    collector.on("collect", async (interaction) => {
    
    if(interaction.values[0] === "vmute1") {
    await interaction.deferUpdate();
    const duration = "5m" ? ms("5m") : undefined;
    const reason = "Kışkırtma, Trol ve Dalgacı Davranış";

    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    member.roles.add(conf.voiceMute);
    if (member.voice.channelId && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.react("✅")
    if(msg) msg.delete();
    await message.channel.send({ content:`:white_check_mark: ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
     message.react("✅")
    if (stfucum.Bots.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});

    const log = new EmbedBuilder()
    .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
    .addFields(
      { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
      { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
      { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
      { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
      )
    .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
 
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      if (stfucum.Bots.voicemutelimit > 0) {
        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }}
    }
    
    if(interaction.values[0] === "vmute2") {
    await interaction.deferUpdate();
    const duration = "1h" ? ms("1h") : undefined;
    const reason = "Özel Odalara İzinsiz Giriş ve Trol";

    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    member.roles.add(conf.voiceMute);
    if (member.voice.channelId && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.react("✅")
    if(msg) msg.delete();
    await message.channel.send({ content:`:white_check_mark: ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
     message.react("✅")
    if (stfucum.Bots.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});

    const log = new EmbedBuilder()
    .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
    .addFields(
      { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
      { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
      { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
      { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
      )
    .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
 
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      if (stfucum.Bots.voicemutelimit > 0) {
        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }}
    }
    
    if(interaction.values[0] === "vmute3") {
    await interaction.deferUpdate();
    const duration = "5m" ? ms("5m") : undefined;
    const reason = "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış";

    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    member.roles.add(conf.voiceMute);
    if (member.voice.channelId && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.react("✅")
    if(msg) msg.delete();
    await message.channel.send({ content:`:white_check_mark: ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
     message.react("✅")
    if (stfucum.Bots.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});

    const log = new EmbedBuilder()
    .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
    .addFields(
      { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
      { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
      { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
      { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
      )
    .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
 
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      if (stfucum.Bots.voicemutelimit > 0) {
        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }}
    }

    if(interaction.values[0] === "vmute4") {
    await interaction.deferUpdate();
    const duration = "30m" ? ms("30m") : undefined;
    const reason = "Abartı, Küfür ve Taciz Kullanımı";

    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    member.roles.add(conf.voiceMute);
    if (member.voice.channelId && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.react("✅")
    if(msg) msg.delete();
    await message.channel.send({ content:`:white_check_mark: ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
     message.react("✅")
    if (stfucum.Bots.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});

    const log = new EmbedBuilder()
    .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
    .addFields(
      { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
      { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
      { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
      { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
      )
    .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
 
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      if (stfucum.Bots.voicemutelimit > 0) {
        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }}
    }
    
    if(interaction.values[0] === "vmute5") {
    await interaction.deferUpdate();
    const duration = "2w" ? ms("2w") : undefined;
    const reason = "Dini, Irki ve Siyasi değerlere Hakaret";

    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    member.roles.add(conf.voiceMute);
    if (member.voice.channelId && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.react("✅")
    if(msg) msg.delete();
    await message.channel.send({ content:`:white_check_mark: ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
     message.react("✅")
    if (stfucum.Bots.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});

    const log = new EmbedBuilder()
    .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
    .addFields(
      { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
      { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
      { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
      { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
      )
    .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
 
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      if (stfucum.Bots.voicemutelimit > 0) {
        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }}
    }
    
    if(interaction.values[0] === "vmute6") {
    await interaction.deferUpdate();
    const duration = "1h" ? ms("1h") : undefined;
    const reason = "Sunucu Kötüleme ve Kişisel Hakaret";

    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    member.roles.add(conf.voiceMute);
    if (member.voice.channelId && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.react("✅")
    if(msg) msg.delete();
    await message.channel.send({ content:`:white_check_mark: ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
     message.react("✅")
    if (stfucum.Bots.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});

    const log = new EmbedBuilder()
    .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
    .addFields(
      { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
      { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
      { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
      { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
      )
    .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
 
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      if (stfucum.Bots.voicemutelimit > 0) {
        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }}
    }
    
    if(interaction.values[0] === "vmute7") {
    await interaction.deferUpdate();
    const duration = "30m" ? ms("30m") : undefined;
    const reason = "Soundpad, Bass gibi Uygulama Kullanmak";

    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    member.roles.add(conf.voiceMute);
    if (member.voice.channelId && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.react("✅")
    if(msg) msg.delete();
    await message.channel.send({ content:`:white_check_mark: ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
     message.react("✅")
    if (stfucum.Bots.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});

    const log = new EmbedBuilder()
    .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
    .addFields(
      { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
      { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
      { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
      { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
      )
    .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
 
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      if (stfucum.Bots.voicemutelimit > 0) {
        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }}
    }
    
    if(interaction.values[0] === "vmute8") {
    await interaction.deferUpdate();
    if(msg) msg.delete();
    interaction.followUp({ content: `:white_check_mark: Sesli Susturma işlemi başarıyla iptal edildi.`, ephemeral: true });
    }
    })
    }
      },
    };

