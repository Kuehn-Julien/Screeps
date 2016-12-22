var harvester_bot = require('role.harvester_bot');
var builder_bot = require('role.builder_bot');
var upgrader_bot = require('role.upgrader_bot');
var repair_bot = require('role.repair_bot');
var carry_bot = require('role.carry_bot');
var miner_bot = require('role.miner_bot');
var creepBuilder = require('action.createCreep');
var creepKiller = require('action.killCreep');

module.exports.loop = function () {

    // CLEAN UP CREEPS THAT DIED FROM MEMORY
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    // Harvest->Miner->Carry->Upgrader->Builder->Repair
    var creepType = ["harvester_bot", "miner_bot", "carry_bot",
                            "upgrader_bot", "builder_bot", "repair_bot"];
    var creepsNow = [0,0,0,0,0,0];
    var creepsNeeded = [1,0,0,0,0,0];

    for(var c in Game.creeps){

        var creep = Game.creeps[c];

        if((creep.ticksToLive >= 50) && !creep.spawning){
            switch(creep.memory.role){
                case "harvester_bot": creepsNow[0]++; break;
                case "miner_bot": creepsNow[1]++; break;
                case "carry_bot": creepsNow[2]++ break;
                case "upgrader_bot": creepsNow[3]++; break;
                case "builder_bot": creepsNow[4]++; break;
                case "repair_bot": creepsNow[5]++; break;
            }

            if(creep.memory.role == "harvester_bot")
                harvester_bot.run(creep);
            else if (creep.memory.role == "miner_bot")
                miner_bot.run(creep);
            else if (creep.memory.role == "builder_bot")
                builder_bot.run(creep);
            else if (creep.memory.role == "upgrader_bot")
                upgrader_bot.run(creep);
            else if (creep.memory.role == "repair_bot")
                repair_bot.run(creep);
            else if (creep.memory.role == "carry_bot")
                carry_bot.run(creep);
        }
        else{
            creepKiller.run(creep);
        }

    }

    // Build creeps
    for(var x=0; x<creepsNeeded; x++){
        if(creepsNow[x] < creepsNeeded[x]){
            console.log("Building " + creepType[x] " right now!");
            creepBuilder.run(creepType[x]);
            break;
        }
    }

}
