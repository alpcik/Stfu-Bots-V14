const moment = require("moment");
moment.locale("tr")
module.exports = {
    conf: {
      aliases: ["yönetim","sunucu"],
      name: "ayar",
      help: "yönetim [isim], [resim], [banner], [profile], [nick]",
      category: "sahip",
      owner: true,
    },
  
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {Array<String|Number>} args
     * @param {EmbedBuilder} embed
     * @returns {Promise<void>}
     */
    run: async (client, message, args, embed) => {
    if(!args[0]) return message.reply({ content: `Hata yaptın! Bir seçim belirtmelisin! \`resim , banner , isim , profile , nick\``, ephemeral: true })
    if(args[0] === "resim")
    { 
    if (!message.attachments.first()) { 
    message.channel.send({ content:"Lütfen bi sunucu resimini dosya olarak ekleyiniz."}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }
    message.guild.setIcon(message.attachments.first().proxyURL)
    message.reply({ content: `Başarılı bir şekilde sunucu resmi değiştirilmiştir!`, ephemeral: true })
    console.log(`${message.author.tag} (${message.author.id}) tarafından ${moment(message.createdAt).format("lll")} zamanında sunucu resmi değiştirildi!`)
    }
    if(args[0] === "isim") 
    {
    let isim = args.slice(1).join(" ")
    message.guild.setName(isim)
    message.reply({ content: `Başarılı bir şekilde sunucu ismi \`${isim}\` olarak değiştirildi!`, ephemeral: true })
    console.log(`${message.author.tag} (${message.author.id}) tarafından ${moment(message.createdAt).format("lll")} zamanında sunucu ismi \`${isim}\` olarak değiştirildi!`)
    }
    if(args[0] === "banner")
    { 
    if (!message.attachments.first()) { 
    message.channel.send({ content:"Lütfen bi sunucu afişi dosya olarak ekleyiniz."}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }
    message.guild.setBanner(message.attachments.first().proxyURL)
    message.reply({ content: `Başarılı bir şekilde sunucu afişi değiştirilmiştir!`, ephemeral: true })
    console.log(`${message.author.tag} (${message.author.id}) tarafından ${moment(message.createdAt).format("lll")} zamanında sunucu afişi değiştirildi!`)
    }
    if(args[0] === "profile")
    { 
    if (!message.attachments.first()) { 
    message.channel.send({ content:"Lütfen bi bot fotoğrafını dosya olarak ekleyiniz."}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }
    client.user.setAvatar(message.attachments.first().proxyURL);
    message.reply({ content: `Başarılı bir şekilde bot profili değiştirilmiştir!`, ephemeral: true })
    console.log(`${message.author.tag} (${message.author.id}) tarafından ${moment(message.createdAt).format("lll")} zamanında bot profili değiştirildi!`)
    }
    if(args[0] === "nick") 
    {
    let isim = args.slice(1).join(" ")
    client.user.setUsername(isim)
    message.reply({ content: `Başarılı bir şekilde bot ismi \`${isim}\` olarak değiştirildi!`, ephemeral: true })
    console.log(`${message.author.tag} (${message.author.id}) tarafından ${moment(message.createdAt).format("lll")} zamanında bot ismi \`${isim}\` olarak değiştirildi!`)
    }
    },
  };