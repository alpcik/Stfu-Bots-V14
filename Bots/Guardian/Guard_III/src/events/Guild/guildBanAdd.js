const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const stfucum = require("../../../../../../stfu_config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (member) => {
let BanLimit = {};

let entry = await member.guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanAdd }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "banandkick") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
if (entry.executor.id === member.id) return;

let victimMember = await member.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
if (BanLimit[entry.executor.id] && BanLimit[entry.executor.id].Now + 1 > stfucum.Guard.Limit.Ban) {
    member.guild.members.unban(member.user.id);
    if (victimMember) {
        BanLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now()
        }
    }
    BanLimit[entry.executor.id].Now += 1;
} else if (!BanLimit[entry.executor.id]) {
    BanLimit[entry.executor.id] = {
        Now: 1,
        Last: Date.now()
    };
} else {
    BanLimit[entry.executor.id].Now += 1;
    setTimeout(() => {
        BanLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now()
        }
    }, 1000 * 60 * 3);
}
};

module.exports.conf = {
  name: "guildBanAdd",
};