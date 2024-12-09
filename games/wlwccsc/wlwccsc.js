let points = 0;
let clickPower = 1;
let workers = 0;
let workerSpeed = 1000;
let waxLevel = 0;
let waxCoins = 0;
let isMuted = false;


var adsound = new Audio('assets/ad.mp3');


const upgradeCosts = {
    click: 50,
    worker: 100,
    speed: 150,
    pickaxe: 200,
    upickaxe: 300,
    golemup: 500,
    irongolem: 1000,
    superpickaxe: 1500
};
const waxUpgradeCosts = {
    waxWorker: 25,
    waxClick: 50,
    waxpickaxe: 75
};

function clickBlock() {
    if (!isMuted) playSound('/games/wlwccsc/assets/jack1.mp3');
    points += clickPower;
    document.getElementById('points').textContent = points;
    showParticle();
    updateWaxLevel();
    checkUpgrades();
}

function showParticle() {
    const particle = document.getElementById('particle');
    particle.style.animation = 'none';
    requestAnimationFrame(() => {
        particle.style.animation = '';
    });
}

function updateWaxLevel() {
    const nextLevel = (waxLevel + 1) * 100;
    const progress = Math.min((points / nextLevel) * 100, 100);
    document.getElementById('waxFill').style.width = `${progress}%`;
    if (progress === 100) levelUp();
}

function levelUp() {
    waxLevel++;
    document.getElementById('waxLevel').textContent = waxLevel;
    document.getElementById('waxFill').style.backgroundColor = getRandomColor();
    checkPrestigeEligibility();
}

function checkPrestigeEligibility() {
    document.getElementById('prestigeButton').disabled = waxLevel < 5;
}

function getRandomColor() {
    const colors = ['#ffcc80', '#ffab91', '#ff8a65', '#e57373'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function playSound(src) {
    const sound = new Audio(src);
    sound.play();
}




function hideTooltip() {
    document.getElementById('tooltip').style.display = 'none';
}

function toggleMute() {
    isMuted = !isMuted;
    var mutesound = new Audio('assets/mute.mp3');
    mutesound.play()
    document.getElementById('muteButton').textContent = isMuted ? 'Unmute' : 'Mute';
}

function checkUpgrades() {
    document.getElementById('upgradeClick').disabled = points < upgradeCosts.click;
    document.getElementById('buyWorker').disabled = points < upgradeCosts.worker;
    document.getElementById('speedWorker').disabled = points < upgradeCosts.speed;
    document.getElementById('buypickaxe').disabled = points < upgradeCosts.pickaxe;
    document.getElementById('upgradepickaxe').disabled = points < upgradeCosts.upickaxe;
    document.getElementById('buygolemupgrade').disabled = points < upgradeCosts.golemup;
    document.getElementById('buyirongolem').disabled = points < upgradeCosts.irongolem;
    document.getElementById('buysuperpickaxe').disabled = points < upgradeCosts.superpickaxe;
    document.getElementById('buywaxpickaxe').disabled = points < upgradeCosts.waxpickaxe;
}

function buyUpgrade(type) {
    if (type === 'click' && points >= upgradeCosts.click) {
        points -= upgradeCosts.click;
        clickPower++;
        const sound = new Audio('assets/buy.mp3');
        sound.play();
        upgradeCosts.click *= 2;
        document.getElementById('upgradeClick').textContent = `Upgrade Click Power (Cost: ${Math.round(upgradeCosts.click)})`;
    } else if (type === 'worker' && points >= upgradeCosts.worker) {
        points -= upgradeCosts.worker;
        workers++;
        const sound = new Audio('assets/buy.mp3');
        sound.play();
        upgradeCosts.worker *= 2;
        document.getElementById('buyWorker').textContent = `Hire Copper Golem (Cost: ${Math.round(upgradeCosts.worker)})`;
    } else if (type === 'speed' && points >= upgradeCosts.speed) {
        points -= upgradeCosts.speed;
        workerSpeed -= 200;
        const sound = new Audio('assets/buy.mp3');
        sound.play();
        console.log(workerSpeed);
        upgradeCosts.speed *= 2;
        document.getElementById('speedWorker').textContent = `Increase Copper Golem Speed (Cost: ${Math.round(upgradeCosts.speed)})`;
    } else if (type === 'pickaxe' && points >= upgradeCosts.pickaxe) {
        points -= upgradeCosts.pickaxe;
        clickPower += 5;
        const sound = new Audio('assets/buy.mp3');
        sound.play();
        upgradeCosts.pickaxe *= 2;
        document.getElementById('buypickaxe').textContent = `Buy Pickaxe (Cost: ${Math.round(upgradeCosts.pickaxe)})`;
    } else if (type === 'upickaxe' && points >= upgradeCosts.upickaxe) {
        points -= upgradeCosts.upickaxe;
        clickPower += 10;
        const sound = new Audio('assets/buy.mp3');
        sound.play();
        upgradeCosts.upickaxe *= 2;
        document.getElementById('upgradepickaxe').textContent = `Upgrade Pickaxe (Cost: ${Math.round(upgradeCosts.upickaxe)})`;
    } else if (type === 'golemup' && points >= upgradeCosts.golemup) {
        points -= upgradeCosts.golemup;
        workers+= 10;
        const sound = new Audio('assets/buy.mp3');
        sound.play();
        upgradeCosts.golemup *= 2;
        document.getElementById('buygolemupgrade').textContent = `Upgrade Golem (Cost: ${Math.round(upgradeCosts.golemup)})`;
    } else if (type === 'irongolem' && points >= upgradeCosts.irongolem) {
        points -= upgradeCosts.irongolem;
        workers += 15;
        const sound = new Audio('assets/buy.mp3');
        sound.play();
        upgradeCosts.irongolem *= 2;
        document.getElementById('buyirongolem').textContent = `Buy Iron Golem (Cost: ${Math.round(upgradeCosts.irongolem)})`;
    }else if (type === 'superpickaxe' && points >= upgradeCosts.superpickaxe) {
        points -= upgradeCosts.superpickaxe;
        clickPower += 20;
        const sound = new Audio('assets/buy.mp3');
        sound.play();
        upgradeCosts.superpickaxe *= 2;
        document.getElementById('buysuperpickaxe').textContent = `Buy Super Pickaxe (Cost: ${Math.round(upgradeCosts.superpickaxe)})`;
    }
    document.getElementById('points').textContent = points;
    checkUpgrades();
}
setInterval(function() {
    if(workers > 0)
    {
        points +=workers;
        document.getElementById('points').textContent = points;
    }
}, workerSpeed)

function prestige() {
    if (waxLevel >= 5) {
        waxCoins++; 
        points = 0;
        waxLevel = 0; 
        document.getElementById('points').textContent = points;
        document.getElementById('waxLevel').textContent = waxLevel;
        updateWaxCoinsDisplay(); 
        document.getElementById('prestigeButton').disabled = true; 
        checkWaxUpgrades(); 
    }
}


setInterval(function () {
    const img = new Image();
    img.src = 'images/mason.jpg';
    img.style.display = 'block';
    img.style.width = '100px';
    img.style.height = 'auto';
    img.style.position = 'absolute';
    img.style.top = Math.random() * window.innerHeight + 'px';
    img.style.left = Math.random() * window.innerWidth + 'px';
    const sound = new Audio('assets/mason.mp3');
    sound.play();
    document.body.appendChild(img);
    img.addEventListener('click', function () {
        const randomPoints = Math.floor(Math.random() * 10000) + 1;
        points += randomPoints;
        console.log('Points:', points);
        img.style.display = 'none';
    });
    setTimeout(function () {
        img.style.display = 'none';
    }, 5000);
}, 200000);



const screenCover = document.getElementById('screenCover');
const closeButton = document.getElementById('closeButton');
const realcloseButton = document.getElementById('realcloseButton');
let closeAttempts = 0; 


function showScreenCover() {
  adsound.play()
    screenCover.style.display = 'flex'; 
    moveCloseButton();
}


function hideScreenCover() {
    const sound = new Audio('assets/closead.mp3');
    sound.play(); 
    closeAttempts++;
    if (closeAttempts >= 5) {
        screenCover.style.display = 'none';
        closeAttempts = 0; 
    } else {
        moveCloseButton(); 
    }
}

function realhidscreen() {
    closeAttempts++;
    if (closeAttempts ==1) {
        screenCover.style.display = 'none';
        closeAttempts = 0;
    }
}


function moveCloseButton() {
    const x = Math.random() * 80; 
    const y = Math.random() * 80;
    closeButton.style.position = 'absolute';
    closeButton.style.left = `${x}%`;
    closeButton.style.top = `${y}%`;
}


setInterval(showScreenCover, 300000);
setInterval(moveCloseButton, 600);

closeButton.addEventListener('click', hideScreenCover);
realcloseButton.addEventListener('click', realhidscreen);

function updateWaxCoinsDisplay() {
    document.getElementById('waxCoins').textContent = waxCoins;
    checkWaxUpgrades(); 
}

updateWaxCoinsDisplay();  
document.getElementById('waxCoins').textContent = waxCoins;
function buyWaxCoinUpgrade(type) {
    if (type === 'waxWorker' && waxCoins >= waxUpgradeCosts.waxWorker) {
        waxCoins -= waxUpgradeCosts.waxWorker; 
        workers += 4500; 
        const sound = new Audio('assets/horay.mp3');
        sound.play();
        waxUpgradeCosts.waxWorker *= 2;
        document.getElementById('buyWaxWorker').textContent = 
            `Hire Wax Worker (Cost: ${Math.round(waxUpgradeCosts.waxWorker)} Wax Coins)`;
    } else if (type === 'waxClick' && waxCoins >= waxUpgradeCosts.waxClick) {
        waxCoins -= waxUpgradeCosts.waxClick;
        clickPower += 5000;
        const sound = new Audio('assets/horay.mp3');
        sound.play(); 
        waxUpgradeCosts.waxClick *= 2; 
        document.getElementById('upgradeWaxClick').textContent = 
            `Upgrade Wax Click Power (Cost: ${Math.round(waxUpgradeCosts.waxClick)} Wax Coins)`;
    } 
    document.getElementById('waxCoins').textContent = waxCoins; 
    checkWaxUpgrades();
}

function checkWaxUpgrades() {
    
    document.getElementById('buyWaxWorker').disabled = waxCoins < waxUpgradeCosts.waxWorker;
    document.getElementById('upgradeWaxClick').disabled = waxCoins < waxUpgradeCosts.waxClick;
    
}


