var path = require('path'),
    render = {
        bundle: require('./renderers/bundle'),
        src: require('./renderers/src'),
        tests: require('./renderers/tests'),
        markdown: require('./renderers/markdown'),
        static: require('./renderers/static'),
        document: require('./renderers/document')
    };

var wharf = module.exports = {};

function prep(paths, options) {
    paths.lib = __dirname;
    paths.src = options.src || 'src';
    paths.output = path.join(paths.cwd, options.docs || 'docs');

    options.base = options.base || 'lib';
    options.title = options.title || 'lib-js';
    options.author = options.author || 'CARFAX';
}

wharf.compile = function(paths, options, done) {
    if(typeof paths === 'string') paths = { cwd: paths };
    if(typeof done !== 'function') done = function(){};
    prep(paths, options);

    // === Static Files
    render.static(paths, options);

    // === Src Files
    render.src(paths, options);

    // === Test Files
    render.tests(paths, options);

    // === Bundle
    render.bundle(paths, options, function(hasBundle) {
        options.bundle = hasBundle;

        // === Markdown
        render.document(paths, options);

        done();
    });
};