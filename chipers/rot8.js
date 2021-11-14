const {encrypt, decrypt} = require('./ceasarCipher');

function rot8e(text){
    return encrypt(text,8);
}
function rot8d(text){
    return decrypt(text,8);
}
module.exports = {rot8d, rot8e};
