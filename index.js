const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const HEADERS = {
  "Referer": "https://web.classplusapp.com/",
  "User-Agent": "Mozilla/5.0"
};

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Extract
app.get("/extract", async (req, res) => {
  const { url } = req.query;

  try {
    const data = await axios.get(url, { headers: HEADERS });
    res.send(data.data);
  } catch {
    res.status(500).send("Error");
  }
});

// Stream
app.get("/stream", async (req, res) => {
  const { url } = req.query;

  try {
    const stream = await axios({
      url,
      method: "GET",
      responseType: "stream",
      headers: HEADERS
    });

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    stream.data.pipe(res);
  } catch {
    res.status(500).send("Stream error");
  }
});

app.listen(PORT, () => console.log("Server running"));