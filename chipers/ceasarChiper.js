const alphLength = 26;
const shiftKey = 5;
const upperCaseStartCode = 'A'.charCodeAt();
const upperCaseEndCode = 'Z'.charCodeAt();

const lowerCaseStartCode = 'a'.charCodeAt();
const lowerCaseEndCode = 'z'.charCodeAt();

function encrypt(text, key) {
    if(typeof text === 'string') { 
        let a = text.split(''); 
        let result = [];
        a.forEach(letter => {
            if(letter.charCodeAt() >= upperCaseStartCode && letter.charCodeAt() <= upperCaseEndCode) {
                result.push(String.fromCharCode(upperCaseStartCode + (letter.charCodeAt() - upperCaseStartCode + key) % alphLength ));

            }
            else if(letter.charCodeAt() >= lowerCaseStartCode && letter.charCodeAt() <= lowerCaseEndCode) {
                result.push(String.fromCharCode(lowerCaseStartCode + (letter.charCodeAt() - lowerCaseStartCode + key) % alphLength ));  
            }
            else result.push(letter);
        });
        return result.join('');
    };
    throw 'text type is not string'
    
 }
 console.log(encrypt('zarTUI ebvjenv174 ;lans', shiftKey));

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
    throw 'text type is not string'
    
 }
 console.log(decrypt(encrypt('zarTUI ebvjenv174 ;lans', shiftKey), shiftKey));

