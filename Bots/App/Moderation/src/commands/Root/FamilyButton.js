const { Discord, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json");
const stfucum = require("../../../../../../stfu_config.json");
const { green, red, Jail } = require("../../../../src/configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;
///////////////////////////////////// bu button bir sunucuya özel olarak yapılmıştı family yerine bir buttonlu rol istendiğinden dolayı. isteyen kullanır.   ~stfu
module.exports = {
  conf: {
    aliases: [],
    name: "onay",
    help: "onay",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args, embed) => {

    message.channel.send({ content: `> Aşağıda ki butona basarak kayıtınızı bitirebilirsiniz!`, "components": [{
          "type": 1, "components": [

            { "type": 2, "style": 4, "custom_id": "kayit", "label": "Kayıt Onayla" },

          ]
        }]
    })
  },
};

client.on('interactionCreate', async interaction => {

  const member = await client.guilds.cache.get(stfucum.GuildID).members.fetch(interaction.member.user.id)
  if (!member) return;

  if (interaction.customId === "kayit") {

  await interaction.reply({ content: `Kayıtınız Başarılı Bir Şekilde Tamamlandı!`, ephemeral: true });
  await member.roles.add(conf.ekipRolu)
}
})
