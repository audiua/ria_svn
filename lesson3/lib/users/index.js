"use strict";

let Validator = require("../validator");

/**
 * @constructor
 */
function Users(){

    let allUsers = [];

    /**
     * Правила валидации
     */
    let rules = {
        "nick":{"pattern":"^[a-z0-9]+$", "lenghtValue":15, "required":1},
        "name":{"pattern":"^[a-zA-Z]+$", "lenghtValue":25, "required":1},
        "description":{"lenghtValue":255},
        "e-mail":{"e-mail":null},
        "age":{"max":100,"min":0}
    };

    /**
     * Валидация полей по правилам
     * @param postData
     */
    this.validate = function(postData){

        let valid = Validator(rules,postData).run();
        if(!valid.success){
            throw valid.error;
        }

        return true;
    }

    /**
     * Обновление данных юзера
     * @param data
     */
    let updateUser = function(userData, newUserData, index){

        for(let field in userData){
            if(userData[field] != newUserData[field]){
                userData[field] = newUserData[field];
            }
        }

        allUsers[index] = userData;
    }

    /**
     * Добавление пользователя
     * @param postData
     */
    this.add = function add(postData){
        if(this.validate(postData)){
            if(allUsers.length > 0){
                for(let user in allUsers){

                    if(allUsers[user]['nick'] == postData.nick){
                        updateUser(allUsers[user], postData, user);
                    } else {
                        allUsers.push(getUserFields(postData));
                    }
                }
            } else {
                allUsers.push(postData);
            }
        }
    }

    /**
     * Возвращает не пустые поля юзера
     * @param data
     */
    let getUserFields = function(data){
  
        let fields = {};
        for(let field in rules){
            if(allUsers[field]){
                updateUser(allUsers[field], data);
            }
        }

        return data;
    }

    this.getAll = function getAll(){
        return allUsers;
    }
}



module.exports = new Users();