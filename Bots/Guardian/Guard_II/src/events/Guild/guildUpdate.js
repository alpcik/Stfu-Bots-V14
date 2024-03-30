const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const setup = require("../../../../../App/src/configs/sunucuayar.json");
const stfucum = require("../../../../../../stfu_config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (oldGuild, newGuild) => {
    let entry = await newGuild.fetchAuditLogs({ type: AuditLogEvent.GuildUpdate }).then(audit => audit.entries.first());
    if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full")) return;
    cezaVer(OtherGuard, entry.executor.id, "jail");
    client.allPermissionClose();
};

module.exports.conf = {
  name: "guildUpdate",
};