const { throwError } = require("../errors");
const alphLength = 26;

const upperCaseStartCode = 'A'.charCodeAt();
const upperCaseEndCode = 'Z'.charCodeAt();

const lowerCaseStartCode = 'a'.charCodeAt();
const lowerCaseEndCode = 'z'.charCodeAt();

function encrypt(text, key) {
    if(typeof text !== 'string' || typeof key !== 'number') {
        throwError('Wrong encryption parametors!', 1);
    }

    return text.split('').map(letter => {
        if(letter.charCodeAt() >= upperCaseStartCode && letter.charCodeAt() <= upperCaseEndCode) {
            return String.fromCharCode(upperCaseStartCode + (letter.charCodeAt() - upperCaseStartCode + key) % alphLength);

        }
        else if(letter.charCodeAt() >= lowerCaseStartCode && letter.charCodeAt() <= lowerCaseEndCode) {
            return String.fromCharCode(lowerCaseStartCode + (letter.charCodeAt() - lowerCaseStartCode + key) % alphLength);  
        }

        return letter;
    }).join('');
 }


function decrypt(text, key) {
    if(typeof text === 'string') { 
        let a = text.split(''); 
        let result = [];
        a.forEach(letter => {
            if(letter.charCodeAt() >= upperCaseStartCode && letter.charCodeAt() <= upperCaseEndCode) {
                result.push(String.fromCharCode(upperCaseEndCode - (upperCaseEndCode - letter.charCodeAt() + key) % alphLength ));

            }
            else if(letter.charCodeAt() >= lowerCaseStartCode && letter.charCodeAt() <= lowerCaseEndCode) {
                result.push(String.fromCharCode(lowerCaseEndCode - (lowerCaseEndCode - letter.charCodeAt() + key) % alphLength )) 
            }
            else result.push(letter);
        });
        return result.join('');
    };
    throwError('Not a string!', 1);
    
 }
function ceasarE(text) {
    return encrypt(text, 1);   
};

function ceasarD(text) {
    return decrypt(text, 1);
};


module.exports = {encrypt, decrypt, ceasarD, ceasarE};

