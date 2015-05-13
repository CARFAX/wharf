# Options

Any number of options that can be used with `wharf`.

Passed via `--name value` in the CLI, and with a map (`{ name: value }`) as the second parameter via the Node client.
 
All of the examples below use the `compile` action for demonstration purposes, but all of these options may be used with any action.

## base

Specifies the base object, to which all other members are attached. In our example, `fu` is the base.

    $ wharf compile --base fu
    
    wharf.compile(..., {
        base: 'fu'
    })
    
## title

Specifies the title of the project.

    $ wharf compile --title fu
    
    wharf.compile(..., {
        title: 'fu'
    })
   
## author

Specifies the author of the project.

    $ wharf compile --author me
    
    wharf.compile(..., {
        author: 'me'
    })
    
## src

Specifies the directory (relative to the cwd) that the source files are located.

    $ wharf compile --src lib
    
    wharf.compile(..., {
        src: lib
    })
    
So if the cwd is `/apps/fu`, then the src path is `/apps/fu/lib`

**Default:** `src`

## tests

Specifies the directory (relative to the cwd) that the test files are located.

    $ wharf compile --tests tests
    
    wharf.compile(..., {
        tests: 'tests'
    })
    
So if the cwd is `/apps/fu`, then the test path is `/apps/fu/tests`
   
**Default:** `test`