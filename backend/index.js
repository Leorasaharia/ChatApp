const express = require("express");
const cors = require("cors");
const axios = require("axios"); 

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the authentication server!");
});

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "adc23192-8cd1-4bd9-bc15-60a9218fb7b9" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(500).json({ error: e.message }); 
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
