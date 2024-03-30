const { PermissionsBitField, ButtonStyle, ComponentType, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const stfucum = require("../../../../../../stfu_config.json");
const SafeMember = require("../../../../../Guardian/src/Models/Koruma");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("koruma")
      .setDescription("Sunucu Yetkilerini açıp, kapatırsınız."),
      
    async execute(interaction, bot) {
      if(!stfucum.StfuID.includes(interaction.user.id)) {
        return interaction.reply({ content: ":x: Bot developerı olmadığın için kullanamazsın.", ephemeral: true })
      } 
 
        const ac = new ButtonBuilder()
        .setCustomId("aç")
        .setLabel("Koruma Aç")
        .setStyle(ButtonStyle.Success)
      
        const kapa = new ButtonBuilder()
        .setCustomId("kapat")
        .setLabel("Koruma Kapat")
        .setStyle(ButtonStyle.Danger)
    

        const row = new ActionRowBuilder()
        .addComponents([ac, kapa])


        const embed = new EmbedBuilder()
        .setDescription(`
        ${interaction.user.toString()}, \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${interaction.guild.name}\` sunucusundaki yetki verilerinin işlem tablosu aşağıda belirtilmiştir.
        `)
        .addFields(
{
name: "\n\u200b", value: `
\`\`\`fix
Koruma Aç
\`\`\`
Sunucu Yetkisi Açık olan rollerin yetkilerini kapatır.
`, inline: false
},
{
name: "\n\u200b", value: `
\`\`\`fix
Koruma Kapat
\`\`\`
Sunucu Yetkisi Kapalı olan rollerin yetkilerini geri açar.
`, inline: false
},
)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 2048 }))
.setTimestamp()

    interaction.reply({ embeds: [embed], components: [row] })

    const filter = i => i.user.id == interaction.user.id 
    let collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button, max: 1, time: 20000 })

    collector.on("collect", async (interaction) => {
    if(interaction.customId === "aç") {
      const perms = [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageEmojisAndStickers, PermissionsBitField.Flags.ManageWebhooks];
      let roller = interaction.guild.roles.cache.filter(rol => rol.editable).filter(rol => perms.some(yetki => rol.permissions.has(yetki)))

      const ytembed = new EmbedBuilder()
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setDescription(`${interaction.guild.name} sunucusundaki ${roller.map(x => x).join(", ")} rollerinin **yetki verileri** kaydedildi ve izinleri kapatıldı.`)
      await interaction.update({ embeds: [ytembed], components: [] })
      roller.forEach(async (rol) => {
        await SafeMember.updateOne({ Role: rol.id }, {$set: {"guildID": interaction.guild.id, "Permissions": rol.permissions.bitfield }}, {upsert: true})
        await rol.setPermissions(0n)
      })
  }
        
    if(interaction.customId === "kapat") {
      let veri = await SafeMember.find({});
      veri.filter(x => interaction.guild.roles.cache.get(x.Role)).forEach(async (data) => {
          let rolgetir = interaction.guild.roles.cache.get(data.Role)
          if(rolgetir) rolgetir.setPermissions(data.Permissions);
      })
      await SafeMember.deleteMany({ guildID: interaction.guild.id });
      const ytembed2 = new EmbedBuilder()
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setDescription(`Başarılı bir şekilde koruma kapatıldı ve ${veri.map((x, key) => interaction.guild.roles.cache.get(x.Role)).join(", ")} rollerinin izinleri tekrar açıldı.`)
      await interaction.update({ embeds: [ytembed2], components: [] })
    }

})

},
};