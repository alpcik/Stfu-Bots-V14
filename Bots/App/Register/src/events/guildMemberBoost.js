const client = global.bot;
const { Collection } = require("discord.js");
const isimler = require("../../../src/schemas/names");
const conf = require("../../../src/configs/sunucuayar.json");
const stfucum = require("../../../../../stfu_config.json");
const regstats = require("../../../src/schemas/registerStats");

module.exports = async (oldMember, newMember) => {
    if (oldMember.roles.cache.has(conf.boosterRolu) && !newMember.roles.cache.has(conf.boosterRolu)) {
    const data = await isimler.findOne({ guildID: stfucum.GuildID, userID: member.user.id });
    if(conf.sahipRolu.some(x => newMember.roles.cache.has(x))) return;
    let user = newMember;
    let kanal = client.guilds.cache.get(stfucum.GuildID).guild.channels.cache.find(c => c.name === "boost_log")
    if (!kanal) return;

    const tagModedata = await regstats.findOne({ guildID: stfucum.GuildID })
    if (tagModedata && tagModedata.tagMode === true) {
    if(!user.user.username.includes(conf.tag) && !user.roles.cache.has(conf.vipRole)) return;
    if(kanal) kanal.send({ content: `${user} (\` ${user.user.tag} - ${user.user.id}\`) üye takviyesini kaybetti ve kayıtsıza atıldı.`})
    await user.voice.disconnect().catch(err => {})
    if(user && user.manageable) await user.setNickname(`${user.user.username.includes(conf.tag) ? conf.tag : (conf.ikinciTag ? conf.ikinciTag : (conf.tag || ""))} İsim | Yaş`)
    return await user.setRoles(conf.unregRoles) 
    } else if (tagModedata && tagModedata.tagMode === false) {
    if(kanal) kanal.send({ content: `${user} (\` ${user.user.tag} - ${user.user.id}\`) isimli üye sunucumuzdan takviyesini çektiği için veya süresi bittiği için ismi tekrardan düzeltildi.`})
    if (data && data.names.length) {
    let isim = data.names.splice(-1).map((x, i) => `${x.name}`)
    if(user && user.manageable) await user.setNickname(`${user.user.username.includes(conf.tag) ? conf.tag : (conf.ikinciTag ? conf.ikinciTag : (conf.tag || ""))} ${isim}`)
    }
    }
    };
};

module.exports.conf = {
  name: "guildMemberUpdate",
};