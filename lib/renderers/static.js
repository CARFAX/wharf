var fs = require('fs'),
    path = require('path'),
    format = require('mb-strings'),
    walk = require('../utils/walk');

module.exports = function copyStaticFiles(paths, options) {
    function mkdir(dir) {
        var dirPath = path.join(paths.output, dir);
        if(!fs.existsSync(dirPath))
            fs.mkdirSync( dirPath );
    }

    function mkpath(filepath) {
        var dirs = filepath.split(path.sep);

        for(var i = 1; i < dirs.length; i++) {
            var dp = dirs.slice(0, i).join(path.sep);
            mkdir(dp);
        }
    }

    function copy(filename) {
        var content = fs.readFileSync( path.join(paths.lib, 'static/dist', filename), 'utf8' );
        fs.writeFileSync( path.join(paths.output, filename), content, 'utf8' );
    }

    // === Copy Files ===
    var files = walk( path.join(paths.lib, 'static/dist'), false );

    // make output dir
    mkdir( '' );
    files.forEach(mkpath);
    files.forEach(copy);
};