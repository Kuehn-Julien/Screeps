var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleRepairer = require('role.repairer');
var creator = require('createCreep');
var distructor = require('killCreep');

module.exports.loop = function () {

    var wantedHarvester = 4;
    var wantedBuilders = 2;
    var wantedUpgraders = 2;
    var wantedRepairers = 2;

    var harvesters = 0;
    var builders = 0;
    var upgraders = 0;
    var repairers = 0;

    // CLEAN UP CREEPS THAT DIED
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    for(var c in Game.creeps){

        var creep = Game.creeps[c];

        // Uncomment if you want to stop consuming energy //
        //if(creep.memory.role != "harvester")
        //    creep.memory.working = false;
        // ******************************************** //

        if((creep.ticksToLive >= 80) && !creep.spawning){
            switch(creep.memory.role){
                case "harvester": harvesters++; break;
                case "builder": builders++; break;
                case "upgrader": upgraders++; break;
                case "repairer": repairers++; break;
            }

            if(creep.memory.role == "harvester")
                roleHarvester.run(creep);
            else if (creep.memory.role == "builder")
                roleBuilder.run(creep);
            else if (creep.memory.role == "upgrader")
                roleUpgrader.run(creep);
            else if (creep.memory.role == "repairer")
                roleRepairer.run(creep);
        }
        else{
            distructor.run(creep);
        }

    }

    if(harvesters < wantedHarvester){
        console.log("Creating Harvesters right now!");
        console.log("Currently there are " + harvesters + " Harvesters alive!");

        for(var c in Game.creeps){
            var creep = Game.creeps[c];
            if(creep.memory.role != "harvester")
                creep.memory.working = false;
        }
        creator.run("harvester");
    }
    else if(upgraders < wantedUpgraders){
        console.log("Creating Upgraders right now!");
        console.log("Currently there are " + upgraders + " Upgraders alive!");
        creator.run("upgrader");
    }
    else if(builders < wantedBuilders){
        console.log("Creating Builders right now!");
        console.log("Currently there are " + builders + " Builders alive!");
        creator.run("builder");
    }
    else if(repairers < wantedRepairers){
        console.log("Creating Repairers right now!");
        console.log("Currently there are " + repairers + " Repairers alive!");
        creator.run("repairer");
    }

    if(harvesters >= wantedHarvester){
        for(var c in Game.creeps){
            var creep = Game.creeps[c];
            if(creep.memory.role != "harvester")
                creep.memory.working = true;
        }
    }
};
