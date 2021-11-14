const myTranform = require('./transformer');

const { atbash } = require('../chipers/atbash');
const { ceasarE, ceasarD } = require('../chipers/ceasarCipher');
const { rot8e, rot8d } = require('../chipers/rot8');

function composeTransformStreamArray(sequence) {
    let sequenseElements = sequence.split('-');
    const streams = [];
    for(let i = 0; i < sequenseElements.length; i++){
        switch(sequenseElements[i]){
            case 'C1': {
                const myTranformStream = new myTranform(ceasarE);
                streams.push(myTranformStream);
            }
            break;
            case 'C0': {
                const myTranformStream = new myTranform(ceasarD);
                streams.push(myTranformStream);
            }
            break;
            case 'A': {
                const myTranformStream = new myTranform(atbash);
                streams.push(myTranformStream);
            }
            break;
            case 'R1': {
                const myTranformStream = new myTranform(rot8e);
                streams.push(myTranformStream);
            }
            break;
            case 'R0': {
                const myTranformStream = new myTranform(rot8d);
                streams.push(myTranformStream);
            }
            break;
        }
        
    }
    return streams;
}

module.exports = composeTransformStreamArray;