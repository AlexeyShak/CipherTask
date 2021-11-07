const {atbash} = require('./chipers/atbash');
const {encrypt, decrypt} = require('./chipers/ceasarCipher');
const {rot8e, rot8d} = require('./chipers/rot8');

console.log('ceasar: ', encrypt('asdlvjkqwnlj', 1), decrypt(encrypt('asdlvjkqwnlj', 1), 1));
console.log('atbash: ', atbash('artyom luchshiy uchitel'), atbash(atbash('artyom luchshoy uchitel')));
console.log('rot: ', rot8e('artyom luchshoy uchitel'), rot8d(rot8e('artyom luchshoy uchitel')));

