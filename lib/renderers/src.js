var fs = require('fs'),
    path = require('path'),
    walk = require('../utils/walk'),
    format = require('mb-strings');

module.exports = function(paths, options) {
    var template = fs.readFileSync( path.join(paths.lib, 'templates/template_src.html'), 'utf8');
    var inputPath = path.join(paths.input, 'src'),
        srcFiles = walk(inputPath);

    srcFiles.forEach(function(srcFilePath, i) {
        var content = fs.readFileSync(srcFilePath, 'utf8'),
            filename = options.base + srcFilePath.substring(inputPath.length).replace(/\/+|\\+/g, '.').replace('.js', '');

        content = format(template, {
            content: content,
            title: filename,
            project_title: options.title,
            project_author: options.author
        });

        var outputPath = path.join(paths.output, 'src');
        if(!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }

        fs.writeFileSync( path.join(outputPath, filename+'.html'), content, 'utf8');
    });
};