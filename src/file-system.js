/**
 * Created by Administrator on 2016/12/27.
 */

var _FS = require("fs");
var _Path = require("path");

var _Logger = require("./logger");


var FileSystem = {
    readDir: function (path) {
        try {
            var stats = _FS.statSync(path);
            if (stats.isDirectory()) {
                return _FS.readdirSync(path);
            }
            else {
                _Logger.log("不是文件夹！", "FileSystem.readDir(" + path + ")");
                return [];
            }
        } catch (err) {
            _Logger.err(err, "FileSystem.readDir(" + path + ")");
            return [];
        }
    },
    readJsonFile: function (path) {
        try {
            var data = _FS.readFileSync(path, "utf-8");
            return JSON.parse(data);
        }
        catch (err) {
            _Logger.log(err, "FileSystem.readJsonFile() \n" + path);
            return {};
        }
    },
    saveObjToFile: function (obj, path) {
        try {
            var data = JSON.stringify(obj);
            _FS.writeFileSync(path, data);
            return true;
        }
        catch (err) {
            _Logger.log(err, "FileSystem.saveObjToFile()");
            return false;
        }
    },
    createDir: function (path) {
        _FS.mkdir(path, function (err) {
            if (err) {
                _Logger.err(err, "FileSyste.createDir()");
                return false;
            }
        });
    },
    isFile: function (path) {
        var stats = _FS.statSync(path);
        return stats.isFile();
    },
    isDirectory: function (path) {
        var stats = _FS.statSync(path);
        return stats.isDirectory();
    },
    existsSync: function (path) {
        return _FS.existsSync(path);
    },
    /**
     * @param fileName  /aaa/bbb/ccc.jpg
     * @returns {*}     ccc
     */
    getFileBaseName: function (fileName) {
        return _Path.basename(fileName, _Path.extname(fileName));
    },
    /**
     * @param source            /aaa/bbb/ccc/ddd.jpg
     * @param target            /aaa/bbb/
     * @returns {string|XML}    ccc/ddd.jpg
     */
    resolvePath: function (source, target) {
        var new_source = source.replace(/\\/g, '/');
        var new_target = target.replace(/\\/g, '/');
        return new_source.replace(new_target, '');
    },
    deleteFile: function (path) {
        _FS.unlink(path, function (err) {
            if (err) {
                _Logger.err(path + "\n" + err, "FileSystem.deleteFile()");
                return 0;
            }
            _Logger.log("删除文件成功。\n" + path, "FileSystem.deleteFile()");
        });
    },
    copyFile: function (scr, dest) {
        try {
            var readStream = _FS.createReadStream(scr);
            var writeStream = _FS.createWriteStream(dest);
            readStream.pipe(writeStream);
            readStream.on('error', function (err) {
                _Logger.log(scr + "\m" + dest + "\n" + err, "FileSystem.copyFile()");
            });
        } catch (err) {
            _Logger.log(scr + "\m" + dest + "\n" + err, "FileSystem.copyFile()");
        }
    },
    rename: function (oldPath, newPath) {
        try {
            _FS.renameSync(oldPath, newPath);
            return true;
        } catch (err) {
            _Logger.err(oldPath + "\n" + err, "FileSystem.rename()");
            return false;
        }
    }
};

module.exports = exports = FileSystem;