#!/usr/bin/env node

var minimist = require('minimist'),
    path = require('path'),
    wharf = require('../lib'),
    options = minimist(process.argv.slice(2)),
    args = options._;
delete options._;

function paths(cwd) {
    return {
        cwd: cwd || process.cwd()
    };
}

if(args[0] == 'compile') {
    wharf.compile( paths(args[1]), options);
} else {
    console.log('wharf - Node module documentation generator.', args, options);
}