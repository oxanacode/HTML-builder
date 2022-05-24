const path = require('path');
const fs = require('fs');

const folderPath= path.join(__dirname, 'files');
const folderCopyPath= path.join(__dirname, 'files-copy');

(function copyFolder(folderInit = folderPath, folderCopy = folderCopyPath) {
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
})();
