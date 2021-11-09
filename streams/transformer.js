const { Transform } = require('stream');
const { atbash } = require('../chipers/atbash');
const { ceasarE, ceasarD } = require('../chipers/ceasarCipher');
const { rot8e, rot8d } = require('../chipers/rot8');

class myTransform extends Transform {
    constructor(sequence) {
        super();
        this.sequence = sequence; 
    }
    _transform(chunk, encoding, callback) {
        let chunkString = chunk.toString();
        let sequenseElements = this.sequence.split('-');
        for(let i = 0; i < sequenseElements.length; i++){
            switch(sequenseElements[i]){
                case 'C1':
                    chunkString = ceasarE(chunkString);  
                break;
                case 'C0':
                    chunkString = ceasarD(chunkString);
                break;
                case 'A':
                    chunkString = atbash(chunkString);
                break;
                case 'R1':
                    chunkString = rot8e(chunkString);
                break;
                case 'R0':
                    chunkString = rot8d(chunkString);
                break;
            }
            
        }
        callback(null, chunkString);
    }
}
module.exports = myTransform;