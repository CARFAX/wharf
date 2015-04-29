var fs = require('fs'),
    path = require('path'),
    compileArticle = require('./article'),
    navCrawler = require('../crawlers/markdown'),
    navRenderer = require('../renderers/nav');

module.exports = function(paths, options) {
    var markdownFiles = (fs.readdirSync( path.join(paths.input, 'markdown') ) || [])
        .sort(function(a, b) {
            return b == 'intro.md' ? 1 : 0; // make 'intro' first
        })
        .map(function(f){
            return path.join(paths.input, 'markdown', f);
        })
        .map(function(filename) {
            return fs.readFileSync(filename, 'UTF-8');
        });

    var articleHtml = markdownFiles
        .map(function(md) {
            return compileArticle(paths.input, paths.output, md);
        }).reduce(function(html, fileHtml) {
            return html + fileHtml;
        }, '');

    var tree = navCrawler(markdownFiles);
    var navHtml = navRenderer(tree);

    return {
        article: articleHtml,
        nav: navHtml
    }
};