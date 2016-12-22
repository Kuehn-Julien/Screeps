module.exports = {

    run: function(creep){

        var loc = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_CONTAINER);
            }
        });

        if(loc.length != 0){
            var target = loc[0];
            var num = 0;
            var numpos = 0;
            for(var x=0; x<loc.length; x++){
                if(loc[x].energy > num){
                    num = loc[x].energy = num;
                    numpos = x;
                }
            }
            target = loc[numpos];

            if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
        }

    }

}
