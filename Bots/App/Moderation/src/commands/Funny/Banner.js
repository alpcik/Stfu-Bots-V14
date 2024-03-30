const Discord = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField } = require("discord.js");
const axios = require('axios');
const fetch = require('node-fetch')
const client = global.bot;
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
    conf: {
      aliases: ["banner"],
      name: "banner",
      help: "banner",
      category: "kullanıcı",
    },

run: async (client, message, args, embed, prefix) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    
    const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('avatar')
            .setPlaceholder('Avatarını görüntülemek için tıklayınız!')
            .addOptions([
                {
                    label: 'Avatar',
                    description: 'Kullanıcının avatarını görüntülemek için tıklayınızama sapıklık yapma!',
                    value: 'avatar',
                },
            ]),
    );

    const üye = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
    async function bannerXd(user, client) {
        const response = await axios.get(`https://discord.com/api/v10/users/${user}`, { headers: { 'Authorization': `Bot ${client.token}` } });
        if(!response.data.banner) return `https://media.discordapp.net/attachments/938786568175513660/972982817359274024/Banner_bulunmamakta.png`
        if(response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
        else return(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)
      
      }

      let banner = await bannerXd(üye.id, client)

        let msg = await message.channel.send({ content: `${banner}`, components: [row] })
        var filter = (menu) => menu.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
       
        collector.on("collect", async (menu) => {
           if(menu.values[0] === "avatar") {
              menu.reply({ content: `${üye.displayAvatarURL({ dynamic: true, size: 4096 })}`, ephemeral: true })
          } 
      
        })

     
        },
  };