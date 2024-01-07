class tutorial{
    constructor(title, room, time) {
        this.title = title;
        this.room = room;
        this.time = time;
        this.wins = 0;
        this.loses = 0;
    }
}


const btn = document.querySelector('button');
const startContest = document.querySelector("#start_contest");
const tutorials = [];

btn.onclick = () => {
    const name = document.querySelector('#name');
    const room = document.querySelector('#room');
    const time = document.querySelector('#appt');
    let newTutorial = new tutorial(name.value, room.value, time.value);
    tutorials.push(newTutorial); 
    for (let step = 0; step < tutorials.length; step++) {
        console.log(tutorials[step].time);
    }
    sessionStorage.setItem("id" + tutorials.length, JSON.stringify(newTutorial));
    name.value = "";    
    room.value = "";
    time.value = "";
      
    console.log(JSON.parse(sessionStorage.getItem("id1")));
    alert("your clicked me ");
}

startContest.onclick = () => {
    document.location='contest.html';
    alert("hihi");
}