var getEnergy = require('action.creep.getEnergy');
var storeEnergy = require('action.creep.storeEnergy');

module.exports = {

    run: function(creep){
        var targetFlag = creep.memory.targetFlag;

        if(creep.pos == Game.flags[targetFlag])
            creep.memory.roomReached = true;

        if(!creep.memory.roomReached){
            creep.moveTo(Game.flags[targetFlag]);
        } else{
            if(creep.carry < creep.carryCapacity)
                getEnergy.run(creep);
            else{
                if(creep.pos != Game.flags["loot-flag"].pos)
                    creep.moveTo(Game.flags["loot-flag"]);
                else
                    creep.memory.success = true;
            }

        }
        if(creep.memory.success){
            storeEnergy.run(creep);
        }

    }

}
