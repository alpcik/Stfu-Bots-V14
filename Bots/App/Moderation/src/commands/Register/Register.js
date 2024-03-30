const { PermissionsBitField, ButtonStyle, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const coin = require("../../../../src/schemas/coin");
const ayar = require("../../../../src/configs/sunucuayar.json")
const toplams = require("../../../../src/schemas/toplams");
const kayitg = require("../../../../src/schemas/kayitgorev");
const stfucum = require("../../../../../../stfu_config.json");
const { red , green } = require("../../../../src/configs/emojis.json")
const isimler = require("../../../../src/schemas/names");
const regstats = require("../../../../src/schemas/registerStats");
const otokayit = require("../../../../src/schemas/otokayit");
const moment = require("moment")
moment.locale("tr")
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["kayit", "kayıt", "kadın", "Kadın", "k", "kadin", "Kadin", "Woman", "kız", "Kız", "erkek", "Erkek", "e", "ERKEK", "Man", "man"],
    name: "kayıt",
    help: "kayıt <ID> <Isim> <Yaş>",
    category: "kayıt",
  },
  
run: async (client, message, args, embed, prefix) => { 
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!ayar.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !ayar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
    message.react("❌")
    message.reply({ content:`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!uye) 
    {
    message.react("❌")
    message.reply({ content:`\`${prefix}kayıt <ID> <Isim> <Yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(message.author.id === uye.id) 
    {
    message.react("❌")
    message.reply({ content:`Kendini kayıt edemezsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!uye.manageable) 
    {
    message.react("❌")
    message.reply({ content:`Böyle birisini kayıt edemiyorum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(message.member.roles.highest.position <= uye.roles.highest.position) 
    {
    message.react("❌")
    message.reply({ content:`Senden yüksekte olan birisini kayıt edemezsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || "";
    if(!isim && !yaş) 
    {
    message.react("❌")
    message.reply({ content:`\`${prefix}kayıt <ID> <Isim> <Yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

   const tagModedata = await regstats.findOne({ guildID: message.guild.id })
    if (tagModedata && tagModedata.tagMode === true) {
    if(!uye.user.username.includes(ayar.tag) && !uye.roles.cache.has(ayar.vipRole) && !uye.roles.cache.has(ayar.boosterRolu)) return message.reply({ embeds: [embed.setDescription(`${uye.toString()} isimli üyenin kullanıcı adında tagımız (\` ${ayar.tag} \`) olmadığı, <@&${ayar.boosterRolu}>, <@&${ayar.vipRole}> Rolü olmadığı için isim değiştirmekden başka kayıt işlemi yapamazsınız.`)] });
    }

    if(!yaş) 
    { setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim}`;
    } else { setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim} | ${yaş}`;
  }

    uye.setNickname(`${setName}`).catch(err => message.reply({ content:`İsim çok uzun.`}))
    const datas = await regstats.findOne({ guildID: message.guild.id, userID: message.member.id });
    const pubCategory = message.guild.channels.cache.filter((x) => x.parentId && x.parentId === ayar.publicParents);

    if(ayar.erkekRolleri.some(x => uye.roles.cache.has(x)) || ayar.kizRolleri.some(y => uye.roles.cache.has(y))) {
    message.react("❌")
    message.reply({ content: `Bu üye zaten kayıtlı durumda yanlış kayıt ettiyseniz eğer kayıtsız atarak tekrar kayıt edebilirsiniz.`, ephemeral: true }); 
    return }
    
    const row = new ActionRowBuilder()
		.addComponents( 
    new ButtonBuilder().setCustomId("MAN").setLabel("Erkek").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("WOMAN").setLabel("Kadın").setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId("İPTAL").setLabel("İptal").setStyle(ButtonStyle.Secondary),
	);

    let erkekRol = ayar.erkekRolleri;
    let kadinRol = ayar.kizRolleri;

message.react("✅")
let stfu = new EmbedBuilder()
.setDescription(`
${uye.toString()} üyesinin ismi "${setName}" olarak değiştirildi, bu üye daha önce bu isimlerle kayıt olmuş.

üyesinin toplamda **${data ? `${data.names.length}` : "0"}** isim kayıtı bulundu
${data ? data.names.splice(-3).map((x, i) => `\` ${i + 1} \` \` ${x.name} \` ${x.sebep ? `(${x.sebep})` : ""} ${x.rol ? `(${x.rol})` : ""}`).join("\n") : "Daha önce kayıt olmamış."}

Üyesinin önceki isimlerine \`.isimler <@stfu/ID>\` komutundan bakarak kayıt işlemini gerçekleştirmeniz önerilir.
`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `30 saniye alttaki butonlara basarak kullanıcının cinsiyetini belirleyin.` })

 let msg = await message.channel.send({ embeds: [stfu], components : [row] })
 
 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

      collector.on("collect", async (button) => {

if(button.customId === "MAN") {

  let stfue = new EmbedBuilder()
  .setDescription(`
  ${uye.toString()} sunucumuza <@${message.author.id}> tarafından, \`${setName}\` ismiyle ${ayar.erkekRolleri.length > 1 ? ayar.erkekRolleri.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + ayar.erkekRolleri.map(x => `<@&${x}>`).slice(-1) : ayar.erkekRolleri.map(x => `<@&${x}>`).join("")} rolleri verilerek kayıt edildi!     
  `)
  .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
  .setThumbnail(uye.user.displayAvatarURL({ dynamic: true, size: 2048 }))
  .setFooter({ text:`• Toplam kayıt: ${datas ? datas.top : 0} • Erkek kayıt : ${datas ? datas.erkek : 0} • Kadın kayıt : ${datas ? datas.kız : 0} • ${moment().calendar()}` })
  
  msg.edit({ embeds: [stfue], components: [], ephemeral: false});

    await uye.roles.add(ayar.erkekRolleri)
    await uye.roles.remove(ayar.unregRoles)
    await coin.findOneAndUpdate({ guildID: uye.guild.id, userID: message.author.id }, { $inc: { coin: stfucum.Bots.toplamsCoin } }, { upsert: true });
    await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, erkek: 1, erkek24: 1, erkek7: 1, erkek14: 1, }, }, { upsert: true });
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id, rol: ayar.erkekRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
    const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (kayitgData)
    {
    await kayitg.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { kayit: 1 } }, { upsert: true });
    }

    if(ayar.chatChannel && client.channels.cache.has(ayar.chatChannel)) client.channels.cache.get(ayar.chatChannel).send({ content:`Aramıza **${uye}** yakışıklısı katıldı onu Merhaba ile karşılayın.`}).then((e) => setTimeout(() => { e.delete(); }, 15000));

         await otokayit.updateOne({
          userID: uye.user.id
           }, {
           $set: {
                  userID: uye.user.id,
                  roleID: erkekRol,
                  name: isim,
                  age: yaş
                }
             }, {
                 upsert: true
              }).exec();

   if (uye && uye.voice && uye.voice.channel && ayar.registerParents.includes(uye.voice.channel.parentId)) {
    setTimeout(() => {
     uye.voice.setChannel(pubCategory.random());
     uye.send({ content: `Sevgili ${uye.toString()} başarıyla kayıtınız tamamlandığı için teyit kanallarından **Public Ses Odamıza** tarafımca çekildiniz. - *İyi Sohbetler :D* \` ${message.guild.name} \` `}).catch(() => {});
    }, 10000);
  }
  const logEmbed = new EmbedBuilder()
            .setAuthor({ name: uye.user.tag, iconURL: uye.displayAvatarURL({ dynamic: true }) })
            .setDescription(`${uye} kullanıcısı ${message.member} tarafından **ERKEK** olarak kayıt edildi.`)
            .addFields([
              { name: 'Kayıt Edilen Kullanıcı', value: `${uye.toString()}`, inline: true },
              { name: 'Kayıt Eden Kullanıcı', value: `${message.member.toString()}`, inline: true },
              { name: 'Kayıt Tarihi', value: `<t:${Math.floor(Date.now() / 1000)}:R>` }
            ])
            .setFooter({ text: 'Üyenin geçmiş isimlerini görüntülemek için .isim komutunu kullanabilirsiniz.' })

          if (client.channels.cache.find(c => c.name === "register_log")) client.channels.cache.find(c => c.name === "register_log").send({ embeds: [logEmbed] })
        
}

if(button.customId === "WOMAN") {

let stfuk = new EmbedBuilder()
.setDescription(`
${uye.toString()} sunucumuza <@${message.author.id}> tarafından, \`${setName}\` ismiyle ${ayar.kizRolleri.length > 1 ? ayar.kizRolleri.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + ayar.kizRolleri.map(x => `<@&${x}>`).slice(-1) : ayar.kizRolleri.map(x => `<@&${x}>`).join("")} rolleri verilerek kayıt edildi! 
`)
.setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
.setThumbnail(uye.user.displayAvatarURL({ dynamic: true, size: 2048 }))
.setFooter({ text:`• Toplam kayıt: ${datas ? datas.top : 0} • Kadın kayıt : ${datas ? datas.kız : 0} • Erkek kayıt : ${datas ? datas.erkek : 0} • ${moment().calendar()}` })

msg.edit({ embeds: [stfuk], components: [], ephemeral: false});

    await uye.roles.add(ayar.kizRolleri)
    await uye.roles.remove(ayar.unregRoles)
    await coin.findOneAndUpdate({ guildID: uye.guild.id, userID: message.author.id }, { $inc: { coin: stfucum.Bots.toplamsCoin } }, { upsert: true });
    await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, kız: 1, kız24: 1, kız7: 1, kız14: 1, }, }, { upsert: true });
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id,  rol: ayar.kizRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
    const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (kayitgData)
    {
    await kayitg.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { kayit: 1 } }, { upsert: true });
    }

    if(ayar.chatChannel && client.channels.cache.has(ayar.chatChannel)) client.channels.cache.get(ayar.chatChannel).send({ content:`Aramıza **${uye}** güzelliği katıldı onu Merhaba ile karşılayın.`}).then((e) => setTimeout(() => { e.delete(); }, 15000));

         await otokayit.updateOne({
          userID: uye.user.id
           }, {
           $set: {
                  userID: uye.user.id,
                  roleID: kadinRol,
                  name: isim,
                  age: yaş
                }
             }, {
                 upsert: true
              }).exec();

    if (uye && uye.voice && uye.voice.channel && ayar.registerParents.includes(uye.voice.channel.parentId)) {
      setTimeout(() => {
        uye.voice.setChannel(pubCategory.random());
        uye.send({ content: `Sevgili ${uye.toString()} başarıyla kayıtınız tamamlandığı için teyit kanallarından **Public Ses Odamıza** tarafımca çekildiniz. - *İyi Sohbetler :D* \` ${message.guild.name} \` `}).catch(() => {});
       }, 10000);
      }
      const logEmbed = new EmbedBuilder()
      .setAuthor({ name: uye.user.tag, iconURL: uye.displayAvatarURL({ dynamic: true }) })
      .setDescription(`${uye} kullanıcısı ${message.member} tarafından **KADIN** olarak kayıt edildi.`)
      .addFields([
        { name: 'Kayıt Edilen Kullanıcı', value: `${uye.toString()}`, inline: true },
        { name: 'Kayıt Eden Kullanıcı', value: `${message.member.toString()}`, inline: true },
        { name: 'Kayıt Tarihi', value: `<t:${Math.floor(Date.now() / 1000)}:R>` }
      ])
      .setFooter({ text: 'Üyenin geçmiş isimlerini görüntülemek için .isim komutunu kullanabilirsiniz.' })

    if (client.channels.cache.find(c => c.name === "register_log")) client.channels.cache.find(c => c.name === "register_log").send({ embeds: [logEmbed] })

  }

if(button.customId === "İPTAL") {
if(msg) msg.delete();
button.reply({ content:`İşlem Başarıyla İptal Edildi :white_check_mark:`, embeds: [], components: [], ephemeral: true});
uye.setNickname(`${ayar.tag} İsim | Yaş`)
await uye.roles.add(ayar.unregRoles)
await uye.roles.remove(ayar.kizRolleri)
await uye.roles.remove(ayar.erkekRolleri)
}

   });
}   
}
