var fs = require('fs'),
    path = require('path'),
    format = require('mb-strings'),
    compilers = require('./compilers');

var wharf = module.exports = {};

wharf.compile = function(input, output, options) {
    // === Src Files
    compilers.src(input, output, options);

    // === Test Files
    compilers.tests(input, output, options);

    // === Markdown
    var markdown = compilers.markdown(input, output, options);
    var template = fs.readFileSync( path.join(__dirname, 'templates', 'template.html'), 'utf8' );
    var content = format(template, markdown);
    fs.writeFileSync( path.join(output, 'index.html'), content, 'utf8' );
};

wharf.copyStaticFiles = function(input, output, options) {
    var dirs = [
        'css',
        'highlight',
        'highlight/styles',
        'js'
    ];

    function mkdir(dir) {
        var dirPath = path.join(output, dir);
        if(!fs.existsSync(dirPath))
            fs.mkdirSync( dirPath );
    }

    dirs.forEach(mkdir);

    var files = [
        'css/base.css',
        'css/src.css',
        'css/style.css',
        'css/test.css',
        'highlight/styles/hybrid.css',
        'highlight/highlight.pack.js',
        'js/cabinet.js'
    ];

    function copy(filename) {
        var content = fs.readFileSync( path.join(__dirname, 'static', filename), 'utf8' );
        fs.writeFileSync( path.join(output, filename), content, 'utf8' );
    }

    files.forEach(copy);
};