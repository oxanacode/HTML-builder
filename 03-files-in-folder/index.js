const path = require('path');
const fs = require('fs');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  files.forEach(file => {
    if (err) return err;
    else {
      if (file.isFile()) {
        const filePath = path.resolve(folderPath, file.name);
        fs.stat(filePath, (err, stats) => {
          if (err) return err;
          const fileNameExt = path.parse(file.name);
          const fileSize =  stats.size / 1024 + 'kb';
          console.log(fileNameExt.name + ' - ' + fileNameExt.ext.slice(1) + ' - ' + fileSize);
        });
      }
    }
  });
});