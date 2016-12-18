var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var creator = require('createCreep');

module.exports.loop = function () {

var harvesters = 0;
var builders = 0;
var upgraders = 0;

    for(var c in Game.creeps){

        var creep = Game.creeps[c];

        switch(creep.memory.role){
            case "harvester": harvesters++; break;
            case "builder": builders++; break;
            case "upgrader": upgraders++; break;
        }


        if(creep.memory.role == "harvester")
            roleHarvester.run(creep);
        else if (creep.memory.role == "builder")
            roleBuilder.run(creep);
        else if (creep.memory.role == "upgrader")
            roleUpgrader.run(creep);
    }

    if(harvesters < 4){
        creator.run("harvester");
    }
    else
        console.log("no harvesters needed");

    if(upgraders < 2){
        creator.run("upgrader");
    }
    else
        console.log("no upgraders needed");

    if(builders < 2){
        creator.run("builder");
    }
    else
        console.log("no builders needed");
};
