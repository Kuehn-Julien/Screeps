module.exports = {

    run: function(creep){

        var loc = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_CONTAINER);
            }
        });

        if(loc.length != 0){
            var target = loc[-1];
            for(var x=0; x<loc.length; x++){
                if((loc[x].energyCapacity - loc[x].energy) >= creep.carry.energy){
                    target = loc[x];
                    break;
                }
            }
            if(target == loc[-1]){
                for(var x=0; x<loc.length; x++){
                    if((loc[x].energyCapacity - loc[x].energy) > 0){
                        target = loc[x];
                        break;
                    }
                }
            }

            if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }

    }

}
