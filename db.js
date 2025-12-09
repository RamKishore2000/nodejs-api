const mysql = require("mysql2");

const dbConfig = {
  host: "turntable.proxy.rlwy.net",
  user: "root",
  password: "jCTuhNAUrmmxSfkEYAOFvsAvCudiIlCA",
  database: "railway",
  port: 21989
};

// 🔍 DEBUG: print what config is actually used
console.log("DB CONFIG AT RUNTIME:", dbConfig);

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.log("❌ Error connecting to database:", err);
  } else {
    console.log("✅ Connected to Railway MySQL");
  }
});

module.exports = db;
