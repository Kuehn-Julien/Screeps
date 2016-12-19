module.exports = {

    run: function(creep){

        if(creep.carry.energy <= 0 && creep.memory.working == true){
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
                if(creep.withdraw(loc[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(loc[0]);
                }
            }
        }
        else{
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else{
                creep.moveTo(Game.flags["Afk-Flag"]);
            }
        }


    }


}
