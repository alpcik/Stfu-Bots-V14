const mongoose = require("mongoose");
const stfucum = require("../../../../../stfu_config.json");

mongoose.set('strictQuery', true);
mongoose.connect(stfucum.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Database bağlantısı tamamlandı!");
});
mongoose.connection.on("error", () => {
  console.error("[HATA] Database bağlantısı kurulamadı!");
});