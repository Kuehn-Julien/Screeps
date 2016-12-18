var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleRepairer = require('role.repairer');
var creator = require('createCreep');

module.exports.loop = function () {

    // CLEAN UP CREEPS THAT DIED
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    var wantedHarvester = 4;
    var wantedBuilders = 1;
    var wantedUpgraders = 1;
    var wantedRepairers = 0;

    var harvesters = 0;
    var builders = 0;
    var upgraders = 0;
    var repairers = 0;

    for(var c in Game.creeps){

        var creep = Game.creeps[c];

        // Uncomment if you want to stop consuming energy //
        //if(creep.memory.role != "harvester")
        //    creep.memory.working = false;
        // ******************************************** //

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

    if(harvesters < wantedHarvester){
        console.log("Creating Harvesters right now!");

        for(var c in Game.creeps){
            var creep = Game.creeps[c];
            if(creep.memory.role != "harvester")
                creep.memory.working = false;
        }
        creator.run("harvester");
    }
    else if(upgraders < wantedUpgraders){
        console.log("Creating Upgraders right now!");
        creator.run("upgrader");
    }
    else if(builders < wantedBuilders){
        console.log("Creating Builders right now!");
        creator.run("builder");
    }
    else if(repairers < wantedRepairers){
        console.log("Creating Repairers right now!");
        creator.run("repairer");
    }

    if(harvesters >= wantedHarvester){
        for(var c in Game.creeps){
            var creep = Game.creeps[c];
            if(creep.memory.role != "harvester")
                creep.memory.working = true;
        }
    }

    console.log("Harvesters alive: " + harvesters);
    console.log("Upgraders alive: " + upgraders);
    console.log("Builders alive: " + builders);
    console.log("Repairers alive: " + repairers);
};
