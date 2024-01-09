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

// loads stored tutorials
var storedTutorials = Object.keys(sessionStorage);
for (let i = 0; i < storedTutorials.length; i++) {
    addtoTable(JSON.parse(sessionStorage.getItem(storedTutorials[i])));
}

// converts data to tutorial and adds it in storage
addButton.onclick = () => {
    const name = document.querySelector('#name');
    const room = document.querySelector('#room');
    const time = document.querySelector('#time');
    const date = document.querySelector('#date');
    const asDate = new Date(date.value);

    var newTutorial = new tutorial(name.value, room.value, time.value, weekday[asDate.getDay()]);

    // everything has to be filled out 
    if (newTutorial.name === "" || newTutorial.room === "" || newTutorial.time === "" || newTutorial.day === "") {
        alert("Please fill out all inputs");
        return;
    }

    // this tutorial was already added
    if (sessionStorage.getItem(JSON.stringify(newTutorial)) != null) {
        alert("Tutorial already added");
        return;
    }
    var tutorialDiv = createTutorialDiv(newTutorial);
    sessionStorage.setItem(JSON.stringify(newTutorial), JSON.stringify(newTutorial));
    document.getElementsByClassName("tutorialTable")[0].appendChild(tutorialDiv);
    // reset values
    name.value = "";    
    room.value = "";
    time.value = "";
    date.value = "";
}
// reset storage
reset.onclick = () => {
    sessionStorage.clear();
    location.reload(true);
}

// navigates to new site if at least 3 tutorials have been added
startRankingButton.onclick = () => {
    if (Object.keys(sessionStorage).length <= 2) {
        alert("Please enter at least 3 tutorials.");
        return;
    }
    document.location='swiss.html';
}

// adds tutorial to the sites tutorialTable
function addtoTable(tutDiv) {
    document.getElementsByClassName("tutorialTable")[0].appendChild(createTutorialDiv(tutDiv));
}