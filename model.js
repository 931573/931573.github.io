
class tutorial{
    constructor(title, room, time, day) {
        this.title = title;
        this.room = room;
        this.time = time;
        this.day = day;
        this.wins = 0;
        this.loses = 0;
    }
}


const btn = document.querySelector('button');
const startContest = document.querySelector("#start_contest");
const tutorials = [];

var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


btn.onclick = () => {
    const name = document.querySelector('#name');
    const room = document.querySelector('#room');
    const time = document.querySelector('#appt');
    const day = document.querySelector('#date');
    var d = new Date(day.value);

    let newTutorial = new tutorial(name.value, room.value, time.value, weekday[d.getDay()]);
    tutorials.push(newTutorial); 
    for (let step = 0; step < tutorials.length; step++) {
        console.log(tutorials[step].time);
    }
    sessionStorage.setItem("id" + tutorials.length, JSON.stringify(newTutorial));
    name.value = "";    
    room.value = "";
    time.value = "";
    day.value = "";
      
    console.log(JSON.parse(sessionStorage.getItem("id1")));
}

startContest.onclick = () => {
    document.location='contest.html';
    alert("hihi");
}