const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const stfucum = require("../../../../../../stfu_config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (oldRole, newRole) => {
let entry = await newRole.guild.fetchAuditLogs({ type: AuditLogEvent.RoleUpdate }).then(audit => audit.entries.first());
if (entry.executor.bot) return;
if (!entry || !entry.executor || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "role") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
newRole.edit(oldRole)
};

module.exports.conf = {
  name: "roleUpdate",
};