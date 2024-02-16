const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '.'))); // Serve static files from the current directory

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Replace 'yourHtmlFileName.html' with the name of your HTML file
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
