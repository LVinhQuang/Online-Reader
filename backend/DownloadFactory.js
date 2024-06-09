const fs = require('fs');
const path = require('path');

module.exports = new class DownloadFactory {
    constructor() {
        this.downloadCache = new Map();
        let files = fs.readdirSync(path.resolve(__dirname, './Services/DownloadFormat'));
        files.forEach(file => {
            let downloadType = file.split('.')[0];
            this.addDownloadType(downloadType);
        });
    }

    addDownloadType(downloadType) {
        const newDomain = require(`./Services/DownloadFormat/${downloadType}`);
        this.downloadCache.set(downloadType, newDomain);
    }

    removeDownloadType(downloadType) {
        this.downloadCache.delete(downloadType);
    }

    getDownloadType(downloadType) {
        return this.downloadCache.get(downloadType);
    }
}