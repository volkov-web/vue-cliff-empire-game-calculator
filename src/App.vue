<template>
  <div id="app">
    <div class="header">
        <span class="logo header-item">
           Cliff Empire Calculator
        </span>
    </div>
    <div class="step1">
        Step 1. Enter or select your values.
    </div>
    <div class="step1-list-inputs">
        <table class="table step1-table">
            <tr>
                <td class="step1-item">
                    <div class="step1-group">
                        <input id="count_people" class="step1-input input" type="text" value="2000">
                        <span class="step1-description">How many people on cliff do you want?</span>
                    </div>
                </td>
            </tr>
            <tr><td><div class="break"></div></td></tr>
            <tr>
                <td class="step1-item">
                    <div class="step1-group">
                        <input id="count_soil" class="step1-input input" type="text" value="85">
                        <span class="step1-description">Soil fertility</span>
                    </div>
                </td>
            </tr>
            <tr><td><div class="break"></div></td></tr>
            <tr>
                <td class="step1-item">
                    <div class="step1-group">
                        <input id="count_groundwater" class="step1-input input" type="text" value="70">
                        <span class="step1-description">Groundwater</span>
                    </div>
                </td>
            </tr>
            <tr><td><div class="break"></div></td></tr>
            <tr>
                <td class="step1-item">
                    <div class="step1-group">
                        <input id="count_sunshine" class="step1-input input" type="text" value="90">
                        <span class="step1-description">Sunshine</span>
                    </div>
                </td>
            </tr>
            <tr><td><div class="break"></div></td></tr>
            <tr>
                <td class="step1-item">
                    <div class="step1-group">
                        <input id="count_windiness" class="step1-input input" type="text" value="60">
                        <span class="step1-description">Windiness</span>
                    </div>
                </td>
            </tr>
            <tr><td><div class="break"></div></td></tr>
            <tr>
                <td class="step1-item">
                    <div class="step1-group">
                        <input id="count_manpower" class="step1-input input" type="text" value="95">
                        <span class="step1-description">Manpower</span>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div class="step2">
        Step 2. Select building to produce resource.
    </div>
    <div class="step2-wrapper-selectors">
        <CustomSelector selectorID="selecter_energy" headerText="Choose energy production" :objItemSelector=" objSelecterEneregy "></CustomSelector>
        <CustomSelector selectorID="selecter_food" headerText="Choose food production" :objItemSelector=" objSelecterFood "></CustomSelector>
    </div>

    <div class="step3">
        Step 3. After everything is selected press Calculate.
    </div>
    <button type="button" id="calculate_button" class="step3-button">Calculate</button>

    <div id="output" class="output">
        <div class="output-column">
            <div class="output-header"> Required buildings </div>
            <div id="output-buildings" class="output-list"></div>
        </div>
        <div class="output-column">
            <div class="output-header"> Excess production </div>
            <div id="output-excess" class="output-list"></div>
        </div>
    </div>

    <div class="gap"></div>
  </div>
</template>

<script>
import CustomSelector from "./components/CustomSelector.vue"

export default {
    name: "App",
    components: {
        CustomSelector
    },
    data(){
        return {
            objSelecterEneregy: [
                { id: 'selecter_solar_panel', imgName: 'solar_panel.jpg', imgDescription: 'Solar Panel'},
                { id: 'selecter_wind_turbine', imgName: 'wind_turbine.jpg', imgDescription: 'Wind Turbine'},
                { id: 'selecter_nuclear_power', imgName: 'nuclear_power.jpg', imgDescription: 'Nuclear Power'},
            ],
            objSelecterFood: [
                { id: 'selecter_open_farm', imgName: 'open_farm.jpg', imgDescription: 'Open farm'},
                { id: 'selecter_indoor_farm', imgName: 'indoor_farm.jpg', imgDescription: 'Indoor farm'},
            ],
        }
    }
}

function everythingNumbersCorrect(numbers){
    for(let i = 0; i < numbers.length; i++){
        if(!isFinite(numbers[i])){
            return false;
        }
    }
    return true;
}

function cloneObj(obj){
    return JSON.parse(JSON.stringify(obj));
}

function mainCalculate(){
    var lib = require("./calculatorProductionNeeds.js");
    var productionInputData = require("./production-input-object.js");
    var production = cloneObj(productionInputData.production);
    let count_people = Number(document.querySelector("#count_people").value);
    let count_soil = Number(document.querySelector("#count_soil").value) * 0.01;
    let count_groundwater = Number(document.querySelector("#count_groundwater").value) * 0.01;
    let count_sunshine = Number(document.querySelector("#count_sunshine").value) * 0.01;
    let count_windiness = Number(document.querySelector("#count_windiness").value) * 0.01;
    let count_manpower = Number(document.querySelector("#count_manpower").value) * 0.01;

    let stage1_numbers = [];
    stage1_numbers.push(count_people);
    stage1_numbers.push(count_soil);
    stage1_numbers.push(count_groundwater);
    stage1_numbers.push(count_sunshine);
    stage1_numbers.push(count_windiness);
    stage1_numbers.push(count_manpower);

    let selected_energy = document.querySelector("#selecter_energy").querySelector(".active").id;
    let selected_food = document.querySelector("#selecter_food").querySelector(".active").id;
    
    let error = false;

    if(everythingNumbersCorrect(stage1_numbers)) {
        production.food1.produce.food *= count_soil * count_manpower;
        production.apple.produce.apple *= count_soil * count_manpower;
        production.water.produce.water *= count_groundwater * count_manpower;

        if(selected_energy == "selecter_solar_panel") {
            production.energy = production.energy1;
            production.energy.produce.energy *= count_sunshine * count_manpower;
        }
        if(selected_energy == "selecter_wind_turbine") {
            production.energy = production.energy2;
            production.energy.produce.energy *= count_windiness * count_manpower;
        }
        if(selected_energy == "selecter_nuclear_power") {
            production.energy = production.energy3;
            production.energy.produce.energy *= count_manpower;
        }
        if(selected_food == "selecter_open_farm") {
            production.food = production.food1;
        }
        if(selected_food == "selecter_indoor_farm") {
            production.food = production.food2;
        }
        
    } else {
        error = true;
    }

    if(error) {
        console.log("invalid input");
    } else {

        let result = lib.calcProductionNeeds(production, 0, 0, {worker: count_people}, 100);
        console.log(result);
        document.querySelectorAll("#output-buildings > *").forEach((item) => item.remove());
        document.querySelectorAll("#output-excess > *").forEach((item) => item.remove());
        if(result.error) return;

        //required buildings output

        var { factoryNames } = require("./factoryNames.js");
        let requiredBuildings = [];
        for(let item in result.factoryCount) {
            if(factoryNames[item]) {
                requiredBuildings.push("" + result.factoryCount[item] + " x " + factoryNames[item]);
            }
         }
        requiredBuildings.forEach((item) => {
            let outputBuildings = document.querySelector("#output-buildings");
            let elem = document.createElement("div");
            elem.innerText = item;
            outputBuildings.append(elem);

        });
        console.log(requiredBuildings);

        //excess items output

        var { itemNames } = require("./itemNames.js");
        let excessProduction = [];
        for(let item in result.produced) {
            if(itemNames[item] && (result.produced[item] != undefined)) {
                excessProduction.push("" + result.produced[item].toFixed(2) + " x " + itemNames[item]);
            }
         }
        excessProduction.forEach((item) => {
            let outputExcess = document.querySelector("#output-excess");
            let elem = document.createElement("div");
            elem.innerText = item;
            outputExcess.append(elem);

        });

        console.log(excessProduction);


        //console.log(lib.calcProductionNeeds(production, 0, 0, {worker: 4020}, 10));
    }
}

let was = 0;
document.onreadystatechange = () => {
    if (document.readyState == "complete" && was == 0) {
        was = 1;

        let calculate_button = document.querySelector("#calculate_button");
        calculate_button.addEventListener("click", mainCalculate);
    
        mainCalculate();
    }
}



</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #232323;
}

.input {
    background: #c7c7c7;
    font-size: 130%;
}

.step1-input {
    text-align: right;
}

.header {
    padding-top: 50px;
}

.logo {
    color: white;
    font-size: 415%;
    user-select: none;
}

.logo > .link {
    user-select: none;
}

.header-item {
    color: white;
    min-width: 100px;
}

.link {
    white-space: nowrap;
    font-size: 20px;
    color: white;
    text-decoration: none;
}

.link:hover {
    color: white;
    text-decoration: none;
    opacity: 0.7;
}

.step1 {
    color: white;
    margin-top: 30px;
    font-size: 35px;
}

.step1-description {
    color: white;
    margin-left: 20px;
    font-size: 20px;
}

.step1-item {
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 30px;
}

.break {
    padding: 0 !important;
    height: 1px !important;
    background: #85888b !important;
    margin-left: 15px;
    margin-right: 15px;
}

.table {
    width: 100%;
    border-radius: 0.25em;
    overflow: hidden;
    background:#40454a;
}

.step1-table {
    margin-top: 30px;
}

.step1-list-inputs {
    margin-left: 20px;
    margin-right: 20px;
}

.step2 {
    color: white;
    margin-top: 50px;
    font-size: 35px;
}

.step2-select {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.step2-wrapper-selectors {
    margin-top: 50px;
    background: #171a1d;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 0.25em;
}

.step2-header {
    color: white;
    padding-top: 30px;
    font-size: 200%;
}

.step2-wrapper {
    margin-top: 30px;
    background: #1b2026;
    width: 300px;
    border: 1px solid #52565a;
    border-radius: 0.5em;
    overflow: hidden;
    color: rgb(167, 165, 165);
    opacity: 0.7;
}

.step2-wrapper:hover {
    opacity: 0.85 !important;
    cursor: pointer;
}

.step2-img-description {
    margin-top: 5px;
    font-size: 25px;
    margin-bottom: 5px;
}

.step2-img-wrapper {
    height: 210px;
    width: 210px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.step2-wrapper.active {
    color: white;
    border: 2px solid #7d8083;
    opacity: 1;
}

.step2-wrapper {
    margin-bottom: 30px;
}

.step3 {
    color: white;
    margin-top: 80px;
    font-size: 35px;
}

.step3-button {
    border: 2px solid  #414141;
    border-radius: 0.25em;
    background:  #b6d4da;
    font-size: 200%;
    margin-top: 60px;
    width: 400px;
    height: 100px;
    box-shadow: 3px 2px 10px 1px black;
}

.step3-button:hover {
    background:  #a6c0c5;
    box-shadow: 3px 2px 20px 3px black;
}

.step3-button:focus {
    outline: 0px;
}

.output {
    margin-top: 70px;
    margin-left: 30px;
    margin-right: 30px;
    border-radius: 0.25em;
    overflow: hidden;
    background-color: #40454a;
    display: flex;
    justify-content: space-around;
}

 .output-header {
    margin-top: 5px;
    color: white;
    font-size: 150%;
 }

 .output-column {
    flex-grow: 1;
 }

 .output-column:first-child {
    border-right: 2px solid rgb(167, 167, 167);
 }
 
 .output-list {
    color: white;
    margin-left: 30px;
    margin-right: 30px;
    text-align: left;
 }

  .output-list > * {
    color: white;
    font-size: 115%;
    margin-top: 10px;
    margin-bottom: 10px;
 }

.gap {
    height: 200px;
}

</style>
