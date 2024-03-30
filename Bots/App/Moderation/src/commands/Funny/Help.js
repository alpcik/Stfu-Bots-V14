const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const emoji = require("../../../../src/configs/emojis.json")
const { green, red } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["help", "y", "help","yardım", "h"],
    name: "yardım",
  },
 
  run: async (client, message, args, embed, prefix) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let command = args[0]
    if (client.commands.has(command)) {
    command = client.commands.get(command)
    message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})) .setDescription(`
    :white_check_mark: Belirttiğin komuta ait bilgiler aşağıda verilmiştir!
    
    \`Komut Adı\`**:** ${command.conf.name}
    \`Komut Açıklaması:\`**:** ${command.conf.description}
    \`Komut Kullanımı:\`**:** ${command.conf.help}
    \`Komut Alternatifleri:\`**:** ${command.conf.aliases[0] ? command.conf.aliases.join(', ') : `Alternatif bulunmuyor!`}`)]})
      return;
    }

    const row = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('yardım')
        .setPlaceholder(`Bot komutlarını görüntülemek için tıklayınız!`)
          .addOptions([
            {
              label: 'Kullanıcı Komutları',
              description: 'Kullanıcı Komutlarını Görmek İçin Tıkla!',
              value: 'kullanıcı',
              emoji: '1208159372744720414',
            },
            {
              label: 'Market Komutları',
              description: 'Market Komutlarını Görmek İçin Tıkla!',
              value: 'market',
              emoji: '1205476500888092672',
            },						
            {
              label: 'Kayıt Komutları',
              description: 'Kayıt Komutlarını Görmek İçin Tıkla!',
              value: 'reg',
              emoji: '1204353242415243264',
            },
            {
              label: 'Cezalandırma Komutları',
              description: 'Cezalandırma Komutlarını Görmek İçin Tıkla!',
              value: 'ceza',
              emoji: '1204352575412117524',
            },
            {
              label: 'Stat Komutları',
              description: 'Stat Komutlarını Görmek İçin Tıkla!',
              value: 'stats',
              emoji: '1204352198763356171',
            },
            {
              label: 'Yetkili Komutları',
              description: 'Yetkili Komutlarını Görmek İçin Tıkla!',
              value: 'yt',
              emoji: '1204353314142294046',
            },
            {
              label: 'Kurucu Komutları',
              description: 'Kurucu Komutlarını Görmek İçin Tıkla!',
              value: 'owner',
              emoji: '1204350915251806208',
            },
            {
              label: 'Setup Komutları',
              description: 'Setup Komutlarını Görmek için Tıkla!',
              value: 'botsahip',
              emoji: '1204353573928837120',
            },
            ]),
    );

    let buttonRow = new ActionRowBuilder()
.addComponents(
     new ButtonBuilder()
    .setCustomId("askadami")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("stfu.")
    .setEmoji("1223379309948043336")
    .setDisabled(true)
);
let msg = await message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setDescription(`:pencil: *Merhaba ${member.toString()}, Aşağıdaki Menüden ${member.guild.name} Sunucusunun Bot Komutlarını Görebilirsin.*\n*Toplamda \` ${client.commands.size} \` Komut Bulunmaktadır.*`)], components: [row, buttonRow] })

var filter = (menu) => menu.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, time: 30000 })

collector.on("collect", async (menu) => {
    if(menu.values[0] === "kullanıcı") {
      await menu.deferUpdate();

      const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "kullanıcı").map(x => `<a:stfu_yildiz:1222914434012287046> *${prefix}${x.conf.help}* `).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
    if(menu.values[0] === "market") {
      await menu.deferUpdate();

      const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "market").map(x => `<a:stfu_yildiz:1222914434012287046> *${prefix}${x.conf.help}*`).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
    if(menu.values[0] === "reg") {
      await menu.deferUpdate();

      const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "kayıt").map(x => `<a:stfu_yildiz:1222914434012287046> *${prefix}${x.conf.help}*`).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
    if(menu.values[0] === "ceza") {
      await menu.deferUpdate();

      const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "cezalandırma").map(x => `<a:stfu_yildiz:1222914434012287046> *${prefix}${x.conf.help}*`).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
    if(menu.values[0] === "stats") {
      await menu.deferUpdate();

      const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "stat").map(x => `<a:stfu_yildiz:1222914434012287046> *${prefix}${x.conf.help}*`).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
    if(menu.values[0] === "yt") {
      await menu.deferUpdate();

      const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "yetkili").map(x => `<a:stfu_yildiz:1222914434012287046> *${prefix}${x.conf.help}*`).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
    if(menu.values[0] === "owner") {
      await menu.deferUpdate();

      const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "yönetim").map(x => `<a:stfu_yildiz:1222914434012287046> *${prefix}${x.conf.help}*`).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
    if(menu.values[0] === "botsahip") {
      await menu.deferUpdate();
      if (!stfucum.StfuID.includes(message.author.id)) {
        return message.reply({ content: ":x: Bot developerı olmadığın için bu kısımdan yararlanamazsın!", ephemeral: true })
      } const embeds = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
      .setDescription(`${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "sahip").map(x => `<a:stfu_yildiz:1222914434012287046> *${prefix}${x.conf.help}*`).join('\n')}`)
      
            msg.edit({
              embeds: [embeds],
              components : [row]
            })
          }
})
} 
}