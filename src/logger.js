/**
 * Created by Administrator on 2016/12/25.
 */



var Logger = {
    createNew: function () {
        var Result = {};
        Result.isDebug = true;
        Result.isError = true;

        Result.log = function () {
            if (Result.isDebug) {
                var log = arguments[0] ? arguments[0] : "";
                var head = arguments[1] ? arguments[1] : "";
                var date = new Date().toLocaleString();
                console.log("#log# %s >>>> %s", date, head);
                console.log(log);
                console.log("---------------------------------------------------------------------------");
            }
        };
        Result.err = function () {
            if (Result.isError) {
                var log = arguments[0] ? arguments[0] : "";
                var head = arguments[1] ? arguments[1] : "";
                var date = new Date().toLocaleString();
                console.log("#error# %s >>>> %s", date, head);
                console.log(log);
                console.log("---------------------------------------------------------------------------");
            }
        };

        return Result;
    }
};
var _entity = Logger.createNew();

var ILogger = {
    log: _entity.log,
    err: _entity.err
};


module.exports = exports = ILogger;
