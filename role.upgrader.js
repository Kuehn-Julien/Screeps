module.exports = {
    run: function(creep){
        if(creep.carry.energy != 0){
            var upgrade = creep.room.find("FIND_MY_STRUCTURES");
            if(creep.upgradeController(upgrade[0]) == ERR_NOT_IN_RANGE)
                creep.moveTo(upgrade[0]);
        }
        else{
            var loc = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)
                }});
            if(loc[0].transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(loc[0]);
            }
        }

    }
}
