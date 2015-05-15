var path = require('path'),
    fs = require('fs'),
    browserify = require('browserify');

module.exports = function(paths, options, callback) {
    var mainfile = options.entry || path.join(paths.cwd, paths.src, options.base + '.js');

    browserify([mainfile])
        .bundle(function(err, buffer) {
            var output = path.join(paths.output, 'js', 'bundle.js');
            fs.writeFileSync(output, buffer.toString(), 'utf8' );
            callback();
        });
};