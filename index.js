// class to encapsulate a tutorial
class tutorial{
    constructor(title, room, time, day) {
        this.title = title;
        this.room = room;
        this.time = time;
        this.day = day;
        this.wins = 0;
        this.loses = 0;
        this.stars = 0;
    }
}


const addButton = document.querySelector('#add');
const resetButton = document.querySelector("#reset");
const startRankingButton = document.querySelector("#start_contest");
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var storedTutorials = Object.keys(sessionStorage);
for (let i = 0; i < storedTutorials.length; i++) {
    addtoTable(JSON.parse(sessionStorage.getItem(storedTutorials[i])));
}


addButton.onclick = () => {
    const name = document.querySelector('#name');
    const room = document.querySelector('#room');
    const time = document.querySelector('#time');
    const date = document.querySelector('#date');
    const asDate = new Date(date.value);

    var newTutorial = new tutorial(name.value, room.value, time.value, weekday[asDate.getDay()]);

    if (newTutorial.name === "" || newTutorial.room === "" || newTutorial.time === "" || newTutorial.day === "") {
        alert("Please fill out all inputs");
        return;
    }

    if (sessionStorage.getItem(JSON.stringify(newTutorial)) != null) {
        alert("Tutorial already added");
        return;
    }
    var tutorialDiv = createTutorialDiv(newTutorial);
    sessionStorage.setItem(JSON.stringify(newTutorial), JSON.stringify(newTutorial));
    document.getElementsByClassName("tutorialTable")[0].appendChild(tutorialDiv);
    name.value = "";    
    room.value = "";
    time.value = "";
    date.value = "";
}

reset.onclick = () => {
    sessionStorage.clear();
    location.reload(true);
}


startRankingButton.onclick = () => {
    if (Object.keys(sessionStorage).length <= 2) {
        alert("Please enter at least 3 tutorials.");
        return;
    }
    document.location='swiss.html';
}

function createTutorialDiv(tutorial) {
    var tutorialDiv = document.createElement("div");
    tutorialDiv.setAttribute("class","tutorial");

    var tempElement = document.createElement("h1");
    tempElement.setAttribute("class", "title");
    tempElement.appendChild(document.createTextNode(tutorial.title));
    tutorialDiv.appendChild(tempElement);

    tempElement = document.createElement("p");
    tempElement.setAttribute("class", "stars inner");
    if (tutorial.stars != 0) {
        tempElement.append(document.createTextNode(tutorial.stars));

    }
    tutorialDiv.appendChild(tempElement);


    tempElement = document.createElement("p");
    tempElement.setAttribute("class", "day inner");
    tempElement.appendChild(document.createTextNode(tutorial.day + " " + tutorial.time));
    tutorialDiv.appendChild(tempElement);


    tempElement = document.createElement("p");
    tempElement.setAttribute("class", "room inner");
    tempElement.appendChild(document.createTextNode(tutorial.room));
    tutorialDiv.appendChild(tempElement);

    return tutorialDiv;
}

function addtoTable(tutDiv) {
    document.getElementsByClassName("tutorialTable")[0].appendChild(createTutorialDiv(tutDiv));
}
