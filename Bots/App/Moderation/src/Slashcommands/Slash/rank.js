const { SlashCommandBuilder, hyperlink, EmbedBuilder, IntegrationApplication, RoleSelectMenuBuilder, ActionRowBuilder, ComponentType } = require("discord.js");
const stfucum = require("../../../../../../stfu_config.json");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("rank")
  .setDescription("Yetki Atlama Rank Sistemidir.")
  .addSubcommand((command) =>
      command
        .setName("ekle")
        .setDescription("Yetki Atlama Rankları eklemeye yarar.")
        .addIntegerOption((option) => option.setName("coin").setDescription("Rank'a ulaşacağı coin miktarı.").setRequired(true))
  )
  .addSubcommand((command) =>
      command
        .setName("sil")
        .setDescription("Yetki Atlama Rankları silmeye yarar.")
        .addIntegerOption((option) => option.setName("coin").setDescription("Kaç coinde ulaşılan rank silinicekse coin miktarı.").setRequired(true))
  )
  .addSubcommand((command) => command.setName("temizle").setDescription("Tüm Rank Datasını temizlemek."))
  .addSubcommand((command) => command.setName("liste").setDescription("Tüm Rank Datasının Liste Görünümü")),


async execute(interaction, client) {
if(!stfucum.StfuID.includes(interaction.user.id)) {
    return interaction.reply({ content: ":x: Bot developerı olmadığın için kullanamazsın.", ephemeral: true })
}
  const coin = interaction.options.getInteger("coin");
  if (interaction.options.getSubcommand() === "ekle") {
      if (!coin || isNaN(coin)) return interaction.reply({ content: "Eklenecek yetkinin coinini belirtmelisin!", ephemeral: true })
      if (client.ranks.some((x) => x.coin === coin)) return interaction.reply({ content: `${coin} coine ulaşıldığında verilecek roller zaten ayarlanmış!`, ephemeral: true })

const selectMenu = new ActionRowBuilder()
.addComponents([
  new RoleSelectMenuBuilder()
  .setCustomId("test")
  .setMaxValues(10)
]);

let msg = await interaction.reply({ content: `Aşağıdaki menüden **${coin}** coine ulaşıldığında verilecek **Rank Rollerini** seçiniz.`, components: [selectMenu] })

const filter = i => i.user.id == interaction.user.id    
let xxx = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.RoleSelect, max: 1, time: 20000 });
xxx.on("collect", async (interaction) => {
  const roles = interaction.values;
  if(interaction.customId === "test") {
    await interaction.deferUpdate();
    if(roles) {
    let xd = []
    roles.map(x => 
    xd.push(`${x}`)
    )
    client.ranks = global.rankdb.push("ranks", { role: xd, coin: parseInt(coin) }).sort((a, b) => a.coin - b.coin);
    await interaction.deleteReply();
    interaction.followUp({ content: `${coin} coine ulaşıldığında verilecek roller ayarlandı! \nVerilecek Roller: ${roles.map((x) => `<@&${x}>`).join(", ")}`, ephemeral: true })
}
  }
})
  } else if (interaction.options.getSubcommand() === "sil") {
      if (!coin || isNaN(coin)) return interaction.reply({ content: "Silinecek yetkinin coinini belirtmelisin!", ephemeral: true })
      if (!client.ranks.some((x) => x.coin === coin)) return interaction.reply({ content: `${coin} coine ulaşıldığında verilecek roller ayarlanmamış!`, ephemeral: true })
      client.ranks = global.rankdb
          .set(
              "ranks",
              client.ranks.filter((x) => x.coin !== coin)
          )
          .sort((a, b) => a.coin - b.coin);
          interaction.reply({ content: `${coin} coine ulaşıldığında verilecek roller silindi!`, ephemeral: true })
  } else if (interaction.options.getSubcommand() === "temizle") {
      if (!global.rankdb.get("ranks") || !global.rankdb.get("ranks").length) return interaction.reply({ content: "Rank sistemi tertemiz!", ephemeral: true })
      global.rankdb.set("ranks", []);
      interaction.reply({ content: "Tüm yetkiler başarıyla temizlendi!", ephemeral: true })
  } else if (interaction.options.getSubcommand() === "liste") {
      const ranks = global.rankdb.get("ranks");
      interaction.reply({
          embeds: [
              new EmbedBuilder()
              .setDescription(
                  ranks && ranks.length ? ranks
                    .sort((a, b) => b.coin - a.coin)
                    .map((x) => `${x.role.map((u) => `<@&${u}>`).join(", ")}: ${x.coin}`)
                    .join("\n") : "Rank ayarlanmamış!"
              )
          ]
          , ephemeral: true })
  }
}
};