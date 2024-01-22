const path = require('path');
const fs = require('fs');
const fullPath = path.join(__dirname, 'text.txt');
// console.log(fullPath);
const textStream = fs.createReadStream(fullPath, 'utf-8');
textStream.on('data', function (chunk) {
  console.log(chunk);
});
