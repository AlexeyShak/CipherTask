const fs = require('fs');

const { throwError } = require("../errors");
const CONFIG_STRING_OPTIONS = ['A','C1','C0','R1','R0'];

function configStringValidator(string)
    { if(typeof string === 'string'){
    string.split('-').forEach(cipherName => {
        if(CONFIG_STRING_OPTIONS.includes(cipherName)){
            return true;
        };
        throwError('Invalid parametors of config string!', 1);
    });
    return string ; 
};
throwError('Wrong format of config string!', 1);
}

function pathValidator(path){
    if(typeof path !== 'string' || !path.length || !path.endsWith('.txt')){
        throwError('Path is required!', 1);
    }
    try{
        fs.accessSync(path, fs.constants.F_OK);
        return path; 
    } catch (err){
        throwError('File does not exist!', 1);
    }
}
                     
function countKeys(consoleOptions) {
    let counterC = 0;
    let counterI = 0;
    let counterO = 0;

    for (let i = 0; i < consoleOptions.length; i++){
        switch(consoleOptions[i]) {
            case '-c' :
            case '--config':
                counterC++;
                break;
            case '-i':
            case '--input':
                counterI++;
                break;
            case '-o':
            case '--output':
                counterO++;
                break; 
        }
    };
    return {counterO, counterI, counterC};
}

function keyHandler(key, keyName, keyOptions, consoleOptions, action) {
    let keyValue = null;
    switch(key){
        case 0:
            if(keyOptions.includes('-c')){
                throwError(`${keyName} is requiered!`, 1);
            }
            break;
        case 1:{
            let index = consoleOptions.findIndex(element => {
                return keyOptions.includes(element);
             });
            if(index == (consoleOptions.length - 1)){
                throwError(`No value provided for ${keyName}!`, 1);
             };
            let value = consoleOptions[index + 1];
            keyValue = action(value); 
        };
            break;
        default:
            throwError(`Duplicated ${keyName}!`, 1);
    };
    return keyValue;
}

function consoleValidator(consoleOptions){
    const counters = countKeys(consoleOptions);

    const sequince = keyHandler(counters.counterC, 'Config string', ['-c', '--config'], consoleOptions, configStringValidator);
    const inputPath = keyHandler(counters.counterI, 'Input path', ['-i', '--input'], consoleOptions, pathValidator);
    const outputPath = keyHandler(counters.counterO, 'Output path', ['-o', '--output'], consoleOptions, pathValidator);

    return {sequince, inputPath, outputPath}; 
            
}
   
module.exports = {configStringValidator, pathValidator, consoleValidator, keyHandler};