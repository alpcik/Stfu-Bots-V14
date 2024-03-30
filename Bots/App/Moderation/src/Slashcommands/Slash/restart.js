const { SlashCommandBuilder, hyperlink, EmbedBuilder, IntegrationApplication } = require("discord.js");
const stfucum = require("../../../../../../stfu_config.json");
const children = require('child_process');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("restart")
    .setDescription("Moderasyon Botunu yeniden başlatmaya yarar."),

  async execute(interaction, client) {
   if(!stfucum.StfuID.includes(interaction.user.id)) {
        return interaction.reply({ content: ":x: Bot developerı olmadığın için kullanamazsın.", ephemeral: true })
    }
await interaction.reply({ content: `__**Bot**__ yeniden başlatılıyor!`, ephemeral: true });
children.exec(`pm2 restart ${stfucum.GuildName}_Voucher ${stfucum.GuildName}_Statistics ${stfucum.GuildName}_Guard_I ${stfucum.GuildName}_Guard_II ${stfucum.GuildName}_Guard_III ${stfucum.GuildName}_Moderation`);
}
};