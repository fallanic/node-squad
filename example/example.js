var Q = require('q'),
    Squad = require('../lib/node-squad.js');

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