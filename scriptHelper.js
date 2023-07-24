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

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (!isNaN(testInput)) {
        return "Is a Number";
    } else {
        return "Not a Number";
    }
};

function formSubmission(document, pilot, copilot, fuelLevel, cargoMass) {
    console.log(pilot, copilot, fuelLevel, cargoMass);
    let validPilot = validateInput(pilot, false);
    let validCopilot = validateInput(copilot, false);
    let validFuelLevel = validateInput(fuelLevel, true);
    let validCargoMass = validateInput(cargoMass, true);
    let alertString = "";
    let validArray = [
        ["Pilot", validPilot, "Empty"],
        ["Copilot", validCopilot, "Empty"],
        ["Fuel Level", validFuelLevel, "Is a Number"],
        ["Cargo Mass", validCargoMass, "Is a Number"]
    ];

    for (let i = 0; i < validArray.length; i++) {
        if (i < 2) {
            if (validArray[i][1] === validArray[i][2]) {
                alertString += `${validArray[i][0]} needs to be filled in!\n`;
            };
        } else {
            if (validArray[i][1] != "Is a Number") {
                alertString += `${validArray[i][0]} needs to be a number.\n`
            };
        };
    };

    if (alertString != "") {
        alert(alertString);
        return;
    };

    let fuelString;
    if (fuelLevel >= 10000) {
        fuelString = "full enough";
    } else {
        fuelString = "too low";
    };
    let cargoString;
    if (cargoMass <= 10000) {
        cargoString = "light enough";
    } else {
        cargoString = "too heavy";
    };

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

    if (submissionArray[3][3] === "too heavy" && submissionArray[2][3] === "too low"){
        launchStatus.style.color = "#C7254E";
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        shuttleRequirements.style.visibility = "visible";
        shuttleRequirements.innerHTML = `
        <ol>
            ${faultyItemsInner}
        </ol>
        `;
        alert("Shuttle not ready for launch. Cargo Mass is too heavy and fuel level is too low.");
    } else if (submissionArray[3][3] === "too heavy") {
        launchStatus.style.color = "#C7254E";
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        shuttleRequirements.style.visibility = "visible";
        shuttleRequirements.innerHTML = `
        <ol>
            ${faultyItemsInner}
        </ol>
        `;
        alert("Shuttle not ready for launch. Cargo Mass is too heavy.");
    } else if (submissionArray[2][3] === "too low") {
        launchStatus.style.color = "red";
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        shuttleRequirements.style.visibility = "visible";
        shuttleRequirements.innerHTML = `
        <ol>
            ${faultyItemsInner}
        </ol>
        `;
        alert("Shuttle not ready for launch. Fuel level is too low.");
    } else {
        launchStatus.style.color = "#419F6A";
        launchStatus.innerHTML = `Shuttle is ready for launch`;
        shuttleRequirements.style.visibility = "hidden";
        alert("Shuttle is ready for launch.");
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