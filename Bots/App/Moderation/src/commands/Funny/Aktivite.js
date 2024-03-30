const { ComponentType, Client, Message, EmbedBuilder, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require("discord.js");
const { DiscordTogether } = require('discord-together');
const client = global.bot;
client.discordTogether = new DiscordTogether(client);
const { green, red } = require("../../../../src/configs/emojis.json")

    module.exports = {
        conf: {
          aliases: ["aktivite", "together","etkinlik"],
          name: "aktivite",
          help: "aktivite",
          category: "kullanıcı",
        },
      
        run: async (client, message, args, prefix) => {
          if(!message.member.voice.channel) return message.reply(`Herhangi bir ses kanalı bağlı değilsin, Üzgünüm!`).then(x => {
            message.react("❌")
            setTimeout(() => { x.delete()}, 7500);
          });
      
          let row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
            .setCustomId("stfu")
            .setPlaceholder(`Aktivitenizi belirleyin!`)
            .addOptions(
              {label: "Youtube", description:"Arkadaşlarınla Youtube ile video seyretmek ister misin?", value: "youtube"},
              {label: "Poker Night", description:"Arkadaşlarınla Poker Night oynamak ister misin?", value: "poker"},
              {label: "Santranç", description:"Arkadaşlarınla Satranç oynamak ister misin?", value: "chess"},
              {label: "Dama", description:"Arkadaşlarınla Dama oynamak ister misin?", value: "checkers"},
              {label: "Kelime Oyunu", description:"Arkadaşlarınla Kelime Oyunu oynamak ister misin?", value: "wordsnack"},
              {label: "Heceleme", description:"Arkadaşlarınla Heceleme oynamak ister misin?", value: "spellcast"},  
            ),
          )
      
      let embed = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addFields(
        { name: "AKTİVİTE SEÇİM",  value: `\` ❯ \` Aşağıda ki sıralanan aktivitelerden oynamak veya aktivite yapmak için menüden tıklayarak seçebilirsiniz.`, inline: false },
        )
          message.channel.send({embeds: [embed], components: [row]}).then(msg => {
            var filter = (component) => component.user.id === message.author.id;
            let collector = msg.createMessageComponentCollector({ filter, time: 30000 })
      
            collector.on('collect', async (i) => {
              if(i.customId == "stfu") {
                let etkinlik = i.values[0]
      
                if(etkinlik == "youtube") {
                  client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
                    embed.setDescription(`${message.member} tarafından Youtube Together seçildi!`).setFooter({ text: "Bu davet 10 saniye içerisinde silinecektir."})
                    msg.edit({embeds: [embed], components: []}).then((e) => setTimeout(() => { e.delete(); }, 10000));
                    message.react("✅")
                      await i.reply({content: `İzlemek için arkadaşlarınla bu davet kodunu kullanabilirsin.\n${invite.code}`, ephemeral: true})
                  });
                };
      
                if(etkinlik == "poker") {
                  client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'poker').then(async invite => {
                    embed.setDescription(`${message.member} tarafından Poker Night seçildi!`).setFooter({ text: "Bu davet 10 saniye içerisinde silinecektir."})
                    msg.edit({embeds: [embed], components: []}).then((e) => setTimeout(() => { e.delete(); }, 10000));
                    message.react("✅")
                      await i.reply({content: `İzlemek için arkadaşlarınla bu davet kodunu kullanabilirsin.\n${invite.code}`, ephemeral: true})
                  });
                };
      
                if(etkinlik == "chess") {
                  client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'chess').then(async invite => {
                    embed.setDescription(`${message.member}, tarafından Satranç seçildi!`).setFooter({ text: "Bu davet 10 saniye içerisinde silinecektir."})
                    msg.edit({embeds: [embed], components: []}).then((e) => setTimeout(() => { e.delete(); }, 10000));
                    message.react("✅")
                      await i.reply({content: `Oynamak için arkadaşlarınla bu davet kodunu kullanabilirsin.\n${invite.code}`, ephemeral: true})
                  });
                };
              
                if(etkinlik == "checkers") {
                  client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'checkers').then(async invite => {
                    embed.setDescription(`${message.member}, tarafından Dama seçildi!`).setFooter({ text: "Bu davet 10 saniye içerisinde silinecektir."})
                    msg.edit({embeds: [embed], components: []}).then((e) => setTimeout(() => { e.delete(); }, 10000));
                    message.react("✅")
                      await i.reply({content: `Oynamak için arkadaşlarınla bu davet kodunu kullanabilirsin.\n${invite.code}`, ephemeral: true})
                  });
                };
              
                if(etkinlik == "wordsnack") {
                  client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'wordsnack').then(async invite => {
                    embed.setDescription(`${message.member}, tarafından Kelime Oyunu seçildi!`).setFooter({ text: "Bu davet 10 saniye içerisinde silinecektir."})
                    msg.edit({embeds: [embed], components: []}).then((e) => setTimeout(() => { e.delete(); }, 10000));
                    message.react("✅")
                      await i.reply({content: `Oynamak için arkadaşlarınla bu davet kodunu kullanabilirsin.\n${invite.code}`, ephemeral: true})
                  });
                };
              
                if(etkinlik == "spellcast") {
                  client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'spellcast').then(async invite => {
                    embed.setDescription(`${message.member}, tarafından Heceleme seçildi!`).setFooter({ text: "Bu davet 10 saniye içerisinde silinecektir."})
                    msg.edit({embeds: [embed], components: []}).then((e) => setTimeout(() => { e.delete(); }, 10000));
                    message.react("✅")
                      await i.reply({content: `Oynamak için arkadaşlarınla bu davet kodunu kullanabilirsin.\n${invite.code}`, ephemeral: true})
                  });
                };
              }
            })
          });
          }
      };