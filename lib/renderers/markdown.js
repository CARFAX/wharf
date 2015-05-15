var fs = require('fs'),
    path = require('path'),
    crawler = require('../crawlers/markdown'),
    renderArticle = require('./article'),
    renderNav = require('./nav');

module.exports = function(paths, options) {
    var markdownPath = path.join(paths.cwd, 'markdown');

    var markdownFiles = (fs.existsSync(markdownPath) ? fs.readdirSync(markdownPath) || [] : [])
        .sort(function(a, b) {
            return b == 'intro.md' ? 1 : 0; // make 'intro' first
        })
        .map(function(f){
            return path.join(paths.cwd, 'markdown', f);
        })
        .map(function(filename) {
            return fs.readFileSync(filename, 'UTF-8');
        });

    var articleHtml = markdownFiles
        .map(function(md) {
            return renderArticle(paths.cwd, paths.output, md);
        }).reduce(function(html, fileHtml) {
            return html + fileHtml;
        }, '');

    var tree = crawler.init(paths, options).crawl(markdownFiles);
    var navHtml = renderNav(tree);

    return {
        article: articleHtml,
        nav: navHtml
    }
};