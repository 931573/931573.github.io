// Models the ranking system of the tutorials. 
// Based on the swiss system (https://de.wikipedia.org/wiki/Schweizer_System)
// The systems advantage is that the real-highest and real-lowest ranked player get ranked relativly clear, in a short amount of matches.
// As a downside players in the middle can have a ranking to real-rank missmatch.
class swissTournament {
    constructor(){
        // all tutorials
        this.ranking = tutorialObjects;
        // everey tutorial below this cutoff is done competing and in its final position 
        this.lowerCutoff = 0;
        // every tutorial aboce or equal to this cutoff is done competing and in its final position
        this.uppercutoff = this.ranking.length;

        // always points to the first of the 2 tutorials which are currently competing
        this.pointer = 0;
        // every tutorial competes as long as it does not have goal wins or loses
        this.goal = 1;
        this.firstTutorial = document.querySelector('#firstTutorial');
        this.secondTutorial = document.querySelector('#secondTutorial');

        // calculates cutoff for the amount of tutorials
        while(2 ** this.goal < this.ranking.length) {
            this.goal ++;
        }
        this.pointer = this.lowerCutoff;
        this.playMatch();
    }

    // checks if every tutorial is ranked
    isDone()  {
        return this.lowerCutoff == this.uppercutoff;
    }


    // handles pitch or click on the first current contestant
    clickFirst() {
        if (this.pointer == this.uppercutoff-1) {
            // if only the first player was competing and the second one got filled we only consider the outcome for the first player
            this.ranking[this.pointer].wins++;
            this.pointer++;
        } else {
        this.ranking[this.pointer].wins ++;
        this.ranking[this.pointer+1].loses++; 
        this.pointer+= 2;
        }
        this.increment();
    }

    // handles pitch or click on the second current contestant
    clickSecond() {
        if (this.pointer == this.uppercutoff-1) {
            // if only the first player was competing and the second one got filled we only consider the outcome for the first player
            this.ranking[this.pointer].loses++;
            this.pointer++;
        } else {
        this.ranking[this.pointer].loses ++;
        this.ranking[this.pointer+1].wins++; 
        this.pointer += 2;
        }
        this.increment();
    }

    // increments one step of the tournament
    increment() {
        if (this.pointer == this.uppercutoff) {
            // prepares everything for the next round
            this.sortRanking();
            this.calculateCutoffs();
            if (this.isDone()) {
                // breaks if tournament is done
                this.showResult();
                return;
            }
            this.pointer = this.lowerCutoff;

        }
        this.playMatch();
    }

    // changes html to display results
    showResult() {
        this.secondTutorial.remove();
        this.firstTutorial.remove();
        if (gyroscope != null) {
            document.getElementById("gyro").remove;
        } 
        // adds the star ratings to the tutorials
        this.addStars();
        var resultDiv = document.getElementsByClassName("tutorialTable")[0];
        for (let i = 0; i < this.ranking.length; i ++) {
            resultDiv.appendChild(createTutorialDiv(this.ranking[i]));
        }
    }


    // adds the star ratings to the tutorials
    // we destribute them so they fit the KIT tutorial rules:
    // there has to be an average of at least 2.5 stars
    // its not allowed to rank more than 50% of tutorials with the same star amount
    addStars() {
        let upperPointer = this.ranking.length-1;
        let lowerPointer = 0;
        
        // how many tutorials will get rated with the maximum amount of stars
        let maxValue = 3;

        // how many 3 stars will get distributed
        // this needs to be below 50%
        let amounfOfThree = Math.round((upperPointer+1 - maxValue*2) /2);
        //amount of stars for current upper and lower pointer
        let upperStar = 1;
        let lowerStar = 5;

        while (upperPointer > lowerPointer) {
            // iterate from both ends and distriubutes stars
            // according to the remaining tutorials
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
        // if there was an uneven amount of tutorials
        if (upperPointer == lowerPointer) {
            this.ranking[upperPointer].stars = 3;
        }

    }

    // displays the next competition to html
    playMatch() {
        if (this.pointer == this.uppercutoff-1) {
            // if there is a pointer left because of uneven contestens we let it compare to a random opponent
            let randomOpponent = Math.floor((Math.random() * this.ranking.length)-2)
            randomOpponent = Math.max(0,randomOpponent);
            this.secondTutorial.getElementsByClassName("title")[0].innerHTML = this.ranking[randomOpponent].title;
            this.secondTutorial.getElementsByClassName("day")[0].innerHTML = this.ranking[randomOpponent].day + " "+ this.ranking[randomOpponent].time;
            this.secondTutorial.getElementsByClassName("room")[0].innerHTML = this.ranking[randomOpponent].room;
        }
        else {
            this.secondTutorial.getElementsByClassName("title")[0].innerHTML = this.ranking[this.pointer+1].title;
            this.secondTutorial.getElementsByClassName("day")[0].innerHTML = this.ranking[this.pointer+1].day + " " +this.ranking[this.pointer+1].time;
            this.secondTutorial.getElementsByClassName("room")[0].innerHTML = this.ranking[this.pointer+1].room;        
        }
        this.firstTutorial.getElementsByClassName("title")[0].innerHTML = this.ranking[this.pointer].title;
        this.firstTutorial.getElementsByClassName("day")[0].innerHTML = this.ranking[this.pointer].day + " "    + this.ranking[this.pointer].time;
        this.firstTutorial.getElementsByClassName("room")[0].innerHTML = this.ranking[this.pointer].room;
    }

    // sorts tutorials by more wins and loses
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

    // checks if tutorials surpassed the win or loose goal and adjust cutoffs
    calculateCutoffs() {
        let lowerIncrease = 0;
        let upperIncrease = 0;
        for (let i = this.lowerCutoff; i < this.uppercutoff; i++) {

            if (this.ranking[i].wins == this.goal) {
                lowerIncrease++;
            }
            else if (this.ranking[i].loses == this.goal) {
                upperIncrease++;
            }
        }
        this.lowerCutoff += lowerIncrease;
        this.uppercutoff -= upperIncrease;
    }
}

// asks gyro permission for ios
function askPermission(){
    if (DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission();
    }
}
var gyroscope;
try {
    gyroscope = new Gyroscope({ frequency: 60 });
} catch (e) {
}

// timer to wait after one gesture has been done
var timer = 0;
var threshold = 120;
if (gyroscope != null) {

    gyroscope.addEventListener("reading", (e) => {
        timer++;
        if (timer < threshold) {
            return;
        }
        if ( gyroscope.x > 1.0) {
            positiveGyro();
            // resets timer to wait for next gesture
            timer = 0;
        }
        else if (data < -1.0) {
            negativeGyro();
            // resets timer to wait for next gesture
            timer = 0;
        }
    });
    gyroscope.start();
    document.getElementById("gyro").innerHTML = "Gyro choice is active";
} else {
    document.getElementById("gyro").remove();

}

// handles positive gyro data
function positiveGyro() {
    ourSwissTournament.clickFirst();
}
// handles negative gyro data
function negativeGyro() {
    ourSwissTournament.clickSecond();
}


// gets tutoral from storage
var tutorialsJson = Object.keys(sessionStorage);
var tutorialObjects = []
for (let i = 0; i < tutorialsJson.length; i++) {
    tutorialObjects.push(JSON.parse(sessionStorage.getItem(tutorialsJson[i])));
}

var ourSwissTournament = new swissTournament();

// handle tutorial presses
var firstTutorial = document.getElementById('firstTutorial');
var secondTutorial = document.getElementById('secondTutorial');
firstTutorial.onclick = () => {
    ourSwissTournament.clickFirst();
}
secondTutorial.onclick = () => {
    ourSwissTournament.clickSecond();
}

