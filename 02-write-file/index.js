const { stdin, stdout } = process;

const path = require('path');
const fs = require('fs');
const readline = require('readline');

const fileName = path.join(__dirname, 'text.txt');
const stream = fs.createWriteStream(fileName);
const rl = readline.createInterface({ 
  input: stdin, 
  output: stdout 
});

stdout.write('Введите текст для записи в файл:\n');

rl.on('line', data => {
  if (data.trim() === 'exit') {
    stdout.write('До встречи ;)');
    rl.close();
  }
  else stream.write(data + '\n');
});

rl.on('SIGINT', () => {
  stdout.write('До встречи ;)');
  rl.close();
});

process.on('error', error => console.log(error.message));