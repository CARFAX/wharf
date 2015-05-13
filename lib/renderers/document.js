var format = require('mb-strings'),
    path = require('path'),
    fs = require('fs'),
    markdown = require('./markdown');

module.exports = function render(paths, options) {
    var template = fs.readFileSync( path.join(paths.lib, 'templates/template.html'), 'utf8'),
        html = markdown(paths,  options),
        content = format(template, {
            article: html.article,
            nav: html.nav,
            project_title: options.title,
            project_author: options.author,
            project_base: options.base
        });

    fs.writeFileSync( path.join(paths.output, '../index.html'), content, 'utf8' );
};