const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/aplikasi', express.static(path.join(__dirname, 'aplikasi'), {
  maxAge: '1d',
  immutable: true
}));

app.use('/apps', express.static(path.join(__dirname, 'apps'), {
  maxAge: '1d',
  immutable: true
}));

app.use('/flags', express.static(path.join(__dirname, 'flags'), {
  maxAge: '1d',
  immutable: true
}));

app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
  const fallback = path.join(__dirname, 'favicon_icon.png');
  res.sendFile(fallback);
});

app.listen(PORT, () => {
  console.log(`CDN server running at http://localhost:${PORT}`);
});