const express = require('express');
const Factory = require('./factory');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const tf = require('./Services/truyenfull')
const truyenfull = new tf();

// Require router
const NovelRouter = require('./Routers/NovelRouter');

app.get('/truyenfull', async (req, res) => {
  const data = await truyenfull.GetTruyenFull();
  res.send(data);
})
// Define the relative path to the folder you want to monitor
// const folderToMonitor = path.join(__dirname, 'Services/');

// fs.watch(folderToMonitor, (eventType, filename) => {
//     if (eventType === 'rename') {
//         const filePath = path.join(folderToMonitor, filename);
//         console.log(`New file added: ${filePath}`);
//         // Perform your action here
//     }
// });

app.use('/', NovelRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
