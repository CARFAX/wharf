var fs = require('fs'),
    path = require('path'),
    walk = require('../utils/walk'),
    format = require('mb-strings');

module.exports = function(paths, options) {
    paths.tests = options.tests || 'test';

    var template = fs.readFileSync( path.join(paths.lib, 'templates/template_test.html'), 'utf8');
    var inputPath = path.join(paths.input, paths.tests),
        testFiles = walk(inputPath);

    testFiles.forEach(function(testFilePath, i) {
        var content = fs.readFileSync(testFilePath, 'utf8'),
            filename = options.base + testFilePath.substring(inputPath.length).replace(/\/+|\\+/g, '.').replace('.test.js', '');

        content = format(template, {
            content: content,
            title: filename,
            project_title: options.title,
            project_author: options.author
        });

        var outputPath = path.join(paths.output, paths.tests);
        if(!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }

        fs.writeFileSync( path.join(outputPath, filename+'.html'), content, 'utf8');
    });
};