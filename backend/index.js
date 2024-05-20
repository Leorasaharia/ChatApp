const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the authentication server!");
});

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": process.env.PRIVATE_KEY } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    console.error("Error:", e.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  res.status(500).json({ error: "Something went wrong" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
