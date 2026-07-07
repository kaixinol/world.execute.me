const song = document.getElementById("song");
const overlay = document.getElementById("overlay");
const visuals = document.getElementById("visuals");
const container = document.getElementById("container");

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
  { time: 31.116, func: typeLine, args: { text: "Then I will give you my" } },
  { time: 32.682, func: showEmphasis, args: { text: "DIMENSION" } },
  {
    time: 33.412,
    func: typeLine,
    args: { text: "If I'm a circle", onComplete: drawCircle },
  },
  { time: 34.646, func: typeLine, args: { text: "Then I will give you my" } },
  { time: 36.287, func: showEmphasis, args: { text: "CIRCUMFERENCE" } },
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

  // Enhanced AC/DC section
  { time: 44.452, func: typeLine, args: { text: "Switch my current" } },
  {
    time: 45.50,
    func: typeLine,
    args: { text: "To AC, to DC", onComplete: currentSwitch },
  },
  { time: 47.672, func: typeLine, args: { text: "And then blind my vision" } },
  { time: 49.534, func: blindVision },
  { time: 50.0, func: typeLine, args: { text: "So dizzy, so dizzy" } },

  // Enhanced travel section
  { time: 51.363, func: typeLine, args: { text: "Oh we can travel" } },
  {
    time: 53.225,
    func: typeLine,
    args: { text: "To A.D to B.C", onComplete: timeTravel },
  },
  { time: 55.083, func: typeLine, args: { text: "And we can unite" } },
  {
    time: 56.916,
    func: typeLine,
    args: { text: "So deeply, so deeply", onComplete: uniteEffect },
  },

  // NEW: Clear screen for better readability on small screens
  { time: 58.75, func: clearScreenAndShapes },

  {
    time: 59.223,
    func: typeLine,
    args: { text: "If I can, If I can give you all the" },
  },
  { time: 61.958, func: showEmphasis, args: { text: "STIMULATIONS" } },
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
    args: { text: "If I'm the only god", onComplete: () => showEmoji("⚡") },
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
  { time: 120.86, func: showEmphasis, args: { text: "FRAGMENTS" } },
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
      duration: 12000,
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
    args: { text: "L O-O-O V E", className: "love" },
  },
  {
    time: 184.54,
    func: typeLine,
    args: { text: "I know the algebraic expression of" },
  },
  {
    time: 187.665,
    func: showEmphasis,
    args: { text: "L O-O-O V E", className: "love" },
  },

  { time: 188.483, func: clearScreen },
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
  overlay.classList.add("hidden");
  song.volume = 0.3;
  song
    .play()
    .then(() => {
      animationFrameId = requestAnimationFrame(update);
    })
    .catch((e) => {
      console.error("Audio playback failed:", e);
      overlay.innerHTML = `<span>Error: Could not play audio.</span><span>Is 'world.execute(me).ogg' in the same folder?</span>`;
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
  visuals.querySelectorAll(".cursor").forEach((c) => c.remove());

  const line = document.createElement("div");
  line.className = `line ${className}`;
  Object.assign(line.style, style);
  line.innerHTML = `<span class="prompt"># </span><span class="text"><span class="cursor">█</span></span>`;
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
      if (onComplete) onComplete();
    }
  }, 60);
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
  visuals.innerHTML = "";
}
function clearShapes() {
  document
    .querySelectorAll(
      ".shape, .emoji-display, .gender-symbol, .time-display, .molecule, .sound-wave, .year-display, .unite-effect, .trance-overlay, .power-line, .protection-shield, .object-particle"
    )
    .forEach((el) => el.remove());
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
  shield.style.left = "50%";
  shield.style.top = "50%";
  shield.style.transform = "translate(-50%, -50%)";
  shield.style.width = "300px";
  shield.style.height = "300px";
  container.appendChild(shield);
  setTimeout(() => shield.remove(), 2000);
}

// AC/DC Current Switch
function currentSwitch() {
  addClass({ target: container, className: "ac-mode", duration: 900 });
  setTimeout(() => {
    addClass({ target: container, className: "dc-mode", duration: 900 });
  }, 900);
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
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const unite = document.createElement("div");
      unite.className = "unite-effect";
      unite.style.left = `${30 + i * 20}%`;
      unite.style.top = `${40 + i * 10}%`;
      container.appendChild(unite);
      setTimeout(() => unite.remove(), 2000);
    }, i * 500);
  }
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
    canvas.style.transition = "opacity 1s";
    canvas.style.opacity = "0";
    setTimeout(() => canvas.remove(), 1000);
  }
}

function showCodeSnippet() {
  const el = document.createElement("div");
  el.className = "code-snippet";
  el.innerHTML = `> OBJECT CREATION...
<span class="token.keyword">class</span> <span class="token.class-name">Me</span> {
  <span class="token.function">constructor</span>(<span class="token.string">'you'</span>) {
    <span class="token.keyword">this</span>.world = <span class="token.string">'you'</span>;
    <span class="token.keyword">this</span>.existence = <span class="token.keyword">new</span> <span class="token.function">Promise</span>(...)
  }
}`;
  visuals.appendChild(el);

  // Add object creation particles
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const particle = document.createElement("div");
      particle.className = "object-particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = "100%";
      container.appendChild(particle);
    }, i * 100);
  }
}

function showProgressBar() {
  const container = document.createElement("div");
  container.className = "progress-bar-container";
  container.innerHTML = `> INITIALIZATION...<div class="progress-bar-bg"><div class="progress-bar"></div></div>`;
  visuals.appendChild(container);
  setTimeout(() => {
    container.querySelector(".progress-bar").style.width = "100%";
  }, 100);
}

function drawPoints() {
  clearShapes();
  for (let i = 0; i < 50; i++) {
    const p = document.createElement("div");
    p.className = "shape point";
    p.style.left = `${Math.random() * 90 + 5}%`;
    p.style.top = `${Math.random() * 90 + 5}%`;
    container.appendChild(p);
  }
}
function drawCircle() {
  clearShapes();
  const c = document.createElement("div");
  c.className = "shape circle";
  const s = Math.min(innerWidth, innerHeight) * 0.4;
  c.style.width = `${s}px`;
  c.style.height = `${s}px`;
  c.style.left = `calc(50% - ${s / 2}px)`;
  c.style.top = `calc(50% - ${s / 2}px)`;
  container.appendChild(c);
}
let sineWavePoints = [];
function drawSineWave() {
  clearShapes();
  sineWavePoints = [];
  const width = window.innerWidth * 0.8;
  for (let i = 0; i < 100; i++) {
    const dot = document.createElement("div");
    dot.className = "shape sine-dot";
    const x = (i / 100) * width + window.innerWidth * 0.1;
    const y = Math.sin((i / 100) * Math.PI * 4) * 80 + window.innerHeight / 2;
    sineWavePoints.push({ x, y, i });
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    container.appendChild(dot);
  }
}
function drawTangents() {
  for (let i = 0; i < 5; i++) {
    const p = sineWavePoints[Math.floor(Math.random() * sineWavePoints.length)];
    const tangent = document.createElement("div");
    tangent.className = "shape tangent-line";
    const derivative =
      (Math.cos((p.i / 100) * Math.PI * 4) * 4 * Math.PI) / 100;
    const angle =
      Math.atan((derivative * 80) / (window.innerWidth * 0.8)) *
      (180 / Math.PI);
    tangent.style.width = "150px";
    tangent.style.left = `${p.x}px`;
    tangent.style.top = `${p.y}px`;
    tangent.style.transform = `rotate(${angle}deg)`;
    container.appendChild(tangent);
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
  }
}

function rippleEffect() {
  const ripple = document.createElement("div");
  ripple.className = "shape circle";
  Object.assign(ripple.style, {
    borderColor: "var(--love-color)",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "10px",
    height: "10px",
    opacity: 1,
  });
  container.appendChild(ripple);
  let size = 10;
  const rippleInterval = setInterval(() => {
    size += 50;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.opacity = 1 - size / window.innerWidth;
    if (size > window.innerWidth) {
      clearInterval(rippleInterval);
      ripple.remove();
    }
  }, 30);
}

function showIsolation() {
  clearScreen();
  showEmphasis({ text: "ISOLATION", className: "error" });
}

function showBSOD() {
  const bsod = document.createElement("div");
  bsod.id = "bsod-screen";
  let dump = "Dumping physical memory to disk: ";
  for (let i = 0; i < 10; i++) dump += Math.floor(Math.random() * 10);

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
                    <p class="bsod-dump">${dump}</p>
                </div>`;
  container.appendChild(bsod);
}
function hideBSOD() {
  const bsod = document.getElementById("bsod-screen");
  if (bsod) {
    bsod.style.transition = "opacity 0.5s";
    bsod.style.opacity = "0";
    setTimeout(() => bsod.remove(), 500);
  }
}

// Extended EXECUTION spam
function executionSpamExtended({ duration }) {
  const endTime = Date.now() + duration;
  let count = 0;

  function spamStep() {
    if (Date.now() >= endTime) return;

    const e = document.createElement("div");
    e.className = "emphasis error";
    e.textContent = "EXECUTION";
    Object.assign(e.style, {
      position: "absolute",
      left: `${Math.random() * 60}%`,
      top: `${Math.random() * 70}%`,
      fontSize: `${Math.random() * 4 + 2}em`,
      transform: `rotate(${Math.random() * 40 - 20}deg)`,
      animation: "none",
      textShadow: "0 0 10px var(--error-color)",
      zIndex: count % 3 === 0 ? 20 : 15,
    });
    visuals.appendChild(e);

    setTimeout(() => e.remove(), Math.random() * 1000 + 500);

    count++;
    setTimeout(spamStep, Math.random() * 300 + 100);
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
<span class="token.keyword">while</span>(<span class="token.class-name">true</span>) {
  <span class="token.keyword">this</span>.<span class="token.function">love</span>(<span class="token.string">'you'</span>);
} <span class="love-cursor">❤</span>`;

  const cursor = el.querySelector(".love-cursor");
  setInterval(() => {
    cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
  }, 500);

  visuals.appendChild(el);
}

function finalExecution() {
  const final = document.createElement("div");
  final.id = "overlay";
  final.innerHTML =
    '<span>[execution@prts.space]$ <span id="overlay-cursor">_</span></span>';
  document.body.appendChild(final);
}

function varGet(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}
