describe('arrays', function() {
    describe('generate', function() {
        it('should create an array of the given size', function () {
            var array = foo.arrays.generate(10);

            foo.arrays.forEach(array, function(elem, i) {
                expect(elem).toEqual(undefined);
            });
        });

        it('should fill each index with the given value', function () {
            var value = {
                foo: 'bar'
            };

            var array = foo.arrays.generate(10, value);

            foo.arrays.forEach(array, function(elem, i) {
                expect(elem).toEqual(value);
            });
        });

        it('should clone the value', function () {
            var value = {
                foo: 'bar'
            };

            var array = foo.arrays.generate(10, value);
            value.foo = 'foo';

            foo.arrays.forEach(array, function(elem, i) {
                expect(elem.foo).toEqual('bar');
            });
        });

        it('should take a generating function', function () {
            var value = function(i) {
                return 'index'+i;
            };

            var array = foo.arrays.generate(10, value);

            foo.arrays.forEach(array, function(elem, i) {
                expect(elem).toEqual('index'+i);
            });
        });
    });
});