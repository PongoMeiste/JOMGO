let points = 0;
let clickPower = 1;
let workers = 0;
let workerSpeed = 1000;
let waxLevel = 0;
let waxCoins = 0;
let isMuted = false;

const upgradeCosts = {
    click: 50,
    worker: 100,
    speed: 150,
    pickaxe: 200,
    upickaxe: 300
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
    document.getElementById('muteButton').textContent = isMuted ? 'Unmute' : 'Mute';
}

function checkUpgrades() {
    document.getElementById('upgradeClick').disabled = points < upgradeCosts.click;
    document.getElementById('buyWorker').disabled = points < upgradeCosts.worker;
    document.getElementById('speedWorker').disabled = points < upgradeCosts.speed;
    document.getElementById('buypickaxe').disabled = points < upgradeCosts.pickaxe;
    document.getElementById('upgradepickaxe').disabled = points < upgradeCosts.upickaxe;
}

function buyUpgrade(type) {
    if (type === 'click' && points >= upgradeCosts.click) {
        points -= upgradeCosts.click;
        clickPower++;
        upgradeCosts.click *= 1.5;
        document.getElementById('upgradeClick').textContent = `Upgrade Click Power (Cost: ${Math.round(upgradeCosts.click)})`;
    } else if (type === 'worker' && points >= upgradeCosts.worker) {
        points -= upgradeCosts.worker;
        workers++;
        upgradeCosts.worker *= 1.5;
        document.getElementById('buyWorker').textContent = `Hire Worker (Cost: ${Math.round(upgradeCosts.worker)})`;
    } else if (type === 'speed' && points >= upgradeCosts.speed) {
        points -= upgradeCosts.speed;
        workerSpeed -= 200;
        upgradeCosts.speed *= 1.5;
        document.getElementById('speedWorker').textContent = `Increase Worker Speed (Cost: ${Math.round(upgradeCosts.speed)})`;
    } else if (type === 'pickaxe' && points >= upgradeCosts.pickaxe) {
        points -= upgradeCosts.pickaxe;
        clickPower += 5;
        upgradeCosts.pickaxe *= 1.5;
        document.getElementById('buypickaxe').textContent = `Buy Pickaxe (Cost: ${Math.round(upgradeCosts.pickaxe)})`;
    } else if (type === 'upickaxe' && points >= upgradeCosts.upickaxe) {
        points -= upgradeCosts.upickaxe;
        clickPower += 10;
        upgradeCosts.upickaxe *= 1.5;
        document.getElementById('upgradepickaxe').textContent = `Upgrade Pickaxe (Cost: ${Math.round(upgradeCosts.upickaxe)})`;
    }
    document.getElementById('points').textContent = points;
    checkUpgrades();
}

function prestige() {
    if (points >= 1000) {
        waxCoins++;
        points = 0;
        waxLevel = 0;
        document.getElementById('points').textContent = points;
        document.getElementById('waxLevel').textContent = waxLevel;
        document.getElementById('prestigeButton').disabled = true;
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
}, 600000);