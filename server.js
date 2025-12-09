const express = require('express');
const db = require('./db');
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// Secret key for JWT (keep it safe)
const JWT_SECRET = "ramkishore_secret_key";

app.post("/register", (req, res) => {
  const { email, password, fullname } = req.body;

  db.query(
    "INSERT INTO registration (email, password, fullname) VALUES (?, ?, ?)",
    [email, password, fullname],
    (err, result) => {
      if (err) {
        return res.json(err);
      }
      res.json({ message: "Inserted successfully" });
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM registration WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.json(err);

      if (results.length > 0) {
        const user = results[0];

        // Create JWT Token (payload = user details)
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
          user: user,   // full user row
          token: token  // token included
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    }
  );
});

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.get('/about', (req, res) => {
  res.send("This is about page");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
