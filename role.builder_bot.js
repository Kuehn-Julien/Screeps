var getEnergy = require('action.creep.getEnergy');
var checkWork = require('action.creep.checkWork')
var executeInterrupt = require('action.creep.executeInterrupt');

module.exports = {

    run: function(creep){

        checkWork.run(creep);

        if(creep.memory.working){
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length != 0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else{
                executeInterrupt.run(creep,false);
            }

        } else{
            getEnergy.run(creep);
        }
	}

};
