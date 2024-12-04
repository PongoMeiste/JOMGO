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
        multi.innerHTML = "Your Multiplier " + multiplier * 2;
    }
}

buyMech.addEventListener("click", buyM)

function buyM() {
    if (partNum < 25) { }
    else {
        partNum -= 25;
        mechNum += 1;
        multiplier += .2;
        multiplier = Math.round(multiplier * 10) / 10;
        mechanic.innerHTML = mechNum + " mechanics";
        part.innerHTML = Math.round(partNum) + " parts";
        multi.innerHTML = "Your Multiplier " + multiplier;
    }
}

buyRace.addEventListener("click", buyR)

function buyR() {
    if (partNum < 100) { }
    else {
        partNum -= 100;
        raceNum += 1;
        multiplier += 1.5;
        multiplier = Math.round(multiplier * 10) / 10;
        racer.innerHTML = raceNum + " racers";
        part.innerHTML = Math.round(partNum) + " parts";
        multi.innerHTML = "Your Multiplier " + multiplier;
    }
}

buyscap.addEventListener("click", buyS)

function buyS() {
    if (partNum < 10) { }
    else {
        scappers = true;
        scapNum += 1;
        partNum -= 10;
        ppsecNum += .5;
        scap.innerHTML = scapNum + " scappers";
        ppsec.innerHTML = ppsecNum + " parts of second";
    }
}

function addppsec() {
    partNum += ppsecNum;
    part.innerHTML = Math.round(partNum) + " parts";
}

setInterval(addppsec, 1000);

function carEvent() {
    let randomEvent = Math.floor(Math.random() * 20);
    console.log(randomEvent);

    if (randomEvent === 0 && !eventisOn) {
        eventisOn = true;
        setTimeout(reset, 5000);
        console.log("on");

        function reset() {
            eventisOn = false;
            multi.innerHTML = "Your Multiplier " + multiplier;
        }
    }
}

setInterval(carEvent, 1000);
