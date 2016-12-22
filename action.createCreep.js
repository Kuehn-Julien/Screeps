module.exports = {

    run: function(creepType){

        switch(creepType){
            case "harvester_bot":
                var creep = Game.spawns["OverRustle"].createCreep([WORK,CARRY,MOVE,MOVE],null,{role:"harvester_bot"});
                break;
            case "miner_bot":
                var creep = Game.spawns["OverRustle"].createCreep([WORK,WORK,WORK,WORK,MOVE],null,{role:"miner_bot",working:true});
                break;
            case "upgrader_bot":
                var creep = Game.spawns["OverRustle"].createCreep([WORK,CARRY,MOVE],null,{role:"upgrader_bot",working:true,interrupt:false});
                break;
            case "builder_bot":
                var creep = Game.spawns["OverRustle"].createCreep([WORK,CARRY,MOVE],null,{role:"builder_bot",working:true,interrupt:false});
                break;
            case "repair_bot":
                var creep = Game.spawns["OverRustle"].createCreep([WORK,CARRY,MOVE,MOVE],null,{role:"repair_bot",working:true,interrupt:false});
                break;
            case "carry_bot":
                var creep = Game.spawns["OverRustle"].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],null,{role:"carry_bot",working:true});
                break;
        }

    }

}
