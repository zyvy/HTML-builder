const readline = require('readline');
const path = require('path');
//const fs = require('fs');
const fullPath = path.join(__dirname, 'secret-folder');
const fs = require('fs/promises');

async function getFilesInfo() {
    const files = await fs.readdir(fullPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const fileExtension = path.extname(file.name)
        const fileStats = await fs.stat(path.join(fullPath, file.name))
        console.log(`${path.basename(file.name, fileExtension)} - ${fileExtension.slice(1)} - ${fileStats.size/1024}kb`);
      } 
    }
}
getFilesInfo()
