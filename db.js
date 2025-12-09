const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "turntable.proxy.rlwy.net",             // from PUBLIC URL
  user: "root",                                 // from URL
  password: "jCTuhNAUrmmxSfkEYAOFvsAvCudiIlCA", // your password
  database: "railway",                          // database name
  port: 21989                                   // from PUBLIC URL
});

db.connect((err) => {
  if (err) {
    console.log("❌ Error connecting to database:", err);
  } else {
    console.log("✅ Connected to Railway MySQL");
  }
});

module.exports = db;
