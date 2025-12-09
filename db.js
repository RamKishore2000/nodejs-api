const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "mysql.railway.internal",
  user: "root",
  password: "jCTuhNAUrmmxSfkEYAOFvsAvCudiIlCA",
  database: "railway",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.log("❌ Error connecting to database:", err);
  } else {
    console.log("✅ Connected to Railway MySQL");
  }
});

module.exports = db;
