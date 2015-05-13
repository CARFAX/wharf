var fu = module.exports = {};
if(typeof window !== 'undefined') window.fu = fu;

fu.env = require('./env');
fu.window = require('./window');
fu.objects = require('./objects');
fu.arrays = require('./arrays');
fu.events = require('./events');
fu.paths = require('./paths');
fu.strings = require('./strings');