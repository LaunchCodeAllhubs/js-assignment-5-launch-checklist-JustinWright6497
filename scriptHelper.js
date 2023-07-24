// Write your helper functions here!
require('isomorphic-fetch');

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

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    let alertString = "";
    let validArray = [
        ["Pilot", validateInput(pilot), "Empty"],
        ["Copilot", validateInput(copilot), "Empty"],
        ["Fuel Level", validateInput(fuelLevel), "Is a Number"],
        ["Cargo Mass", validateInput(cargoMass), "Is a Number"]
    ];

    for (let i = 0; i < validArray.length; i++) {
        if (i < 2) {
            if (validArray[i][1] === validArray[i][2]) {
                alertString += `${validArray[i][0]} needs to be filled in!\n`;
            };
        } else {
            if (validArray[i][1] != validArray[i][2]) {
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
        fuelString = "high enough";
    } else {
        fuelString = "too low";
    };
    let cargoString;
    if (cargoMass <= 10000) {
        cargoString = "low enough";
    } else {
        cargoString = "too heavy";
    };

    let launchStatus = document.getElementById("launchStatus");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    fuelStatus.innerHTML = `Fuel level ${fuelString} for launch`;
    cargoStatus.innerHTML = `Cargo mass ${cargoString} for launch`;

    if (cargoString === "too heavy" && fuelString === "too low"){
        launchStatus.style.color = "#C7254E";
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        list.style.visibility = "visible";
    } else if (cargoString === "too heavy") {
        launchStatus.style.color = "#C7254E";
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        list.style.visibility = "visible";
    } else if (fuelString === "too low") {
        launchStatus.style.color = "#C7254E";
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        list.style.visibility = "visible";
    } else {
        launchStatus.style.color = "#419F6A";
        launchStatus.innerHTML = `Shuttle is Ready for Launch`;
        list.style.visibility = "visible";
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