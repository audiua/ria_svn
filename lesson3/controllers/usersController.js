"use strict";

let Users = require("users");


module.exports = {
    getAll: function(request, response, next) {
        response.setHeader('Content-Type', 'application/json; charset=utf-8');
        response.end(JSON.stringify(Users.getAll(), null, 4));
    },
    postAdd: function(request, response, next){
        response.setHeader('Content-Type', 'application/json; charset=utf-8');

        let postData = '';
        request.on('data', function (data) {
            postData += data;
        });

        request.on('end', function () {
            postData = JSON.parse(postData);

            try{
                Users.add(postData);
                response.statusCode = 201;
                response.end();
            }catch(e){
                response.statusCode = 400;
                response.end('Bad request'+e);
            }
        });

    }
};