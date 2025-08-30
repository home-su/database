const axios = require("axios");

const config = {
    base: "https://app.orderkuota.com",
    app: {
        reg_id: "cichfWtKQUGktdmFffqv52:APA91bE7M6D8u5u_f6YlqQuHavBZHX-v-Ax8SDDp8XYIIzYk46PVta64MJxdVq294rRQnPTKDz1mWog4TVteGbowCVP-LpBoabfMzEP2duZrsExQzdd_EK4",
        version_code: "250811",
        version_name: "25.08.11"
    },
    phone: {
        uuid: "cichfWtKQUGktdmFffqv52",
        model: "V2120",
        version: "12",
        mode: "dark"
    }
};

async function mutasi(username, token) {
    const timestamp = Date.now().toString();
    const body = new URLSearchParams({
        'requests[qris_history][jumlah]': '',
        'requests[qris_history][jenis]': '',
        'requests[qris_history][page]': 1,
        'requests[qris_history][dari_tanggal]': '',
        'requests[qris_history][ke_tanggal]': '',
        'requests[qris_history][keterangan]': '',
        'request_time': timestamp,
        'app_reg_id': config.app.reg_id,
        'phone_android_version': config.phone.version,
        'app_version_code': config.app.version_code,
        'phone_uuid': config.phone.uuid,
        'auth_username': username,
        'auth_token': token,
        'app_version_name': config.app.version_name,
        'ui_mode': config.phone.mode,
        'requests[0]': 'account',
        'phone_model': config.phone.model
    }).toString();

    try {
        const response = await axios({
            method: 'post',
            url: '/api/v2/qris/mutasi/' + token.split(":")[0],
            baseURL: config.base,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'content-length': Buffer.byteLength(body),
                'accept-encoding': 'gzip',
                'user-agent': 'okhttp/4.12.0'
            },
            data: body
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Terjadi kesalahan harap periksa logs"
        }
    }
}

module.exports = { mutasi }