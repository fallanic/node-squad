node-squad
==========

Run N functions in parallel. 
When all the functions are finished, N new functions are triggered, until the input data set is drained.
This package can be useful for different uses (avoid api throttle etc.).


## Getting Started
Install the module with: `npm install node-squad`

## Usage
3 input parameters :

- a data set (Array)
- a function taking one item of the dataset as a parameter (the function must return a result or a promise)
- the configuration hash (optional)
 config.squadSize : the number of function to run at the same time (10 by default)
 config.disableLogs : yes, you already know what it does (false by default)

    var Squad = require('node-squad');
    
    
    
To run the example in this repo `node ./example/example.js`

Please note this is a firing squad, you won't always have N functions executing at the same time, each function will wait for ALL OF THE OTHER functions of the squad to be finished before starting another batch.

That's all folks!

## License
Copyright (c) 2014 Fabien Allanic  
Licensed under the MIT license.