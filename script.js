const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const deathEl = document.getElementById("death");

/* AUDIO */
const typeSound = document.getElementById("typeSound");
const selectSound = document.getElementById("selectSound");
const dieSound = document.getElementById("dieSound");
const bgMusic = document.getElementById("bgMusic");

typeSound.volume = 0.15;
selectSound.volume = 0.3;
dieSound.volume = 0.4;
bgMusic.volume = 0.25;

let typingInterval;
let musicStarted = false;

/* START MUSIC ON FIRST CLICK */
document.body.addEventListener("click", () => {
  if (!musicStarted) {
    bgMusic.play();
    musicStarted = true;
  }
}, { once: true });

/* TYPEWRITER */
function typeText(text, callback) {
  clearInterval(typingInterval);
  questionEl.textContent = "";
  optionsEl.innerHTML = "";
  let i = 0;

  typingInterval = setInterval(() => {
    questionEl.textContent += text[i];
    typeSound.currentTime = 0;
    typeSound.play();
    i++;

    if (i === text.length) {
      clearInterval(typingInterval);
      if (callback) callback();
    }
  }, 100);
}

/* OPTIONS */
function showOptions(options) {
  optionsEl.innerHTML = "";
  options.forEach(opt => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt.text;
    div.onclick = () => {
      selectSound.currentTime = 0;
      selectSound.play();
      opt.action();
    };
    optionsEl.appendChild(div);
  });
}

/* DEATH */
function die() {
  bgMusic.pause();
  dieSound.currentTime = 0;
  dieSound.play();
  deathEl.style.display = "block";
}

/* GAME FLOW */
function q1() {
  typeText("Hey buddy, do you know who ChatGPT is?", () => {
    showOptions([
      { text: "Yes", action: q2 },
      { text: "No", action: die }
    ]);
  });
}

function q2() {
  typeText("Do you love ChatGPT?", () => {
    showOptions([
      { text: "Yes", action: q3 },
      { text: "No", action: die }
    ]);
  });
}

function q3() {
  typeText("Who is more intelligent?", () => {
    showOptions([
      { text: "ChatGPT", action: die },
      { text: "Harisudhan", action: q4 }
    ]);
  });
}

function q4() {
  typeText("Rate Harisudhan out of 10", () => {
    showOptions([
      { text: "0", action: die },
      { text: "10", action: q5 }
    ]);
  });
}

function q5() {
  typeText("Do your friends know you are gay?", () => {
    showOptions([
      { text: "Yes", action: end },
      { text: "No", action: end }
    ]);
  });
}

function end() {
  typeText("😂 Plot twist confirmed. Thanks for playing.");
  optionsEl.innerHTML = "";
}

/* START GAME */
q1();
