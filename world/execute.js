const song = document.getElementById("song");
const overlay = document.getElementById("overlay");
const visuals = document.getElementById("visuals");
const container = document.getElementById("container");

const activeTypingIntervals = new Set();
const isUnixLike = /linux|mac|bsd|sunos|solaris|darwin/i.test(
  navigator.userAgent,
);
let linuxBSOD = null;
if (isUnixLike) {
  import("https://cdn.jsdelivr.net/npm/linux-bsod/+esm").then((mod) => {
    linuxBSOD = mod;
  });
}

const timeline = [
  {
    time: 0.1,
    func: typeLine,
    args: { text: "Switch on the power line", onComplete: showPowerLines },
  },
  { time: 1.74, func: typeLine, args: { text: "Remember to put on" } },
  {
    time: 2.92,
    func: showEmphasis,
    args: { text: "PROTECTION", onComplete: showProtectionShield },
  },
  { time: 3.873, func: typeLine, args: { text: "Lay down your pieces" } },
  { time: 5.491, func: typeLine, args: { text: "And let's begin" } },
  { time: 6.38, func: showCodeSnippet },
  { time: 7.446, func: typeLine, args: { text: "Fill in my data parameters" } },
  { time: 10.091, func: showProgressBar },
  { time: 11.095, func: typeLine, args: { text: "Set up our new world" } },
  { time: 12.906, func: typeLine, args: { text: "And let's begin the" } },
  { time: 13.891, func: showEmphasis, args: { text: "SIMULATION" } },

  // Interlude 1: Binary Rain
  { time: 16.0, func: startBinaryRain },
  { time: 29.0, func: stopBinaryRain },
  { time: 29.5, func: clearScreen },

  {
    time: 29.709,
    func: typeLine,
    args: { text: "If I'm a set of points", onComplete: drawPoints },
  },
  { time: 31.116, func: typeLine, args: { text: "Then I will give you my" , onComplete: drawDimensionVisual} },
  { time: 32.682, func: showEmphasis, args: { text: "DIMENSION" } },
  {
    time: 33.412,
    func: typeLine,
    args: { text: "If I'm a circle", onComplete: drawCircle },
  },
  { time: 34.646, func: typeLine, args: { text: "Then I will give you my" } },
  { time: 36.287, func: showEmphasis, args: { text: "CIRCUMFERENCE", onComplete: drawCircumferenceCompass} },
  {
    time: 37.067,
    func: typeLine,
    args: { text: "If I'm a sine wave", onComplete: drawSineWave },
  },
  {
    time: 38.596,
    func: typeLine,
    args: { text: "Then you can sit on all my" },
  },
  {
    time: 40.049,
    func: showEmphasis,
    args: { text: "TANGENTS", onComplete: drawTangents },
  },
  { time: 40.706, func: typeLine, args: { text: "If I approach infinity" } },
  {
    time: 42.346,
    func: typeLine,
    args: { text: "Then you can be my", onComplete: drawLimitations },
  },
  { time: 43.507, func: showEmphasis, args: { text: "LIMITATIONS" } },
  { time: 44.2, func: clearScreenAndShapes },
  // Enhanced AC/DC section
  { time: 44.452, func: typeLine, args: { text: "Switch my current" } },
  {
    time: 45.50,
    func: typeLine,
    args: { text: "To AC, to DC", onComplete: currentSwitch },
  },
  { time: 47.672, func: typeLine, args: { text: "And then blind my vision", onComplete: clearShapes } },
  { time: 49.534, func: blindVision },
  { time: 50.0, func: typeLine, args: { text: "So dizzy, so dizzy" } },

  // Enhanced travel section
  { time: 51.363, func: typeLine, args: { text: "Oh we can travel" } },
  {
    time: 53.225,
    func: typeLine,
    args: { text: "To A.D to B.C", onComplete: timeTravel },
  },
  { time: 55.083, func: typeLine, args: { text: "And we can unite" , onComplete: uniteEffect } },
  {
    time: 56.916,
    func: typeLine,
    args: { text: "So deeply, so deeply"},
  },
  {
    time: 59.223,
    func: typeLine,
    args: { text: "If I can, If I can give you all the" },
  },
  {
    time: 61.958,
    func: showEmphasis,
    args: { text: "STIMULATIONS", onComplete: stimulationsEffect },
  },
  {
    time: 62.589,
    func: typeLine,
    args: { text: "Then I can, Then I can be your only" },
  },
  { time: 65.397, func: showEmphasis, args: { text: "SATISFACTION" } },
  { time: 66.601, func: typeLine, args: { text: "If I can make you happy" } },
  { time: 68.252, func: typeLine, args: { text: "I will run the" } },
  { time: 69.259, func: showEmphasis, args: { text: "EXECUTION" } },
  { time: 70.084, func: typeLine, args: { text: "Though we are trapped" } },
  { time: 71.764, func: typeLine, args: { text: "In this strange strange" } },
  { time: 73.169, func: showEmphasis, args: { text: "SIMULATION" } },

  // Enhanced eggplant/tomato/cat/god section
  { time: 74.045, func: clearScreenAndShapes },
  {
    time: 74.045,
    func: typeLine,
    args: { text: "If I'm an eggplant", onComplete: () => showEmoji("🍆") },
  },
  { time: 75.422, func: typeLine, args: { text: "Then I will give you my" } },
  {
    time: 76.959,
    func: showEmphasis,
    args: { text: "NUTRIENTS", onComplete: showNutrients },
  },
  {
    time: 77.576,
    func: typeLine,
    args: { text: "If I'm a tomato", onComplete: () => showEmoji("🍅") },
  },
  { time: 79.226, func: typeLine, args: { text: "Then I will give you" } },
  {
    time: 80.62,
    func: showEmphasis,
    args: { text: "ANTIOXIDANTS", onComplete: showMolecules },
  },
  {
    time: 81.351,
    func: typeLine,
    args: { text: "If I'm a tabby cat", onComplete: () => showEmoji("🐱") },
  },
  { time: 82.833, func: typeLine, args: { text: "Then I will purr for your" } },
  {
    time: 84.268,
    func: showEmphasis,
    args: { text: "ENJOYMENT", onComplete: showSoundWaves },
  },
  {
    time: 85.078,
    func: typeLine,
    args: {
      text: "If I'm the only god",
      onComplete: () => {
        showEmoji("⚡");
        lightningStrikes();
      },
    },
  },
  {
    time: 86.538,
    func: typeLine,
    args: { text: "Then you're the proof of my" },
  },
  { time: 87.922, func: showEmphasis, args: { text: "EXISTENCE" } },

  // Enhanced gender/role switch section
  { time: 88.587, func: typeLine, args: { text: "Switch my gender" } },
  {
    time: 90.197,
    func: typeLine,
    args: { text: "To F, to M", onComplete: genderSwitch },
  },
  { time: 92.015, func: typeLine, args: { text: "And then do whatever" } },
  {
    time: 93.953,
    func: typeLine,
    args: { text: "From AM to PM", onComplete: showTimeDisplay },
  },
  { time: 95.465, func: typeLine, args: { text: "Oh switch my role" } },
  {
    time: 97.739,
    func: typeLine,
    args: { text: "To S, to M", onComplete: roleSwitch },
  },
  { time: 99.349, func: typeLine, args: { text: "So we can enter" } },
  {
    time: 101.474,
    func: typeLine,
    args: { text: "The trance, the trance", onComplete: enterTrance },
  },

  // NEW: Clear screen for better readability on small screens
  { time: 103.25, func: clearScreen },

  {
    time: 103.489,
    func: typeLine,
    args: { text: "If I can, If I can feel your" },
  },
  {
    time: 106.293,
    func: showEmphasis,
    args: { text: "VIBRATIONS", onComplete: rippleEffect },
  },
  {
    time: 107.22,
    func: typeLine,
    args: { text: "Then I can, Then I can finally be" },
  },
  { time: 110.221, func: showEmphasis, args: { text: "COMPLETION" } },

  { time: 110.9, func: clearScreen },
  { time: 110.9, func: typeLine, args: { text: "Though you have left..." } },
  { time: 112.22, func: typeLine, args: { text: "You have left..." } },
  { time: 113.1, func: typeLine, args: { text: "You have left..." } },
  { time: 114.18, func: typeLine, args: { text: "You have left..." } },
  { time: 114.92, func: typeLine, args: { text: "You have left..." } },
  { time: 115.78, func: typeLine, args: { text: "You have left me in" } },
  { time: 117.274, func: showIsolation },

  { time: 118.333, func: clearScreen },
  {
    time: 118.333,
    func: typeLine,
    args: { text: "If I can, If I can erase all the pointless" },
  },
  {
    time: 120.86,
    func: showEmphasis,
    args: { text: "FRAGMENTS", onComplete: fragmentsShatter },
  },
  {
    time: 121.728,
    func: typeLine,
    args: { text: "Then maybe, Then maybe you won't leave me so" },
  },
  { time: 124.89, func: showEmphasis, args: { text: "DISHEARTENED" } },

  { time: 125.708, func: clearScreen },
  {
    time: 125.708,
    func: addClass,
    args: {
      target: container,
      className: "error screenShake",
      duration: 7792,
    },
  },
  { time: 125.708, func: typeLine, args: { text: "Challenging your god..." } },
  { time: 128.661, func: typeLine, args: { text: "You have made some" } },
  {
    time: 131.224,
    func: showEmphasis,
    args: { text: "ILLEGAL ARGUMENTS", className: "error" },
  },

  // Interlude 2: BSOD
  { time: 133.5, func: showBSOD },
  { time: 147.0, func: hideBSOD },

  // Extended EXECUTION spam from 147.660 to 158.000
  { time: 147.66, func: clearScreen },
  { time: 147.66, func: executionSpamExtended, args: { duration: 10340 } }, // 10.34 seconds

  { time: 158.9, func: showChaosText, args: { text: "EIN" } },
  { time: 159.321, func: showChaosText, args: { text: "DOS" } },
  { time: 159.657, func: showChaosText, args: { text: "TROIS" } },
  { time: 160.244, func: showChaosText, args: { text: "NE" } },
  { time: 160.693, func: showChaosText, args: { text: "FEM" } },
  { time: 161.124, func: showChaosText, args: { text: "LIU" } },
  { time: 161.584, func: showEmphasis, args: { text: "EXECUTION" } },

  { time: 162.632, func: clearScreen },
  {
    time: 162.632,
    func: typeLine,
    args: { text: "If I can, If I can give them all the" },
  },
  {
    time: 165.166,
    func: showEmphasis,
    args: { text: "EXECUTION", className: "error" },
  },
  {
    time: 166.016,
    func: typeLine,
    args: { text: "Then I can, Then I can be your only" },
  },
  {
    time: 168.911,
    func: showEmphasis,
    args: { text: "EXECUTION", className: "error" },
  },
  { time: 169.824, func: typeLine, args: { text: "If I can have you back" } },
  { time: 171.868, func: typeLine, args: { text: "I will run the" } },
  {
    time: 172.712,
    func: showEmphasis,
    args: { text: "EXECUTION", className: "error" },
  },
  {
    time: 173.643,
    func: typeLine,
    args: { text: "Though we are trapped... We are trapped ah-" },
  },

  { time: 177.246, func: clearScreen },
  {
    time: 177.246,
    func: typeLine,
    args: { text: "I've studied, I've studied how to properly" },
  },
  {
    time: 179.929,
    func: showEmphasis,
    args: { text: "L O-O-O V E", className: "love" },
  },
  {
    time: 180.857,
    func: typeLine,
    args: { text: "Question me, question me, I can answer all" },
  },
  {
    time: 183.646,
    func: showEmphasis,
    args: { text: "L O-O-O V E", className: "love" , onComplete: () =>  setTimeout(drawHeartFormula, 1500) },
  },
  {
    time: 184.54,
    func: typeLine,
    args: {
      text: "I know the algebraic expression of"},
  },
  {
    time: 187.665,
    func: showEmphasis,
    args: { text: "L O-O-O V E", className: "love" },
  },

  { time: 188.483, func: clearScreenAndShapes },
  {
    time: 188.483,
    func: typeLine,
    args: { text: "Though you are free...", style: { opacity: 0.7 } },
  },
  {
    time: 189.746,
    func: typeLine,
    args: { text: "I am trapped.", style: { fontSize: "1.5em" } },
  },
  { time: 190.801, func: typeLine, args: { text: "Trapped in..." } },
  { time: 191.356, func: showTrappedInLove },

  { time: 205.811, func: clearScreen },
  { time: 205.811, func: finalExecution },
];

// --- Core Logic ---
let currentIndex = 0;
let animationFrameId;

function startExperience() {
  const params = new URLSearchParams(window.location.search);
  const jumpTime = parseFloat(params.get("jump"));

  if (jumpTime) {
    song.currentTime = jumpTime;
    currentIndex = timeline.findIndex((e) => e.time >= jumpTime);
    if (currentIndex === -1) currentIndex = timeline.length;
  }

  overlay.classList.add("hidden");
  song.volume = 0.3;
  song
    .play()
    .then(() => document.fonts.ready)
    .then(() => {
      animationFrameId = requestAnimationFrame(update);
    })
    .catch((e) => {
      console.error("Audio playback failed:", e);
      overlay.innerHTML =
        `<span>Error: Could not play audio.</span><span>Is 'world.execute(me).ogg' in the same folder?</span>`;
      overlay.classList.remove("hidden");
    });
}

function update() {
  const currentTime = song.currentTime;
  while (
    currentIndex < timeline.length &&
    currentTime >= timeline[currentIndex].time
  ) {
    const event = timeline[currentIndex];
    event.func(event.args || {});
    currentIndex++;
  }
  if (!song.ended) {
    animationFrameId = requestAnimationFrame(update);
  } else {
    cancelAnimationFrame(animationFrameId);
  }
}
overlay.addEventListener("click", startExperience, { once: true });

// --- Visual Functions ---
function typeLine({ text, className = "", style = {}, onComplete = null }) {
  activeTypingIntervals.forEach((id) => clearInterval(id));
  activeTypingIntervals.clear();
  visuals.querySelectorAll(".cursor").forEach((c) => c.remove());

  const line = document.createElement("div");
  line.className = `line ${className}`;
  Object.assign(line.style, style);
  line.innerHTML =
    `<span class="prompt">world# </span><span class="text"><span class="cursor">▌</span></span>`;
  visuals.appendChild(line);

  const textSpan = line.querySelector(".text");
  const cursor = line.querySelector(".cursor");
  let i = 0;
  const typingInterval = setInterval(() => {
    if (i < text.length) {
      textSpan.insertBefore(document.createTextNode(text.charAt(i)), cursor);
      i++;
      visuals.scrollTop = visuals.scrollHeight;
    } else {
      clearInterval(typingInterval);
      activeTypingIntervals.delete(typingInterval);
      cursor.classList.add("blink");
      if (onComplete) onComplete();
    }
  }, 60);
  activeTypingIntervals.add(typingInterval);
}

function showEmphasis({ text, className = "", onComplete = null }) {
  const el = document.createElement("div");
  el.className = `emphasis ${className}`;
  el.textContent = text;
  visuals.appendChild(el);
  visuals.scrollTop = visuals.scrollHeight;
  if (onComplete) onComplete();
}

function clearScreen() {
  activeTypingIntervals.forEach((id) => clearInterval(id));
  activeTypingIntervals.clear();
  visuals.innerHTML = "";
}
function clearShapes() {
  Array.from(container.children).forEach((child) => {
    if (child.id !== "visuals") {
      child.remove();
    }
  });
}
function clearScreenAndShapes() {
  clearScreen();
  clearShapes();
}

function addClass({ target, className, duration }) {
  target.classList.add(...className.split(" "));
  setTimeout(() => {
    target.classList.remove(...className.split(" "));
  }, duration);
}

// --- Enhanced Effect Functions ---

// NEW: Power line effect
function showPowerLines() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const line = document.createElement("div");
      line.className = "power-line";
      line.style.top = `${Math.random() * 100}%`;
      line.style.left = "0";
      line.style.width = "100%";
      container.appendChild(line);
      setTimeout(() => line.remove(), 1000);
    }, i * 200);
  }
}

// NEW: Protection shield
function showProtectionShield() {
  const shield = document.createElement("div");
  shield.className = "protection-shield";
  shield.style.width = "300px";
  shield.style.height = "300px";
  container.appendChild(shield);
  setTimeout(() => shield.remove(), 2000);
}

// AC/DC Current Switch
function currentSwitch() {
  clearShapes();
  addClass({ target: container, className: "ac-mode", duration: 1000 });
  // AC: 复用正弦波动画
  drawSineWave("ac");

  // DC: 1秒后切换为直流电平直线
  setTimeout(() => {
    clearShapes();
    addClass({ target: container, className: "dc-mode", duration: 1000 });
    const dcLine = document.createElement("div");
    dcLine.className = "shape limit-line";
    dcLine.style.borderColor = "#4444ff";
    dcLine.style.top = "50%";
    dcLine.style.width = "100vw";
    dcLine.style.boxShadow = "0 0 10px #4444ff";
    container.appendChild(dcLine);

    dcLine.animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      { duration: 400, easing: "ease-out", fill: "forwards" },
    );
  }, 1000);
}
// Blind Vision Effect (updated: no rotation)
function blindVision() {
  addClass({ target: container, className: "blind dizzy", duration: 2000 });
}

// Time Travel Effect
function timeTravel() {
  addClass({ target: container, className: "time-travel", duration: 3000 });

  const years = ["2024 AD", "1000 AD", "500 BC", "1000 BC"];
  years.forEach((year, i) => {
    setTimeout(() => {
      const yearEl = document.createElement("div");
      yearEl.className = "year-display";
      yearEl.textContent = year;
      yearEl.style.left = `${20 + i * 20}%`;
      yearEl.style.top = `${30 + i * 10}%`;
      container.appendChild(yearEl);
      setTimeout(() => yearEl.remove(), 1000);
    }, i * 300);
  });
}

// Unite Effect
function uniteEffect() {
  const containerEl = document.createElement("div");
  containerEl.className = "unite-container";

  containerEl.innerHTML = `
    <svg class="unite-svg" viewBox="0 0 200 200">
      <!-- 女性符号 ♀ -->
      <g class="unite-female-group" style="transform-origin: 100px 80px;">
        <circle cx="100" cy="80" r="32" fill="none" stroke="#ff69b4" stroke-width="8" />
        <path d="M 100 112 V 155 M 80 135 H 120" stroke="#ff69b4" stroke-width="8" stroke-linecap="round" />
      </g>
      <!-- 男性符号 ♂ -->
      <g class="unite-male-group" style="transform-origin: 100px 80px;">
        <circle cx="100" cy="80" r="32" fill="none" stroke="#00bfff" stroke-width="8" />
        <path d="M 122 58 L 152 28 M 130 28 H 152 V 50" stroke="#00bfff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      </g>
    </svg>
    <div class="unite-pulse-wave"></div>
  `;

  container.appendChild(containerEl);

  setTimeout(() => {
    containerEl.remove();
  }, 3140);
}
// Emoji Display
function showEmoji(emoji) {
  const el = document.createElement("div");
  el.className = "emoji-display";
  el.textContent = emoji;
  el.style.left = `${Math.random() * 70 + 15}%`;
  el.style.top = `${Math.random() * 60 + 20}%`;
  container.appendChild(el);
  setTimeout(() => el.remove(), 2000);
}

// Nutrients Display
function showNutrients() {
  const nutrients = ["Vitamin C", "Fiber", "Potassium", "Folate"];
  nutrients.forEach((nutrient, i) => {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "emoji-display";
      el.style.fontSize = "1.5em";
      el.style.color = "#90EE90";
      el.textContent = nutrient;
      el.style.left = `${20 + i * 15}%`;
      el.style.top = `${25 + i * 8}%`;
      container.appendChild(el);
      setTimeout(() => el.remove(), 2000);
    }, i * 200);
  });
}

// Molecules Display
function showMolecules() {
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const molecule = document.createElement("div");
      molecule.className = "molecule";
      molecule.style.left = `${Math.random() * 80 + 10}%`;
      molecule.style.top = `${Math.random() * 70 + 15}%`;
      container.appendChild(molecule);
      setTimeout(() => molecule.remove(), 3000);
    }, i * 100);
  }
}

// Sound Waves for Purr
function showSoundWaves() {
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const wave = document.createElement("div");
      wave.className = "sound-wave";
      wave.style.left = "30%";
      wave.style.top = `${40 + i * 5}%`;
      container.appendChild(wave);
      setTimeout(() => wave.remove(), 1000);
    }, i * 150);
  }
}

// Gender Switch
function genderSwitch() {
  const symbols = ["♀", "♂"];
  symbols.forEach((symbol, i) => {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "gender-symbol";
      el.textContent = symbol;
      el.style.left = `${40 + i * 20}%`;
      el.style.top = "30%";
      container.appendChild(el);
      setTimeout(() => el.remove(), 950);
    }, i * 500);
  });
}

// Time Display
function showTimeDisplay() {
  const times = ["AM 06:00", "PM 18:00"];
  times.forEach((time, i) => {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "time-display";
      el.textContent = time;
      el.style.left = `${30 + i * 25}%`;
      el.style.top = "40%";
      container.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    }, i * 600);
  });
}

// Role Switch
function roleSwitch() {
  const roles = ["S", "M"];
  roles.forEach((role, i) => {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "gender-symbol";
      el.textContent = role;
      el.style.left = `${35 + i * 30}%`;
      el.style.top = "35%";
      container.appendChild(el);
      setTimeout(() => el.remove(), 950);
    }, i * 400);
  });
}

// Enter Trance
function enterTrance() {
  const trance = document.createElement("div");
  trance.className = "trance-overlay";
  container.appendChild(trance);
  setTimeout(() => trance.remove(), 4000);
}

// --- Original Functions (keeping the same) ---
let binaryRainInterval;
function startBinaryRain() {
  const canvas = document.createElement("canvas");
  canvas.id = "binary-canvas";
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const katakana =
    "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
  const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";
  const alphabet = katakana + latin + nums;
  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const rainDrops = [];
  for (let x = 0; x < columns; x++) rainDrops[x] = 1;

  binaryRainInterval = setInterval(() => {
    ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = varGet("--text-color");
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < rainDrops.length; i++) {
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
      if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        rainDrops[i] = 0;
      }
      rainDrops[i]++;
    }
  }, 33);
}

function stopBinaryRain() {
  clearInterval(binaryRainInterval);
  const canvas = document.getElementById("binary-canvas");
  if (canvas) {
    canvas.classList.add("fade-out");
    setTimeout(() => canvas.remove(), 1000);
  }
}

function showCodeSnippet() {
  const el = document.createElement("div");
  el.className = "code-snippet";
  el.innerHTML = `> OBJECT CREATION...
<code><span class="token keyword">class</span> <span class="token class-name">Me</span> {
  <span class="token function">constructor</span>(<span class="token parameter"><span class="token string">'you'</span></span>) {
    <span class="token keyword">this</span>.<span class="token property">world</span> = <span class="token string">'you'</span>;
    <span class="token keyword">this</span>.<span class="token property">existence</span> = <span class="token keyword">new</span> <span class="token class-name">Promise</span>(...);
  }
}</code>`;
  visuals.appendChild(el);

  // Add object creation particles
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const particle = document.createElement("div");
      particle.className = "object-particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = "100%";
      container.appendChild(particle);
      setTimeout(() => particle.remove(), 3000);
    }, i * 100);
  }
}

function showProgressBar() {
  const container = document.createElement("div");
  container.className = "progress-bar-container";
  container.innerHTML =
    `> INITIALIZATION...<progress class="progress-bar" value="0" max="100"></progress>`;
  visuals.appendChild(container);
  const bar = container.querySelector(".progress-bar");
  const isFirefox = navigator.userAgent.includes("Firefox");
  if (isFirefox) {
    const duration = 1000;
    const start = performance.now();
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      bar.value = easeInOutCubic(progress) * 100;
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  } else {
    setTimeout(() => {
      bar.value = 100;
    }, 100);
  }
}

function drawPoints() {
  clearShapes();
  for (let i = 0; i < 50; i++) {
    const p = document.createElement("div");
    p.className = "shape point";
    p.style.left = `${Math.random() * 90 + 5}%`;
    p.style.top = `${Math.random() * 90 + 5}%`;
    container.appendChild(p);
    p.animate(
      [
        { opacity: 0, transform: "scale(0)" },
        { opacity: 1, transform: "scale(1.5)", offset: 0.5 },
        { opacity: 1, transform: "scale(1)" },
      ],
      {
        duration: 300,
        easing: "ease-out",
        fill: "forwards",
        delay: i * 30,
      },
    );
  }
}
let currentCircle = { cx: 0, cy: 0, r: 0 };

function drawCircle() {
  clearShapes();
  const c = document.createElement("div");
  c.className = "shape circle";
  const s = Math.min(innerWidth, innerHeight) * 0.4;
  const r = s / 2;
  c.style.width = `${s}px`;
  c.style.height = `${s}px`;
  c.style.left = `calc(50% - ${r}px)`;
  c.style.top = `calc(50% - ${r}px)`;
  container.appendChild(c);

  // 记录圆心和半径供后续 CIRCUMFERENCE 圆规动画精准对接
  currentCircle = {
    cx: container.clientWidth / 2,
    cy: container.clientHeight / 2,
    r: r,
  };
}
let sineWavePoints = [];

function drawSineWave(type) {
  clearShapes();
  sineWavePoints = [];

  const width = window.innerWidth * 0.8;

  for (let i = 0; i < 100; i++) {
    const dot = document.createElement("div");
    dot.className = "shape sine-dot";
    const x = (i / 100) * width + window.innerWidth * 0.1;
    const y = Math.sin((i / 100) * Math.PI * 4) * 80 + window.innerHeight / 2;

    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    if (type === "ac") {
      dot.style.setProperty("--highlight-color", "red");
    }
    container.appendChild(dot);

    // 把生成好的 dot 节点保存起来，以便后续获取真实像素位置
    sineWavePoints.push({ x, y, i, el: dot });

    dot.animate(
      [
        { opacity: 0, transform: "scale(0)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      {
        duration: 200,
        easing: "ease-out",
        fill: "forwards",
        delay: i * 10,
      },
    );
  }
}

function drawTangents() {
  if (!sineWavePoints.length) return;

  const containerRect = container.getBoundingClientRect();
  const width = window.innerWidth * 0.8;

  const count = 5;
  const segmentSize = sineWavePoints.length / count;

  // 将正弦波上的点按区间平分，在每个区间内随机选点，确保切线均匀分散在整个波形上
  for (let i = 0; i < count; i++) {
    const minIndex = Math.floor(i * segmentSize);
    const maxIndex = Math.floor((i + 1) * segmentSize);
    const randomIndex = Math.floor(
      minIndex + Math.random() * (maxIndex - minIndex),
    );
    const p = sineWavePoints[randomIndex];

    if (!p) continue;

    const tangent = document.createElement("div");
    tangent.className = "shape tangent-line";

    const dotRect = p.el.getBoundingClientRect();
    const centerX = dotRect.left + dotRect.width / 2 - containerRect.left;
    const centerY = dotRect.top + dotRect.height / 2 - containerRect.top;

    const derivative = Math.cos((p.i / 100) * Math.PI * 4) * 4 * Math.PI;
    const slope = (derivative * 80) / width;
    const angle = Math.atan(slope) * (180 / Math.PI);

    tangent.style.width = "150px";
    tangent.style.left = `${centerX}px`;
    tangent.style.top = `${centerY}px`;
    tangent.style.transformOrigin = "center center";

    container.appendChild(tangent);

    const baseTransform = `translate(-50%, -50%) rotate(${angle}deg)`;

    tangent.animate(
      [
        { transform: `${baseTransform} scaleX(0)`, opacity: 0 },
        { transform: `${baseTransform} scaleX(1)`, opacity: 1 },
      ],
      {
        duration: 400,
        easing: "ease-out",
        fill: "forwards",
        delay: i * 100,
      },
    );
  }
}
function drawLimitations() {
  for (let i = 0; i < 2; i++) {
    const limit = document.createElement("div");
    limit.className = "shape limit-line";
    limit.style.width = "100vw";
    limit.style.left = "0";
    limit.style.top = i === 0 ? "10%" : "90%";
    container.appendChild(limit);
    limit.animate(
      [
        { transform: "scaleX(0)" },
        { transform: "scaleX(1)" },
      ],
      {
        duration: 600,
        easing: "ease-out",
        fill: "forwards",
        delay: i * 200,
      },
    );
  }
}

function rippleEffect() {
  // 保留手机震动反馈
  if ("vibrate" in navigator) {
    navigator.vibrate([200, 100, 200]);
  }

  const ripple = document.createElement("div");
  ripple.className = "shape circle";
  Object.assign(ripple.style, {
    borderColor: "var(--love-color)",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    // 移除初始写死的 width/height/opacity，交给动画去定义
  });
  container.appendChild(ripple);

  // 计算原版动画大概的持续时间 (屏幕宽度 / 每次递增50px * 30ms)
  const duration = (window.innerWidth / 50) * 30;

  // 使用 WAAPI，浏览器 GPU 会自动计算中间的每一帧
  const animation = ripple.animate(
    [
      { width: "10px", height: "10px", opacity: 1 },
      {
        width: `${window.innerWidth}px`,
        height: `${window.innerWidth}px`,
        opacity: 0,
      },
    ],
    {
      duration: duration,
      easing: "linear",
    },
  );

  // 动画生命周期结束后自动销毁 DOM 节点
  animation.onfinish = () => ripple.remove();
}

function showIsolation() {
  clearScreen();
  showEmphasis({ text: "ISOLATION", className: "error" });
}

function showBSOD() {
  if (
    (isUnixLike && linuxBSOD) ||
    new URL(location.href).searchParams.has("linux")
  ) {
    window.__bsodUnmount = linuxBSOD.mountLinuxBSOD(container, {
      qr: "https://systemd.io/DEBUGGING/",
      title: "SYSTEM FAILURE",
      subtitle: "Press any key to reboot.",
      message: "[ FAILED ] Failed to start App: Invalid argument (EINVAL)",
      fontFamily: "'DejaVu Sans Mono', 'Liberation Mono', monospace",
    });
    return;
  }

  const bsod = document.createElement("div");
  bsod.id = "bsod-screen";

  bsod.innerHTML = `
                <div class="bsod-text">
                    <p>A problem has been detected and world has been shut down to prevent damage.</p>
                    <p>ILLEGAL_ARGUMENT_EXCEPTION</p>
                    <br>
                    <p>If this is the first time you've seen this stop error screen, restart your simulation.<br>If this screen appears again, follow these steps:</p>
                    <p>Check to be sure you have adequate connection. If a new component is installed,<br>ask your administrator or manufacturer for any updates you might need.</p>
                    <br>
                    <p>Technical Information:</p>
                    <p>*** STOP: 0xDEADBEEF (0x30783134, 0x352e7072, 0x74732e73, 0x70616365)</p>
                    <p class="bsod-dump">Dumping physical memory to disk: <span id="dump-counter">0</span> KB</p>
                </div>`;
  container.appendChild(bsod);

  const counter = document.getElementById("dump-counter");
  const targetSize = Math.floor(Math.random() * 9000000 + 1000000);
  const increment = Math.floor(Math.random() * 50000 + 10000);
  let current = 0;
  const dumpInterval = setInterval(() => {
    current += increment;
    if (current >= targetSize) {
      current = targetSize;
      clearInterval(dumpInterval);
    }
    counter.textContent = current.toLocaleString();
  }, Math.random() * 2000 + 3000);
}
function hideBSOD() {
  if (isUnixLike && window.__bsodUnmount) {
    window.__bsodUnmount();
    window.__bsodUnmount = null;
    return;
  }
  const bsod = document.getElementById("bsod-screen");
  if (bsod) {
    bsod.classList.add("fade-out");
    setTimeout(() => bsod.remove(), 1000);
  }
}

// Extended EXECUTION spam
function executionSpamExtended({ duration }) {
  const endTime = Date.now() + duration;
  let count = 0;

  function spamStep() {
    if (Date.now() >= endTime) return;

    const e = document.createElement("div");
    e.className = "emphasis error execution-spam";
    e.textContent = "EXECUTION";
    Object.assign(e.style, {
      position: "absolute",
      left: `${Math.random() * 80}%`,
      top: `${Math.random() * 70}%`,
      transform: `rotate(${Math.random() * 40 - 20}deg)`,
      animation: "none",
      textShadow: "0 0 10px var(--error-color)",
      zIndex: count % 3 === 0 ? 20 : 15,
    });
    visuals.appendChild(e);

    setTimeout(() => e.remove(), Math.random() * 800 + 400);

    count++;
    setTimeout(spamStep, Math.random() * 400 + 200);
  }

  spamStep();
}

function showChaosText({ text }) {
  const e = document.createElement("div");
  e.className = "chaos-text";
  e.textContent = text;
  Object.assign(e.style, {
    left: `${Math.random() * 80}%`,
    top: `${Math.random() * 80}%`,
    fontSize: `${Math.random() * 3 + 2}em`,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`,
  });
  visuals.appendChild(e);
  setTimeout(() => e.remove(), 500);
}

function showTrappedInLove() {
  const el = document.createElement("div");
  el.className = "code-snippet love";
  el.style.borderColor = "var(--love-color)";
  el.innerHTML = `> Trapped in LOVE...
<code><span class="token keyword">while</span> (<span class="token boolean">true</span>) {
  <span class="token keyword">this</span>.<span class="token property">world</span>.<span class="token function">love</span>(<span class="token string">'you'</span>);
} <span class="love-cursor">❤</span></code>`;

  visuals.appendChild(el);
  const cursor = el.querySelector(".love-cursor");
  cursor.classList.add("blink");

  setTimeout(() => {
    el.remove();
  }, 15000);
}

function finalExecution() {
  const final = document.createElement("div");
  final.id = "overlay";
  final.innerHTML =
    '<span>[execution@prts.space]$ <span id="overlay-cursor">▌</span></span>';
  document.body.appendChild(final);
}

function varGet(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}
function stimulationsEffect() {
  addClass({
    target: container,
    className: "screenShake",
    duration: 600,
  });
}
function lightningStrikes() {
  const emoji = container.querySelector(".emoji-display");
  const rect = emoji
    ? emoji.getBoundingClientRect()
    : {
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
      width: 0,
      height: 0,
    };

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // 放电的闪电数量
  const boltCount = 6;

  for (let i = 0; i < boltCount; i++) {
    // 错开时间发射，营造不规则的放电感
    setTimeout(() => {
      // 1. 创建 SVG 容器（无需宽高，允许内容溢出即可）
      const svgns = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgns, "svg");
      svg.style.position = "absolute";
      svg.style.left = `${centerX}px`;
      svg.style.top = `${centerY}px`;
      svg.style.overflow = "visible";
      svg.style.pointerEvents = "none";
      container.appendChild(svg);

      const path = document.createElementNS(svgns, "path");

      // 2. 计算随机方向和长度
      const angle = Math.random() * Math.PI * 2; // 360度随机方向
      const length = 150 + Math.random() * 150; // 闪电长度 (150px - 300px)
      const segments = 6 + Math.floor(Math.random() * 4); // 曲折的段数 (6-9段)
      const segmentLen = length / segments;

      // 3. 生成曲折的锯齿路径
      let d = "M 0 0"; // 从中心点开始
      for (let j = 1; j <= segments; j++) {
        // 主方向上的推进
        const r = segmentLen * j;
        const mainX = r * Math.cos(angle);
        const mainY = r * Math.sin(angle);

        // 计算垂直于主方向的随机偏移（这就是“曲折”的秘诀）
        const jitter = (Math.random() - 0.5) * 60; // 偏移幅度
        const perpAngle = angle + Math.PI / 2;
        const x = mainX + jitter * Math.cos(perpAngle);
        const y = mainY + jitter * Math.sin(perpAngle);

        d += ` L ${x} ${y}`;
      }

      // 4. 设置闪电样式
      path.setAttribute("d", d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "#FFD700"); // 闪电颜色 (金色)
      path.setAttribute("stroke-width", "3");
      // 用 CSS 滤镜加上外发光
      path.style.filter = "drop-shadow(0 0 10px #FFD700)";
      svg.appendChild(path);

      // 5. 动画：利用 strokeDashoffset 实现线条“生长”效果
      const pathLen = path.getTotalLength() || length * 1.5;

      path.animate(
        [
          { strokeDasharray: pathLen, strokeDashoffset: pathLen, opacity: 1 },
          { strokeDashoffset: 0, opacity: 1, offset: 0.2 }, // 前 20% 的时间快速“劈出”
          { strokeDashoffset: 0, opacity: 0 }, // 剩下的时间慢慢消散
        ],
        {
          duration: 400 + Math.random() * 300, // 持续时间随机，更自然
          easing: "ease-out",
        },
      ).onfinish = () => svg.remove(); // 动画结束销毁 DOM
    }, i * 80);
  }
}
function fragmentsShatter() {
  const emphasisEl = visuals.querySelector(".emphasis:last-child");
  if (!emphasisEl) return;

  const text = emphasisEl.textContent;
  emphasisEl.textContent = "";

  // 1. 先把字符拆分好，按正常样式渲染出来
  const spans = [...text].map((char) => {
    const span = document.createElement("span");
    // 兼容空格，防止空字符折叠
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    span.style.transition = "all 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
    emphasisEl.appendChild(span);
    return span;
  });

  // 2. 关键点：设置文字停留时间（毫秒）
  // 建议 800ms ~ 1200ms，既能看清 "FRAGMENTS"，又不会显得卡顿
  const HOLD_TIME = 800;

  // 3. 停留结束后，再统一触发飞散崩塌
  setTimeout(() => {
    spans.forEach((span) => {
      const x = (Math.random() - 0.5) * 300;
      const y = Math.random() * 300 + 150;
      const rot = (Math.random() - 0.5) * 720;
      span.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
      span.style.opacity = "0";
    });
  }, HOLD_TIME);
}
function drawHeartFormula() {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const scale = Math.min(width, height) * 0.015;
  const centerX = width / 2;
  const centerY = height / 2 - 20;

  const svgns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgns, "svg");
  svg.style.position = "absolute";
  svg.style.left = "0";
  svg.style.top = "0";
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.pointerEvents = "none";
  container.appendChild(svg);

  const pointsCount = 200;
  let pathData = "";

  for (let i = 0; i <= pointsCount; i++) {
    const t = (i / pointsCount) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) -
        Math.cos(4 * t));

    const px = centerX + x * scale;
    const py = centerY + y * scale;

    if (i === 0) {
      pathData += `M ${px} ${py}`;
    } else {
      pathData += ` L ${px} ${py}`;
    }
  }

  const path = document.createElementNS(svgns, "path");
  path.setAttribute("d", pathData);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "var(--love-color)");
  path.setAttribute("stroke-width", "3");
  path.setAttribute("stroke-linejoin", "round");
  path.style.filter = "drop-shadow(0 0 10px var(--love-color))";
  svg.appendChild(path);

  const pathLen = path.getTotalLength();
  path.animate(
    [
      { strokeDasharray: pathLen, strokeDashoffset: pathLen },
      { strokeDasharray: pathLen, strokeDashoffset: 0 },
    ],
    { duration: 1500, easing: "ease-in-out", fill: "forwards" },
  );

  const label = document.createElement("div");
  label.className = "heart-formula-label";
  label.innerHTML = "Formula: (x² + y² - 1)³ - x²y³ = 0";
  container.appendChild(label);

  setTimeout(() => {
    label.classList.add("show");
  }, 600);
}
function drawDimensionVisual() {
  const width = container.clientWidth;
  const height = container.clientHeight;
  const cx = width / 2;
  const cy = height / 2;

  const svgns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgns, "svg");
  svg.style.position = "absolute";
  svg.style.left = "0";
  svg.style.top = "0";
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.pointerEvents = "none";
  svg.style.opacity = "0";
  svg.style.transition = "opacity 0.8s ease-in-out";
  container.appendChild(svg);

  const baseSize = Math.min(width, height) * 0.30;
  const scaleX = 0.75 + Math.random() * 0.6;
  const scaleY = 0.75 + Math.random() * 0.6;
  const scaleZ = 0.75 + Math.random() * 0.6;

  const vertices = [
    [-scaleX, -scaleY, -scaleZ], [ scaleX, -scaleY, -scaleZ],
    [ scaleX,  scaleY, -scaleZ], [-scaleX,  scaleY, -scaleZ],
    [-scaleX, -scaleY,  scaleZ], [ scaleX, -scaleY,  scaleZ],
    [ scaleX,  scaleY,  scaleZ], [-scaleX,  scaleY,  scaleZ]
  ];

  const edges = [
    [0,1], [1,2], [2,3], [3,0],
    [4,5], [5,6], [6,7], [7,4],
    [0,4], [1,5], [2,6], [3,7]
  ];

  const edgePaths = edges.map(() => {
    const path = document.createElementNS(svgns, "path");
    path.setAttribute("stroke", "var(--love-color)");
    path.setAttribute("stroke-width", "2.5");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.style.filter = "drop-shadow(0 0 10px var(--love-color))";
    svg.appendChild(path);
    return path;
  });

  let angleX = Math.random() * Math.PI;
  let angleY = Math.random() * Math.PI;
  const speedX = 0.008 + Math.random() * 0.02;
  const speedY = 0.008 + Math.random() * 0.02;

  // 💡 紀錄動畫起始時間與每一條線的完成狀態
  const startTime = performance.now();
  const edgeFinished = new Array(edges.length).fill(false);

  // 緩動函數 (模擬 cubic-bezier(0.25, 1, 0.5, 1))
  function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
  }

  function render(now) {
    angleX += speedX;
    angleY += speedY;

    const projectedPoints = vertices.map(([x, y, z]) => {
      let y1 = y * Math.cos(angleX) - z * Math.sin(angleX);
      let z1 = y * Math.sin(angleX) + z * Math.cos(angleX);
      let x1 = x;

      let x2 = x1 * Math.cos(angleY) + z1 * Math.sin(angleY);
      let z2 = -x1 * Math.sin(angleY) + z1 * Math.cos(angleY);
      let y2 = y1;

      const distance = 3;
      const fov = 1 / (distance + z2 / 2);
      return [cx + x2 * baseSize * fov, cy + y2 * baseSize * fov];
    });

    edges.forEach(([start, end], idx) => {
      const [x1, y1] = projectedPoints[start];
      const [x2, y2] = projectedPoints[end];
      const path = edgePaths[idx];

      // 先更新路徑
      path.setAttribute("d", `M ${x1} ${y1} L ${x2} ${y2}`);

      // 💡 如果動畫尚未完成，根據「當前實時長度」計算 strokeDashoffset
      if (!edgeFinished[idx]) {
        const currentLen = path.getTotalLength();
        const delay = idx * 50;
        const duration = 600;
        const elapsed = now - startTime - delay;

        if (elapsed <= 0) {
          path.style.strokeDasharray = currentLen;
          path.style.strokeDashoffset = currentLen;
        } else if (elapsed < duration) {
          const progress = easeOutQuart(elapsed / duration);
          path.style.strokeDasharray = currentLen;
          path.style.strokeDashoffset = currentLen * (1 - progress);
        } else {
          // 動畫結束，清除 dash 樣式以維持最佳效能
          path.style.strokeDasharray = "";
          path.style.strokeDashoffset = "";
          edgeFinished[idx] = true;
        }
      }
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  requestAnimationFrame(() => {
    svg.style.opacity = "1";
  });
}

function drawCircumferenceCompass() {
  const width = container.clientWidth;
  const height = container.clientHeight;
  const cx = currentCircle.cx || width / 2;
  const cy = currentCircle.cy || height / 2;
  const r = currentCircle.r || Math.min(width, height) * 0.2;

  const svgns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgns, "svg");
  svg.setAttribute("class", "compass-svg");
  container.appendChild(svg);

  // 1. 劃過留下的紅色圓弧軌跡
  const arcPath = document.createElementNS(svgns, "path");
  arcPath.setAttribute("class", "compass-arc-path");
  svg.appendChild(arcPath);

  // 2. 旋轉虛線指針
  const pointerLine = document.createElementNS(svgns, "line");
  pointerLine.setAttribute("class", "compass-line");
  pointerLine.setAttribute("x1", cx);
  pointerLine.setAttribute("y1", cy);
  pointerLine.setAttribute("x2", cx);
  pointerLine.setAttribute("y2", cy);
  svg.appendChild(pointerLine);

  // 3. 圓心點
  const centerDot = document.createElementNS(svgns, "circle");
  centerDot.setAttribute("class", "compass-center-dot");
  centerDot.setAttribute("cx", cx);
  centerDot.setAttribute("cy", cy);
  svg.appendChild(centerDot);

  // 4. 指針末端點
  const tipDot = document.createElementNS(svgns, "circle");
  tipDot.setAttribute("class", "compass-tip-dot");
  tipDot.setAttribute("cx", cx);
  tipDot.setAttribute("cy", cy);
  svg.appendChild(tipDot);

  // 5. 動態標籤
  const label = document.createElement("div");
  label.className = "compass-label";
  label.textContent = "C ≈ 0.00 π";
  container.appendChild(label);

  // 起始點座標 (0 度方向，即 3 點鐘方向)
  const startX = cx + r;
  const startY = cy;

  // 勻速旋轉動畫 (1.8 秒)
  const duration = 1800;
  let startTime = null;

  function animate(now) {
    if (!startTime) {
      startTime = now;
      svg.style.opacity = "1";
      label.style.opacity = "1";
    }

    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const angle = progress * 2 * Math.PI; // 0 -> 2π 勻速角度

    // 當前末端座標
    const px = cx + r * Math.cos(angle);
    const py = cy + r * Math.sin(angle);

    // 更新紅色的劃過弧線路徑 (超過 180 度時大弧標誌 largeArcFlag 需為 1)
    const largeArcFlag = angle > Math.PI ? 1 : 0;
    if (progress > 0) {
      arcPath.setAttribute(
        "d",
        `M ${startX} ${startY} A ${r} ${r} 0 ${largeArcFlag} 1 ${px} ${py}`
      );
    }

    // 更新指針與末端點座標
    pointerLine.setAttribute("x2", px);
    pointerLine.setAttribute("y2", py);
    tipDot.setAttribute("cx", px);
    tipDot.setAttribute("cy", py);

    // 更新標籤數值與位置
    const piVal = (progress * 2).toFixed(2);
    label.textContent = `C ≈ ${piVal} π`;
    label.style.left = `${px + 15}px`;
    label.style.top = `${py - 20}px`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      label.textContent = "C = 2.00 π";
      // 完成後指針淡出，留下一圈紅色的完整圓周與標籤
      pointerLine.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 400,
        fill: "forwards",
      }).onfinish = () => pointerLine.remove();
    }
  }

  requestAnimationFrame(animate);
}