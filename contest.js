
var tutorialsJson = Object.values(sessionStorage);
var tutorialObjects = []
for (let i = 0; i < tutorialsJson.length; i++) {
    tutorialObjects.push(JSON.parse(tutorialsJson[i]));
    console.log(tutorialObjects[i]);
}





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
        return this.lowerCutoff == this.uppercutoff-1;
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
                showResult();
                return;
            }
            this.pointer = this.lowerCutoff;

        }
        this.playGame();
    }



    playGame() {
        if (this.pointer == this.uppercutoff-1) {
            this.secondTutorial.innerHTML = this.ranking[0].name;
        }
        else {
            this.secondTutorial.innerHTML = this.ranking[this.pointer+1].name;
        }
        this.firstTutorial.innerHTML = this.ranking[this.pointer].name;
    }


    sortRanking() {
        this.ranking.sort(function(firstTutorial,secondTutorial) {
            if (firstTutorial.wins > secondTutorial.loses) {
                return 1;
            }
            if (secondTutorial.wins > firstTutorial.wins) {
                return -1;
            }
            if (firstTutorial.loses > secondTutorial.loses) {
                return -1;
            }
            if (secondTutorial.loses > firstTutorial.loses) {
                return 1;
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
            else if (this.ranking[i].loses < this.cutOff) {
                upperIncrease++;
                break;
            }
        }
        this.lowerCutoff += lowerIncrease;
        this.uppercutoff += upperIncrease;
    }
}

var ourSwissTournament = new swissTournament();



var firstTutorial = document.getElementById('firstTutorial');
var secondTutorial = document.getElementById('secondTutorial');
firstTutorial.onclick = () => {
    ourSwissTournament.clickFirst();
}
secondTutorial.onclick = () => {
    ourSwissTournament.clickSecond();
}



console.log(ourSwissTournament);
