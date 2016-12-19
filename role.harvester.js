module.exports = {
    run: function(creep){

        if(creep.carry.energy == creep.carryCapacity)
            creep.memory.job_done = true;
        else if (creep.carry.energy == 0)
            creep.memory.job_done = false;

        if(creep.carryCapacity > creep.carry.energy && creep.memory.job_done != true){
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE)
                creep.moveTo(source);
            }

        /*
        else{
            if(creep.transfer(Game.spawns.OverRustle, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(Game.spawns.OverRustle);
        }
        */
        else{
            var loc = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_STORAGE ||
                            structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_TOWER);
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
                            break
                        }
                    }
                }

                if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
}
