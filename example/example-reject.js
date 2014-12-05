var Q = require('q'),
    Squad = require('../lib/node-squad.js');

//copyright nobody
var dataSet = ['This','is','how','we','reject','it'];
var config = {
    squadSize:3,
    disableLogs: false,
    stopOnReject:true
};

var job = function (item){
    var jobDeferred = Q.defer();

    //waiting randomly
    var randomWait = Math.floor(Math.random() * 1000) + 1;
    setTimeout(function(){
            jobDeferred.reject("sorry buddy");
        },
        randomWait);

    return jobDeferred.promise;
};

Squad.run(dataSet,job,config)
    .then(function(lyrics){
    console.log('Finished processing all the data.');
}).then(function(results){
       console.log("This 'then' should not be called!!!!!!!");
}).catch(function(error){
    config.stopOnReject = false;
    return Squad.run(dataSet,job,config).then(function(results){
        console.log("Here are the results : ");
        console.log(results);
    }).catch(function(){
        console.log("This 'catch' should not be called!!!!!!!");
    });
});
