const a = '12345678'
const arrString = a.toString('');
let arrStringEl = arrString.split('');
function arraySqrtSum(array){
    let sqrtSum = 0
    for(i=0; i < arrStringEl.length; i++){
        if(arrStringEl[i]%2==0){
            sqrtSum += Math.sqrt(arrStringEl[i]);
        } 
    };
    console.log(sqrtSum);
};
arraySqrtSum(arrStringEl);

console.log(
    [1, 2, 3, 4, 5, 6, 7, 8]
    .filter(element => !(element%2))
    .reduceRight((accumulator, element) => accumulator + Math.sqrt(element), 0)
)



let cipherSubseq = 'A-C1-B2'

function stringCheck(string){
    if(string.includes('-') && typeof string === 'string'){
        let cipherNamesArr = string.split('-');
        cipherNamesArr.forEach(cipherName => {
            if(['A','C1','C0','R1','R0'].includes(cipherName)){
                return true;
            };
            throw 'err';
        });
        return true; 
    };
    throw 'err';
    
}
stringCheck(cipherSubseq);

function
