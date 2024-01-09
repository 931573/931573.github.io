
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


const btn = document.querySelector('button');
const startContest = document.querySelector("#start_contest");
const tutorials = [];

var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


btn.onclick = () => {
    const name = document.querySelector('#name');
    const room = document.querySelector('#room');
    const time = document.querySelector('#time');
    const day = document.querySelector('#date');
    var d = new Date(day.value);
    
    let newTutorial = new tutorial(name.value, room.value, time.value, weekday[d.getDay()]);
    tutorials.push(newTutorial); 
    var tutDiv = writeTutorial(newTutorial);

    console.log(tutDiv);

    document.getElementsByClassName("tutorialTable")[0].appendChild(tutDiv);
    sessionStorage.setItem("id" + tutorials.length, JSON.stringify(newTutorial));
    name.value = "";    
    room.value = "";
    time.value = "";
    day.value = "";
      
    console.log(JSON.parse(sessionStorage.getItem("id1")));
}

startContest.onclick = () => {
    if (Object.keys(sessionStorage).length <= 2) {
        alter ("Please enter at least 3 tutorials.");
        return;
    }
    document.location='swiss.html';
}

function writeTutorial(tutorial) {
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