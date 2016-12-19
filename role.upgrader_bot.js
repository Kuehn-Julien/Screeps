var getEnergy = require('action.creep.getEnergy');
var checkWork = require('action.creep.checkWork')
var executeInterrupt = require('action.creep.executeInterrupt');

module.exports = {

    run: function(creep){

        checkWork.run(creep);

        if(creep.memory.working){

            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }

        } else{
            getEnergy.run(creep);
        }

    }

}
