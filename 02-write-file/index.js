const readline = require('readline');
const path = require('path');
const fs = require('fs');
const fullPath = path.join(__dirname, 'text.txt');

const newline = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const writableStream = fs.createWriteStream(fullPath, { flags: 'a' });
console.log('Hello. You can enter text. Type "exit" to exit.');
newline.prompt();

//  check input
newline.on('line', (input) => {
  if (input === 'exit') {
    console.log('Exit');
    newline.close(); 
    process.exit(); 
  }
  writableStream.write(input + '\n');
  newline.prompt();
});


newline.on('close', () => {
  console.log('Exit');
  process.exit();
});


process.on('SIGINT', () => {
  console.log('Exit (Ctrl+C).');
  newline.close();
  process.exit();
});