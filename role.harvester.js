module.exports = {
    run: function(creep){
        if(creep.carryCapacity > creep.carry.energy){
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE)
                creep.moveTo(source);
            }

            else{
                if(creep.transfer(Game.spawns.OverRustle, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(Game.spawns.OverRustle);
            }
    }
}
