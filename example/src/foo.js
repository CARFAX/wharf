var foo = module.exports = {};
if(typeof window !== 'undefined') window.foo = foo;

foo.env = require('./env');
foo.window = require('./window');
foo.objects = require('./objects');
foo.arrays = require('./arrays');
foo.events = require('./events');
foo.paths = require('./paths');
foo.strings = require('./strings');