const fs = require('fs');

module.exports = class DownloadModel {
    async DownloadTypes(){
        try {
            let files = fs.readdirSync('./Services/DownloadFormat');
            let downloadTypes = [];
            files.forEach(file => {
                let downloadType = file.split('.')[0];
                downloadTypes.push(downloadType);
            });
            return downloadTypes;
            
        } catch (error) {
            throw error;
        }
    }
}