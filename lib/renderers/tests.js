var fs = require('fs'),
    path = require('path'),
    walk = require('../utils/walk'),
    format = require('mb-strings');

module.exports = function(paths, options) {
    var template = fs.readFileSync( path.join(paths.lib, 'templates/template_test.html'), 'utf8');
    var inputPath = path.join(paths.input, 'test'),
        testFiles = walk(inputPath);

    testFiles.forEach(function(testFilePath, i) {
        var content = fs.readFileSync(testFilePath, 'utf8'),
            filename = 'cfx'+testFilePath.substring(inputPath.length).replace(/\/+|\\+/g, '.').replace('.test.js', '');

        content = format(template, {
            content: content,
            title: filename
        });

        var outputPath = path.join(paths.output, 'test');
        if(!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }

        fs.writeFileSync( path.join(outputPath, filename+'.html'), content, 'utf8');
    });
};