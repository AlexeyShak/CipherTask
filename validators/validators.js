const fs = require('fs');

function stringCheck(string){
    if(typeof string === 'string' && string.includes('-')){
        let cipherNamesArr = string.split('-');
        cipherNamesArr.forEach(cipherName => {
            if(['A','C1','C0','R1','R0'].includes(cipherName)){
                return true;
            };
            throw 'wrong format of config string ';
        });
        return string ; 
    };
    throw 'wrong format of config string ';
}
    


function inputTextValid(path){
    if(typeof path !== 'string' || !path.length || !path.endsWith('.txt')){
        throw 'path is required';
    }
    try{
        fs.accessSync(path, fs.constants.F_OK);
        return path; 
    } catch (err){
        throw 'input file not found';
    }
}
                     

function consoleValidator(consoleOptions){
    let sequince = null;
    let inputPath = null;
    let outputPath = null;

    let counterC = 0;
    let counterI = 0;
    let counterO = 0;
    for (let i = 0; i < consoleOptions.length; i++){
        if(consoleOptions[i] == '-c' || consoleOptions[i] == '--config'){
            counterC = counterC + 1;
        };
        if(consoleOptions[i] == '-i'|| consoleOptions[i] == '--input'){
            counterI++;
        };
        if(consoleOptions[i] == '-o' || consoleOptions[i] == '--output'){
            counterO++;
        }
    };
    switch(counterC){
        case 0:
            throw 'no config srtring';
        case 1:{
            let index = consoleOptions.findIndex(element => {
                return (element == '-c' || element == '--config');
             });
            if(index == (consoleOptions.length - 1)){
                 throw 'wrong format of config string'
             };
            let value = consoleOptions[index + 1];
            sequince = stringCheck(value); 
        };
            break;
        default:
            throw 'duplicated config string';
    };
    switch(counterI){
        case 0:
            console.log('no input key in console');
            break;
        case 1:
            let index = consoleOptions.findIndex(element => {
                return (element == '-i' || element == '--input');
             });
            if(index == (consoleOptions.length - 1)){
                 throw 'wrong format of input string'
             };
            let value = consoleOptions[index + 1];
            inputPath = inputTextValid(value); 
            break; 
        default:
            throw 'duplicaded input key'
        };
    switch(counterO){
        case 0:
            console.log('no output key in console');
            break;
        case 1:
            let index = consoleOptions.findIndex(element =>{
                return(element == '-o' || element == '--output');
            });
            if(index == (consoleOptions.length - 1)){
                throw 'wrong format of output string';
            };
           let value = consoleOptions[index + 1];
           outputPath = value; 
           break;  
        default:
            throw 'duplicaded output key'  
    }
    return {sequince, inputPath, outputPath};          
}
    
module.exports = {stringCheck, inputTextValid, consoleValidator};