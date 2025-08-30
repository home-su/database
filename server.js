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

app.get("/mutasi", async (req, res) => {
    try {
        const { username, token } = req.query;
        if (!username && !token) return res.json({
            success: false,
            message: "Masukan parameter username & token"
        })
        const result = await orkut.mutasi(username, token)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.json({
            success: false,
            message: "Telah terjadi kesalahan pada sistem"
        })
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