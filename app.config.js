let stfucum = require('./stfu_config.json');

let botcuk = [
      {
        name: `Stfu_Moderation`,
        namespace: `${stfucum.GuildName}`,
        script: 'stfubaba.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/App/Moderation"
      },
      {
        name: `Stfu_Registery`,
        namespace: `${stfucum.GuildName}`,
        script: 'stfubaba.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/App/Register"
      },
      {
        name: `Stfu_Statistics`,
        namespace: `${stfucum.GuildName}`,
        script: 'stfubaba.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/App/Statistics"
      },
      {
        name: `Stfu_Guard_I`,
        namespace: `${stfucum.GuildName}`,
        script: 'stfubaba.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Guardian/Guard_I"
      },
      {
        name: `Stfu_Guard_II`,
        namespace: `${stfucum.GuildName}`,
        script: 'stfubaba.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Guardian/Guard_II"
      },
      {
        name: `Stfu_Guard_III`,
        namespace: `${stfucum.GuildName}`,
        script: 'stfubaba.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Guardian/Guard_III"
      }
    ]
  if(stfucum.Welcome.Active) {
    botcuk.push(
      {
        name: `Stfu_Welcome`,
        namespace: `${stfucum.GuildName}`,
        script: 'Start.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Welcome"
      }
    )
  }

  module.exports = {
    apps: botcuk
  };