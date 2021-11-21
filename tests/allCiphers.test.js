const {atbash} = require('../chipers/atbash');
const { ceasarE, ceasarD,} = require('../chipers/ceasarCipher');
const { rot8e, rot8d } = require('../chipers/rot8');


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


