const client = global.bot;
const { Collection } = require("discord.js");
const inviterSchema = require("../../../src/schemas/inviter");
const inviteMemberSchema = require("../../../src/schemas/inviteMember");
const coin = require("../../../src/schemas/coin");
const gorev = require("../../../src/schemas/invite");
const otokayit = require("../../../src/schemas/otokayit");
const bannedTag = require("../../../src/schemas/bannedTag");
const regstats = require("../../../src/schemas/registerStats");
const conf = require("../../../src/configs/sunucuayar.json");
const ayar = require("../../../src/configs/sunucuayar.json")
const stfucum = require("../../../../../stfu_config.json");
const moment = require("moment");
const { star, green, red } = require("../../../src/configs/emojis.json")
const emoji = require("../../../src/configs/emojis.json")
const forceBans = require("../../../src/schemas/forceBans");
const isimler = require("../../../src/schemas/names");

module.exports = async (member) => {

  const data = await forceBans.findOne({ guildID: stfucum.GuildID, userID: member.user.id });
  if (data) return member.guild.members.ban(member.user.id, { reason: "Sunucudan kalıcı olarak yasaklandı!" }).catch(() => {});
  
  let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  if (guvenilirlik) {
  if(ayar.fakeAccRole) member.roles.add(ayar.fakeAccRole).catch();
  } else if(ayar.unregRoles) member.roles.add(ayar.unregRoles).catch();
  if (member.user.username.includes(ayar.tag)) { member.setNickname(`${ayar.tag} İsim | Yaş`).catch(); }
  else { member.setNickname(`${ayar.ikinciTag} İsim | Yaş`).catch();}
  
  if (member.user.username.includes(ayar.tag)) {
    await member.roles.add(ayar.ekipRolu)
    await member.roles.add(ayar.unregRoles)
    client.channels.cache.find(x => x.name == "taglı_log").send({ content:`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, isminde ${ayar.tag} sembolü bulunuyor.`})
  }

    
const otoreg = await otokayit.findOne({ userID: member.id })
 const tagModedata = await regstats.findOne({ guildID: stfucum.GuildID })
  if (tagModedata && tagModedata.tagMode === false) {
    if (otoreg) {
      await member.roles.set(otoreg.roleID)
      await member.setNickname(`${member.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${otoreg.name} ' ${otoreg.age}`);
     if(ayar.chatChannel && client.channels.cache.has(ayar.chatChannel)) client.channels.cache.get(ayar.chatChannel).send({ content:`Aramıza hoşgeldin **${member}**! Sunucumuzda daha önceden kayıtın bulunduğu için direkt içeriye alındınız. Kuralları okumayı unutma!`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
     await isimler.findOneAndUpdate({ guildID: stfucum.GuildID, userID: member.user.id }, { $push: { names: { name: member.displayName, sebep: "Oto.Bot Kayıt", rol: otoreg.roleID.map(x => `<@&${x}>`), date: Date.now() } } }, { upsert: true });
    }
}

  let memberGün = moment(member.user.createdAt).format("DD");
  let memberTarih = moment(member.user.createdAt).format("YYYY HH:mm:ss");
  let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");

  var üyesayısı = member.guild.memberCount.toString().replace(/ /g, "    ")
  
  const channel = member.guild.channels.cache.get(ayar.invLogChannel);
  const kayitchannel = member.guild.channels.cache.get(ayar.teyitKanali);
  const kurallar = member.guild.channels.cache.get(ayar.kurallar);
  if (!channel) return;
  if (member.user.bot) return;

  const cachedInvites = client.invites.get(member.guild.id)
  const newInvites = await member.guild.invites.fetch();
  const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code) < inv.uses);
  newInvites.each(inv => cachedInvites.set(inv.code, inv.uses));
  client.invites.set(member.guild.id, cachedInvites);

  const res = await bannedTag.findOne({ guildID: stfucum.GuildID });
  if (!res) return
  
    res.taglar.forEach(async x => {

  if(res.taglar.some(x => member.user.tag.includes(x))) { 
    await member.roles.set(ayar.yasaklıRole)
    await member.setNickname("Yasaklı Tag")
    if (stfucum.Bots.dmMessages) member.send({ content:`${member.guild.name} adlı sunucumuza olan erişiminiz engellendi! Sunucumuzda yasaklı olan bir simgeyi (${x}) isminizde taşımanızdan dolayıdır. Sunucuya erişim sağlamak için simgeyi (${x}) isminizden çıkartmanız gerekmektedir.\n\nSimgeyi (${x}) isminizden kaldırmanıza rağmen üstünüzde halen Yasaklı Tag rolü varsa sunucudan gir çık yapabilirsiniz veya sağ tarafta bulunan yetkililer ile iletişim kurabilirsiniz. **-Yönetim**\n\n__Sunucu Tagımız__\n**${conf.tag}**`}).catch(() => {});
}
}) 

if (!usedInvite) {
kayitchannel.wsend({ content:`
<a:stfu_hosgeldin:1222924248125800600> Merhabalar ${member} Sunucumuza Hoş Geldin. Seninle beraber sunucumuz **${üyesayısı}** üye sayısına ulaştı.

Hesabın \`${memberGün} ${memberAylar} ${memberTarih}\` tarihinde oluşturulmuş (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>), hesabın ${guvenilirlik ? `**Şüpheli!**` : `**Güvenli!**` }

Sunucumuza kayıt olduğunda kurallar kanalına göz atmayı unutmayınız. Kayıt olduktan sonra kuralları okuduğunuzu 

kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünde bulundurarak yapacağız. 🎉
`});
channel.wsend({ content:`:white_check_mark: ${member}, sunucuya katıldı! Davet Eden: **Sunucu Özel URL** Sunucumuz **${member.guild.memberCount}** Uye sayisine ulaşti :tada:`})
return }
if (!usedInvite) return;
await inviteMemberSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $set: { inviter: usedInvite.inviter.id } }, { upsert: true });
if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 7) {
await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: usedInvite.inviter.id }, { $inc: { total: 1, fake: 1 } }, { upsert: true });
const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: usedInvite.inviter.id });
const total = inviterData ? inviterData.total : 0;
kayitchannel.wsend({ content:`:white_check_mark: ${member} isimli üye sunucuya katıldı fakat hesabı (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) açıldığı için şüpheli olarak işaretlendi.`});
channel.wsend({ content:`${member}, ${usedInvite.inviter.tag} davetiyle katıldı! (**${total}**)`})
member.roles.set(ayar.fakeAccRole)
} else {
await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: usedInvite.inviter.id }, { $inc: { total: 1, regular: 1 } }, { upsert: true });
const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: usedInvite.inviter.id });
const total = inviterData ? inviterData.total : 0;
kayitchannel.wsend({ content:`
<a:stfu_hosgeldin:1222924248125800600> Merhabalar ${member} Sunucumuza Hoş Geldin. Seninle beraber sunucumuz **${üyesayısı}** üye sayısına ulaştı.

Hesabın \`${memberGün} ${memberAylar} ${memberTarih}\` tarihinde oluşturulmuş (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>), hesabın ${guvenilirlik ? `**Şüpheli!**` : `**Güvenli!**` }

Sunucumuza kayıt olduğunda kurallar kanalına göz atmayı unutmayınız. Kayıt olduktan sonra kuralları okuduğunuzu 

kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünde bulundurarak yapacağız. 🎉
`});
channel.wsend({ content:`:white_check_mark: ${member}, ${usedInvite.inviter.tag} davetiyle katıldı! Uyenin Davet Sayisi (**${total}**) Sunucumuz **${member.guild.memberCount}** Uye sayisine ulaşti`})
}
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: usedInvite.inviter.id }, { $inc: { coin: 1 } }, { upsert: true });
const gorevData = await gorev.findOne({ guildID: member.guild.id, userID: usedInvite.inviter.id });
if (gorevData) { await gorev.findOneAndUpdate({ guildID: member.guild.id, userID: usedInvite.inviter.id }, { $inc: { invite: 1 } }, { upsert: true });}
};

module.exports.conf = {
  name: "guildMemberAdd",
};
