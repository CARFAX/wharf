var fs = require('fs'),
    path = require('path');

module.exports = function walk(dir, absolute) {
    if(absolute === undefined) absolute = true;

    var paths = fs.readdirSync(dir)
        .map(function(pathString) {
            return path.join(dir, pathString);
        });

    var dirs = paths
        .filter(function(pathString) {
            return fs.lstatSync(pathString).isDirectory()
        })
        .map(function(pathString) {
            return walk(pathString);
        })
        .reduce(function(array, files) {
            return array.concat(files);
        }, [])
        .map(function(filename) {
            return absolute ? filename : filename.replace(dir, '');
        });

    var files = paths.filter(function(pathString) {
        return !fs.lstatSync(pathString).isDirectory()
    });

    return files.concat(dirs);
};