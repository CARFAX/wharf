var fs = require('fs'),
    format = require('mb-strings');

module.exports = function render(tree) {
    var html = '';

    for(var h1 in tree) {
        html += "<li class='bold'>";
        html += format("<a class='collapsible-header waves-effect waves-teal'>{text}</a>", { text: h1 });
        html += "<div class='collapsible-body'>";
        html += "<ul>";

        var h2s = tree[h1];
        for(var h2 in h2s) {
            var anchor = '#' + h1 + '.' + h2,
                heading = h2s[h2];
            html += format("<li>");
            html += format("<a href='{anchor}'>{heading}</a>", { anchor: anchor, heading: heading });
            html += format("</li>");
        }

        html += "</ul>";
        html += "</div>";
        html += "</li>";
    }

    return html;
};