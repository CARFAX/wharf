describe('arrays', function() {
    describe('simultaneous', function() {
        var listA = ['a', 'b', 'c', 'd', 'e'],
            listB = [1, 2, 3],
            listC = [{ foo: 'bar' }, { stew: 'car' }, { too: 'far' }, { blue: 'tar'}];

        it('should return an object with the simultaneousMethods', function() {
            var iterator = foo.arrays.simultaneous(listA, listB, listC);

            expect(iterator.until).toEqual(jasmine.any(Function));
            expect(iterator.forEach).toEqual(jasmine.any(Function));
        });

        describe('forEach', function() {
            it('should give the index as the last argument', function() {
                var count = 0;
                foo.arrays.simultaneous(listA, listB, listC).forEach(function(a, b, c, i) {
                    expect(i).toEqual(count);
                    count++;
                });
            });

            it('should give the element at the current index of each array', function() {
                foo.arrays.simultaneous(listA, listB, listC).forEach(function(a, b, c, i) {
                    expect(a).toEqual(listA[i]);
                    expect(b).toEqual(listB[i]);
                    expect(c).toEqual(listC[i]);
                });
            });
        });
    });
});