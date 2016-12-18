module.exports = {

    run: function(arg1){

        if(arg1 == "harvester"){
            var creep = Game.spawns["OverRustle"].createCreep([WORK,CARRY,MOVE,MOVE,MOVE],null,{role:"harvester"});
        }
        else if(arg1 == "upgrader"){
            var creep = Game.spawns["OverRustle"].createCreep([WORK,CARRY,MOVE],null,{role:"upgrader"});
        }
        else if(arg1 == "builder"){
            var creep = Game.spawns["OverRustle"].createCreep([WORK,CARRY,MOVE],null,{role:"builder"});
        }

    }


}
