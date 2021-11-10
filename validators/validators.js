const fs = require('fs');

function stringCheck(string){
    if(typeof string === 'string' && string.includes('-')){
        let cipherNamesArr = string.split('-');
        cipherNamesArr.forEach(cipherName => {
            if(['A','C1','C0','R1','R0'].includes(cipherName)){
                return true;
            };
            throw 'err';
        });
        return true; 
    };
    throw 'err';
}
    


function inputTextValid(path){
    if(typeof path !== 'string' || !path.length || !path.endsWith('.txt')){
        throw 'path is required';
    }
    fs.access(path, fs.constants.F_OK, (err) =>{
        if (err) {
            throw 'error';
        };
        return true;
    })
}

module.exports = {stringCheck, inputTextValid};