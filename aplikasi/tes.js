const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadImage(url, outputPath) {
    try {
        const response = await axios({
            url,
            responseType: 'stream',
        });

        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);

        console.log("[ 200 ] ", outputPath)
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.log("[ 404 ] ", outputPath)
        return downloadImage("https://files.catbox.moe/uqbvtr.ico", outputPath)
        console.error('Gagal mengunduh gambar:', error.message);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {

const data = (await axios.get("https://virtusim.com/api/json.php?api_key=fff10ba86bf20809928a628aa33b8b34&action=services")).data.data
const apk = [...new Set(data.map(item => item.name))];

console.log("Total:", apk.length)

for (let txt of apk) {
    const imageUrl = `https://virtusim.com/assets/images/ico/${txt}.png`
    let t = txt.replace(/\//g, "--")
    const savePath = path.join(__dirname, `${t}.png`);
    if (!txt.includes("?") && !t.includes("<--small>")) {
    if (!fs.existsSync(savePath)) {
        await delay(3000)
        console.log("Downloading...")
        await downloadImage(imageUrl, savePath)
    }
    }
}
})()