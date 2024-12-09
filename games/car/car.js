var clicker = document.getElementById("clicker");
var buyMech = document.getElementById("buy-mechanic");
var buyRace = document.getElementById("buy-racer");
var buyscap = document.getElementById("buy-scapper");
var part = document.getElementById("parts");
var mechanic = document.getElementById("mechanics");
var racer = document.getElementById("racers");
var scap = document.getElementById("scapper");
var multi = document.getElementById("multiplier");
var ppsec = document.getElementById("ppsec");
var music = new Audio('assets/background-car-clicker.mp3');
var partOne = new Audio('assets/part1.mp3');
var partTwo = new Audio('assets/part2.mp3');
var partThree = new Audio('assets/part3.mp3');
var carmeetOne = new Audio('assets/carmeet1.mp3');
var carmeetTwo = new Audio('assets/carmeet2.mp3');
var carmeetThree = new Audio('assets/carmeet3.mp3');
var carmeetFour = new Audio('assets/carmeet4.mp3');
var carmeetEnd = new Audio('assets/carmeetend.mp3');
var racerOne = new Audio('assets/racer1.mp3');
var racerTwo = new Audio('assets/racer2.mp3');
var racerThree = new Audio('assets/racer3.mp3');
var partOne = new Audio('assets/part1.mp3');
var partTwo = new Audio('assets/part2.mp3');
var partThree = new Audio('assets/part3.mp3');
var hey = new Audio('assets/hey.mp3');

multiplier = 1;
point = 100;
partNum = 0;
mechNum = 0;
raceNum = 0;
scapNum = 0;
ppsecNum = 0;
music.volume = .1;
partOne.volume = 1;
partTwo.volume = 1;
partThree.volume = 1;
carmeetOne.volume = 1;
carmeetTwo.volume = 1;
carmeetThree.volume = 1;
carmeetFour.volume = 1;
carmeetEnd.volume = 1;
racerOne.volume = 1;
racerTwo.volume = 1;
racerThree.volume = 1;
partOne.volume = 1;
partTwo.volume = 1;
partThree.volume = 1;
hey.volume = 1;

eventisOn = false;
scappers = false;
music.loop = true;

function startMusic() {
    music.play();

    document.removeEventListener('click', startMusic);
}

document.addEventListener('click', startMusic);

document.getElementById("clicker").addEventListener("click", addPoint);

function addPoint() {
    if (!eventisOn) {
        let sound = Math.floor(Math.random() * 3);
        if (sound === 0) {
            partOne.currentTime = 0.1;
            partOne.play();
        } else if (sound === 1) {
            partTwo.currentTime = 0.1;
            partTwo.play();
        } else {
            partThree.currentTime = 0.1;
            partThree.play();
        }
        partNum += point * multiplier;
        part.innerHTML = Math.round(partNum) + " parts";
    }
    else {
        let sound = Math.floor(Math.random() * 4);
        if (sound === 0) {
            carmeetOne.currentTime = 0.1;
            carmeetOne.play();
        } else if (sound === 1) {
            carmeetTwo.currentTime = 0.1;
            carmeetTwo.play();
        } else if (sound === 2) {
            carmeetThree.currentTime = 0.1;
            carmeetThree.play();
        } else {
            carmeetFour.currentTime = 0.1;
            carmeetFour.play();
        }
        partNum += point * multiplier * 2;
        part.innerHTML = Math.round(partNum) + " parts";
    }
}

buyMech.addEventListener("click", buyM)

function buyM() {
    if (partNum < 25) { }
    else {
        let sound = Math.floor(Math.random() * 3);
        if (sound === 0) {
            partOne.currentTime = 0.1;
            partOne.play();
        } else if (sound === 1) {
            partTwo.currentTime = 0.1;
            partTwo.play();
        } else {
            partThree.currentTime = 0.1;
            partThree.play();
        }
        partNum -= 25;
        mechNum += 1;
        multiplier += .2;
        multiplier = Math.round(multiplier * 10) / 10;
        mechanic.innerHTML = mechNum + " mechanics";
        part.innerHTML = Math.round(partNum) + " parts";
    }
}

buyRace.addEventListener("click", buyR)

function buyR() {
    if (partNum < 100) { }
    else {
        let sound = Math.floor(Math.random() * 3);
        if (sound === 0) {
            racerOne.currentTime = 0.1;
            racerOne.play();
        } else if (sound === 1) {
            racerTwo.currentTime = 0.1;
            racerTwo.play();
        } else {
            racerThree.currentTime = 0.1;
            racerThree.play();
        }
        partNum -= 100;
        raceNum += 1;
        multiplier += 1.5;
        multiplier = Math.round(multiplier * 10) / 10;
        racer.innerHTML = raceNum + " racers";
        part.innerHTML = Math.round(partNum) + " parts";
    }
}

buyscap.addEventListener("click", buyS)

function buyS() {
    if (partNum < 10) { }
    else {
        hey.currentTime = 1;
        hey.play();
        scappers = true;
        scapNum += 1;
        partNum -= 10;
        ppsecNum += .5;
        scap.innerHTML = scapNum + " scappers";
    }
}

function addppsec() {
    if (eventisOn){
        partNum += ppsecNum * 2;
        part.innerHTML = Math.round(partNum) + " parts";
    }
    else {
        partNum += ppsecNum;
        part.innerHTML = Math.round(partNum) + " parts";
    }
}

function updateStats() {
    if (eventisOn){
        ppsec.innerHTML = ppsecNum * 2 + " parts per second";
        multi.innerHTML = "Multiplier: " + multiplier * 2;
    }
    else {
        ppsec.innerHTML = ppsecNum + " parts per second";
        multi.innerHTML = "Multiplier: " + multiplier;
    }
}

setInterval(addppsec, 1000);

setInterval(updateStats, 50);

function carEvent() {
    let randomEvent = Math.floor(Math.random() * 60);
    console.log(randomEvent);

    if (randomEvent === 0 && !eventisOn) {
        eventisOn = true;
        setTimeout(reset, 5000);
        console.log("on");

        function reset() {
            eventisOn = false;
            carmeetEnd.play();
            multi.innerHTML = "Your Multiplier " + multiplier;
        }
    }
}

setInterval(carEvent, 1000);
