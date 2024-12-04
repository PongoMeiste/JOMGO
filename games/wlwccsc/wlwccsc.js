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
    upickaxe: 300,
    golemup: 500,
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
    document.getElementById('buygolemupgrade').disabled = points < upgradeCosts.golemup;
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
        document.getElementById('buyWorker').textContent = `Hire Copper Golem (Cost: ${Math.round(upgradeCosts.worker)})`;
    } else if (type === 'speed' && points >= upgradeCosts.speed) {
        points -= upgradeCosts.speed;
        workerSpeed -= 200;
        console.log(workerSpeed);
        upgradeCosts.speed *= 1.5;
        document.getElementById('speedWorker').textContent = `Increase Copper Golem Speed (Cost: ${Math.round(upgradeCosts.speed)})`;
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
    } else if (type === 'golemup' && points >= upgradeCosts.golemup) {
        points -= upgradeCosts.golemup;
        workers+= 10;
        upgradeCosts.golemup *= 1.5;
        document.getElementById('buygolemupgrade').textContent = `Upgrade Golem (Cost: ${Math.round(upgradeCosts.golemup)})`;
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
}, 300000);



const screenCover = document.getElementById('screenCover');
const closeButton = document.getElementById('closeButton');
const realcloseButton = document.getElementById('realcloseButton');
let closeAttempts = 0; 


function showScreenCover() {
    screenCover.style.display = 'flex'; 
    moveCloseButton();
}


function hideScreenCover() {
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


setInterval(showScreenCover, 600000);
setInterval(moveCloseButton, 400);

closeButton.addEventListener('click', hideScreenCover);
realcloseButton.addEventListener('click', realhidscreen);


showScreenCover();


function isValidCardNumber(cardNumber) {
   
    cardNumber = cardNumber.replace(/\D/g, '');
  
   
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      return false;
    }
  
    let sum = 0;
    let shouldDouble = false;
  
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
  
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;  
      }
  
      sum += digit;
      shouldDouble = !shouldDouble;
    }
  
    
    return (sum % 10 === 0);
  }
  
  
  const modal = document.getElementById('cardFormModal');
  const buyButton = document.getElementById('buyButton');
  const closeModal = document.getElementById('closeModal');
  
  
  buyButton.onclick = function() {
    modal.style.display = 'flex'; 
  }
  

  closeModal.onclick = function() {
    modal.style.display = 'none';
  }
  

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
  
  
  document.getElementById('cardInfoForm').onsubmit = function(event) {
    event.preventDefault(); 
  
    const cardNumber = document.getElementById('cardNumber').value;
    const expiration = document.getElementById('expiration').value;
    const cvv = document.getElementById('cvv').value;
  
    
    if (isValidCardNumber(cardNumber)) {
      console.log('Card Number:', cardNumber);
      console.log('Expiration Date:', expiration);
      console.log('CVV:', cvv);
      alert('Card information is valid and logged to the console.');
    } else {
      alert('Invalid card number. Please check your card details.');
    }
  
    
    modal.style.display = 'none';
  }
  