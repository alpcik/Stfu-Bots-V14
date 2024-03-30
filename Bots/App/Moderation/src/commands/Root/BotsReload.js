const Discord = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json");
const stfucum = require("../../../../../../stfu_config.json");
const children = require("child_process");

module.exports = {
  conf: {
    aliases: ['reload', 'reboot', 'restart'],
    name: "reload",
    help: "restart",
    category: "sahip",
    owner: true,
  }, 

  run: async (client, message, args) => {

    if (!args[0]) {
      await message.reply({ content: `__**Bot**__ yeniden başlatılıyor!`})
      children.exec(`pm2 restart ${stfucum.GuildName}_Voucher ${stfucum.GuildName}_Statistics ${stfucum.GuildName}_Moderation`);
    }
    else {
      let commandName = params[0].toLowerCase()
      let cmd = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
      if (!cmd) {
        return message.reply({ content: `\`${commandName}\` isminde bir komut bulunamadı!`})
      }
      await client.unloadCommand(cmd.config.location, cmd.info.name);
      await client.loadCommand(cmd.config.location, cmd.info.name);
      message.channel.send({content: `\`${cmd.info.name.charAt(0).replace('i', "İ").toUpperCase() + cmd.info.name.slice(1)}\` isimli komut yeniden başlatılıyor...`})
    }

  },
};