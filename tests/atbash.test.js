const {atbash} = require('../chipers/atbash');

test('Atbash function should return mirrored only english aphabeth symbols ', () =>{
    let text = 'AAAAББББzzzzюююю111';
    expect(atbash(text)).toBe('ZZZZББББaaaaюююю111');

})


