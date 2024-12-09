let dirt = 0;
let dirtAmnt = document.getElementById("dirtAmnt");
let dirtMult = 1;
let worker = 0;
let dirtPS = 0;
let shovel = 1;
let factorys = 0;
var music = new Audio('assets/DirtMan.mp3');
let volumeInput = document.getElementById("volumeInput")
let mainVolumeInput = document.getElementById("volumeInput2")

music.loop = true;
setInterval(() => {
    music.volume = volumeInput.value / 100;
    if(music.volume === .01) {
        music.volume = 0;
    }
})

function startMusic() {
    music.play();
}


function addDirt() {
    var myAudio = new Audio('assets/DURT.mp3');
    setInterval(() => {
        myAudio.volume = mainVolumeInput.value / 100;   
    });
    myAudio.play();

    dirt += dirtMult
}

function abbreviateNumber(number, decimalPlaces = 2) {
    if (number === 0) {
        return "0";
    }

    const abbrev = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Und"];

    if (Math.abs(number) < 1000) {
        return number.toFixed(0);
    }

    let tier = Math.floor(Math.log10(Math.abs(number)) / 3);

    if (tier === 0) {
        return number.toFixed(decimalPlaces);
    }

    const suffix = abbrev[tier];
    const scaledNumber = number / Math.pow(10, tier * 3);

    return scaledNumber.toFixed(decimalPlaces) + suffix;
}

setInterval(function () {
    dirtAmnt.innerHTML = abbreviateNumber(dirt);
})

let fortunePrice = 50;
let fortunePriceText = document.getElementById("fortunePrice");
let workerPrice = 100;
let workerPriceText = document.getElementById("workerPrice");
let workerSpeedPrice = 150;
let workerSpeedPriceText = document.getElementById("workerSpeedPrice");
let shovelPrice = 400;
let shovelPriceText = document.getElementById("shovelPrice");
let factoryPrice = 1500;
let factoryPriceText = document.getElementById("factoryPrice");
let factorySpeedPrice = 3000;
let factorySpeedPriceText = document.getElementById("factorySpeedPrice");
let efficiencyPrice = 125;
let efficiencyPriceText = document.getElementById("efficiencyPrice");
var UpgNoise = new Audio('assets/craftingSound.mp3');
setInterval(() => {
    UpgNoise.volume = mainVolumeInput.value / 100;   
});

function buyUpgrade(upg) {
    console.log(upg)
    if(upg === "fortune" && dirt >= fortunePrice) {
        dirtMult += 1;
        dirt -= fortunePrice;
        fortunePrice = Math.round(fortunePrice * 1.5)
        fortunePriceText.innerHTML = abbreviateNumber(fortunePrice);
        var enchNoise = new Audio('assets/EnchantSound.mp3');
        enchNoise.volume = mainVolumeInput.value / 100;
        enchNoise.play();
    }
    else if(upg === "worker" && dirt >= workerPrice) {
        dirtPS += 1;
        worker += 1
        dirt -= workerPrice;
        workerPrice = Math.round(workerPrice * 1.5)
        workerPriceText.innerHTML = abbreviateNumber(workerPrice)
        UpgNoise.play();
    }
    else if(upg === "workerSpeed" && dirt >= workerSpeedPrice) {
        dirt -= workerSpeedPrice;
        dirtPS += 5
        workerSpeedPrice = Math.round(workerSpeedPrice * 1.5);
        workerSpeedPriceText.innerHTML = abbreviateNumber(workerSpeedPrice);
        UpgNoise.play();
    }
    else if(upg === "shovel" && dirt >= shovelPrice) {
        dirtMult += 10;
        dirt -= shovelPrice;
        shovelPrice = Math.round(shovelPrice * 1.5);
        shovelPriceText.innerHTML = abbreviateNumber(shovelPrice);
        shovel++;
        UpgNoise.play();
    }
    else if(upg === "factory" && dirt >= factoryPrice) {
        dirtPS += 50
        factorys++;
        dirt -= factoryPrice
        factoryPrice = Math.round(factoryPrice * 1.5)
        factoryPriceText.innerHTML = abbreviateNumber(factoryPrice)
        UpgNoise.play();
    }
    else if(upg === "factorySpeed" && dirt >= factorySpeedPrice) {
        dirtPS += 55;
        dirt -= factorySpeedPrice;
        factorySpeedPrice = Math.round(factorySpeedPrice * 1.5);
        factorySpeedPriceText.innerHTML = abbreviateNumber(factorySpeedPrice);
        UpgNoise.play();
    }
    else if(upg === "efficiency" && dirt >= efficiencyPrice) {
        dirtMult += 5
        dirt -= efficiencyPrice
        efficiencyPrice = Math.round(efficiencyPrice * 1.5)
        efficiencyPriceText.innerHTML = abbreviateNumber(efficiencyPrice);
        var enchNoise = new Audio('assets/EnchantSound.mp3');
        enchNoise.volume = mainVolumeInput.value / 100;
        enchNoise.play();
    }
}
setInterval(function () {
    if (worker > 0 || factorys > 0) {
        dirt += dirtPS
    }
}, 1000);

let cursorImage = document.getElementById("cursorImg")
document.addEventListener('mousemove', function (event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    switch (shovel) {
        case 2:
            cursorImage.src = 'images/stoneShovel.png';
            break;
        case 3:
            cursorImage.src = 'images/ironShovel.png';
            break;
        case 4:
            cursorImage.src = 'images/goldShovel.png';
            break;
        case 5:
            cursorImage.src = 'images/diamondShovel.png'
            break;
        case 6:
            cursorImage.src = 'images/netheriteShovel.png'
    }
    const imageWidth = cursorImage.width;

    cursorImage.style.left = ((mouseX - imageWidth) + 15) + 'px';
    cursorImage.style.top = mouseY + 'px';
    cursorImage.style.zIndex = 1000;

    cursorImage.style.visibility = 'visible';
});
setInterval(() => {
    const gDirt = new Image();
    gDirt.src = 'images/goldenDirt.png';
    gDirt.style.position = 'absolute';

    gDirt.style.top = Math.random() * document.body.clientHeight + "px";
    gDirt.style.left = Math.random() * document.body.clientWidth + "px";
    gDirt.style.width = 100 + "px"
    const gDirtNoise = new Audio('assets/gDirt.mp3')
    gDirtNoise.volume = Math.random();

    gDirtNoise.play();

    document.body.appendChild(gDirt);

    setTimeout(() => {
        gDirt.remove();
    }, 3000);

    gDirt.addEventListener('click', function () {
        dirt += Math.round(Math.random() * 10000);
        gDirt.remove();
    })
}, 600000);

let soundArray = ["Worker1.mp3", "Worker2.mp3", "Worker3.mp3", "Worker4.mp3"]
setInterval(() => {
    if (worker > 0) {
        let i = Math.floor(Math.random() * soundArray.length);
        var workerNoise = new Audio('assets/' + soundArray[i]);
        workerNoise.volume = mainVolumeInput.value / 100;
        workerNoise.play();
    }
}, 60000);

let nameInput = document.getElementById("nameInput");
let name = document.getElementById("name");
let popup = document.getElementById("changeNamePopup");
let randomNames = [
    "Dizzy hotel",
    "Madly chocolate",
    "Ritzy science",
    "Flagrant guidance",
    "Tame singer",
    "Accidental garbage",
    "Wiggly boyfriend",
    "Likeable success",
    "Adamant ability",
    "Steadfast obligation",
    "Quickest baseball",
    "Placid possession",
    "Calculating story",
    "Detailed bathroom",
    "Capable orange",
    "Entire series",
    "Informal data",
    "Unwritten pony",
    "Noxious week",
    "Several secretary",
    "Bent health",
    "Subsequent depression",
    "Small assignment",
    "Actual oven",
    "Repulsive instruction",
    "Jazzy song",
    "Whispering owner",
    "Nutritious independence",
    "Delightful significance",
    "Guilty spork"
]
function popupVisibility() {
    popup.style.display = 'flex'
}
function changeName(type) {
    let newName = nameInput.value;
    if (type === "submit") {

        if (nameInput.value === "HELLO0O") {
            dirt += 99999999999999999999;
        }
        if (newName.endsWith('s')) {
            name.innerHTML = newName + "' Dirt clicker"
            nameInput.value = '';
        }
        else if (newName === '') {
            name.innerHTML = newName + "Unnamed's Dirt Clicker"
            nameInput.value = '';
        }
        else {
            name.innerHTML = newName + "'s Dirt Clicker"
            nameInput.value = '';
        }
        popup.style.display = 'none';
    }
    if (type === "random") {
        let i = Math.floor(Math.random() * randomNames.length);
        nameInput.value = randomNames[i];
    }
    if (type === "cancel") {
        popup.style.display = 'none';
    }
}

let settingsPopup = document.getElementById("settingsPopup");
function settingsVisibility(val) {
    if(val === "gear") {
        settingsPopup.style.display = 'flex'
    }
    else if(val === "close") {
        settingsPopup.style.display = 'none'
    }
}

document.addEventListener('click', function() {
    startMusic();
    console.log("Music playing")
})
document.removeEventListener('click');