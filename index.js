
const myTranform = require('./streams/transformer');
const fs = require('fs');
const {atbash} = require('./chipers/atbash');
const {ceasarD, ceasarE} = require('./chipers/ceasarCipher');
const {rot8e, rot8d} = require('./chipers/rot8');

const text = `I wander thro’ each charter’d street,
Near where the charter’d Thames does flow.
And mark in every face I meet
Marks of weakness, marks of woe.`;

console.log('ceasar: ', ceasarE('asdlvjkqwnlj'), ceasarD(ceasarE('asdlvjkqwnlj')));
console.log('atbash: ', atbash('artyom luchshiy uchitel'), atbash(atbash('artyom luchshoy uchitel')));
console.log('rot: ', rot8e('artyom luchshoy uchitel'), rot8d(rot8e('artyom luchshoy uchitel')));

console.log('end result', atbash(rot8d(ceasarE(ceasarE(text)))) )

const pathRead = './fs/inputText.txt';
const pathWrite ='./fs/outputText.txt';

const sequence = 'C1-C1-R0-A';

let readableStream = fs.createReadStream(pathRead, 'utf8');
let writeableStream = fs.createWriteStream(pathWrite);
const myTranformStream = new myTranform(sequence);
readableStream.pipe(myTranformStream).pipe(writeableStream);
