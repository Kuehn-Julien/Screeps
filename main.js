var harvester_bot = require('role.harvester_bot');
var builder_bot = require('role.builder_bot');
var upgrader_bot = require('role.upgrader_bot');
var repair_bot = require('role.repair_bot');
var carry_bot = require('role.carry_bot');
var miner_bot = require('role.miner_bot');
var creepBuilder = require('action.createCreep');
var creepKiller = require('action.killCreep');

module.exports.loop = function () {

    var wanted_harvester_bots = 0;
    var wanted_miner_bots = 3;
    var wanted_builder_bots = 4;
    var wanted_upgrader_bots = 2;
    var wanted_repair_bots = 2;
    var wanted_carry_bots = 3;

    var harvester_bots = 0;
    var miner_bots = 0;
    var builder_bots = 0;
    var upgrader_bots = 0;
    var repair_bots = 0;
    var carry_bots = 0;

    // CLEAN UP CREEPS THAT DIED
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    for(var c in Game.creeps){

        var creep = Game.creeps[c];

        if((creep.ticksToLive >= 65) && !creep.spawning){
            switch(creep.memory.role){
                case "harvester_bot": harvester_bots++; break;
                case "miner_bot": miner_bots++; break;
                case "builder_bot": builder_bots++; break;
                case "upgrader_bot": upgrader_bots++; break;
                case "repair_bot": repair_bots++; break;
                case "carry_bot": carry_bots++; break;
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

    if(carry_bots < wanted_carry_bots){
        console.log("Creating carry_bots right now!");
        console.log("Currently there are " + carry_bots + " carry_bots alive!");
        creepBuilder.run("carry_bot");
    }
    else if(miner_bots < wanted_miner_bots){
        console.log("Creating miner_bots right now!");
        console.log("Currently there are " + miner_bots + " miner_bots alive!");
        creepBuilder.run("miner_bot");
    }
    else if(harvester_bots < wanted_harvester_bots){
        console.log("Creating harvester_bot right now!");
        console.log("Currently there are " + harvester_bots + " harvester_bots alive!");
        creepBuilder.run("harvester_bot");
    }
    else if(upgrader_bots < wanted_upgrader_bots){
        console.log("Creating upgrader_bot right now!");
        console.log("Currently there are " + upgrader_bots + " upgrader_bots alive!");
        creepBuilder.run("upgrader_bot");
    }
    else if(repair_bots < wanted_repair_bots){
        console.log("Creating repair_bot right now!");
        console.log("Currently there are " + repair_bots + " repair_bots alive!");
        creepBuilder.run("repair_bot");
    }
    else if(builder_bots < wanted_builder_bots){
        console.log("Creating builder_bot right now!");
        console.log("Currently there are " + builder_bots + " builder_bots alive!");
        creepBuilder.run("builder_bot");
    }

    if((miner_bots >= wanted_miner_bots/2) && (carry_bots >= wanted_carry_bots/2)){
        for(var c in Game.creeps){
            var creep = Game.creeps[c];
            creep.memory.interrupt = false;
        }
    }
}
