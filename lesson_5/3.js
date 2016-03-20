"use strict";

let addresses = require('./addresses');
let result = [];

// шаблон
//street prefix - ^\s*(?:ул|пр-т|вул|пл|пер)?[.\s]*
//street - ((?:\d*[-])?[А-Яа-яЁё.\s]+)
//home prefix - (?:[,\s]*(?:дом)?[.\s]*)?
//home - (\d+[А-Яа-я-]*)?
//flat prefix - (?:[,\s]*(?:кв)?[.\s]*)?
//flat - \/?(\d+)?\s*$/
let pattern = /^\s*(?:ул|пр-т|вул|пл|пер)?[.\s]*((?:\d*[-])?[А-Яа-яЁё.\s]+)(?:[,\s]*(?:дом)?[.\s]*)?(\d+[А-Яа-я-]*)?(?:[,\s]*(?:кв)?[.\s]*)?\/?(\d+)?\s*$/;

addresses.forEach(function(item) {
    let itemAddres = {}; //input:item

    let match = pattern.exec(item);
    if(match){
        itemAddres.street = match[1] || "";
        itemAddres.home = match[2] || "";
        itemAddres.flat = match[3] || "";
    }


    result.push(itemAddres);
});
console.log(result);

module.exports = result;



