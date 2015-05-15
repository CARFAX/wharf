# Actions

All actions cam be completed using the CLI, or using the Node client, and all actions will follow a similar pattern.

## Compile

Generates the documentation for the specified directory.

    $ wharf compile [directory]
    
    // or
    
    wharf.compile({
        cwd: __dirname
    })
   
This will dump an `index.html` file in the current directory, and create a new directory (`docs` by default) with all of the supporting files. 