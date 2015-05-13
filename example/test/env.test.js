describe('env', function() {
    describe('isBrowser()', function() {
        it('should return false', function() {
            expect( fu.env.isBrowser() ).toBe(true);
        });
    });

    describe('determine()', function() {
        afterEach(function() {
            fu.window.domain = 'localhost';
        });

        describe('local', function() {
            afterEach(function() {
                fu.env.determine();
                expect( fu.env.ENV ).toEqual(fu.env.LOCAL);
            });

            it('localhost', function() {
                fu.window.domain = 'localhost';
            });

            it('my.carfax.com', function() {
                fu.window.domain = 'my.carfax.com';
            });

            it('mysecure.carfax.com', function() {
                fu.window.domain = 'mysecure.carfax.com';
            });

            it('mysecured.carfax.com', function() {
                fu.window.domain = 'mysecured.carfax.com';
            });
        });

        it('should return dev', function() {
            fu.window.domain = 'dev.carfax.com';
            fu.env.determine();

            expect( fu.env.ENV ).toEqual(fu.env.DEV);
        });

        it('should return alpha', function() {
            fu.window.domain = 'alpha.carfax.com';
            fu.env.determine();

            expect( fu.env.ENV ).toEqual(fu.env.ALPHA);
        });

        it('should return beta', function() {
            fu.window.domain = 'beta.carfax.com';
            fu.env.determine();

            expect( fu.env.ENV ).toEqual(fu.env.BETA);
        });

        it('should return prod', function() {
            fu.window.domain = 'carfax.com';
            fu.env.determine();

            expect( fu.env.ENV ).toEqual(fu.env.PROD);
        });
    });
});