const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRow, ActionRowBuilder } = require("discord.js");

module.exports = {
    conf: {
        aliases: ["timeout","time", "zamanasimi", "zamanaşımı"],
        name: "timeout",
        help: "timeout <@stfu/ID>",
        category: "yetkili",
    },

    run: async ( message, args ) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers) &&  !conf.banHammer.some(x => message.member.roles.cache.has(x))) { message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
        return }
        if (!args[0]) { message.channel.send({ content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
        return }
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("5m")
                    .setLabel("5 Dakika")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId("10m")
                    .setLabel("10 Dakika")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId("1h")
                    .setLabel("1 Saat")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId("1g")
                    .setLabel("1 Gün")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId("1hafta")
                    .setLabel("1 Hafta")
                    .setStyle(ButtonStyle.Secondary)
            );


            const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("atildi")
                    .setLabel("Timeout Atıldı")
                    .setEmoji("1149502735335563404")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Danger),

            );

        const stfu = new EmbedBuilder()
            .setDescription(`\`>\` ${member}, üyesine ne kadar süre bir zaman aşımı atmak istediğini lütfen aşağıdan seç.`);

        let msg = await message.channel.send({ embeds: [stfu], components: [row] });

        var filter = button => button.user.id === message.member.id;

        let collector = await msg.createMessageComponentCollector({ filter, time: 30000 });

        collector.on("collect", async (button) => {
            await button.deferUpdate();

            let embeds;

            if(button.customId === "5m") {
                embeds = new EmbedBuilder() 
                    .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
                    .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                    .setTimestamp()
                    .setDescription(`${message.author}, ${member} kullanıcısını **5 Dakikalık** zaman aşımına yolladı.`);
                member.timeout(5 * 60 * 1000);
            } else if(button.customId === "10m") {
                embeds = new EmbedBuilder() 
                    .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
                    .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                    .setTimestamp()
                    .setDescription(`${message.author}, ${member} kullanıcısını **10 Dakikalık** zaman aşımına yolladı.`);
                member.timeout(10 * 60 * 1000);
            } else if(button.customId === "1h") {
                embeds = new EmbedBuilder() 
                    .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
                    .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                    .setTimestamp()
                    .setDescription(`${message.author}, ${member} kullanıcısını **1 Saatlik** zaman aşımına yolladı.`);
                member.timeout(60 * 60 * 1000);
            } else if(button.customId === "1g") {
                embeds = new EmbedBuilder() 
                    .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
                    .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                    .setTimestamp()
                    .setDescription(`${message.author}, ${member} kullanıcısını **1 Günlük** zaman aşımına yolladı.`);
                member.timeout(24 * 60 * 60 * 1000);
            } else if(button.customId === "1hafta") {
                embeds = new EmbedBuilder() 
                    .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
                    .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                    .setTimestamp()
                    .setDescription(`${message.author}, ${member} kullanıcısını **1 Haftalık** zaman aşımına yolladı.`);
                member.timeout(7 * 24 * 60 * 60 * 1000);
            }

            msg.edit({
                embeds: [embeds],
                components : [row1]
            });
        });
    }
};
