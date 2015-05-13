var marked = require('marked'),
    fs = require('fs'),
    format = require('mb-strings'),
    renderer = new marked.Renderer();

var tree = {},
    lastHeading,
    options;

renderer.heading = function (text, level) {
    if(level == 1 && text != options.base) {
        tree[text] = {};
        lastHeading = text;
    }

    if(level == 2 && lastHeading) {
        var anchor = text.match(/[^\(]*/g)[0].trim(),
            heading = text.substring(anchor.lastIndexOf('.')+1),
            comments = heading.match(/\(\(.*\)\)/g);

        if(comments) {
            heading = heading.replace(/\(\(.*\)\)/g, '');
        }

        heading = heading.replace(/\(.*\)/g, '()');

        tree[lastHeading][anchor] = heading.trim();
    }
};

function parse(content) {
    marked(content, { renderer: renderer });
    lastHeading = null;
}

module.exports = {
    init: function(_paths, _options) {
        options = _options;
        return this;
    },
    crawl: function(files) {
        tree = {};
        files.forEach(function(content) {
            //var content = fs.readFileSync(filename, 'utf8');
            parse(content);
        });
        return tree;
    }
};