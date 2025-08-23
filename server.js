const express = require('express');
const path = require('path');
const fs = require('fs');
const orkut = require("./orkut.js")

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/aplikasi', express.static(path.join(__dirname, 'aplikasi'), {
  maxAge: '1d'
}));

app.use('/apps', express.static(path.join(__dirname, 'apps'), {
  maxAge: '1d'
}));

app.use('/flags', express.static(path.join(__dirname, 'flags'), {
  maxAge: '1d'
}));

app.use('/h2h', express.static(path.join(__dirname, 'h2h'), {
  maxAge: '1d'
}));

app.get("/mutasiqris", async (req, res) => {
  try {
    const result = await new orkut("nenengkurniasih", "2239440:0isrWp3wuBCgIXvUlNLdtJGH41EcS6bO").getFormattedMutasiQris();
    res.json(result);
  } catch (err) {
    res.status(500).json([]);
  }
});

app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
  const fallback = path.join(__dirname, 'favicon_icon.png');
  res.sendFile(fallback);
});

app.listen(PORT, () => {
  console.log(`CDN server running at http://localhost:${PORT}`);
});