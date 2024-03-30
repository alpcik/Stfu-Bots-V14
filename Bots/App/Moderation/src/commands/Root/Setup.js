const { ComponentType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require("discord.js");
const stfucum = require("../../../../../../stfu_config.json");
const ayar = require("../../../../src/configs/sunucuayar.json");

module.exports = {
  conf: {
    aliases: ["kur","setup"],
    name: "setup",
    help: "setup",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {



    let choose = args[0]

const row = new ActionRowBuilder()
.addComponents(
new StringSelectMenuBuilder()
.setCustomId('select')
.setPlaceholder('Setup Menüsü İçin Tıkla!')
.addOptions([
  { label: 'Setup Kurulumu İçin Tıkla', description: 'Bot kurulum komutları hakkında bilgi almanızı sağlar.', value: 'help' },
  { label: 'Güncel Verileri Görüntüle', description: 'Bot kurulum listesindeki kayıtlı verileri gösterir.', value: 'help2' },
]),
);
const row2 = new ActionRowBuilder()
.addComponents(
new StringSelectMenuBuilder()
.setCustomId('select2')
.setPlaceholder('Kurulum İçin Tıklayın')
.addOptions([
  { label: 'Sunucu Kurulum', description: 'Sunucu kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Server' },
  { label: 'Rol Kurulum', description: 'Rol kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Roles' },
  { label: 'Kanal Kurulum', description: 'Kanal kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Channel' },
  { label: 'Kategori Kurulum', description: 'Kategori kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Category' },
  { label: 'Verileri Yenile', description: 'Sunucu kurulumunuz bittikten sonra verileri dataya günceller.', value: 'Restart' },
]),
);

const row3 = new ActionRowBuilder()
.addComponents(
new StringSelectMenuBuilder()
.setCustomId('select3')
.setPlaceholder('Kurulum Verileri')
.addOptions([
  { label: 'Sunucu Veri Bilgilendirme', description: 'Sunucu kurulum verilerinden kurulanları görüntülersiniz.', value: 'Server2' },
  { label: 'Rol Veri Bilgilendirme', description: 'Rol kurulum verilerinden kurulanları görüntülersiniz.', value: 'Roles2' },
  { label: 'Kanal Veri Bilgilendirme', description: 'Kanal kurulum verilerinden kurulanları görüntülersiniz.', value: 'Channel2' },
  { label: 'Kategori Veri Bilgilendirme', description: 'Kategori kurulum verilerinden kurulanları görüntülersiniz.', value: 'Category2' },
  { label: 'Veri Yenileme', description: 'Sunucu verilerinizi en son kurduğunuz haline günceller.', value: 'Restart2' },
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
if(!choose) {
await message.reply({ content: `> Altda bulunan menü üzerinden setup kurabilir ve verilerinizi kontrol edebilirsiniz.`, components: [row, buttonRow] });
}


const embed = new EmbedBuilder().setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
.setDescription(`${message.author.toString()}, **${message.guild.name}** sunucususu içerisinde <t:${Math.floor(Date.now() / 1000)}:R>'den itibaren sunucu kurulum komutları hakkında bilgilendirme almak için aşağıdaki menüyü kullanabilirsiniz.`)
.setFooter({
text: `Veri Yenileme ile kurulum verilerinizi datadan güncellemeyi unutmayınız.`,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})

const embed2 = new EmbedBuilder().setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
.setDescription(`${message.author.toString()}, **${message.guild.name}** sunucususu içerisinde <t:${Math.floor(Date.now() / 1000)}:R>'den itibaren sunucuda kurulumu gerçekleşmiş olan veriler hakkında bilgilendirme almak için aşağıdaki menüyü kullanabilirsiniz.`)
.setFooter({
text: `Veri Yenileme ile kurulum verilerinizi datadan güncellemeyi unutmayınız.`,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})

const filter = i => i.user.id == message.author.id    
    let collector = await message.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 5 })
    collector.on("collect", async (interaction) => {

    if (interaction.values[0] === "Server") {
const sunucu = new EmbedBuilder()
.setDescription(`

**.setup tag [sembol]** 
**.setup ikinciTag [sembol]**
**.setup url [discord.gg/xxx]**

`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [sunucu], components: [], ephemeral: false }).catch({});
    }

    if (interaction.values[0] === "Roles") {
const rol = new EmbedBuilder()
.setDescription(`

.setup manRoles [@Rol/ID]
.setup womanRoles [@Rol/ID]
.setup unregRoles [@Rol/ID]
.setup familyRole [@Rol/ID]
.setup boosterRole [@Rol/ID]
.setup staffs [@Rol/ID]
.setup yetkiliRoles [@Rol/ID]
.setup teyitciRoles [@Rol/ID]
.setup sahipRoles [@Rol/ID]
.setup rolverici [@Rol/ID]

.setup katıldı [@Rol/ID]
.setup canlıdestek [@Rol/ID]
.setup yetkilialım [@Rol/ID]
.setup vipRole [@Rol/ID]
.setup müzisyenRole [@Rol/ID]
.setup tasarımcıRole [@Rol/ID]
.setup streamerRole [@Rol/ID]
.setup terapistRole [@Rol/ID]
.setup sorunçözücüRole [@Rol/ID]
.setup jailRole [@Rol/ID]

.setup yasaklıRole [@Rol/ID]
.setup underworldRole [@Rol/ID]
.setup chatMute [@Rol/ID]
.setup voiceMute [@Rol/ID]
.setup fakeAccRole [@Rol/ID]
.setup warnHammer [@Rol/ID]
.setup banHammer [@Rol/ID]
.setup jailHammer [@Rol/ID]
.setup cmuteHammer [@Rol/ID]
.setup vmuteHammer [@Rol/ID]
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [rol], components: [], ephemeral: false }).catch({});
    }

    if (interaction.values[0] === "Channel") {
const kanal = new EmbedBuilder()
.setDescription(`

.setup kurallar [#Kanal/ID]
.setup chatChannel [#Kanal/ID]
.setup welcomeChannel [#Kanal/ID]
.setup inviteChannel [#Kanal/ID]
.setup banLogChannel [#Kanal/ID]
.setup doomLogChannel [#Kanal/ID]
.setup jailLogChannel [#Kanal/ID]
.setup cmuteLogChannel [#Kanal/ID]
.setup vmuteLogChannel [#Kanal/ID]
.setup warnLogChannel [#Kanal/ID]
.setup cezapuanlog [#Kanal/ID]

`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [kanal], components: [], ephemeral: false }).catch({});
    }

    if (interaction.values[0] === "Category") {
const kategori = new EmbedBuilder()
.setDescription(`

.setup registerParents
.setup publicParent 
.setup secretroomParent 
.setup funParents 
.setup solvingParents 
.setup privateParents 
.setup aloneParents 

`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [kategori], components: [], ephemeral: false }).catch({});
    }

if (interaction.values[0] === "Restart") {
    await interaction.reply({ content: `[STFU]: Data Verileri Kaydedildi Ve Botlar Resetlendi!`, components: [], ephemeral: false }).catch({});
    process.exit(0)
    }
})

    let collector2 = await message.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 5, time: 120000 })
    collector2.on("collect", async (interaction) => {

    if (interaction.values[0] === "Server2") {
const embed = new EmbedBuilder()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden bota kurulmuş veya kurulmamış Sunucu ayarları verilerini görüntülüyebilirsiniz.

Root: (${stfucum.StfuID.length > 0 ? `${stfucum.StfuID.map(x => `<@${x}>`).join(",")}` : "\`YOK\`"})
Tag: (\` ${ayar.tag ? ayar.tag : "YOK"} \`) / (\` ${ayar.ikinciTag ? ayar.ikinciTag : "YOK"} \`)
Link: (${ayar.serverUrl ? ayar.serverUrl : "\`YOK\`"})
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [embed], components: [], ephemeral: false }).catch({});
    }

    if (interaction.values[0] === "Roles2") {
const embed = new EmbedBuilder()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden bota kurulmuş veya kurulmamış rol ayarları verilerini görüntülüyebilirsiniz.

Man Roles: (${ayar.erkekRolleri.length > 0 ? `${ayar.erkekRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Woman Roles: (${ayar.kizRolleri.length > 0 ? `${ayar.kizRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Unregister Role: (${ayar.unregRoles.length > 0 ? `${ayar.unregRoles.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Family Role: (${ayar.ekipRolu ? `<@&${ayar.ekipRolu}>` : "\`YOK\`"})
Booster Role: (${ayar.boosterRolu ? `<@&${ayar.boosterRolu}>` : "\`YOK\`"})
Staff Roles: (${ayar.staffs.length > 0 ? `${ayar.staffs.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Yetkili Roles: (${ayar.yetkiRolleri.length > 0 ? `${ayar.yetkiRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Teyitci Roles: (${ayar.teyitciRolleri.length > 0 ? `${ayar.teyitciRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Sahip Roles: (${ayar.sahipRolu.length > 0 ? `${ayar.sahipRolu.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Rol Verici Roles: (${ayar.rolverici.length > 0 ? `${ayar.rolverici.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Canlı Destek Role: (${ayar.canlıdestekRol ? `<@&${ayar.canlıdestekRol}>` : "\`YOK\`"})
Yetkili Alım Role: (${ayar.yetkilialımRol ? `<@&${ayar.yetkilialımRol}>` : "\`YOK\`"})
Toplantı Katıldı Role: (${ayar.Katıldı ? `<@&${ayar.Katıldı}>` : "\`YOK\`"})

Vip Role: (${ayar.vipRole ? `<@&${ayar.vipRole}>` : "\`YOK\`"})
Müzisyen Rol: (${ayar.müzisyenRole ? `<@&${ayar.müzisyenRole}>` : "\`YOK\`"})
Tasarımcı Rol: (${ayar.tasarımcıRole ? `<@&${ayar.tasarımcıRole}>` : "\`YOK\`"})
Streamer Role: (${ayar.streamerRole ? `<@&${ayar.streamerRole}>` : "\`YOK\`"})
Terapist Rol: (${ayar.terapistRole ? `<@&${ayar.terapistRole}>` : "\`YOK\`"})
Sorun Çözme Rol: (${ayar.sorunçözücüRole ? `<@&${ayar.sorunçözücüRole}>` : "\`YOK\`"})

Jail Role: (${ayar.jailRole.length > 0 ? `${ayar.jailRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Yasaklı Tag Role: (${ayar.yasaklıRole.length > 0 ? `${ayar.yasaklıRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Underworld Role: (${ayar.doomRole.length > 0 ? `${ayar.doomRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Chat Mute Role: (${ayar.chatMute.length > 0 ? `${ayar.chatMute.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Voice Mute Role: (${ayar.voiceMute.length > 0 ? `${ayar.voiceMute.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"}))
Fake Account Role: (${ayar.fakeAccRole.length > 0 ? `${ayar.fakeAccRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Warn Hammer Role: (${ayar.warnHammer.length > 0 ? `${ayar.warnHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Ban Hammer Role: (${ayar.banHammer.length > 0 ? `${ayar.banHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Jail Hammer Role: (${ayar.jailHammer.length > 0 ? `${ayar.jailHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
CMute Hammer Role: (${ayar.cmuteHammer.length > 0 ? `${ayar.cmuteHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
VMute Hammer Role: (${ayar.vmuteHammer.length > 0 ? `${ayar.vmuteHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})

      await interaction.reply({ embeds: [embed], components: [], ephemeral: false }).catch({});
    }

    if (interaction.values[0] === "Channel2") {
const embed = new EmbedBuilder()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden bota kurulmuş veya kurulmamış kanal ayarları verilerini görüntülüyebilirsiniz.

Kurallar: (${ayar.kurallar.length ? `<#${ayar.kurallar}>` : "\`YOK\`"})
Chat Channel: (${ayar.chatChannel.length ? `<#${ayar.chatChannel}>` : "\`YOK\`"})
Welcome Channel: (${ayar.teyitKanali.length ? `<#${ayar.teyitKanali}>` : "\`YOK\`"})
İnvite Channel: (${ayar.invLogChannel.length ? `<#${ayar.invLogChannel}>` : "\`YOK\`"})
Ban Log Channel: (${ayar.banLogChannel.length ? `<#${ayar.banLogChannel}>` : "\`YOK\`"})
Underworld Log Channel: (${ayar.doomLogChannel.length ? `<#${ayar.doomLogChannel}>` : "\`YOK\`"})
Jail Log Channel: (${ayar.jailLogChannel.length ? `<#${ayar.jailLogChannel}>` : "\`YOK\`"})
CMute Log Channel: (${ayar.cmuteLogChannel.length ? `<#${ayar.cmuteLogChannel}>` : "\`YOK\`"})
VMute Log Channel: (${ayar.vmuteLogChannel.length ? `<#${ayar.vmuteLogChannel}>` : "\`YOK\`"})
Warn Log Channel: (${ayar.warnLogChannel.length ? `<#${ayar.warnLogChannel}>` : "\`YOK\`"})
Ceza-Puan Log Channel: (${ayar.cezapuanlog.length ? `<#${ayar.cezapuanlog}>` : "\`YOK\`"})
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [embed], components: [], ephemeral: false }).catch({});
    }

    if (interaction.values[0] === "Category2") {
const embed = new EmbedBuilder()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden bota kurulmuş veya kurulmamış kategori ayarları verilerini görüntülüyebilirsiniz.

Register Parents: (** ${ayar.registerParents.length ? `${ayar.registerParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Public Parent: (** ${ayar.publicParents.length ? `<#${ayar.publicParents}>` : "\`YOK\`"} **)
Secret Room Parent: (** ${ayar.secretroomParent.length ? `<#${ayar.secretroomParent}>` : "\`YOK\`"} **)
Fun Parents: (** ${ayar.funParents.length > 0 ? `${ayar.funParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Solving Parents: (** ${ayar.solvingParents.length > 0 ? `${ayar.solvingParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Private Parents: (** ${ayar.privateParents.length ? `${ayar.privateParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Alone Parents: (** ${ayar.aloneParents.length ? `${ayar.aloneParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.edit({ embeds: [embed], components: [], ephemeral: false }).catch({});
    }

if (interaction.values[0] === "Restart2") {
      await interaction.reply({ content: `[STFU]: Data Verileri Kaydedildi Ve Botlar Resetlendi!`, components: [], ephemeral: false }).catch({});
      process.exit(0)
    }
})

    const collector3 = message.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 2, time: 120000 });
    collector3.on("collect", async (interaction) => {
   
        if (interaction.values[0] === "help") {
            await interaction.reply({ embeds: [embed], components: [row2], ephemeral: false }).catch({});
          }
          if (interaction.values[0] === "help2") {
            await interaction.reply({ embeds: [embed2], components: [row3], ephemeral: false }).catch({});
          }
    
        });



const setup1 = [
  { name: ["tag"], conf: "tag", cmdName: "Tag" },
  { name: ["secondarytag", "secondary-tag", "ikincitag", "ikinciTag"], conf: "ikinciTag", cmdName: "İkinci Tag" },
  { name: ["link", "url"], conf: "serverUrl", cmdName: "Url" },
]

const setup2 = [
  { name: ["staffs","staffrole","staffRole","staffRoles"], conf: "staffs", cmdName: "Yetkili Rol(leri)" },
  { name: ["erkekrol","manrole","manRoles","manroles"], conf: "erkekRolleri", cmdName: "Erkek Rol(leri)" },
  { name: ["kadınrol","womanrole","womanRoles","womanroles"], conf: "kizRolleri", cmdName: "Kız Rol(leri)" },
  { name: ["kayıtsızrol","unregisterrole","unregisterRole","unregRoles"], conf: "unregRoles", cmdName: "Kayıtsız Rol(leri)" },
  { name: ["yetkilirol","yetkilirole","yetkiliRole","yetkiliRoles"], conf: "yetkiRolleri", cmdName: "Yetki Rol(leri)" },
  { name: ["teyitcirol","teyitcirole","teyitciRole","teyitciRoles"], conf: "teyitciRolleri", cmdName: "Teyitci Rol(leri)" },
  { name: ["sahiprol","sahiprole","sahipRole","sahipRoles"], conf: "sahipRolu", cmdName: "Sahip Rol(leri)" },
  { name: ["warnHammer","warnhammer","warnh"], conf: "warnHammer", cmdName: "Warn Hammer" },
  { name: ["banHammer","banhammer","banh"], conf: "banHammer", cmdName: "Ban Hammer" },
  { name: ["jailHammer","jailhammer","jailh"], conf: "jailHammer", cmdName: "Jail Hammer" },
  { name: ["cmutehammer","cmuteHammer","cmh"], conf: "cmuteHammer", cmdName: "Chat-Mute Hammer" },
  { name: ["vmutehammer","vmuteHammer","vmh"], conf: "vmuteHammer", cmdName: "Voice-Mute Hammer" },
  { name: ["jail","jailRole","jailRole","jailRoles"], conf: "jailRole", cmdName: "Jail Rol" },
  { name: ["yasaklı","yasaklıRole","yasaklıRole","yasaklıRoles"], conf: "yasaklıRole", cmdName: "Yasaklı Tag Rol" },
  { name: ["underworld","doomRole","underworldRole","underworldRole","underworldRoles"], conf: "doomRole", cmdName: "Underworld Rol" },
  { name: ["chatMute","chatmute","chatMuteRole","chatmterole"], conf: "chatMute", cmdName: "Chat-Mute Rol" },
  { name: ["voiceMute","voicemute","voicemuteRole","voicemuterole"], conf: "voiceMute", cmdName: "Voice-Mute Rol" },
  { name: ["fakeAcc","fakeaccrole","fakeAccRole","fakeAccRoles"], conf: "fakeAccRole", cmdName: "Yeni Hesap Rol" },
  { name: ["rolverici","rolvericirole","rolvericiRole","rolvericiRoles"], conf: "rolverici", cmdName: "Rol Yönetici Rol" },
]

const setup3 = [
  { name: ["taglırol","familyrole","familyRole","familyRoles"], conf: "ekipRolu", cmdName: "Taglı Rol(leri)" },
  { name: ["boosterrol","boosterrole","boosterRole","boosterRoles"], conf: "boosterRolu", cmdName: "Booster Rol" },
  { name: ["viprol","viprole","vipRole","vipRoles"], conf: "vipRole", cmdName: "Vip Rol" },
  { name: ["müzisyenrol","müzisyenrole","müzisyenRole","müzisyen"], conf: "müzisyenRole", cmdName: "Müziysen Rol" },
  { name: ["tasarımcırol","tasarımcırole","tasarımcıRole","tasarımcı"], conf: "tasarımcıRole", cmdName: "Tasarımcı Rol" },
  { name: ["streamerrol","streamerrole","streamerRole","streamer"], conf: "streamerRole", cmdName: "Streamer Rol" },
  { name: ["sorunçözücürol","sorunçözücürole","sorunçözücüRole","sorunçözücü"], conf: "sorunçözücüRole", cmdName: "Sorun Çözücü Rol" },
  { name: ["terapistrol","terapistrole","terapistRole","terapist"], conf: "terapistRole", cmdName: "Terapist Rol" },
  { name: ["canlıdestekrol","canlıdestekrole","canlıdestekRole","canlıdestek"], conf: "canlıdestekRol", cmdName: "Canlı Destek Rol" },
  { name: ["yetkilialımrol","yetkilialımrole","yetkilialımRole","yetkilialım"], conf: "yetkilialımRol", cmdName: "Yetkili Alım Rol" },
  { name: ["katıldırol","katıldırole","katıldıRole","katıldı"], conf: "Katıldı", cmdName: "Katıldı Rol" },
]

const setup4 = [
  { name: ["chat","genelchat","chatChannel","chatchannel"], conf: "chatChannel", cmdName: "Chat Kanal" },
  { name: ["welcome","register","welcomechannel","welcomeChannel"], conf: "teyitKanali", cmdName: "Hoşgeldin Kanal" },
  { name: ["invite","invitekanal","inviteChannel","invitechannel"], conf: "invLogChannel", cmdName: "İnvite Kanal" },
  { name: ["bankanal","banlog","banLogChannel","banlogchannel"], conf: "banLogChannel", cmdName: "Ban Log Kanal" },
  { name: ["doomkanal","doomlog","doomLogChannel","doomlogchannel"], conf: "doomLogChannel", cmdName: "Underworld Log Kanal" },
  { name: ["jailkanal","jaillog","jailLogChannel","jaillogchannel"], conf: "jailLogChannel", cmdName: "Jail Log Kanal" },
  { name: ["cmutekanal","cmutelog","cmuteLogChannel","cmutelogchannel"], conf: "cmuteLogChannel", cmdName: "Chat-Mute Log Kanal" },
  { name: ["vmutekanal","vmutelog","vmuteLogChannel","vmutelogchannel"], conf: "vmuteLogChannel", cmdName: "Voice-Mute Log Kanal" },
  { name: ["warnkanal","warnlog","warnLogChannel","warnlogchannel"], conf: "warnLogChannel", cmdName: "Uyarı Log Kanal" },
  { name: ["rules","kurallar","kurallarkanalı","ruleschannel"], conf: "kurallar", cmdName: "Kurallar Kanal" },
  { name: ["cezapuankanal","cezapuanlog","cezapuanLogChannel","cezapuanlogchannel"], conf: "cezapuanlog", cmdName: "Ceza Puan Log Kanal" },
]
 
const setup5 = [
  { name: ["registerParents","registerparents","registerParent","registerparent"], conf: "registerParents", cmdName: "Register Kategori" },
  { name: ["solvingParents","solvingparents","solvingParent","solvingparent"], conf: "solvingParents", cmdName: "Geçersiz Kategori(leri)" },
  { name: ["privateParents","privateparents","privateParent","privateparent"], conf: "privateParents", cmdName: "Secret Kategori" },
  { name: ["aloneParents","aloneparents","aloneParent","aloneparent"], conf: "aloneParents", cmdName: "Alone Kategori" },
  { name: ["funParents","funparents","funParent","funparent"], conf: "funParents", cmdName: "Eğlence Kategori(leri)" },
]

const setup6 = [
  { name: ["publicParents","publicparents","publicParent","publicparent"], conf: "publicParents", cmdName: "Public Kategori" },
  { name: ["secretroomParents","secretroomparents","secretroomParent","secretroomparent","secretParent","secretparent"], conf: "secretroomParent", cmdName: "Özel Oda Kategori" },
]

setup1.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let select = args[1];
  if (!select) {
  message.reply({ content: `Sunucu **${x.cmdName}** belirtmelisin`, ephemeral: true });
  return }
  global.stfusetupxd.set(`${x.conf}`, `${select}`)
  message.reply({ content: `**${select}** ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
};
});

setup2.forEach(async (x) => {
if(x.name.some(x => x === choose)) {
  let Roles;
       if(message.mentions.roles.size >= 1)
       Roles = message.mentions.roles.map(role => role.id);
       else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
       if(Roles.length <= 0) return message.reply(`Bir Rol Belirt ve Tekrar dene.`)
let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`})
    global.stfusetupxd.set(`${x.conf}`, Roles)
    msg.edit({ content: `**${x.cmdName}** olarak ${Roles.map(x => `<@&${x}>`)} başarıyla eklendi.` , components: [] });
};
});

setup3.forEach(async (x) => {
if(x.name.some(x => x === choose)) {
const selectMenu = new ActionRowBuilder()
.addComponents([
  new RoleSelectMenuBuilder()
  .setCustomId("test2")
  .setMaxValues(10)
]); 

let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] })

const filter = i => i.user.id == message.author.id    
let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.RoleSelect, max: 1 })

xxx.on("collect", async (interaction) => {
  const rol = interaction.values[0];
  if(interaction.customId === "test2") {
    await interaction.deferUpdate();
    if(rol) {
    global.stfusetupxd.set(`${x.conf}`, `${rol}`)
    msg.edit({ content: `**${x.cmdName}**, <@&${rol}> olarak ayarlandı.` , components: [] });
  }
  }
})
};
}); 

setup4.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  const selectMenu = new ActionRowBuilder()
  .addComponents([
    new ChannelSelectMenuBuilder()
    .setCustomId("test3")
    .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
    .setMaxValues(10)
  ]);
  
  let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] })
  
  const filter = i => i.user.id == message.author.id    
  let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.ChannelSelect, max: 1 })
  
  xxx.on("collect", async (interaction) => {
    const channel = interaction.values[0];
    if(interaction.customId === "test3") {
      await interaction.deferUpdate();
      if(channel) {
      global.stfusetupxd.set(`${x.conf}`, `${channel}`)
      msg.edit({ content: `**${x.cmdName}**, <#${channel}> olarak ayarlandı.` , components: [] });
    }
    }
  })
  };
}); 

setup5.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  const selectMenu = new ActionRowBuilder()
  .addComponents([
    new ChannelSelectMenuBuilder()
    .setCustomId("test4")
    .addChannelTypes(ChannelType.GuildCategory)
    .setMaxValues(10)
  ]);
  
  let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] })
  
  const filter = i => i.user.id == message.author.id    
  let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.ChannelSelect, max: 1 })
  
  xxx.on("collect", async (interaction) => {
    const channel = interaction.values;
    if(interaction.customId === "test4") {
      await interaction.deferUpdate();
      if(channel) {
        let xd = []
        channel.map(x => 
        xd.push(`${x}`)
        )
      global.stfusetupxd.set(`${x.conf}`, xd)
      msg.edit({ content: `**${x.cmdName}** olarak **${channel.map(x => `<#${channel}>`)}** başarıyla eklendi.` , components: [] });
    }
    }
  })
  };
}); 


setup6.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  const selectMenu = new ActionRowBuilder()
  .addComponents([
    new ChannelSelectMenuBuilder()
    .setCustomId("test5")
    .addChannelTypes(ChannelType.GuildCategory)
    .setMaxValues(10)
  ]);
  
  let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] })
  
  const filter = i => i.user.id == message.author.id    
  let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.ChannelSelect, max: 1 })
  
  xxx.on("collect", async (interaction) => {
    const channel = interaction.values[0];
    if(interaction.customId === "test5") {
      await interaction.deferUpdate();
      if(channel) {
      global.stfusetupxd.set(`${x.conf}`, `${channel}`)
      msg.edit({ content: `**${x.cmdName}**, **<#${channel}>** olarak ayarlandı.` , components: [] });
    }
    }
  })
  };
}); 
  }
};