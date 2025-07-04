let hero = document.getElementById("hero");
let villain = document.getElementById("villain");
let heroHealth = 3;
let villainHealth = 3;
let heroPos = 50;
const loveLine = document.getElementById("love-line");
let heroDead = false;

// Set villain position
let villainPos = 250;
villain.style.left = villainPos + "px";

// Funny messages when hero hits villain
const hitMessages = [
  "Sorry mommy! 🙈",
  "Upss, you are hard to beat... 😅",
  "Sorry, my eyes on boobies! 😳"
];
let hitMessageIndex = 0;

// Array of reward images to show randomly
const rewardImages = [
  "love.png",
  "bir1.png",
  "bir2.png",
  "bir3.png",
  "bir1.png"
];

// Array of random love quotes
const loveMessages = [
  "Behind every playful battle... was a heart waiting to confess. ❤️<br>Happy Birthday, my sweet rival 💌",
  "Even in defeat, your smile is my greatest victory. 😘<br>Happy Birthday, my beautiful senior! 🎉",
  "You may fall in game, but you've risen in my heart. 💗<br>Wishing you a magical birthday!",
  "Game Over for you... but my heart just started playing. 💘<br>Happy Birthday, Queen!",
  "From rivals to soulmates, you’ve won me over. 💞<br>Have the best birthday ever, love! 🎂"
];

function move(direction) {
  if (heroDead) return;
  if (direction === 'left') {
    heroPos = Math.max(0, heroPos - 20);
  } else if (direction === 'right') {
    heroPos = Math.min(420, heroPos + 20);
  }
  hero.style.left = heroPos + "px";
}

function showMessage(text) {
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.className = 'top-message';
  document.querySelector('.main').appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

function fight() {
  if (heroDead) return;

  const distance = Math.abs(heroPos - villainPos);

  if (distance <= 60 && villainHealth > 0) {
    villainHealth--;
    updateHealth();
    villain.style.transform = "translateX(-10px) rotate(-10deg)";
    hero.style.transform = "translateY(-10px) rotate(10deg)";
    setTimeout(() => {
      villain.style.transform = "translateX(0) rotate(0)";
      hero.style.transform = "translateX(0) rotate(0)";
    }, 200);

    showMessage(hitMessages[hitMessageIndex]);
    hitMessageIndex = (hitMessageIndex + 1) % hitMessages.length;

    if (villainHealth === 0) {
      turnVillainIntoBox();
      endGame(true);
    }

  } else if (distance <= 60 && villainHealth === 0) {
    endGame(true);

  } else {
    if (heroHealth > 0) {
      heroHealth--;
      updateHealth();
      hero.style.transform = "scale(0.95)";
      setTimeout(() => {
        hero.style.transform = "scale(1)";
      }, 200);

      if (heroHealth === 0) {
        heroDead = true;
        endGame(false);
      }
    }
  }
}

function updateHealth() {
  document.getElementById("villain-health").textContent = '💔'.repeat(villainHealth);
  document.getElementById("hero-health").textContent = '❤️'.repeat(heroHealth);
}

function endGame(heroWon) {
  document.querySelector(".controls").style.display = "none";

  if (heroWon) {
    // Show random love message
    const randomIndex = Math.floor(Math.random() * loveMessages.length);
    const randomLove = loveMessages[randomIndex];
    loveLine.innerHTML = `<p>${randomLove}</p>`;
    loveLine.classList.remove("hidden");
  } else {
    const gameOver = document.createElement("div");
    gameOver.className = "message";
    gameOver.textContent = "Game Over 💔";
    document.body.appendChild(gameOver);
  }

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "🔁 Restart";
  restartBtn.className = "restart-button";
  restartBtn.onclick = () => location.reload();
  document.body.appendChild(restartBtn);
}

function turnVillainIntoBox() {
  villain.src = "box.png"; // Your custom box image
  villain.style.width = "60px";
  villain.style.height = "60px";
  villain.style.borderRadius = "10px";
  villain.style.cursor = "pointer";
  villain.onclick = showRandomReward;
}

function showRandomReward() {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "rgba(0,0,0,0.85)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = 10000;
  overlay.style.cursor = "pointer";

  const img = document.createElement("img");

  // Pick a random reward image
  const randomIndex = Math.floor(Math.random() * rewardImages.length);
  img.src = rewardImages[randomIndex];

  img.style.maxWidth = "85vw";
  img.style.maxHeight = "85vh";
  img.style.borderRadius = "20px";
  img.style.boxShadow = "0 0 20px white";

  overlay.appendChild(img);
  overlay.onclick = () => overlay.remove();
  document.body.appendChild(overlay);
}
