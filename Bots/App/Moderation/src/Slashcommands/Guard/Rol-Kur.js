const { ButtonStyle, ComponentType, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, WebhookClient } = require("discord.js");
const RoleModel = require("../../../../../Guardian/src/Models/Role");
const stfucum = require("../../../../../../stfu_config.json");
const moment = require("moment");
require("moment-duration-format");
const client = global.bot;
const Bots = require("../../../../../Guardian/Backup")

module.exports = {
    data: new SlashCommandBuilder()
      .setName("rol-kur")
      .setDescription("Silinen Rol Kurulumunu Gerçekleştirebilirsiniz.")
      .addStringOption((option) =>
      option.setName("id")
      .setDescription("Yüklenecek <rol> belirtiniz.")
      .setRequired(true),
      ),
    async execute(interaction, bot) {
      if(!stfucum.StfuID.includes(interaction.user.id)) {
        return interaction.reply({ content: ":x: Bot developerı olmadığın için kullanamazsın.", ephemeral: true })
      } 

      const row = new ActionRowBuilder()
      .addComponents([
       new ButtonBuilder()
      .setCustomId("onay")
      .setLabel("İşlemi Onayla")
      .setStyle(ButtonStyle.Success)
      .setEmoji('966805209848352778')
    ])

      var victim = interaction.options.getString("id");
      if (!victim || isNaN(victim)) return interaction.reply({ content:`Geçerli bir Rol ID'si belirtmelisin.`, ephemeral: true })
   
      const RoleData = await RoleModel.findOne({ guildID: stfucum.GuildID, roleID: victim });
        if (!RoleData) return interaction.reply({ content:"Belirtilen Rol ID'si ile ilgili veri tabanında veri bulunamadı!", ephemeral: true })
        const kEmbed = new EmbedBuilder()
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setTimestamp()
        .setDescription(`**${RoleData.name}** adlı rolün yedeği kullanılarak rol oluşturulup, üyelere dağıtılacaktır.\nOnaylıyor iseniz **İşlemi Onayla** butonuna basınız!`)
    
        await interaction.reply({ embeds: [kEmbed], components: [row] })

        const filter = i => i.user.id == interaction.user.id 
        const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button, max: 1, time: 30000 });
        collector.on("collect", async (r) => {

          setTimeout(async function(){
          await interaction.deleteReply().catch(err => console.log(`Backup mesajı silinemedi..`));
    
          const yeniRol = await interaction.guild.roles.create({
            name: RoleData.name,
            color: RoleData.color,
            hoist: RoleData.hoist,
            permissions: RoleData.permissions,
            position: RoleData.position,
            mentionable: RoleData.mentionable,
            reason: "Databaseden Yeniden rol açıldı."
          });
          
          setTimeout(() => {
            let kanstfuermVeri = RoleData.channelOverwrites;
            if (kanstfuermVeri) kanstfuermVeri.forEach((perm, index) => {
              let kanal = interaction.guild.channels.cache.get(perm.id);
              if (!kanal) return;
              setTimeout(() => {
                let yeniKanstfuermVeri = {};
                perm.allow.forEach(p => {
                  yeniKanstfuermVeri[p] = true;
                });
                perm.deny.forEach(p => {
                  yeniKanstfuermVeri[p] = false;
                });
                kanal.permissionOverwrites.create(yeniRol, yeniKanstfuermVeri).catch(console.error);
              }, index*5000);
            });
          }, 5000); 
    
          let length = RoleData.members.length;
               if (length <= 0) return console.log(`[${yeniRol.id}] Rol kurulumunda kayıtlı üye olmadığından dolayı rol dağıtımı gerçekleştirmedim.`);
                interaction.followUp({ content:`
Başarılı bir şekilde kurulum başladı roller dağıtılıyor kanallara izinleri ekleniyor.
**Aktif İşlem;**
\`\`\`cs
Role sahip ${RoleData.members.length} üye ${Bots.length ? Bots.length : "0"} bot üye olmak üzere rolü destekçiler ile birlikte dağıtmaya başlıyorum
İşlemin biteceği tahmini süre: ${(length>1000 ? parseInt((length*(stfucum.Guard.Guard.GiveRoleDelay/1000)) / 60)+" dakika" : parseInt(length*(stfucum.Guard.Guard.GiveRoleDelay/1000))+" saniye")}
\`\`\`
`, ephemeral: true })
   
               let availableBots = Bots.filter(e => !e.Busy);
               if (availableBots.length <= 0) availableBots = Bots.sort((x, y) => y.Uj - x.Uj).slice(0, Math.round(length / Bots.length));
               let perAnyBotMembers = Math.floor(length / availableBots.length);
               if (perAnyBotMembers < 1) perAnyBotMembers = 1;
               for (let index = 0; index < availableBots.length; index++) {
                   const bot = availableBots[index];
                   let ids = RoleData.members.slice(index * perAnyBotMembers, (index + 1) * perAnyBotMembers);
                   if (ids.length <= 0) { client.processBot(bot, false, -perAnyBotMembers); break; }
                   let guild = bot.guilds.cache.get(stfucum.GuildID); 
                   ids.every(async id => {
                  let member = guild.members.cache.get(id);
                  if(!member){
                   console.log(`[${victim}] Rol Kurulumundan sonra ${bot.user.username} - ${id} adlı üyeyi sunucuda bulamadım.`);
                   return true;}
                   await member.roles.add(yeniRol.id).then(e => {console.log(`[${victim}] Rol kurulumundan sonra ${bot.user.tag} - ${member.user.username} adlı üye ${yeniRol.name} rolünü aldı.`);}).catch(e => {console.log(`[${yeniRol.id}] Olayından sonra ${bot.user.username} - ${member.user.username} adlı üyeye rol veremedim.`);});});
                   client.processBot(bot, false, -perAnyBotMembers); }
    
                   client.channels.cache.find(x => x.name == "guard_log").send({ content:`${interaction.user} (\`${interaction.user.id}\`) kullanıcısı\n<#${interaction.channel.id}> (\`${interaction.channel.id}\`) kanalında \`/rol-kur\` komutu kullandı.\nKomut İçeriği: **${RoleData.name}** - (\`${RoleData.roleID}\`) rolün yedeğini kurmaya başladı.\n──────────────────────────`})
             }, 450)
           })
          },
};