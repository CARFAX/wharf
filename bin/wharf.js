#!/usr/bin/env node

var minimist = require('minimist'),
    path = require('path'),
    wharf = require('../lib'),
    options = minimist(process.argv.slice(2)),
    args = options._;
delete options._;

function paths(input, output) {
    input = input || '';
    output = output ? output : path.join(input, 'docs');  // default to input dir + '/docs'

    return {
        input: path.join(process.cwd(), input),
        output: path.join(process.cwd(), output)
    };
}

if(args[0] == 'compile') {
    wharf.compile( paths(args[1], args[2]), options);
} else {
    console.log('wharf - Node module documentation generator.', args, options);
}