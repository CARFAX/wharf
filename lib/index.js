var render = {
        src: require('./renderers/src'),
        tests: require('./renderers/tests'),
        markdown: require('./renderers/markdown'),
        static: require('./renderers/static'),
        document: require('./renderers/document')
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
    render.document(paths, options);
};