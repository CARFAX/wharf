# fu.env

A collection of constants and functions to help determine the environment.

## Level Constants ((LOCAL, ALPHA, PROD, etc.))

A handful of Constants to help describe environments.

    fu.env.LOCAL = 'local'
    fu.env.DEV = 'dev'
    fu.env.ALPHA = 'alpha'
    fu.env.BETA = 'beta'
    fu.env.PROD = 'prod'
    
## ENV

A 'final' value  that describes the current environment. Set at initialization, and when `fu.env.determine()` is called.

If code is running on in a local development environment, `fu.env.ENV` will equal `fu.env.LOCAL`.

In production, `fu.env.ENV` will equal `fu.env.PROD`, etc.

## isBrowser()

Returns `true` if `process.title` equals `'browser'`, otherwise `false`.

Though normally not available in the browser, `process.env` is brought to you by Browserify.

## determine()

Returns the current environment (`fu.env.LOCAL`, `fu.env.BETA`, etc.). Will also set `fu.env.ENV` to this value.