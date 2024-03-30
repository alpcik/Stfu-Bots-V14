let { stfu } = require('./Voices.Global.Client');
const { ActivityType } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const stfucum = require('./../../stfu_config.json');
require("./src/handlers/mongoHandler");

for (let index = 0; index < stfucum.Welcome.Tokens.length; index++) {
    let token = stfucum.Welcome.Tokens[index]
    let channel = stfucum.Welcome.Channels < 1 ? stfucum.Welcome.Channels[0] : stfucum.Welcome.Channels[index]
    if(channel) {
        let client = new stfu()
        client.login(token).catch(err => {
            console.log(`${index + 1}. Satırdaki Token Arızalı!`)
        })
        client.on("voiceStateUpdate", async (oldState, newState) => { 
            if(oldState.member.id === client.user.id && oldState.channelId && !newState.channelId) {
                let activities = stfucum.BotStatus, i = 0;
                setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, 
                type: ActivityType.Listening }), 10000);
                client.user.setStatus("idle");

                let guild = client.guilds.cache.get(stfucum.GuildID);
                if(!guild) return console.log("sunucu yok!");
                let Channel = global.Voice = guild.channels.cache.get(channel);
                if(!Channel) return console.log("channel yok");
                client.voiceConnection = await joinVoiceChannel({
                        channelId: Channel.id,
                        guildId: Channel.guild.id,
                        adapterCreator: Channel.guild.voiceAdapterCreator,
                        group: client.user.id
                });
            }
        })
        
        client.on('ready', async () => {
            console.log(`${client.user.tag}`)
            let activities = stfucum.BotStatus, i = 0;
            setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, 
            type: ActivityType.Listening }), 10000);
            client.user.setStatus("idle");
            
            let guild = client.guilds.cache.get(stfucum.GuildID);
            if(!guild) return console.log("sunucu yok!");
            let Channel = global.Voice = guild.channels.cache.get(channel);
            if(!Channel) return console.log("channel yok");
            client.voiceConnection = await joinVoiceChannel({
                channelId: Channel.id,
                guildId: Channel.guild.id,
                adapterCreator: Channel.guild.voiceAdapterCreator,
                group: client.user.id
            });

            const connection = getVoiceConnection(stfucum.GuildID);
            if (connection) return;
            setInterval(async () => { joinVoiceChannel({
                channelId: Channel.id,
                guildId: Channel.guild.id,
                adapterCreator: Channel.guild.voiceAdapterCreator,
                group: client.user.id
            });
            }, 5000);

            if(!Channel.hasStaff()) await client._start(channel)
            else client.staffJoined = true, client.playing = false, await client._start(channel);
            
        })
        
        client.on('ready', async () => {
            const cron = require('node-cron');
            const children = require("child_process");
            const Database = require("./WelcomeMode"); 
            let xd = "./src/sesler/cuma.mp3"
            let xd2 = "./src/sesler/hosgeldin.mp3"
            const data = await Database.findOne({ guildID: stfucum.GuildID });

            cron.schedule('* * * * 5', () => {
                const date = new Date();
                const day = date.getDay();
                
                if (day === 5) {
                    client.guilds.cache.forEach(async (guild) => {
                        if(data && data.SesMod === xd) return;
                        await Database.findOneAndUpdate({ guildID: stfucum.GuildID }, {SesMod: xd}, { upsert: true })
                        console.log(`Bugün Cuma Olduğu İçin Ses Modu Cuma olarak ayarlandı`)
                        children.exec(`pm2 restart ${stfucum.GuildName}_Welcomes`);
                    });
                } else {
                    client.guilds.cache.forEach(async (guild) => {
                        if(data && data.SesMod === xd2) return;
                        await Database.findOneAndUpdate({ guildID: stfucum.GuildID }, {SesMod: xd2}, { upsert: true })
                        console.log(`Bugün Cuma Bittiği İçin Ses Modu Hoş geldin olarak ayarlandı`)
                        children.exec(`pm2 restart ${stfucum.GuildName}_Welcomes`);
                    });
                }
            });
        })

        client.on('voiceStateUpdate', async (oldState, newState) => { 
            if(
                newState.channelId && (oldState.channelId !== newState.channelId) &&
                newState.member.isStaff() &&
                newState.channelId === channel &&
                !newState.channel.hasStaff(newState.member)
            ) {
                client.staffJoined = true;
                client.player.stop()
                return;
            }
            if( 
                oldState.channelId && 
                (oldState.channelId !== newState.channelId) && 
                newState.member.isStaff() && 
                oldState.channelId === channel &&
                !oldState.channel.hasStaff()
            ) {
                client.staffJoined = true;
                client._start(channel, true)
                return 
            }
        })
    }
}