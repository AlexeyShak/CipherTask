const fs = require('fs');
const { pipeline } = require('stream');

const {consoleValidator} = require('./validators/validators');
const composeTransformStreamArray = require('./streams/transformComposer');
const { throwError } = require('./errors');


let consoleArguments = consoleValidator(process.argv);
let readableStream = consoleArguments.inputPath ? fs.createReadStream(consoleArguments.inputPath, 'utf8') : process.stdin;
let writeableStream = consoleArguments.outputPath ? fs.createWriteStream(consoleArguments.outputPath, {flags: 'a'}) : process.stdout;
const streams = composeTransformStreamArray(consoleArguments.sequince);

pipeline(
    readableStream,
    ...streams,
    writeableStream,
    (err) => {
        if(err) {
            throwError('Pipeline error!', 1);
        }
    }
)


