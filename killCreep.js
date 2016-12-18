module.exports = {

    run: function(creep){

        if(creep.carry.energy > 0){
            if(creep.transfer(Game.spawns.OverRustle, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(Game.spawns.OverRustle);
        }
        else{
            creep.moveTo(Game.flags["Death-Flag"]);
        }

    }
}
