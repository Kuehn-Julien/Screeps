module.exports = {

    run: function(creep, clearRessources){

        if(clearRessources){
            if(creep.carry.energy > 0){
                // Find place to store energy container
                if(creep.transfer(Game.spawns.OverRustle, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    creep.moveTo(Game.spawns.OverRustle);
            }
        }
        else{
            creep.moveTo(Game.flags["Afk-Flag"]);
        }

    }

}
