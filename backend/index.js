const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const DomainFactory = require('./DomainFactory');
const DownloadFactory = require('./DownloadFactory');

// Enable CORS
app.use(
  cors({
      origin: "*",
      credentials: true,
  }),
);



// Get list domain in Services folder
// global.ListDomain = []
// let files = fs.readdirSync(path.resolve(__dirname,'./Services/Domain'));
// files.forEach(file => {
//     let domain = file.split('.')[0];    
//     global.ListDomain[domain] = `./Services/Domain/${domain}`;
// });

// Define the relative path to the folder you want to monitor
const domainFolderMonitor = path.join(__dirname, 'Services/Domain');
fs.watch(domainFolderMonitor, (eventType, filename) => {
    if (eventType === 'rename') {             
        DomainFactory.addDomain(filename)
    }
});

const downloadTypeFolderMonitor = path.join(__dirname, 'Services/DownloadFormat');
fs.watch(downloadTypeFolderMonitor, (eventType, filename) => {
    if (eventType === 'rename') {            
        DownloadFactory.addDownloadType(filename)
    }
});

// Require router
const DomainsRouter = require('./Routers/DomainsRouter');
const NovelRouter = require('./Routers/NovelRouter');
const DownloadRouter = require('./Routers/DownloadRouter');

app.use('/getdomains', DomainsRouter);
app.use('/download', DownloadRouter);
app.use('/', NovelRouter);

// Start server

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
