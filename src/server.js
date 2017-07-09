var express = require('express');
// var session = require('express-session');

var http = require('http');
var url = require('url');
var util = require("util");
var _path = require('path');
var _BodyParser = require("body-parser");
var _Config = require('../../config');


var PORT = 8093;

function start() {
    var app = express();

    app.use(_BodyParser.urlencoded({extended: false}));

    initStatic(app);

    var server = app.listen(PORT, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("应用实例，访问地址为 http://%s:%s", host, port)
    });

    return app;
}

function initStatic(app) {
    app.use("/song", express.static(_Config.RootDir + 'Song_Repository_Song/song'));
    app.use('/img', express.static(_Config.RootDir + 'Song_Repository_Images/img'));
    app.use('/api/data', express.static(_Config.RootDir + 'Song_Repository_Data/data'));
    app.use(express.static(_Config.RootDir + 'Song_Repository_Web/'));

}


exports.start = start;
