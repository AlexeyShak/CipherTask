const {atbash} = require('../chipers/atbash');
const { ceasarE, ceasarD,} = require('../chipers/ceasarCipher');
const { rot8e, rot8d } = require('../chipers/rot8');
const {configStringValidator, pathValidator, consoleValidator, keyHandler} = require('../validators/validators');
const { throwError } = require("../errors");

describe('Atbash cipher tests', () => {
    let text = 'AAAAББББzzzzюююю111';
    test('Atbash function should return mirrored only english aphabeth symbols ', () =>{
        expect(atbash(text)).toBe('ZZZZББББaaaaюююю111');
    });
    test('Atbash cipher should return an encrypted text of the same length as the original', ()=> {
        expect(atbash(text).length).toEqual(text.length);
    });
});


describe('Ceasar cipher tests', () => {
    describe('Ceasar ecryptor tests', () => {
        let text = 'AAAAББББzzzzюююю111';
        test('Ceasar encryptor should return encrypted only english aphabeth symbols ', () =>{
            expect(ceasarE(text)).toBe('BBBBББББaaaaюююю111');
        });
        test('Ceasar encryptor should return an encrypted text of the same length as the original', ()=> {
            expect(ceasarE(text)).toBeDefined();
        });
    });

    describe('Ceasar decryptor tests', () => {
        let text = 'AAAAББББzzzzюююю111';
        let num = 15;
        test('Ceasar decryptor should return decrypted only english aphabeth symbols ', () =>{
            expect(ceasarD(text)).toBe('ZZZZББББyyyyюююю111');
        });
        test('Ceasar decryptor should thow error if function argument is not a string', ()=> {
            expect(() => ceasarD(num)).toThrow(Error('Wrong decryption parametors!'));
        });
    });
}) 

describe('Rot8 cipher tests', () => {
    describe('Rot8 encryptor tests', () => {
        let text = 'AAAAББББzzzzюююю111';
        test('ROT8 encrypt function should return encrypted only english aphabeth symbols ', () =>{
            expect(rot8e(text)).toBe('IIIIББББhhhhюююю111');
        });
        test('ROT8 encryptor should return an encrypted text of the same length as the original', ()=> {
            expect(rot8e(text).length).toEqual(text.length);
        });
    });

    describe('ROT8 decryptor tests', () => {
        let text = 'AAAAББББzzzzюююю111';
        test('ROT8 decryptor should return decrypted only english aphabeth symbols ', () =>{
            expect(rot8d(text)).toBe('SSSSББББrrrrюююю111');
        });
        test('ROT8 decryptor should not return undefined value', ()=> {
            expect(ceasarE(text)).not.toBeUndefined();
        });
    });
})


describe('Config string validator', () => {
    const validConfigStringPar = 'A-A-A-R1-R0-R0-R0-C1-C1-A';
    const noHyphenConfigStringPar ='AA-A-R1-R0-R0-R0-C1-C1-A';
    const invalidCofigStringPar = ['A-C1-C0-R0-R2-C1'];
    
    test('should return config string arguments if they are valid & separated with "-"', () => {
        expect(configStringValidator(validConfigStringPar)).toBe('A-A-A-R1-R0-R0-R0-C1-C1-A');
    });
    test('should return error if they are invalid', () => {
        expect(() => configStringValidator(noHyphenConfigStringPar)).toThrow(Error('Invalid parametors of config string!'));
    });
    test('should return error if they are not a sting', () => {
        expect(() => configStringValidator(invalidCofigStringPar)).toThrow(Error('Wrong format of config string!'))
    });
})
describe('Pathvalidator', () =>{
    const validPath = 'input.txt'
    const invalidPath = 'input.tx'
    test('should return path if it is a string ending with ".txt"', () => {
        expect(pathValidator(validPath)).toEqual('input.txt');
    })
    test('should throw error if path isnt a string or a string of invalid format', () => {
        expect(() => pathValidator(invalidPath)).toThrow(Error('Path is required!'));
    })
})

describe('Console validator', () => {
    const validConsoleOptions = ['-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt', '-o', './output.txt'];
    const doubleConfigArg =['-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt', '-o', './output.txt', '-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1'] 
    const doubleInputCO = ['-c', "C1-C1", '-i', "./input.txt", '-o', "./output.txt", '--input', './input.txt'];
    const noConfigArgument = ['-i', "input.txt", '-o', "output.txt"];
    const non_existentInputArg = ['-c', "C1-C1", '-i', "inputX.txt", '-o', "output.txt"];
    const non_existentOutputArg = ['-c', "C1-C1", '-i', "input.txt", '-o', "outputX.txt"];
    const validConsoleOptionsNoInput = ['-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1'];
    test('should return object containig sequinse, input path & output path', () => { 
        expect(consoleValidator(validConsoleOptions)).toStrictEqual({sequince: 'C1-R1-C0-C0-A-R0-R1-R1-A-C1',inputPath: "./input.txt", outputPath: "./output.txt"})
    });
    test('should return error if inputKey is doubled', () => { 
            expect(() => consoleValidator(doubleInputCO)).toThrow(Error);
    });
    test('should return error if config argument is not specified', () => { 
        expect(() => consoleValidator(noConfigArgument)).toThrow(Error);
    });
    test('should return error if input path leads to a non-existent file', () => { 
        expect(() => consoleValidator(non_existentInputArg)).toThrow(Error);
    });
    test('should return error if output path leads to a non-existent file', () => { 
        expect(() => consoleValidator(non_existentOutputArg)).toThrow(Error);
    }); 
    test('should return object containig sequinse', () => { 
        expect(consoleValidator(validConsoleOptionsNoInput)).toStrictEqual({sequince: 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', inputPath: null, outputPath: null});
    });
    test('should return error if config argument is doublicated', () => { 
        expect(() => consoleValidator(doubleConfigArg)).toThrow(Error);
    });     
})

describe('KeyHandler', () => {
    test('action to be called', () => {
        const myMock = jest.fn();
        keyHandler(1, 'config string', ['-c','--config'], ['-c', 'C1-C1'], myMock)
        expect(myMock.mock.calls.length).toBe(1);
    })
    test('actions 1st arg check', () => {
        const myMock = jest.fn();
        keyHandler(1, 'config string', ['-c','--config'], ['-c', 'C1-C1'], myMock)
        expect(myMock.mock.calls[0][0]).toBe('C1-C1');
    })
})

describe('ThrowError', () => {
    test('ThrowError function should throw error message if it is defined', () => {
        expect(() => throwError('example error', 1)).toThrow('example error');
    }) 
    test('ThrowError function should throw "Unhandeled error" if error message is undefined ', () => {
        expect(() => throwError()).toThrow(Error('Unhandeled error'));
    }) 
})

describe('cipher usage scenarios from first task description usage examples',() => {
    ex1 = ["node", "my_ciphering_cli", "-c", "C1-C1-R0-A", "-i", "./input.txt", "-o", "./output.txt"];
    ex2 = ["node", "my_ciphering_cli", "-c", "C1-C0-A-R1-R0-A-R0-R0-C1-A", "-i", "./input.txt", "-o", "./output.txt"];
    ex3 = ["node", "my_ciphering_cli", "-c","A-A-A-R1-R0-R0-R0-C1-C1-A", "-i", "./input.txt", "-o", "./output.txt"];
    ex4 = ["node", "my_ciphering_cli", "-c","C1-R1-C0-C0-A-R0-R1-R1-A-C1", "-i", "./input.txt", "-o", "./output.txt"];
    
    test('should return object containig sequinse, input path & output path', ()=>{
        expect(consoleValidator(ex1)).toStrictEqual({sequince: 'C1-C1-R0-A',inputPath: "./input.txt", outputPath: "./output.txt"});
        expect(consoleValidator(ex2)).toStrictEqual({sequince: 'C1-C0-A-R1-R0-A-R0-R0-C1-A',inputPath: "./input.txt", outputPath: "./output.txt"});
        expect(consoleValidator(ex3)).toStrictEqual({sequince: 'A-A-A-R1-R0-R0-R0-C1-C1-A',inputPath: "./input.txt", outputPath: "./output.txt"});
        expect(consoleValidator(ex4)).toStrictEqual({sequince: 'C1-R1-C0-C0-A-R0-R1-R1-A-C1',inputPath: "./input.txt", outputPath: "./output.txt"});   
    });
})

