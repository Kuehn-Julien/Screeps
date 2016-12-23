var getEnergy = require('action.creep.getEnergy');
var storeEnergy = require('action.creep.storeEnergy');
var checkWork = require('action.creep.checkWork')
var executeInterrupt = require('action.creep.executeInterrupt');

module.exports = {

    run: function(creep){

        checkWork.run(creep);

        if(!creep.memory.working){
            var sources;
            if(getDroppedEnergy()){
                carryEnergy(1);
            }

            else if(getContainerEnergy()){
                carryEnergy(2);
            }

        } else{
            creep.memory.target = null;
            storeEnergy.run(creep);
        }

        function carryEnergy(t){

            var target = null;
            if(true){
                var tmp = 0;
                var idx;
                for(var x=0; x<sources.length; x++){
                    if(sources[x].energy > tmp){
                        tmp = sources[x].energy;
                        idx = x;
                    }
                }

                target = sources[idx];
            } else{
                target = Game.getObjectById(creep.memory.target);
            }

            if(t == 1){
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else{
                if(creep.withdraw(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }

        }

        function getDroppedEnergy(){
            sources = creep.room.find(FIND_DROPPED_ENERGY);
            if(sources.length != 0)
                return true;
            return false;
        }

        function getContainerEnergy(){
            sources = creep.room.find(FIND_STRUCTURES, {
                filter: { structureType: STRUCTURE_CONTAINER }
            });

            if(sources.length != 0)
                return true;
            return false;
        }
    }

}
