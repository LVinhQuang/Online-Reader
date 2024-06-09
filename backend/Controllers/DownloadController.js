const DownloadFactory = require('../Factory/DownloadFactory.js');

module.exports = {
    Download: async function(req, res) {

        const downloadType = req.params.type;

        let downloadTypeClass = DownloadFactory.GetDownloadType(downloadType);
        downloadTypeClass.Download(req, res);
    },

    DownloadTypes: async function(req, res) {
        try {                                   
            
            let downloadTypes = DownloadFactory.GetAllDownloadType();  
                      
            res.status(200).json({data:downloadTypes});
            
        } catch (error) {
            //console.log(error)
            res.status(500).json({ message: error });
        }
    }
}