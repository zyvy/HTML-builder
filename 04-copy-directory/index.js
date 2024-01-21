const path = require('path');
const fs = require('fs/promises');
const fullPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');
async function copyFolder(fullPath, copyPath) {
      await fs.mkdir(copyPath, { recursive: true });
      const files = await fs.readdir(fullPath)
      for (const file of files) {
        const tempFullPath = path.join(fullPath, file);
        const tempCopyPath = path.join(copyPath, file);
        const fileStats = await fs.stat(tempFullPath);
        if (fileStats.isDirectory()) {
          await copyFolder(tempFullPath, tempCopyPath);
        } else {
          await fs.copyFile(tempFullPath, tempCopyPath);
        }
      }
  }
   
copyFolder(fullPath, copyPath);