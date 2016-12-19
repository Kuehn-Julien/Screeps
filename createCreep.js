module.exports = {

    run: function(arg1){

        if(arg1 == "harvester"){
            var creep = Game.spawns["OverRustle"].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE],null,{role:"harvester",working:true, job_done:false});
        }
        else if(arg1 == "upgrader"){
            var creep = Game.spawns["OverRustle"].createCreep([WORK,CARRY,MOVE],null,{role:"upgrader",working:true});
        }
        else if(arg1 == "builder"){
            var creep = Game.spawns["OverRustle"].createCreep([WORK,CARRY,MOVE],null,{role:"builder",working:true});
        }
        else if(arg1 == "claimer"){
            var creep = Game.spawns["OverRustle"].createCreep([CLAIM, MOVE,]);
        }
        else if(arg1 == "repairer"){
            var creep = Game.spawns["OverRustle"].createCreep([WORK,CARRY,MOVE,MOVE],null,{role:"repairer",working:true});
        }
    }
}
