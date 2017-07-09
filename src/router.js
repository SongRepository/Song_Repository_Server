var util = require("util");
var _path = require('path');

var _Base64 = require('js-base64').Base64;

var _Logger = require("./logger");
// var _MediaPlumber = require("./AppLayer/media-plumber");
var _SongManager = require('./../../Song_Repository_Song/song-manager');
var _ImgManager = require('./../../Song_Repository_Images/img-manager');
var _DataManager = require('../../Song_Repository_Data/data-manager');

function route(app) {

    //设置跨域访问
    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });


    app.get("/console", function (request, response) {
        response.status(200);
        response.end();
        _Logger.log(request.query, "Console");
    });


    app.get("/api/song/:fileName", function (request, response) {
        // var query = request.query;
        var fileName = request.params['fileName'];
        _SongManager.get(fileName, response);
    });

    app.get("/api/img/:path", function (request, response) {
        var path = request.params['path'];
        _ImgManager.get(path, response);
    });


    app.get("/api/collect/collection/:fileName", function (request, response) {
        const fileName = request.params['fileName'];
        _DataManager.collect(fileName, response);
    });

    app.get("/api/collection/register", function (request, response) {
        _DataManager.registerModel(response);
    });

}


function getParamsPath(request) {
    var path = request.params.path;
    if (path.indexOf("\\") > (-1) || path.indexOf("/") > (-1)) {
        return path;
    } else {
        return _Base64.decode(path);
    }
}


exports.route = route;
