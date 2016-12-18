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

        else{
            if(creep.transfer(Game.spawns.OverRustle, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(Game.spawns.OverRustle);
        }
    }
}
