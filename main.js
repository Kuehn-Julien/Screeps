module.exports.loop = function () {

    for(var i in Game.spawns){
        Game.spawns[i].createCreep([WORK,CARRY,CARRY,MOVE,MOVE]);
    }

    for(var c in Game.creeps){
        var creep = Game.creeps[c];

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
};
