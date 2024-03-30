const { EmbedBuilder, Client, Message, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;
const { star } = require("../../../../src/configs/emojis.json")
const stfucum = require("../../../../../../stfu_config.json");

module.exports = {
  conf: {
    aliases: ["kısayollar"],
    name: "kısayollar",
    help: "kısayollar",
    category: "sahip",
    owner: true,
  },
 
    run: async (client, message, args, prefix) => {
 
			const kısayollar = new ActionRowBuilder()
			.addComponents(
			  new StringSelectMenuBuilder()
				.setCustomId('kısayollar')
				.setPlaceholder('Komutlar hakkında yardım almak için tıkla!')
				.addOptions([
					{
					  label: 'Kullanıcı Komutları',
					  description: 'Kullanıcı Komutlarını Görmek İçin Tıkla!',
					  value: 'kısayollar1',
					  emoji: '1208159372744720414',
					},
					{
					  label: 'Market Komutları',
					  description: 'Market Komutlarını Görmek İçin Tıkla!',
					  value: 'kısayollar2',
					  emoji: '1205476500888092672',
					},						
					{
					  label: 'Kayıt Komutları',
					  description: 'Kayıt Komutlarını Görmek İçin Tıkla!',
					  value: 'kısayollar3',
					  emoji: '1204353242415243264',
					},
					{
					  label: 'Cezalandırma Komutları',
					  description: 'Cezalandırma Komutlarını Görmek İçin Tıkla!',
					  value: 'kısayollar4',
					  emoji: '1204352575412117524',
					},
					{
					  label: 'Stat Komutları',
					  description: 'Stat Komutlarını Görmek İçin Tıkla!',
					  value: 'kısayollar5',
					  emoji: '1204352198763356171',
					},
					{
					  label: 'Yetkili Komutları',
					  description: 'Yetkili Komutlarını Görmek İçin Tıkla!',
					  value: 'kısayollar6',
					  emoji: '1204353314142294046',
					},
					{
					  label: 'Kurucu Komutları',
					  description: 'Kurucu Komutlarını Görmek İçin Tıkla!',
					  value: 'kısayollar7',
					  emoji: '1204350915251806208',
					},
					{
					  label: 'Setup Komutları',
					  description: 'Setup Komutlarını Görmek için Tıkla!',
					  value: 'kısayollar8',
					  emoji: '1204353573928837120',
					},
				  ]),
			  );

     await message.channel.send({ components: [kısayollar] });

    },
  };

  client.on('interactionCreate', interaction => {

    if (!interaction.isStringSelectMenu()) return;

if (interaction.values[0] === "kısayollar1") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "kullanıcı").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar2") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "market").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar3") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "kayıt").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};
  
if (interaction.values[0] === "kısayollar4") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "cezalandırma").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar5") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "stat").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar6") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "yetkili").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar7") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "yönetim").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar8") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "sahip").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};
});
      
