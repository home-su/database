const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/apps', express.static(path.join(__dirname, 'apps')));
app.use('/flags', express.static(path.join(__dirname, 'flags')));

app.use('/', (req, res) => {
  const fallback = path.join(__dirname, 'apps', '1cp.png');
  res.sendFile(fallback);
});

app.listen(PORT, () => {
  console.log(`CDN server running at http://localhost:${PORT}`);
});