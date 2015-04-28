var fs = require('fs'),
    path = require('path'),
    compileArticle = require('./article'),
    navCompiler = require('./nav');

module.exports = function(input, output, options) {
    var markdownFiles = (fs.readdirSync( path.join(input, 'markdown') ) || [])
        .sort(function(a, b) {
            return b == 'intro.md' ? 1 : 0; // make 'intro' first
        })
        .map(function(f){
            return path.join(input, 'markdown', f);
        })
        .map(function(filename) {
            return fs.readFileSync(filename, 'UTF-8');
        });

    var articleHtml = markdownFiles
        .map(function(md) {
            return compileArticle(input, output, md);
        }).reduce(function(html, fileHtml) {
            return html + fileHtml;
        }, '');

    markdownFiles.forEach(navCompiler.feed);
    var navHtml = navCompiler.render();

    return {
        article: articleHtml,
        nav: navHtml
    }
};