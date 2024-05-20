const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers:{"private-key":"adc23192-8cd1-4bd9-bc15-60a9218fb7b9" }}
    );
    return res.status(r.status).json(r.data);
  } catch(e) {
    return res.status(500).json({ error: e.message }); 
  }
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
