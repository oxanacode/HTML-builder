const path = require('path');
const fs = require('fs');

const stylesPath = path.join(__dirname, 'styles');
const projectPath = path.join(__dirname, 'project-dist');
const bundle = fs.createWriteStream(path.join(projectPath, 'bundle.css'));

fs.readdir(stylesPath, (err, files) => {
  if(err) return err.message;
  files.forEach(file => {
    if (file.slice(-4) === '.css') {
      fs.createReadStream(path.join(stylesPath, file), 'utf-8').pipe(bundle);
    }
  });
});
