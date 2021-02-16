"use strict"

exports.calcProductionNeeds = function(factories, startNeed, startProduced, startFactories, maxTime){

let need = {};
let produced = {};
let factoryCount = {};
let error = undefined;

function addFactoryWorkToList(key) {
	let factory = factories[key];
    for(let key in factory["produce"]) {
        if(produced[key] != undefined) {
            produced[key] += factory["produce"][key];
        } else {
            produced[key] = factory["produce"][key];
        }
    }
    for(let key in factory["consume"]) {
        if(need[key] != undefined) {
            need[key] += factory["consume"][key];
        } else {
            need[key] = factory["consume"][key];
        }
    }
	addFactoryToCount(key);
}

function addFactoryToCount(key) {
	if(factoryCount[key] == undefined){ 
		factoryCount[key] = 1;
		return;
	}
	factoryCount[key] += 1;
}

function minusSame() {
	for(let key in produced){
        if((produced[key] != undefined) && ((need[key] != undefined))){
            let needToMinus = Math.min(produced[key], need[key]);
            produced[key] -= needToMinus;
            need[key] -= needToMinus;
        }
	}
}

function deleteZero(){
	for(let key in produced){
		if(produced[key] == 0) produced[key] = undefined;
	}
	for(let key in need){
		if(need[key] == 0) need[key] = undefined;
	}
}

function calculateNextNeed(){
	for(let key in need) {
		if(need[key] != undefined) {
			addFactoryWorkToList(key);
			minusSame();
			deleteZero();
			break;
		}
	}
}

function calculateAllNeed(){
    let countNeed = 1;
    let time = Date.now();
	while(countNeed > 0) {
		countNeed = 0;
		for(let key in need){
			if(need[key] != undefined) {
				countNeed++;
			}
		}
		if(countNeed > 0) {
			calculateNextNeed();
        }
        if((Date.now() - time) > maxTime) {
            return {error: "time out"};
        }
    }
    return {};
}

if(startNeed){
    for(let key in startNeed) {
        if(need[key] != undefined) {
            need[key] += startNeed[key];
        } else {
            need[key] = startNeed[key];
        }
    }
}

if(startProduced){
    for(let key in startProduced) {
        if(produced[key] != undefined) {
            produced[key] += startProduced[key];
        } else {
            produced[key] = startProduced[key];
        }
    }
}

if(startFactories){
    for(let key in startFactories) {
        for(let i = 0; i < startFactories[key]; i++) {
            addFactoryWorkToList(key);
        }
    }
}

if(!maxTime){
    maxTime = 10000;
}

minusSame();
deleteZero();

error = calculateAllNeed().error;

return {
    need,
    produced,
    factoryCount,
    error,
};
};