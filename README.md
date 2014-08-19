node-squad
==========

Run N functions in parallel.
When all the functions are finished, N new functions are triggered, until the input data set is drained.

This package is based on the excellent https://github.com/kriskowal/q
It can be useful for different purpose (avoid api throttle etc.).


## Getting Started
Install the module with: `npm install node-squad`

## Usage
node-squad accepts 3 input parameters :

- a data set (Array)
- a function taking one item of the dataset as a parameter (the function must return a result or a promise)
- the configuration hash (optional)

Configuration options:

- `config.squadSize` : the number of function to run at the same time (10 by default)
- `config.disableLogs` : yes, you already know what it does (false by default)

        var Q = require('q'),
        Squad = require('node-squad');
        
        //copyright Montell Jordan
        var dataSet = ['This','is','how','we','do','it'];
        var config = {
            squadSize:3,
            disableLogs: false
        };
        
        Squad.run(dataSet,function(item){
            var jobDeferred = Q.defer();
        
            //waiting randomly
            var randomWait = Math.floor(Math.random() * 1000) + 1;
            setTimeout(function(){
                jobDeferred.resolve(item+'♪');
            },
            randomWait);
        
            return jobDeferred.promise;
        },config)
        .then(function(lyrics){
            console.log('Finished processing all the data');
            console.log(lyrics);
        });
    
To run the example in this repo run `npm install` and then `node ./example/example.js`

Please note this is a firing squad, you won't always have N functions executing at the same time, each function will wait for **ALL OF THE OTHER** functions of the squad to be finished before starting another batch.

That's all folks!

## License
Copyright (c) 2014 Fabien Allanic  
Licensed under the MIT license.