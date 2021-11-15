# ChiperTask
RS school task01

Implement CLI tool that will encode and decode a text by 3 substitution ciphers

# Console arguments

1.  **-c, --config**: config for ciphers
Config is a string with pattern `{XY(-)}n`, where:
  * `X` is a cipher mark:
    * `C` is for Caesar cipher (with shift 1)
    * `A` is for Atbash cipher
    * `R` is for ROT-8 cipher
  * `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
    * `1` is for encoding
    * `0` is for decoding
2.  **-i, --input**: a path to input file
3.  **-o, --output**: a path to output file

# Уточнение по параметрам ввода информации в командную строку

 Увы, при "причесывании" кода в воскресенье я снeс возможность не вводить input и output в аргументах консоли, в commite от 13.11.2021 это условие реализовывается. Если у Вас-таки возникнет желание глянуть как я реализую эту возможность, для проверки этого условия работы данной программы в "причесанном" виде можете в файле validators.js заменить функцию KeyHandler на вот эту: 

function keyHandler(key, keyName, keyOptions, consoleOptions, action) {
    let keyValue = null;
    switch(key){
        case 0:
            if(key === '-c' || key === '--config') {
                throwError(`${keyName} is requiered!`, 1);
            }
            break;
        case 1:{
            let index = consoleOptions.findIndex(element => {
                return keyOptions.includes(element);
             });
            if(index == (consoleOptions.length - 1)){
                throwError(`No value provided for ${keyName}!`, 1);
             };
            let value = consoleOptions[index + 1];
            keyValue = action(value); 
        };
            break;
        default:
            throwError(`Duplicated ${keyName}!`, 1);
    };
    return keyValue;
}
Также значнение config не принимает шифрование только одним шифром, увы тоже заметил это только сегодня. Там же в validators.js функция configStringValidator содердит в условном блоке if лишнее условие  string.includes('-'). Разумеется, функция должна выглядеть таким образом:

function configStringValidator(string){
    if(typeof string === 'string'){
    
        string.split('-').forEach(cipherName => {
            if(CONFIG_STRING_OPTIONS.includes(cipherName)){
                return true;
            };
            throwError('Invalid parametors of config string!', 1);
        });
        return string ; 
    };
    throwError('Wrong format of config string!', 1);
}


Прошу прощения за неудобства, я понимаю, что накосячил с финальным тестингом программы, но зато хоть толику cross-check надеюсь Вам облегчил)
Хорошего дня!)

# Usage
**Usage example:**  

```bash
$ node my_ciphering_cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`

```bash
$ node my_ciphering_cli -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`

```bash
$ node my_ciphering_cli -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`

```bash
$ node my_ciphering_cli -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `This is secret. Message about "_" symbol!`