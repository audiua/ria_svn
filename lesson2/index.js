"use strict";

let http = require("http"),
    url = require("url"),
    Counter = require('./node_modules/counter');

let server = http.createServer(function handler(req, res, next){

    let path = url.parse(req.url).pathname,
        res_text = '',
        res_code = 200;


    if(path == '/index.html'){
        res_text = 'Привет Мир <br><br><a href="/count.html">count.html</a>';
        Counter.setCount();
    } else if(path == '/count.html') {
        res_text = 'Количество просмотров = '+Counter.getCount()+'<br><br><a href="/index.html">index.html</a>';
    } else {
        res_code = 404;
        res_text = 'Page not found!<br><br><a href="/index.html">index.html</a>';
    }

    res.writeHead(res_code, {
        "Content-Type": "text/html; charset=utf-8"
    });
    res.end(res_text);

});

server.listen(3000);