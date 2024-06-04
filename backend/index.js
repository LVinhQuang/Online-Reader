const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Enable CORS
app.use(
  cors({
      origin: "*",
      credentials: true,
  }),
);



// Get list domain in Services folder
global.ListDomain = []
let files = fs.readdirSync('./Services');
files.forEach(file => {
    let domain = file.split('.')[0];    
    global.ListDomain[domain] = `./Services/${domain}`;
});

// Define the relative path to the folder you want to monitor
const folderToMonitor = path.join(__dirname, 'Services/');
fs.watch(folderToMonitor, (eventType, filename) => {
    if (eventType === 'rename') {
        const filePath = path.join(folderToMonitor, filename);
        // console.log(`New file added: ${filePath}`);
        // Perform your action here
        global.ListDomain[filename] = `./Services/${filename}`;        
    }
});

// Require router
const NovelRouter = require('./Routers/NovelRouter');
const DomainsRouter = require('./Routers/DomainsRouter');

app.use('/getdomains', DomainsRouter);
app.use('/', NovelRouter);

// Start server

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
