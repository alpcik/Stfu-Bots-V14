const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const snipe = require("../../../../src/schemas/snipe");
const moment = require("moment");
require("moment-duration-format");
const { miniicon, mesaj2, green, red } = require("../../../../src/configs/emojis.json");
module.exports = {
  conf: {
    aliases: ["snipe"],
    name: "snipe",
    help: "snipe",
    category: "yetkili",
  },

  run: async (client, message, args) => {
    if(!conf.staffs.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
      message.react("❌")
      return
    }
    let hembed = new EmbedBuilder().setAuthor({name: message.member.displayName, iconURL: message.author.displayAvatarURL({dynamic: true})})
    message.react("✅")

    const data = await snipe.findOne({ guildID: message.guild.id, channelID: message.channel.id });
    if (!data) 
    {
    message.react("❌")
    message.channel.send({ content:"Bu kanalda silinmiş bir mesaj bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

const author = await client.user.fetch(data.author);
hembed.setDescription(`
${data.messageContent ? `\n${mesaj2} Mesaj içeriği: **${data.messageContent}**` : ""}
${miniicon} Mesaj Sahibi: <@${data.userID}> - (\`${data.userID}\`)
${miniicon} Mesajın Yazılma Tarihi: <t:${Math.floor(data.createdDate / 1000)}:R>
${miniicon} Mesajın Silinme Tarihi: <t:${Math.floor(data.deletedDate / 1000)}:R>
`);
 message.channel.send({ embeds: [hembed] });
  
},
};
