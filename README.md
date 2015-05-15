# wharf

Generates interactive documentation from markdown files. Discovers and displays source and test files in Node projects.

This library can be installed via npm

    npm install -g wharf

To include in a Node project, require the `wharf` module

    var wharf = require('wharf')
    
To use via command line, simply type

    $ wharf

## Actions

All actions cam be completed using the CLI, or using the Node client, and all actions will follow a similar pattern.

### Compile

Generates the documentation for the specified directory.

    $ wharf compile [directory]
    
    // or
    
    wharf.compile({
        cwd: __dirname
    })
   
This will dump an `index.html` file in the current directory, and create a new directory (`docs` by default) with all of the supporting files.
 
## Options

Any number of options that can be used with `wharf`.

Passed via `--name value` in the CLI, and with a map (`{ name: value }`) as the second parameter via the Node client.
 
All of the examples below use the `compile` action for demonstration purposes, but all of these options may be used with any action.

### base

Specifies the base object, to which all other members are attached. In our example, `fu` is the base.

    $ wharf compile --base fu
    
    wharf.compile(..., {
        base: 'fu'
    })
    
### title

Specifies the title of the project.

    $ wharf compile --title fu
    
    wharf.compile(..., {
        title: 'fu'
    })
   
### author

Specifies the author of the project.

    $ wharf compile --author me
    
    wharf.compile(..., {
        author: 'me'
    })
    
### src

Specifies the directory (relative to the cwd) that the source files are located.

    $ wharf compile --src lib
    
    wharf.compile(..., {
        src: lib
    })
    
So if the cwd is `/apps/fu`, then the src path is `/apps/fu/lib`

**Default:** `src`

### tests

Specifies the directory (relative to the cwd) that the test files are located.

    $ wharf compile --tests tests
    
    wharf.compile(..., {
        tests: 'tests'
    })
    
So if the cwd is `/apps/fu`, then the test path is `/apps/fu/tests`
   
**Default:** `test`

## Demo

Check out the [official documentation](http://carfax.github.io/wharf/), build with `wharf`.


## Contact & License Info

Author: CARFAX First-Class Frontend Team  
Email: opensource@carfax.com  
License: MIT