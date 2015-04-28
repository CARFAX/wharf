var fs = require('fs'),
    path = require('path'),
    walk = require('./../utils/walk'),
    format = require('mb-strings');

module.exports = function(input, output, options) {
    var template = fs.readFileSync( path.join(__dirname, '../templates', 'template_src.html'), 'utf8');
    var inputPath = path.join(input, 'src'),
        srcFiles = walk(inputPath);

    srcFiles.forEach(function(srcFilePath, i) {
        var content = fs.readFileSync(srcFilePath, 'utf8'),
            filename = 'cfx'+srcFilePath.substring(inputPath.length).replace(/\/+|\\+/g, '.').replace('.js', '');

        content = format(template, {
            content: content,
            title: filename
        });

        var outputPath = path.join(output, 'src');
        if(!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }

        fs.writeFileSync( path.join(outputPath, filename+'.html'), content, 'utf8');
    });
};