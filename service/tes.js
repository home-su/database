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

const data = (await axios.get("https://smsbower.org/activations/getPricesByService?serviceId=14&withPopular=true")).data.services
const apk = Object.values(data)

console.log("Total:", apk.length)

for (let txt of apk) {
    console.log(txt.img_path)
    const imageUrl = `https://smsbower.org${txt.img_path}`
    const savePath = path.join(__dirname, `${txt.activate_org_code}.svg`);
    if (!fs.existsSync(savePath)) {
        await delay(3000)
        console.log("Downloading...")
        await downloadImage(imageUrl, savePath)
    }
}
})()