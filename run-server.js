var server = require("./src/server");
var router = require("./src/router");

var app = server.start();
router.route(app);