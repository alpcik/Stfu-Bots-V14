const { ApplicationCommandType } = require('discord-api-types/v10');
const { PermissionsBitField, ComponentType, ContextMenuCommandBuilder, hyperlink, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, IntegrationApplication } = require("discord.js");
const stfucum = require("../../../../../../stfu_config.json");
const ayar = require("../../../../src/configs/sunucuayar.json");
const { green, red } = require("../../../../src/configs/emojis.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;

module.exports = {
	data: new ContextMenuCommandBuilder()
	.setName('Perm Ver-Al')
	.setType(ApplicationCommandType.User),
		
  async execute(interaction, client) {
    let uye = client.guilds.cache.get(stfucum.GuildID).members.cache.get(interaction.targetId);
    if (!uye) return;

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: `Yönetici olmadığınız için kullanamazsınız!`, ephemeral: true })
    if(interaction.user.id === uye.id) return interaction.reply({content: `Kendine Rol Veremezsin dostum!`, ephemeral: true })
    
    const perm = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('perm')
            .setPlaceholder('Eklemek istediğiniz perm için tıklayınız')
            .addOptions([
              {
                label: 'Vip',
                value: 'vip',
                emoji: '970343074150621215'
            },
            {
                label: 'Müzisyen',
                value: 'müzisyen',
                emoji: '970343048162725928'
            },						
            {
                label: 'Tasarımcı',
                value: 'tasarımcı',
                emoji: '970343065820753940'
            },
            {
                label: 'Streamer',
                value: 'streamer',
                emoji: '970343083818508388'
            },
            {
                label: 'Terapist',
                value: 'terapi',
                emoji: '970343056048005120'
            },
            {
                label: 'Sorun Çözücü',
                value: 'sorun',
                emoji: '1000665369125593138'
            },
            ]),
    );
    
    interaction.reply({ content : `${uye} kullanıcısına perm eklemek için aşağıdaki menüyü kullanınız`, components: [perm], ephemeral: true });
    
    const filter = i => i.user.id == interaction.user.id 
    const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });
    collector.on("collect", async (interaction) => {
    
         if (interaction.values[0] === "vip") {
            uye.roles.cache.has(ayar.vipRole) ? uye.roles.remove(ayar.vipRole) : uye.roles.add(ayar.vipRole);
            if(!uye.roles.cache.has(ayar.vipRole)) {
              client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [new EmbedBuilder().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Vip** adlı rol verildi.`)]})
              interaction.reply({ content:`:white_check_mark: Başarıyla ${uye}, isimli kişiye **Vip** rolü verildi.`, components: [], ephemeral: true });
            } else {
              client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [new EmbedBuilder().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Vip** adlı rol geri alındı.`)]})
              interaction.reply({ content:`:white_check_mark: Başarıyla ${uye}, isimli kişinin **Vip** rolü geri alındı.`, components: [], ephemeral: true });
            };
         }
    
         if (interaction.values[0] === "müzisyen") {
            uye.roles.cache.has(ayar.müzisyenRole) ? uye.roles.remove(ayar.müzisyenRole) : uye.roles.add(ayar.müzisyenRole);
            if(!uye.roles.cache.has(ayar.müzisyenRole)) {
              client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [new EmbedBuilder().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Müzisyen** adlı rol verildi.`)]})
              interaction.reply({ content:`:white_check_mark: Başarıyla ${uye}, isimli kişiye **Müzisyen** rolü verildi.`, components: [], ephemeral: true });
            } else {
              client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [new EmbedBuilder().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Müzisyen** adlı rol geri alındı.`)]})
              interaction.reply({ content:`:white_check_mark: Başarıyla ${uye}, isimli kişinin **Müzisyen** rolü geri alındı.`, components: [], ephemeral: true });
            };
         }
    
        if (interaction.values[0] === "tasarımcı") {
            uye.roles.cache.has(ayar.tasarımcıRole) ? uye.roles.remove(ayar.tasarımcıRole) : uye.roles.add(ayar.tasarımcıRole);
            if(!uye.roles.cache.has(ayar.tasarımcıRole)) {
              client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [new EmbedBuilder().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Tasarımcı** adlı rol verildi.`)]})
              interaction.reply({ content:`:white_check_mark: Başarıyla ${uye}, isimli kişiye **Tasarımcı** rolü verildi.`, components: [], ephemeral: true });
            } else {
              client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [new EmbedBuilder().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Tasarımcı** adlı rol geri alındı.`)]})
              interaction.reply({ content:`:white_check_mark: Başarıyla ${uye}, isimli kişinin **Tasarımcı** rolü geri alındı.`, components: [], ephemeral: true });
            };
         }
    
        if (interaction.values[0] === "streamer") {
            uye.roles.cache.has(ayar.streamerRole) ? uye.roles.remove(ayar.streamerRole) : uye.roles.add(ayar.streamerRole);
            if(!uye.roles.cache.has(ayar.streamerRole)) {
              client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [new EmbedBuilder().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Streamer** adlı rol verildi.`)]})
              interaction.reply({ content:`:white_check_mark: Başarıyla ${uye}, isimli kişiye **Streamer** rolü verildi.`, components: [], ephemeral: true });
            } else {
              client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [new EmbedBuilder().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Streamer** adlı rol geri alındı.`)]})
              interaction.reply({ content:`:white_check_mark: Başarıyla ${uye}, isimli kişinin **Streamer** rolü geri alındı.`, components: [], ephemeral: true });
            };
         }
    
         if (interaction.values[0] === "terapi") {
          uye.roles.cache.has(ayar.terapistRole) ? uye.roles.remove(ayar.terapistRole) : uye.roles.add(ayar.terapistRole);
          if(!uye.roles.cache.has(ayar.terapistRole)) {
            client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [new EmbedBuilder().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Terapist** adlı rol verildi.`)]})
            interaction.reply({ content:`:white_check_mark: Başarıyla ${uye}, isimli kişiye **Terapist** rolü verildi.`, components: [], ephemeral: true });
          } else {
            client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [new EmbedBuilder().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Terapist** adlı rol geri alındı.`)]})
            interaction.reply({ content:`:white_check_mark: Başarıyla ${uye}, isimli kişinin **Terapist** rolü geri alındı.`, components: [], ephemeral: true });
          };
       }
    
        if (interaction.values[0] === "sorun") {
            uye.roles.cache.has(ayar.sorunçözücüRole) ? uye.roles.remove(ayar.sorunçözücüRole) : uye.roles.add(ayar.sorunçözücüRole);
            if(!uye.roles.cache.has(ayar.sorunçözücüRole)) {
              client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [new EmbedBuilder().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Sorun Çözücü** adlı rol verildi.`)]})
              interaction.reply({ content:`:white_check_mark: Başarıyla ${uye}, isimli kişiye **Sorun Çözücü** rolü verildi.`, components: [], ephemeral: true });
            } else {
              client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [new EmbedBuilder().setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${interaction.user} tarafından **Sorun Çözücü** adlı rol geri alındı.`)]})
              interaction.reply({ content:`:white_check_mark: Başarıyla ${uye}, isimli kişinin **Sorun Çözücü** rolü geri alındı.`, components: [], ephemeral: true });
            };
         }
        })
}
};