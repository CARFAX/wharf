var marked = require('marked'),
    fs = require('fs'),
    path = require('path'),
    format = require('mb-strings'),
    renderer = new marked.Renderer();

var input,
    output;

function hasTestFile(anchor) {
    var filename = anchor + '.html';
    var p = path.join(output, 'test', filename);
    return fs.existsSync( p );
}
function hasSrcFile(anchor) {
    var filename = anchor + '.html';
    var p = path.join(output, 'src', filename);
    return fs.existsSync( p );
}

var lastHeading = '';

renderer.heading = function (text, level) {
    var template = "<h{level} id='{anchor}'>{text}</h{level}>",
        anchor = text;

    if(level == 1) {
        lastHeading = text;
    }

    if(level == 2) {
        text = lastHeading + '.' + text;
        template = "<a class='anchor' name='{anchor}' href='#'></a>" + template;
        anchor = text.match(/[^\(]*/g)[0].trim();
        text = text.replace(/\(\((.*)\)\)/g, '($1)');
        text = text.substring(anchor.lastIndexOf('.')+1);
    }

    if(hasTestFile(anchor)) {
        template = "<a class='btn test' target='_blank' href='test/{anchor}.html'>Tests</a>" + template;
    }
    if(hasSrcFile(anchor)) {
        template = "<a class='btn src' target='_blank' href='src/{anchor}.html'>Source</a>" + template;
    }

    return format(template, {
        level: level + 1,
        text: text,
        anchor: anchor
    });
};

renderer.code = function (code, language) {
    code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return format("<pre><code class='{language}'>{code}</code></pre>", { code: code, language: language || 'javascript' });
};

function parseIncludes(content) {
    return content.replace(/@include\s'(.*?)'/g, function getFile(match, filename) {
        var content = fs.readFileSync( path.join(input, 'markdown', filename + '.md'), 'utf8' );
        return content;
    });
}

module.exports = function(_input, _output, content) {
    input = _input;
    output = _output;

    content = parseIncludes(content);

    return marked(content, { renderer: renderer });
};