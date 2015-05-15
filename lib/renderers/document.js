var format = require('mb-strings'),
    path = require('path'),
    fs = require('fs'),
    markdown = require('./markdown');

module.exports = function render(paths, options) {
    var console_notice = "<li class='fixed-bot console-notice'> <p>Want to try our library?<br/>Just open your console!</p> </li>",
        base_script = "<script>console.log(\"Hey there! You now have access to the '"+options.base+"' object. Feel free to run any examples, or experiment with your own code!\", "+options.base+");</script>";

    var template = fs.readFileSync( path.join(paths.lib, 'templates/template.html'), 'utf8'),
        html = markdown(paths,  options),
        content = format(template, {
            article: html.article,
            nav: html.nav,
            project_title: options.title,
            project_author: options.author,
            project_base: options.base,
            console_notice: options.bundle ? console_notice : '',
            base_script: options.bundle ? base_script : ''
        });

    fs.writeFileSync( path.join(paths.output, '../index.html'), content, 'utf8' );
};