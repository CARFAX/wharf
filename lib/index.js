var fs = require('fs'),
    path = require('path'),
    format = require('mb-strings'),
    walk = require('./utils/walk'),
    render = {
        src: require('./renderers/src'),
        tests: require('./renderers/tests'),
        markdown: require('./renderers/markdown'),
        static: require('./renderers/static')
    };

var wharf = module.exports = {};

wharf.compile = function(paths, options) {
    paths.lib = __dirname;

    // === Static Files
    render.static(paths, options);

    // === Src Files
    render.src(paths, options);

    // === Test Files
    render.tests(paths, options);

    // === Markdown
    var markdown = render.markdown(paths, options);
    var template = fs.readFileSync( path.join(paths.lib, 'templates/template.html'), 'utf8' );
    var content = format(template, markdown);
    fs.writeFileSync( path.join(paths.output, '../index.html'), content, 'utf8' );
};