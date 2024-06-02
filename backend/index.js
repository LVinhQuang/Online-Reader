const express = require('express');
const Factory = require('./factory');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Enable CORS
app.use(
  cors({
      origin: `http://localhost:3001}`,
      credentials: true,
  }),
);

// Require router
const NovelRouter = require('./Routers/NovelRouter');
const DomainsRouter = require('./Routers/DomainsRouter');

// Define the relative path to the folder you want to monitor
// const folderToMonitor = path.join(__dirname, 'Services/');

// fs.watch(folderToMonitor, (eventType, filename) => {
//     if (eventType === 'rename') {
//         const filePath = path.join(folderToMonitor, filename);
//         console.log(`New file added: ${filePath}`);
//         // Perform your action here
//     }
// });

app.use('/getdomains', DomainsRouter);
app.use('/', NovelRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
