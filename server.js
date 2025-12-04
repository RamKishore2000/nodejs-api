// server.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./db"); // our db.js

const app = express();
app.use(cors());
app.use(express.json());

// Clever Cloud will give a PORT
const PORT = process.env.PORT || 5000;

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "ramkishore_secret_key";

// ---------- ROUTES ----------

// Register
app.post("/register", (req, res) => {
  const { email, password, fullname } = req.body;

  db.query(
    "INSERT INTO registration (email, password, fullname) VALUES (?, ?, ?)",
    [email, password, fullname],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "DB error", error: err });
      }
      res.json({ message: "Inserted successfully" });
    }
  );
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM registration WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "DB error", error: err });
      }

      if (results.length > 0) {
        const user = results[0];

        const token = jwt.sign(
          {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
          },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.json({
          message: "Login successful",
          user,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    }
  );
});

// Simple test routes
app.get("/", (req, res) => {
  res.send("Hello World from Clever Cloud");
});

app.get("/about", (req, res) => {
  res.send("This is about page");
});

// ---------- START SERVER ----------
app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server is running on port", PORT);
});
