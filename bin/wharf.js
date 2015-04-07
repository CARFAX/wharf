#!/usr/bin/env node

var minimist = require('minimist'),
    options = minimist(process.argv.slice(2)),
    args = options._;
delete options._;

if(false) {

} else {
    console.log('wharf - Node module documentation generator.', args, options);
}