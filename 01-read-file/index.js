const { stdout } = process;

const path = require('path');
const fs = require('fs');

const fileName = path.join(path.dirname(__filename), 'text.txt'); 
const stream = fs.createReadStream(fileName, 'utf-8');

let data = '';
stream.on('data', chunk => data += chunk);
stream.on('end', () => {
  stdout.write(data);
  process.exit();
});
stream.on('error', error => console.log('Error', error.message));
