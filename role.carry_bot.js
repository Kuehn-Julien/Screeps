var getEnergy = require('action.creep.getEnergy');
var storeEnergy = require('action.creep.storeEnergy');
var checkWork = require('action.creep.checkWork')
var executeInterrupt = require('action.creep.executeInterrupt');

module.exports = {

    run: function(creep){

        checkWork.run(creep);

        if(!creep.memory.working){
            var loc = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return(structure.structureType == STRUCTURE_CONTAINER);
                }
            });

            var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if(target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }

            if(loc.length != 0){
                var num = 0;
                var pos = 0;
                for(var y=0; y<loc.length; y++){
                    if(loc[y].store[RESOURCE_ENERGY] > num){
                        num = loc[y].store[RESOURCE_ENERGY];
                        pos = y;
                    }
                }
                target = loc[pos];
                if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }

            }else{
                var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
                if(target) {
                    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }

        } else{
            storeEnergy.run(creep);
        }
    }

}
