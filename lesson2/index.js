"use strict";

let http = require("http"),
    url = require("url"),
    Counter = require('./node_modules/counter');

let server = http.createServer(function handler(req, res, next){
    let path = url.parse(req.url).pathname;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if(path == '/index.html'){
        res.end('Привет Мир <br><br><a href="/count.html">count.html</a>');
        Counter.setCount();
    } else if(path == '/count.html') {
        res.end('Количество просмотров = '+Counter.getCount()+'<br><br><a href="/index.html">index.html</a>');
    } else {
        res.statusCode = 404;
        res.end('Page not found!<br><br><a href="/index.html">index.html</a>');
    }
});

server.listen(3000);