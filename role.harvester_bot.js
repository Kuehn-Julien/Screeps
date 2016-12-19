var storeEnergy = require('action.creep.storeEnergy');
var checkWork = require('action.creep.checkWork');

module.exports = {

    run: function(creep){
        
        checkWork.run(creep);

        if(!creep.memory.working){
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE)
                creep.moveTo(source);
        } else{
            storeEnergy.run(creep);
        }

    }

}
