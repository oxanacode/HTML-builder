const path = require('path');
const fs = require('fs');

const projectPath = path.join(__dirname, 'project-dist');
const assetsPath= path.join(__dirname, 'assets');
const assetsCopyPath= path.join(projectPath, 'assets');

function createFolder(project = projectPath){
  fs.mkdir(project, { recursive: true }, err => {        
    if (err) console.log(err.message);
  });
}

function copyFolder(folderInit = assetsPath, folderCopy = assetsCopyPath) {
  fs.rm(folderCopy, { recursive: true, force: true }, err => {  
    if (err) console.log(err.message);
    fs.mkdir(folderCopy, { recursive: true }, err => {        
      if (err) console.log(err.message);
      fs.readdir(folderInit, { withFileTypes: true }, (err, files) => { 
        if (err) console.log(err.message);
        files.forEach(file => {
          const pathInit = path.join(folderInit, file.name);
          const pathCopy = path.join(folderCopy, file.name);
          if (file.isFile()) {                                        
            fs.copyFile(pathInit, pathCopy, err => {
              if (err) console.log(err.message);
            });
          }
          if (file.isDirectory()) {                                    
            copyFolder(pathInit, pathCopy);
          }
        });
      });
    });
  });
}

function mergeStyles() {
  const stylesPath = path.join(__dirname, 'styles');
  const bundle = fs.createWriteStream(path.join(projectPath, 'style.css'));
  fs.readdir(stylesPath, (err, files) => {
    if(err) return err.message;
    files.forEach(file => {
      if (file.slice(-4) === '.css') {
        fs.createReadStream(path.join(stylesPath, file), 'utf-8').pipe(bundle);
      }
    });
  });
}

async function buildPage() {
  createFolder();
  copyFolder();
  mergeStyles();
  let htmlPage = '';
  const templatePath = path.join(__dirname, 'template.html');
  const componentsPath = path.join(__dirname, 'components');
  const template = fs.createReadStream(templatePath, 'utf-8');
  template.on('data', chunk => htmlPage += chunk);
  template.on('end', () => {
    fs.readdir(componentsPath, (err, files) => {
      if (err) return err.message;
      files.forEach(file => {
        const component = fs.createReadStream(path.join(componentsPath, file), 'utf-8');
        let componentContent = '';
        component.on('data', chunk => componentContent += chunk);
        component.on('end', () => {
          htmlPage = htmlPage.replace(`{{${file.split('.')[0]}}}`, componentContent);
          fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html')).write(htmlPage);
        });
      });
    });
  });
}

buildPage();