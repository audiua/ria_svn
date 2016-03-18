"use strict";

/**
 *
 * @param rules {object} правила валидации полей
 * @param data {json} данные для валидации
 * @constructor
 */
function Validator(rules, data){

    let result = {"success":1, "error":[]};

    /**
     * Валидация данных
     * @returns {{success: number, error: Array}}
     */
    this.run = function run(){
        if(data){
            for (let field in rules) { // field = nick
                for(let validateName in rules[field]){

                    switch(validateName){
                        case 'pattern':
                            result.success &= pattern(field, rules[field][validateName]);
                            break;
                        case 'e-mail':
                            result.success &= email(field, rules[field][validateName]);
                            break;
                        case 'lenghtValue':
                            result.success &= lenghtValue(field, rules[field][validateName]);
                            break;
                        case 'required':
                            result.success &= required(field, rules[field][validateName]);
                            break;
                        case 'max':
                            result.success &= max(field, rules[field][validateName]);
                            break;
                        case 'min':
                            result.success &= min(field, rules[field][validateName]);
                            break;
                    }
                }
            }

        } else {
            result.success = false;
        }

        return result;
    }


    /**
     * Проверка наявности обьязательных полей
     * @param field {string}
     * @param rule {boolean}
     * @returns {boolean}
     */
    function required(field, rule){

        if(rule){
            if(!data[field]){
                result.error.push('Поле '+field+' обьязательное ');
                return false;
            }
            return true;
        } else {
            true;
        }
    }

    /**
     * Проверка по регулярке
     * @author
     * @link
     * @param pattern {string} шаблон регулярного выражения
     * @returns {boolean}
     */
    function pattern(field, pattern){
        let re = new RegExp(pattern);
        if(!re.test(data[field]) && required(field, 0)){
            result.error.push('Поле '+field+' содержит запрещенные символы='+data[field]);
            return false;
        }

        return true;
    }

    /**
     * Проверка длины значения
     * @param value
     * @param rule
     * @returns {boolean}
     */
    function lenghtValue(field, rule){

        if(data[field] && data[field].lenght > rule && required(field, 0)){
            result.error.push('Длина поля '+field+' больше '+rule);
            return false;
        }

        return true;
    }

    /**
     * Проверка email
     * @param email
     * @returns {boolean}
     */
    function email(email){
        let re = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');
        if(!re.test(data[email]) && required('e-mail', 0)){
            result.error.push('Не корректный адрес email = '+data[email]);
            return false;
        }

        return true;
    }

    /**
     * Проверка максимального числа
     * @param value {int}
     * @param rule
     * @returns {boolean}
     */
    function max(field, rule){
        console.log(data[field]+'>'+rule+'max');
        if(data[field] > rule && required(field, 0)){
            result.error.push('Значение поля '+field+' превышает возможное');
            return false;
        }

        return true;
    }

    /**
     * Проверка минимального числа
     * @param value
     * @param rule
     * @returns {boolean}
     */
    function min(field, rule){
        if(data[field] < rule && required(field, 0)){
            result.error.push('Значение поля '+field+' меньше возможного');
            return false;
        }

        return true;
    }
}

module.exports = function(rules, volue){
    return new Validator(rules, volue);
}