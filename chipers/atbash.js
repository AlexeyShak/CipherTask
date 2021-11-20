const { throwError } = require("../errors");

const upperCaseStartCode = 'A'.charCodeAt();
const upperCaseEndCode = 'Z'.charCodeAt();

const lowerCaseStartCode = 'a'.charCodeAt();
const lowerCaseEndCode = 'z'.charCodeAt();

function atbash(text) {
    if(typeof text !== 'string') {
        throwError('Wrong encryption parametors!', 1)
    }
    return text.split('').map(letter => {
        if(letter.charCodeAt() >= upperCaseStartCode && letter.charCodeAt() <= upperCaseEndCode) {
            return String.fromCharCode(upperCaseEndCode - letter.charCodeAt() + upperCaseStartCode);
        }
        else if(letter.charCodeAt() >= lowerCaseStartCode && letter.charCodeAt() <= lowerCaseEndCode) {
            return String.fromCharCode(lowerCaseEndCode - letter.charCodeAt() + lowerCaseStartCode);
        }
        return letter;
    }).join('');
        
    
}
module.exports = {atbash, upperCaseEndCode, upperCaseStartCode};
    
 