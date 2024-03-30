module.exports = {
    conf: {
      aliases: ["kaccm","cm"],
      name: "kaccm",
      help: "kaccm [Text]",
     category: "kullanıcı"     
    },
  
run: async (client, message, args, embed, prefix) => {

    let yarraklar = [
        "senin malafatın **26** cm, hacı sen bununla duvar bile kırarsın.",
        "senin malafatın **1** cm, phahahahaha çük!!",
        "senin malafatın **6** cm, daha büyümesine var..",
        "senin malafatın **19** cm, hard core gider..",
        "senin malafatın **4** cm, çen buyucende penis mi olcan çen.",
        "senin malafatın **32** cm, genini bana ver!!",
        "senin malafatın **50** cm, hocam cinsel ilişkiye girdiğin zaman haber etde galaktikadan çıkalım."
      ];
    const member = await message.mentions.members.first() ||await message.guild.members.cache.get(args[0]) || await message.member
    if(member){
    message.channel.send({content:`${member}, ${yarraklar[Math.floor(Math.random() * yarraklar.length)]}`})
    }
}
}    