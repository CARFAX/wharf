describe('window', function() {
    describe('domain', function() {
        it('should be localhost', function() {
            expect( foo.window.domain ).toEqual('localhost');
        });
    });

    describe('scrollY()', function() {
        it('should return 0', function() {
            expect( foo.window.scrollY()).toEqual(0);
        });
    });

    describe('path', function() {
        it('should be /context.html', function() {
            expect( foo.window.path ).toEqual(window.location.pathname);
        });
    });
});