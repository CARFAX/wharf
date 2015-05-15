describe('env', function() {
    describe('isBrowser()', function() {
        it('should return false', function() {
            expect( foo.env.isBrowser() ).toBe(true);
        });
    });

    describe('determine()', function() {
        afterEach(function() {
            foo.window.domain = 'localhost';
        });

        describe('local', function() {
            afterEach(function() {
                foo.env.determine();
                expect( foo.env.ENV ).toEqual(foo.env.LOCAL);
            });

            it('localhost', function() {
                foo.window.domain = 'localhost';
            });

            it('my.carfax.com', function() {
                foo.window.domain = 'my.carfax.com';
            });

            it('mysecure.carfax.com', function() {
                foo.window.domain = 'mysecure.carfax.com';
            });

            it('mysecured.carfax.com', function() {
                foo.window.domain = 'mysecured.carfax.com';
            });
        });

        it('should return dev', function() {
            foo.window.domain = 'dev.carfax.com';
            foo.env.determine();

            expect( foo.env.ENV ).toEqual(foo.env.DEV);
        });

        it('should return alpha', function() {
            foo.window.domain = 'alpha.carfax.com';
            foo.env.determine();

            expect( foo.env.ENV ).toEqual(foo.env.ALPHA);
        });

        it('should return beta', function() {
            foo.window.domain = 'beta.carfax.com';
            foo.env.determine();

            expect( foo.env.ENV ).toEqual(foo.env.BETA);
        });

        it('should return prod', function() {
            foo.window.domain = 'carfax.com';
            foo.env.determine();

            expect( foo.env.ENV ).toEqual(foo.env.PROD);
        });
    });
});