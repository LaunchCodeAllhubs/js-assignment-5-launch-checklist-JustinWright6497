// Write your helper functions here!
require("isomorphic-fetch");

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget = document.getElementById("missionTarget");
   missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
                <li>Name: ${name}</li>
                <li>Diameter: ${diameter}</li>
                <li>Star: ${star}</li>
                <li>Distance from Earth: ${distance}</li>
                <li>Number of Moons: ${moons}</li>
            </ol>
            <img src="${imageUrl}">
   `;
};

function validateInput(testInput, isToBeNum) {
    if (testInput === "") {
        return false;
    };
    if (isToBeNum) {
        if (isNaN(testInput)) {
            return 1;
        };
        return true;
    };
    if (testInput) {
        return true;
    };
};

function formSubmission(document, pilot, copilot, fuelLevel, cargoMass) {
    console.log(pilot, copilot, fuelLevel, cargoMass);
    let validPilot = validateInput(pilot, false);
    let validCopilot = validateInput(copilot, false);
    let validFuelLevel = validateInput(fuelLevel, true);
    let validCargoMass = validateInput(cargoMass, true);
    let alertString = "";
    let validArray = [["Pilot", validPilot], ["Copilot", validCopilot], ["Fuel Level", validFuelLevel], ["Cargo Mass", validCargoMass]];

    for (let i = 0; i < validArray.length; i++) {
        if (validArray[i][1] === false) {
            alertString += `${validArray[i][0]} needs to be filled in!\n`;
        };
        if (validArray[i][1] === 1) {
            alertString += `${validArray[i][0]} needs to be a number.\n`
        };
    };

    if (alertString != "") {
        alert(alertString);
    };

    let fuelString;
    if (fuelLevel >= 10000) {
        fuelString = "full enough";
    } else {
        fuelString = "too low";
    };
    fuelLevel += " L";
    let cargoString;
    if (cargoMass <= 10000) {
        cargoString = "light enough";
    } else {
        cargoString = "too heavy";
    };
    cargoMass += " kg";

    let submissionArray = [
        ["pilotStatus" , "Pilot", pilot, `is ready`],
        ["copilotStatus", "Copilot", copilot, `is ready`],
        ["fuelStatus", "Fuel Level of ", fuelLevel, fuelString],
        ["cargoStatus", "Cargo Mass of ", cargoMass, cargoString]
    ];

    let shuttleRequirements = document.getElementById("faultyItems");
    let launchStatus = document.getElementById("launchStatus");
    let faultyItemsInner = ``;

    for (let i = 0; i < submissionArray.length; i++) {
        faultyItemsInner += `<li id="${submissionArray[i][0]}" data-testid="${submissionArray[i][0]}">${submissionArray[i][1]} ${submissionArray[i][2]} ${submissionArray[i][3]} for launch</li>`;
    };

    if (submissionArray[3][3] === "too heavy"){
        launchStatus.style.color = "#C7254E";
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        shuttleRequirements.style.visibility = "visible";
        shuttleRequirements.innerHTML = `
        <ol>
            ${faultyItemsInner}
        </ol>
        `;
    } else if (submissionArray[2][3] === "too low") {
        launchStatus.style.color = "red";
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        shuttleRequirements.style.visibility = "visible";
        shuttleRequirements.innerHTML = `
        <ol>
            ${faultyItemsInner}
        </ol>
        `;
    } else {
        launchStatus.style.color = "#419F6A";
        launchStatus.innerHTML = `Shuttle is ready for launch`;
    };
};

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
            return response.json();
        });

    return planetsReturned;
};

function pickPlanet(planets) {
    let index = Math.floor((Math.random() * planets.length * 10) / 10)
    return planets[index];
};

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;