var getEnergy = require('action.creep.getEnergy');
var checkWork = require('action.creep.checkWork')
var executeInterrupt = require('action.creep.executeInterrupt');

module.exports = {

    run: function(creep){

        checkWork.run(creep);

        if(creep.memory.working  && !creep.memory.interrupt){
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else{
                executeInterrupt.run(creep,false);
            }

        } else{
            if(!creep.memory.interrupt)
                getEnergy.run(creep);
        }

    }

}
