const { ApplicationCommandType } = require('discord-api-types/v10');
const { PermissionsBitField, ComponentType, ContextMenuCommandBuilder, hyperlink, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, IntegrationApplication } = require("discord.js");
const isimler = require("../../../../src/schemas/names");
const register = require("../../../../src/schemas/registerStats");
const stfucum = require("../../../../../../stfu_config.json");
const Ayarlar = require("../../../../src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const axios = require('axios');
const fetch = require('node-fetch')
const client = global.bot;

module.exports = {
	data: new ContextMenuCommandBuilder()
	.setName('Üye Bilgileri')
	.setType(ApplicationCommandType.User),
		
  async execute(interaction, client) {
	const row = new ActionRowBuilder()
	.addComponents(
		new StringSelectMenuBuilder()
			.setCustomId('banner')
			.setPlaceholder('Kullanıcının Banner/Avatar görüntülemek için tıkla!')
			.addOptions([
				{
					label: 'Banner',
					description: 'Kullanıcının bannerını görüntülemek için tıklayınız.',
					value: 'banner',
				},
				{
					label: 'Avatar',
					description: 'Kullanıcının avatarını görüntülemek için tıklayınız.',
					value: 'avatar',
				},
			]),
	);

	
		let üye = client.users.cache.get(interaction.targetId);

		let nameData = await isimler.findOne({ guildID: stfucum.GuildID, userID: üye.id });
		let registerData = await register.findOne({ guildID: stfucum.GuildID, userID: üye.id });
	  
				 const roles = client.guilds.cache.get(stfucum.GuildID).members.cache.get(interaction.targetId).roles.cache.filter(role => role.id !== stfucum.GuildID).sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`);
				  const rolleri = []
				  if (roles.length > 6) {
					  const lent = roles.length - 6
					  let itemler = roles.slice(0, 6)
					  itemler.map(x => rolleri.push(x))
					  rolleri.push(`${lent} daha...`)
				  } else {
					  roles.map(x => rolleri.push(x))
				  }
				  const members = [...interaction.guild.members.cache.filter(x => !x.user.bot).values()].sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);
				  const joinPos = members.map((u) => u.id).indexOf(üye.id);
				  const previous = members[joinPos - 1] ? members[joinPos - 1].user : null;
				  const next = members[joinPos + 1] ? members[joinPos + 1].user : null;
				  const bilgi = `${previous ? `**${previous.tag}** > ` : ""}<@${üye.id}>${next ? ` > **${next.tag}**` : ""}`
				  let member = interaction.guild.members.cache.get(üye.id)
				  let nickname = member.displayName == üye.username ? "" + üye.username + " [Yok] " : member.displayName
	  
		let embed = new EmbedBuilder().setAuthor({ name: üye.tag, iconURL: üye.avatarURL({ dynamic: true })}).setTimestamp().setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true })}).setThumbnail(üye.avatarURL({ dynamic: true }))
		  .addFields({name:`❯ Kullanıcı Bilgisi`,value:`
	  \` • \` Hesap: ${üye}
	  \` • \` Kullanıcı ID: ${üye.id}
	  \` • \` Kuruluş Tarihi: <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>
	  `},
	{name: `❯ Sunucu Bilgisi`,value:`
	  \` • \` Sunucu İsmi: ${nickname}
	  \` • \` Katılım Tarihi: <t:${Math.floor(client.guilds.cache.get(stfucum.GuildID).members.cache.get(interaction.targetId).joinedAt / 1000)}:R>
	  \` • \` Katılım Sırası: ${(interaction.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}/${(interaction.guild.memberCount).toLocaleString()}
	  \` • \` Katılım Bilgisi: ${bilgi}
	  
	  \` • \` Bazı Rolleri: (${rolleri.length}): ${rolleri.join(", ")}
	  \` • \` İsim geçmişi:  **${nameData ? `${nameData.names.length}` : "0"}** 
	  ${nameData ? nameData.names.splice(0, 1).map((x, i) => `\` ${x.name} \` ${x.sebep ? `(${x.sebep})` : ""} ${x.rol ? `(${x.rol})` : ""}`).join("\n") : ""}
	  `});
		if (client.guilds.cache.get(stfucum.GuildID).members.cache.get(interaction.targetId).permissions.has(PermissionsBitField.Flags.Administrator) || Ayarlar.teyitciRolleri.some(x => client.guilds.cache.get(stfucum.GuildID).members.cache.get(interaction.targetId).roles.cache.has(x))) 
		  embed.addFields({name:`❯ Yetkili Bilgisi`,value:
	  `• Toplam kayıt: ${registerData ? registerData.top : 0} • Erkek kayıt : ${registerData ? registerData.erkek : 0} • Kadın kayıt : ${registerData ? registerData.kız : 0} •`})
	  
		await interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
		var filter = (menu) => menu.user.id === interaction.user.id;
		const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 2, time: 10000 })
	   
		collector.on("collect", async (menu) => {
		   if(menu.values[0] === "avatar") {
			let member = client.guilds.cache.get(stfucum.GuildID).members.cache.get(interaction.targetId);
			const fetchUser = await client.users.fetch(member);
			await fetchUser.fetch(); 
			if (!member.avatar) {
			return menu.reply({ content: `> ${ hyperlink(`${fetchUser.tag}`, fetchUser.displayAvatarURL({ dynamic: true, size: 2048 }))}`, ephemeral: true });
			} else if (member.avatar) {
			menu.reply({ content: `> Sunucu Avatarı ${ hyperlink(`${member.user.tag}`, member.displayAvatarURL({ dynamic: true, size: 2048 }))}`, ephemeral: true }).then(
			async () => menu.followUp({ content: `> Normal Avatarı ${ hyperlink(`${fetchUser.tag}`, fetchUser.displayAvatarURL({ dynamic: true, size: 2048 }))}`, ephemeral: true }))
		   }
		  } 
		  else if(menu.values[0] === "banner") {
			async function bannerXd(user, client) {
			  const response = await axios.get(`https://discord.com/api/v10/users/${user}`, { headers: { 'Authorization': `Bot ${client.token}` } });
			  if(!response.data.banner) return `https://media.discordapp.net/attachments/938786568175513660/972982817359274024/Banner_bulunmamakta.png`
			  if(response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
			  else return(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)
			}
				let banner = await bannerXd(üye.id, client)
				menu.reply({ content: `${banner}`, ephemeral: true })
		  
			  }
		  })

	}
};