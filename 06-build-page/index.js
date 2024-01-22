const fs = require('fs/promises');
const path = require('path');

/* 
copy:
1. assets to project-dist/assets
compile styles
1. from styles folder to project-dist/style.css
replace tags
1. in project-dist/index.html replace article, footer, header
save to project-dist/index.html
*/
async function copyAssets(assetsPath, AssetsCopyPath) {
    await fs.mkdir(AssetsCopyPath, { recursive: true });
    const files = await fs.readdir(assetsPath)
    for (const file of files) {
      const tempFullPath = path.join(assetsPath, file);
      const tempCopyPath = path.join(AssetsCopyPath, file);
      const fileStats = await fs.stat(tempFullPath);
      if (fileStats.isDirectory()) {
        await copyAssets(tempFullPath, tempCopyPath);
      } else {
        await fs.copyFile(tempFullPath, tempCopyPath);
      }
    }
}
const assetsPath = path.join(__dirname, 'assets');
const AssetsCopyPath = path.join(__dirname, 'project-dist/assets');
//copyAssets(assetsPath, AssetsCopyPath)

async function mergeStyles(stylesPath, stylesNewPath) {
    const stylesArr = [];
    const files = await fs.readdir(stylesPath);
    const cssFiles = files.filter(file => file.endsWith('.css'));
    for (const file of cssFiles) {
      const currentFilePath = path.join(stylesPath, file);
      const fileContent = await fs.readFile(currentFilePath, 'utf-8');
      stylesArr.push(fileContent);
    }
    await fs.writeFile(stylesNewPath, stylesArr.join('\n'), 'utf-8');

  } 
stylesPath = path.join(__dirname, 'styles');
stylesNewPath = path.join(__dirname, 'project-dist/style.css');
//mergeStyles(stylesPath, stylesNewPath);

async function replaceTags(tag, text) {
    console.log(tag)
    console.log(text)

}

async function readTagFiles(pathForTagFiles) {
    const files = await fs.readdir(pathForTagFiles);
    for (const file of files) {
      const currentFilePath = path.join(pathForTagFiles, file);
      const fileName = file.name;
      const fileText = await fs.readFile(currentFilePath, 'utf-8');
      replaceTags(fileName, fileText)
}
}
pathForTagFiles = path.join(__dirname, 'components');
readTagFiles(pathForTagFiles)