const fs = require('fs/promises');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist/bundle.css');
async function mergeStyles() {
  const stylesArr = [];
  const files = await fs.readdir(stylesPath);
  const cssFiles = files.filter((file) => file.endsWith('.css'));
  for (const file of cssFiles) {
    const currentFilePath = path.join(stylesPath, file);
    const fileContent = await fs.readFile(currentFilePath, 'utf-8');
    stylesArr.push(fileContent);
  }
  await fs.writeFile(bundlePath, stylesArr.join('\n'), 'utf-8');
}
mergeStyles();
