(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        define(["q"], function(Q){
            return (root.batchify = factory(Q));
        });
    } else if(typeof module === "object" && module.exports) {
        module.exports = (root.batchify = factory(require("q")));
    } else {
        root.batchify = factory(root.q);
    }
}(this, function(Q) {
    var squad = {};

    /**
     * Run series of batches, executing n jobs in parallel (the job is a function passed as a parameter).
     * @param data An array of items. One item is passed as a parameter of one job.
     * @param worker A function, doing something with one item, and returning a result or a promise.
     * @param config.squadSize The number of functions which can run at the same time.
     * @param config.disableLogs Yes you already know what it does.
     * @returns {*} An array of the results returned by each individual job.
     */
    squad.run = function(data,worker,config){
        var deferred = Q.defer();
        if(!data || !(data instanceof Array)){
            deferred.reject({
                error:"The first argument must be an Array."
            });
        }else if(!worker || !(typeof worker === 'function')){
            deferred.reject({
                error:"The second argument must be a function."
            });

        }else if(config && config.constructor !== Object){
            deferred.reject({
                error:"The config must be a hash."
            });
        }else{
            var results = [];
            if(!config){
                config = {};
            }
            var squadSize = config.squadSize ? config.squadSize : 10;
            var disableLogs = config.disableLogs ? config.disableLogs : false;

            //the main loop creating batches of jobs
            function batchLoop(){
                var promisesArray = createBatchJobs();
                Q.all(promisesArray).then(function(batchResult){
                    results = results.concat(batchResult);
                    //these are upserted, let's check the next ones
                    if(!disableLogs) {
                        console.log("This squad is done, " + data.length + " items remaining");
                    }
                    if(data.length == 0){
                        if(!disableLogs){
                            console.log("Finished the batch loop");
                        }
                        deferred.resolve(results);
                    }else{
                        batchLoop();
                    }
                }).catch(function(e){
                    console.error(e);
                    callback("A problem occurred during the batch loop");
                });
            }

            //this will create a batch of up to squadSize jobs
            function createBatchJobs(){
                var promises = [];

                for(var i=0;i<squadSize && data.length > 0;i++){
                    var item = data.shift();
                    promises.push(worker(item));
                }
                return promises;
            }

            //lightning the fuse
            try{
                batchLoop();
            }catch(criticalError){
                deferred.reject(criticalError);
            }
        }
        return deferred.promise;
    }

    return squad;
}));
