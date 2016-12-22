var harvester_bot = require('role.harvester_bot');
var builder_bot = require('role.builder_bot');
var upgrader_bot = require('role.upgrader_bot');
var repair_bot = require('role.repair_bot');
var carry_bot = require('role.carry_bot');
var miner_bot = require('role.miner_bot');
var loot_bot = require('role.loot_bot');
var creepBuilder = require('action.createCreep');
var creepKiller = require('action.killCreep');

module.exports.loop = function () {

    // CLEAN UP CREEPS THAT DIED FROM MEMORY
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    // SET PRIORITY (OF GETTING BUILT) BY CHANGING THE ORDER INSIDE THIS ARRAY
    // FIRST (HIGHEST PRIO.) -> LAST (LOWEST PRIO.)
    // creepsNow and creepsNeeded need to be changed accordingly!!!
    var creepType = ["harvester_bot", "miner_bot", "carry_bot",
                            "upgrader_bot", "builder_bot", "repair_bot", "loot_bot"];
    var creepsNow = [0,0,0,0,0,0,0];
    var creepsNeeded = [3,0,0,0,0,0,1];

    for(var c in Game.creeps){

        var creep = Game.creeps[c];

        if((creep.ticksToLive >= 50) && !creep.spawning){

            var x = creepType.findIndex(getCreepRole);
            creepsNow[x]++;

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
            else if (creep.memory.role == "loot_bot")
                loot_bot.run(creep);
        }
        else{
            creepKiller.run(creep);
        }

    }

    // Build creeps
    for(var x=0; x<creepType.length; x++){
        if(creepsNow[x] < creepsNeeded[x]){
            console.log("Building " + creepType[x] + " right now!");
            creepBuilder.run(creepType[x]);
            break;
        }
    }

    function getCreepRole(element) {
        return element == creep.memory.role;
    }
}
