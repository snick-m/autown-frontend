import QRCode from "qrcode";

function makeQR(url) {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(
            url || "sample.com",
            { errorCorrectionLevel: "H" },
            (error, dataUrl) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(dataUrl);
                }
            }
        );
    })
}

export default makeQR;