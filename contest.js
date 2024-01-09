class swissTournament {
    constructor(){
        this.ranking = tutorialObjects;
        this.lowerCutoff = 0;
        this.uppercutoff = this.ranking.length; 
        this.pointer = 0;
        this.cutOff = 1;
        this.firstTutorial = document.querySelector('#firstTutorial');
        this.secondTutorial = document.querySelector('#secondTutorial');


        while(2 ** this.cutOff < this.ranking.length) {
            this.cutOff ++;
        }
        this.pointer = this.lowerCutoff;
        this.playGame();
    }

    isDone()  {
        return this.lowerCutoff == this.uppercutoff;
    }



    clickFirst() {
        if (this.pointer == this.uppercutoff-1) {
            this.ranking[this.pointer].wins++;
            this.pointer++;
        } else {
        this.ranking[this.pointer].wins ++;
        this.ranking[this.pointer+1].loses++; 
        this.pointer+= 2;
        }
        this.increment();
    }

    clickSecond() {
        if (this.pointer == this.uppercutoff-1) {
            this.ranking[this.pointer].loses++;
            this.pointer++;
        } else {
        this.ranking[this.pointer].loses ++;
        this.ranking[this.pointer+1].wins++; 
        this.pointer += 2;
        }
        this.increment();
    }


    increment() {

        if (this.pointer == this.uppercutoff) {
            this.sortRanking();
            this.calculateCutoffs();
            if (this.isDone()) {
                this.showResult();
                return;
            }
            this.pointer = this.lowerCutoff;

        }
        this.playGame();
    }

    showResult() {
    this.secondTutorial.remove();
    this.firstTutorial.remove();
    
    this.addStars();
    var resultDiv = document.body;
    for (let i = 0; i < this.ranking.length; i ++) {
        resultDiv.appendChild(writeTutorial(this.ranking[i]));
        }
    }

    addStars() {
        let upperPointer = this.ranking.length-1;
        let lowerPointer = 0;
        let maxValue = 3;
        let amounfOfThree = Math.round((upperPointer+1 - maxValue*2) /2);
        let upperStar = 1;
        let lowerStar = 5;

        while (upperPointer > lowerPointer) {
            if (maxValue > 0) {
                this.ranking[lowerPointer].stars = lowerStar;
                this.ranking[upperPointer].stars = upperStar;
                maxValue--;
                upperPointer--;
                lowerPointer++;
            }
            else if (upperPointer-lowerPointer <= amounfOfThree) {
                upperStar = 3;
                lowerStar = 3;
                this.ranking[lowerPointer].stars = lowerStar;
                this.ranking[upperPointer].stars = upperStar;
                upperPointer--;
                lowerPointer++;
            } else {
                upperStar = 4;
                lowerPointer = 2;
                this.ranking[lowerPointer].stars = lowerStar;
                this.ranking[upperPointer].stars = upperStar;
                upperPointer--;
                lowerPointer++;
            }
        }

        if (upperPointer == lowerPointer) {
            this.ranking[upperPointer].stars = 3;
        }

    }

    playGame() {
        if (this.pointer == this.uppercutoff-1) {
            let randomOpponent = Math.floor((Math.random() * this.ranking.length)-2)
            randomOpponent = Math.max(0,randomOpponent);
            this.secondTutorial.getElementsByClassName("title")[0].innerHTML = this.ranking[randomOpponent].title;
            this.secondTutorial.getElementsByClassName("day")[0].innerHTML = this.ranking[randomOpponent].day + " "+ this.ranking[this.pointer+1].time;
            this.secondTutorial.getElementsByClassName("room")[0].innerHTML = this.ranking[randomOpponent].room;
        }
        else {
            this.secondTutorial.getElementsByClassName("title")[0].innerHTML = this.ranking[this.pointer+1].title;
            this.secondTutorial.getElementsByClassName("day")[0].innerHTML = this.ranking[this.pointer+1].day + " " +this.ranking[this.pointer+1].time;
            this.secondTutorial.getElementsByClassName("room")[0].innerHTML = this.ranking[this.pointer+1].room;        
        }
        this.firstTutorial.getElementsByClassName("title")[0].innerHTML = this.ranking[this.pointer].title;
        this.firstTutorial.getElementsByClassName("day")[0].innerHTML = this.ranking[this.pointer].day + " "    + this.ranking[this.pointer+1].time;
        this.firstTutorial.getElementsByClassName("room")[0].innerHTML = this.ranking[this.pointer+1].room;
    }


    sortRanking() {
        this.ranking.sort(function(firstTutorial,secondTutorial) {
            if (firstTutorial.wins > secondTutorial.loses) {
                return -1;
            }
            if (secondTutorial.wins > firstTutorial.wins) {
                return 1;
            }
            if (firstTutorial.loses > secondTutorial.loses) {
                return 1;
            }
            if (secondTutorial.loses > firstTutorial.loses) {
                return -1;
            }
            return 0;
        })
    }

    calculateCutoffs() {
        let lowerIncrease = 0;
        let upperIncrease = 0;
        for (let i = this.lowerCutoff; i < this.uppercutoff; i++) {

            if (this.ranking[i].wins == this.cutOff) {
                lowerIncrease++;
            }
            else if (this.ranking[i].loses == this.cutOff) {
                upperIncrease++;
            }
        }
        this.lowerCutoff += lowerIncrease;
        this.uppercutoff -= upperIncrease;
    }
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
    tempElement.appendChild(document.createTextNode(tutorial.stars));
    tutorialDiv.appendChild(tempElement);

    tempElement = document.createElement("p");
    tempElement.setAttribute("class", "day inner");
    tempElement.appendChild(document.createTextNode(tutorial.day));
    tutorialDiv.appendChild(tempElement);
    
    tempElement = document.createElement("p");
    tempElement.setAttribute("class", "room inner");
    tempElement.appendChild(document.createTextNode(tutorial.room));
    tutorialDiv.appendChild(tempElement);

    return tutorialDiv;
}


var tutorialsJson = Object.keys(sessionStorage);
var tutorialObjects = []
for (let i = 0; i < tutorialsJson.length; i++) {
    tutorialObjects.push(JSON.parse(sessionStorage.getItem(tutorialsJson[i])));
}

var ourSwissTournament = new swissTournament();

var firstTutorial = document.getElementById('firstTutorial');
var secondTutorial = document.getElementById('secondTutorial');

let gyroscope = new Gyroscope({ frequency: 60 });

gyroscope.addEventListener("reading", (e) => {
    if (gyroscope.x > 1.2) {
        ourSwissTournament.clickFirst();
    }
    else if (gyroscope.x < -1.2) {
        ourSwissTournament.clickSecond();
    }
});
gyroscope.start();


firstTutorial.onclick = () => {
    ourSwissTournament.clickFirst();
}
secondTutorial.onclick = () => {
    ourSwissTournament.clickSecond();
}
