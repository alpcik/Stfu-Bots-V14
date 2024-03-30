const Discord = require("discord.js");
const conf = require("../../../../src/configs/ayarName.json");
const stfucum = require("../../../../../../stfu_config.json");

const { stfunitro, stfunetflix, stfuspotify, stfuexxen, stfublutv} = require("../../../../src/configs/emojis.json")
const client = global.bot;

module.exports = {
  conf: {
    aliases: [],
    name: "ecrolalma",
    help: "ecrolalma",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {
    message.channel.send({ content: `Merhaba **${message.guild.name}** üyeleri,\nÇekiliş katılımcısı alarak ${stfunitro} , ${stfuspotify} , ${stfunetflix} , ${stfuexxen} , ${stfublutv} gibi çeşitli ödüllerin sahibi olabilirsiniz.\nEtkinlik katılımcısı alarak çeşitli etkinliklerin yapıldığı anlarda herkesten önce haberdar olabilirsiniz ve çekilişlere önceden katılma hakkı kazanabilirsiniz.\n\n__Aşağıda ki butonlara basarak siz de bu ödülleri kazanmaya hemen başlayabilirsiniz!__`,"components":[{"type":1,"components":[

        {"type":2,"style":3,"custom_id":"buttoncekilis","label":"🎁 Çekiliş Katılımcısı"},
        {"type":2,"style":4,"custom_id":"buttonetkinlik","label":"🎉 Etkinlik Katılımcısı"}
        
        ]}] })
  },
};

client.on('interactionCreate', async interaction => {
  const member = interaction.user;

const etkinlik = await client.guilds.cache.get(stfucum.GuildID).roles.cache.find(x => x.name.includes(conf.etkinlik))
const cekilis = await client.guilds.cache.get(stfucum.GuildID).roles.cache.find(x => x.name.includes(conf.cekilis))

    if(interaction.customId === "buttoncekilis")
    {

      if(interaction.guild.members.cache.get(member.id).roles.cache.has(cekilis.id)){
          await interaction.guild.members.cache.get(member.id).roles.remove(cekilis.id)
          await interaction.reply({ content: `${member.toString()}, başarıyla <@&${cekilis.id}> rolünü çıkardınız.`, ephemeral: true });
      } else {
          await interaction.guild.members.cache.get(member.id).roles.add(cekilis.id)
          await interaction.reply({ content: `${member.toString()}, başarıyla <@&${cekilis.id}> rolü aldınız.`, ephemeral: true });
      }
    }
        
    if(interaction.customId === "buttonetkinlik")
    {

      if(interaction.guild.members.cache.get(member.id).roles.cache.has(etkinlik.id)){
          await interaction.guild.members.cache.get(member.id).roles.remove(etkinlik.id)
          await interaction.reply({ content: `${member.toString()}, başarıyla <@&${etkinlik.id}> rolünü çıkardınız.`, ephemeral: true });
      } else {
          await interaction.guild.members.cache.get(member.id).roles.add(etkinlik.id)
          await interaction.reply({ content: `${member.toString()}, başarıyla <@&${etkinlik.id}> rolü aldınız.`, ephemeral: true });
      }
    }
})