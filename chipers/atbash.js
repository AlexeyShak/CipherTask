const alphLength = 26;

const upperCaseStartCode = 'A'.charCodeAt();
const upperCaseEndCode = 'Z'.charCodeAt();

const lowerCaseStartCode = 'a'.charCodeAt();
const lowerCaseEndCode = 'z'.charCodeAt();

function atbash(text) {
    if(typeof text === 'string') { 
        let a = text.split(''); 
        let result = [];
        a.forEach(letter => {
            if(letter.charCodeAt() >= upperCaseStartCode && letter.charCodeAt() <= upperCaseEndCode) {
            result.push(String.fromCharCode(upperCaseEndCode - letter.charCodeAt() + upperCaseStartCode));
            }
            else if(letter.charCodeAt() >= lowerCaseStartCode && letter.charCodeAt() <= lowerCaseEndCode) {
                result.push(String.fromCharCode(lowerCaseEndCode - letter.charCodeAt() + lowerCaseStartCode));
            }
            else result.push(letter);
        });
        return result.join('');
    };
    throw 'text type is not a string';
}
module.exports = {atbash};
    
 