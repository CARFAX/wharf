describe('events', function() {

    it('should set & call the listener', function() {
        var fn = jasmine.createSpy();

        foo.events.on('test', fn);
        foo.events.broadcast('test', 'foobar', 123);

        expect(fn).toHaveBeenCalledWith('foobar', 123);
    });

    it('should NOT call the listener', function() {
        var fn = jasmine.createSpy();

        foo.events.on('test', fn);
        foo.events.broadcast('not-test', 'foobar', 123);

        expect(fn).not.toHaveBeenCalledWith('foobar', 123);
    });

});