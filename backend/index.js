const express = require("express");
const cors = require("cors");
const axios = require("axios"); 

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers:{"private-key":"90de5c42-8288-4701-b63b-71a562debbeb" }}
    );
    return res.status(r.status).json(r.data);
  } catch(e) {
    return res.status(500).json({ error: e.message }); 
  }
});

app.listen(3001);
