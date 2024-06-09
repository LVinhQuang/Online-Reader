const fs = require('fs');
const path = require('path');

module.exports = class DownloadFactory {
    static downloadCache = new Map();
    
    static InitDownloadTypeCache(dirname) {
        let files = fs.readdirSync(dirname)
        files.forEach(file => {
            let download = file.split('.')[0];
            this.AddDownloadType(download);
        })
    }

    static AddDownloadType(downloadType) {
        const download = require(`../Services/DownloadFormat/${downloadType}`);
        this.downloadCache.set(downloadType, download);
    }

    static RemoveDownloadType(downloadType) {
        this.downloadCache.delete(downloadType);
    }

    static GetDownloadType(downloadType) {
        return this.downloadCache.get(downloadType);
    }

    static GetAllDownloadType() {
        let downloadTypes =  Array.from(this.downloadCache.keys());        
        return downloadTypes;
    }
}