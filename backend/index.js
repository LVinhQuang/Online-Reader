const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const DomainFactory = require('./Factory/DomainFactory');
const DownloadFactory = require('./Factory/DownloadFactory');

// Enable CORS
app.use(
  cors({
      origin: "*",
      credentials: true,
  }),
);

DomainFactory.InitDomainCache(path.resolve(__dirname, './Services/Domain'));
DownloadFactory.InitDownloadTypeCache(path.resolve(__dirname, './Services/DownloadFormat'));

// Define the relative path to the folder you want to monitor
const domainFolderMonitor = path.join(__dirname, 'Services/Domain');
fs.watch(domainFolderMonitor, (eventType, filename) => {
    if (eventType === 'rename') {
        DomainFactory.InitDomainCache(path.resolve(__dirname, './Services/Domain'));
    }
});

const downloadTypeFolderMonitor = path.join(__dirname, 'Services/DownloadFormat');
fs.watch(downloadTypeFolderMonitor, (eventType, filename) => {
    if (eventType === 'rename') {            
        DownloadFactory.InitDownloadTypeCache(path.resolve(__dirname, './Services/DownloadFormat'));
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
