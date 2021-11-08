
const fs = require('fs');
const {atbash} = require('./chipers/atbash');
const {encrypt, decrypt} = require('./chipers/ceasarCipher');
const {rot8e, rot8d} = require('./chipers/rot8');

console.log('ceasar: ', encrypt('asdlvjkqwnlj', 1), decrypt(encrypt('asdlvjkqwnlj', 1), 1));
console.log('atbash: ', atbash('artyom luchshiy uchitel'), atbash(atbash('artyom luchshoy uchitel')));
console.log('rot: ', rot8e('artyom luchshoy uchitel'), rot8d(rot8e('artyom luchshoy uchitel')));

const pathRead = './fs/inputText.txt';
const pathWrite ='./fs/outputText.txt';

fs.readFile(pathRead, (err, text)=> {
    if (err) throw err
    var poem = text.toString();
    const atbashPoem = atbash(poem);
    const encryptPoem = (encrypt(poem,1));
    console.log(decrypt(encrypt(poem,1),1));

    fs.writeFile(pathWrite, `        ciphered poems \n ${atbashPoem} \n\n ${encryptPoem}`, (err) => {
    if (err) throw err
});

});

