const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const moment = require("moment");
const isimler = require("../../../../src/schemas/names");
const register = require("../../../../src/schemas/registerStats");
const stfucum = require("../../../../../../stfu_config.json");
const Ayarlar = require("../../../../src/configs/sunucuayar.json");
const axios = require('axios');
const fetch = require('node-fetch')
const client = global.bot;
require("moment-duration-format")
moment.locale("tr")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
    conf: {
      aliases: ["kullanıcıbilgi", "kb", "istatistik", "info", 'profil'],
      name: "kullanıcıbilgi",
      help: "kullanıcıbilgi",
      category: "kullanıcı",
    },
  
run: async (client, message, args, prefix) => {
  let kanallar = ayar.KomutKullanımKanalİsim;
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 

  const row = new ActionRowBuilder()
  .addComponents(
      new StringSelectMenuBuilder()
          .setCustomId('banner')
          .setPlaceholder('Kullanıcının Banner/Avatar görüntülemek için tıkla ama sapıklık yapma taciz vs ban sebebi aman he !')
          .addOptions([
              {
                  label: 'Banner',
                  description: 'Kullanıcının bannerını görüntülemek için tıklayınız ama sapıklık yapma taciz vs ban sebebi aman he !.',
                  value: 'banner',
              },
              {
                  label: 'Avatar',
                  description: 'Kullanıcının avatarını görüntülemek için tıklayınız ama sapıklık yapma taciz vs ban sebebi aman he !.',
                  value: 'avatar',
              },
          ]),
  );

  let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  if (üye.user.bot) return;
  
  let nameData = await isimler.findOne({ guildID: message.guild.id, userID: üye.id });
  let registerData = await register.findOne({ guildID: message.guild.id, userID: üye.id });

           const roles = üye.roles.cache.filter(role => role.id !== message.guild.id).sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`);
            const rolleri = []
            if (roles.length > 6) {
                const lent = roles.length - 6
                let itemler = roles.slice(0, 6)
                itemler.map(x => rolleri.push(x))
                rolleri.push(`${lent} daha...`)
            } else {
                roles.map(x => rolleri.push(x))
            }
            const members = [...message.guild.members.cache.filter(x => !x.user.bot).values()].sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);
            const joinPos = members.map((u) => u.id).indexOf(üye.id);
            const previous = members[joinPos - 1] ? members[joinPos - 1].user : null;
            const next = members[joinPos + 1] ? members[joinPos + 1].user : null;
            const bilgi = `${previous ? `**${previous.tag}** > ` : ""}<@${üye.id}>${next ? ` > **${next.tag}**` : ""}`
            let member = message.guild.members.cache.get(üye.id)
            let nickname = member.displayName == üye.username ? "" + üye.username + " [Yok] " : member.displayName

  let embed = new EmbedBuilder().setAuthor({ name: üye.displayName, iconURL: üye.user.avatarURL({ dynamic: true })}).setTimestamp().setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(üye.user.avatarURL({ dynamic: true }))
  .addFields(
{ name: "❯ Kullanıcı Bilgisi",  value: `
\` • \` Hesap: ${üye}
\` • \` Kullanıcı ID: ${üye.id}
\` • \` Kuruluş Tarihi: <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>
`, inline: false },
{ name: "❯ Sunucu Bilgisi",  value: `
\` • \` Sunucu İsmi: ${nickname}
\` • \` Katılım Tarihi: <t:${Math.floor(üye.joinedAt / 1000)}:R>
\` • \` Katılım Sırası: ${(message.guild.members.cache.filter(a => a.joinedTimestamp <= üye.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}
\` • \` Katılım Bilgisi: ${bilgi}

\` • \` Bazı Rolleri: (${rolleri.length}): ${rolleri.join(", ")}
\` • \` İsim geçmişi:  **${nameData ? `${nameData.names.length}` : "0"}** 
${nameData ? nameData.names.splice(0, 1).map((x, i) => `\` ${x.name} \` ${x.sebep ? `(${x.sebep})` : ""} ${x.rol ? `(${x.rol})` : ""}`).join("\n") : ""}
`, inline: false })
if (üye.permissions.has(PermissionsBitField.Flags.Administrator) || Ayarlar.teyitciRolleri.some(x => üye.roles.cache.has(x))) 
embed.addFields(
  { name: "❯ Yetkili Bilgisi",  value: `• Toplam kayıt: ${registerData ? registerData.top : 0} • Erkek kayıt : ${registerData ? registerData.erkek : 0} • Kadın kayıt : ${registerData ? registerData.kız : 0} •`, inline: false },
)
  let msg = await message.channel.send({ embeds: [embed], components: [row] })
  var filter = (menu) => menu.user.id === message.author.id;
  const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
 
  collector.on("collect", async (menu) => {
     if(menu.values[0] === "avatar") {
        menu.reply({ content:`${üye.displayAvatarURL({ dynamic: true, size: 4096 })}`, ephemeral: true })
    } 
    else if(menu.values[0] === "banner") {
      async function bannerXd(user, client) {
        const response = await axios.get(`https://discord.com/api/v10/users/${user}`, { headers: { 'Authorization': `Bot ${client.token}` } });
        if(response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
        else return(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)
      }
          let banner = await bannerXd(üye.id, client)
          menu.reply({ content: `${banner}`, ephemeral: true })
    
        }
    })


}
}

