const { Discord, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const stfucum = require("../../../../../../stfu_config.json");
const cezapuan = require("../../../../src/schemas/cezapuan")
const ceza = require("../../../../src/schemas/ceza")
const penals = require("../../../../src/schemas/penals");
const data = require("../../../../src/schemas/penals");
const { green, red, Jail } = require("../../../../src/configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: [],
    name: "cezabutton",
    help: "cezabutton",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args, embed) => {

    message.channel.send({ content: `${Jail} Aşağıda ki düğmelerden ceza listenizi, ceza puanını ve aktif cezanızın kalan süresini görüntüleyebilirsiniz.`, "components": [{
          "type": 1, "components": [

            { "type": 2, "style": 2, "custom_id": "cezapuan", "label": "Ceza Puanı", "emoji": { "id": "916734243328114718" } },
            { "type": 2, "style": 3, "custom_id": "cezalarım", "label": "Cezalarım", "emoji": { "id": "915754688224321546" } },
            { "type": 2, "style": 4, "custom_id": "kalanzaman", "label": "Kalan Zamanım?", "emoji": { "id": "915754687448379393" } }

          ]
        }]
      })
  },
};

client.on('interactionCreate', async interaction => {

  const member = interaction.user;

  const cezaData = await ceza.findOne({ guildID: stfucum.GuildID, userID: member.id });
  const cezapuanData = await cezapuan.findOne({ guildID: stfucum.GuildID, userID: member.id });

  if (interaction.customId === "cezapuan") {
    interaction.reply({
      content: `${member.toString()} Ceza Puanınız : 

 Toplamda \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanı\` ve (Toplam **${cezaData ? cezaData.ceza.length : 0}** Ceza) olarak gözükmekte.`, ephemeral: true
    });
  }

  let data = await penals.find({ guildID: stfucum.GuildID, userID: member.id, active: true }).sort({ date: -1 });
  data = data.map((x) => `\`#${x.id}:\` ${x.active ? "\`Aktif\`" : "\`Pasif\`"} **[${x.type}]** <@${x.staff}>: **${x.reason}** - ${moment(x.date).format("LLL")}`).join("\n");
  if (interaction.customId === "cezalarım") {
    if (data.length === 0) return interaction.reply({ content: `${member.toString()} üyesinin aktif cezası bulunmamaktadır.`, ephemeral: true });
    if (data.length > 0) return interaction.reply({ content: `${data}`, ephemeral: true });
  }

  let datas = await penals.find({ guildID: stfucum.GuildID, userID: member.id, active: true }).sort({ date: -1 });
  datas = datas.map((x) => `:x: <@${x.staff}> tarafından **${moment(x.date).format("LLL")}**'da işlenen __"#${x.id}"__ numaralı __"${x.type}"__ türündeki cezalandırman <t:${Math.floor(x.finishDate / 1000)}:R> sonlandırılacaktır.`).join("\n");

  if (interaction.customId === "kalanzaman") {
    if (data.length === 0) return interaction.reply({ content: `${member.toString()} üyesinin aktif ceza bilgisi bulunmamakta.`, ephemeral: true})
    await interaction.reply({ content: `${datas}`, ephemeral: true });
  }

})
