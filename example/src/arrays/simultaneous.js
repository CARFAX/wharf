/**
 * @callback forEachCallback
 * @param {...*} elements - Elements at the index, for each array (first iteration: a[0], b[0]. Second: a[1], b[1], etc.)
 * @param {number} index - Index of the element
 */

/**
 * Loops over each index in all of the given arrays
 * @function forEach
 * @param {forEachCallback} callback - The callback to handle each iteration
 */

/**
 * @typedef simultaneousMethods
 * @type {Object}
 * @property {until} until - Tells the iterator when to stop looping over the arrays
 * @function {forEach} forEach - Function that will iterator over i, i+1, i+2, etc of each array
 */

/**
 * Returns a list of methods that, when called, will iterate over the given arrays simultaneously
 * @param {...Array} arrays - Takes any number of arrays to be iterated upon
 * @returns {simultaneousMethods}
 */
function simultaneous() {
    var arrays = Array.prototype.slice.call(arguments, 0),
        defaultSorting = 1;

    function args(i) {
        var args = [];
        for (var a = 0; a < arrays.length; a++) {
            args.push(arrays[a][i]);
        }
        return args;
    }

    function length(type) {
        var initial = arrays[0].length,
            longest = initial,
            shortest = initial;

        for (var a = 0; a < arrays.length; a++) {
            var len = arrays[a].length;
            if (len > longest) {
                longest = len
            }
            if (len < shortest) {
                shortest = len;
            }
        }

        return {
            '-1': shortest,
            0: initial,
            1: longest
        }[type || defaultSorting];
    }

    return {
        until: function (sorting) {
            defaultSorting = sorting == 'longest' ? 1
                : sorting == 'shortest' ? -1
                : sorting == 'initial' ? 0
                : 1;
            return this;
        },
        forEach: function (callback) {
            for (var i = 0, len = length(); i < len; i++) {
                callback.apply(null, args(i).concat(i));
            }
        }
    };
}

module.exports = simultaneous;