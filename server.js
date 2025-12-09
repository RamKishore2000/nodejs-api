const express = require('express');
const db = require('./db');
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// Secret key for JWT
const JWT_SECRET = "ramkishore_secret_key";

// ----------------- REGISTER API -----------------
app.post("/register", (req, res) => {
  const { id, email, password, fullname } = req.body;

  db.query(
    "INSERT INTO registration1 (id, email, password, fullname) VALUES (?, ?, ?, ?)",
    [id, email, password, fullname],
    (err, result) => {
      if (err) return res.json(err);

      res.json({ message: "Inserted successfully" });
    }
  );
});

// ----------------- LOGIN API -----------------
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM registration1 WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.json(err);

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
          user: user,
          token: token
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    }
  );
});

// ----------------- BASIC ROUTES -----------------
app.get('/', (req, res) => {
  res.send("Hello World — Node.js API is Running!");
});

app.get('/about', (req, res) => {
  res.send("This is the About page");
});

// ----------------- IMPORTANT FOR RAILWAY -----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
