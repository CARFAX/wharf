#!/usr/bin/env node

var minimist = require('minimist'),
    wharf = require('../lib/wharf'),
    options = minimist(process.argv.slice(2)),
    args = options._;
delete options._;

if(args[0] == 'compile') {
    wharf.copyStaticFiles(process.cwd(), process.cwd() + '/docs', options);
    wharf.compile(process.cwd(), process.cwd() + '/docs', options);
} else {
    console.log('wharf - Node module documentation generator.', args, options);
}