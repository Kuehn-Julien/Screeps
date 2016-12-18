module.exports = {
    run: function(creep){

        if(creep.carry.energy == creep.carryCapacity)
            creep.memory.job_done = false;
        else if (creep.carry.energy == 0)
            creep.memory.job_done = true;

        if(creep.memory.working == true && creep.memory.job_done == true){

            var loc = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)
                }});
            if(loc[0].transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(loc[0]);
            }
        }

        else if(creep.memory.job_done != true){

            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }

        }
    }
}
