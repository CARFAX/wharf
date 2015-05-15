# foo.env

A collection of constants and functions to help determine the environment.

## Level Constants ((LOCAL, ALPHA, PROD, etc.))

A handful of Constants to help describe environments.

    foo.env.LOCAL = 'local'
    foo.env.DEV = 'dev'
    foo.env.ALPHA = 'alpha'
    foo.env.BETA = 'beta'
    foo.env.PROD = 'prod'
    
## ENV

A 'final' value  that describes the current environment. Set at initialization, and when `foo.env.determine()` is called.

If code is running on in a local development environment, `foo.env.ENV` will equal `foo.env.LOCAL`.

In production, `foo.env.ENV` will equal `foo.env.PROD`, etc.

## isBrowser()

Returns `true` if `process.title` equals `'browser'`, otherwise `false`.

Though normally not available in the browser, `process.env` is brought to you by Browserify.

## determine()

Returns the current environment (`foo.env.LOCAL`, `foo.env.BETA`, etc.). Will also set `foo.env.ENV` to this value.