var fs = require('fs'),
    path = require('path'),
    walk = require('./walk'),
    format = require('mb-strings');

module.exports = function(input, output, options) {
    var template = fs.readFileSync( path.join(__dirname, '../templates', 'template_test.html'), 'utf8');
    var inputPath = path.join(input, 'test'),
        testFiles = walk(inputPath);

    testFiles.forEach(function(testFilePath, i) {
        var content = fs.readFileSync(testFilePath, 'utf8'),
            filename = 'cfx'+testFilePath.substring(inputPath.length).replace(/\/+|\\+/g, '.').replace('.test.js', '');

        content = format(template, {
            content: content,
            title: filename
        });


        var outputPath = path.join(output, 'test');
        if(!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }

        fs.writeFileSync( path.join(outputPath, filename+'.html'), content, 'utf8');
    });
};