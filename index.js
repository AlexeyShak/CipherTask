
const myTranform = require('./streams/transformer');
const fs = require('fs');
const {consoleValidator} = require('./validators/validators');


let consoleArguments = consoleValidator(process.argv);
let readableStream = consoleArguments.inputPath ? fs.createReadStream(consoleArguments.inputPath, 'utf8') : process.stdin;
let writeableStream = consoleArguments.outputPath ? fs.createWriteStream(consoleArguments.outputPath) : process.stdout;
const myTranformStream = new myTranform(consoleArguments.sequince);
readableStream.pipe(myTranformStream).pipe(writeableStream);



