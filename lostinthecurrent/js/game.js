/* ========================================
   LOST UNDER THE CURRENT - Game Logic
   ======================================== */

// ============ GAME CONFIG ============

// "DOYOUWANTTOBEMYGIRLFRIEND" = 25 letters
// Level 1: 5 starfish × 3 letters = 15
// Level 2: 2 relics: 5+5 = 10
// Level 3: treasure key (0 letters)
// Total: 25

const GAME_CONFIG = {
  totalTime: 300,
  maxLives: 3,
  misclicksPerLife: 3,
  levels: [
    {
      id: 1,
      name: 'Coral Garden',
      task: 'Find the 5 hidden starfish.',
      itemType: 'starfish',
      completionText: 'All starfish have been restored to the reef.',
      items: [
        {
          id: 's1',
          name: 'Royal Starfish',
          species: 'Astropecten articulatus',
          habitat: 'Western Atlantic, sandy bottoms (1-200m deep)',
          desc: 'Known for its striking purple and orange coloring, this starfish glides gracefully over sandy seabeds.',
          codeLetters: ['Y', 'D', 'O'],
          emoji: '\u2B50',
          img: 'assets/lvl1/starfish_orange_1.png',
          x: 15, y: 80
        },
        {
          id: 's2',
          name: 'Blue Linckia',
          species: 'Linckia laevigata',
          habitat: 'Indo-Pacific coral reefs, shallow tropical waters',
          desc: 'One of the most recognizable starfish in the world, its brilliant blue rivals the ocean itself.',
          codeLetters: ['W', 'U', 'O'],
          emoji: '\u2B50',
          img: 'assets/lvl1/starfish_blue.png',
          x: 60, y: 55
        },
        {
          id: 's3',
          name: 'Ochre Sea Star',
          species: 'Pisaster ochraceus',
          habitat: 'Pacific coast of North America, rocky intertidal zones',
          desc: 'A keystone predator that shapes entire ecosystems. Remove it, and the reef falls silent.',
          codeLetters: ['T', 'N', 'A'],
          emoji: '\u2B50',
          img: 'assets/lvl1/starfish_purple.png',
          x: 50, y: 85
        },
        {
          id: 's4',
          name: 'Crown-of-Thorns',
          species: 'Acanthaster planci',
          habitat: 'Indo-Pacific reefs, from Red Sea to Central Pacific',
          desc: 'Beautiful but dangerous. Its venomous spines protect one of the ocean\'s most feared coral predators.',
          codeLetters: ['B', 'O', 'T'],
          emoji: '\u2B50',
          img: 'assets/lvl1/starfish_3.png',
          x: 35, y: 72
        },
        {
          id: 's5',
          name: 'Cushion Star',
          species: 'Culcita novaeguineae',
          habitat: 'Indo-Pacific reefs, from East Africa to Hawaii',
          desc: 'Soft and pillow-shaped, this gentle star is the heart of the reef. Without it, the garden sleeps.',
          codeLetters: ['Y', 'M', 'E'],
          emoji: '\u2B50',
          img: 'assets/lvl1/starfish_4.png',
          x: 62, y: 78
        },
      ],
      dangers: [
        { id: 'd1', name: 'Sea Urchin', x: 35, y: 88, size: 28 },
        { id: 'd2', name: 'Sea Urchin', x: 60, y: 85, size: 25 },
      ]
    },
    {
      id: 2,
      name: 'Sunken Kingdom',
      task: 'Find the hidden treasure chest and diving goggles.',
      itemType: 'relic',
      completionText: 'The relics of the sunken kingdom have been recovered.',
      requireCreature: true,
      items: [
        {
          id: 'r1',
          name: 'Sunken Treasure Chest',
          species: 'Ancient Pirate Chest',
          habitat: 'Buried beneath the ruins of a forgotten kingdom',
          desc: 'Encrusted with barnacles and coral, this chest has waited centuries to be found.',
          codeLetters: ['R', 'I', 'G', 'F', 'L'],
          emoji: '\uD83D\uDCE6',
          img: 'assets/lvl2/treasure_chest.png',
          size: 80,
          x: 35, y: 82
        },
        {
          id: 'r2',
          name: 'Explorer\'s Goggles',
          species: 'Deep-sea Diving Mask',
          habitat: 'Left behind by a diver who ventured too deep',
          desc: 'Through these lenses, the ocean reveals its secrets. Who left them here, and why?',
          codeLetters: ['E', 'I', 'R', 'D', 'N'],
          emoji: '\uD83E\uDD3F',
          img: 'assets/lvl2/diving_goggles.png',
          size: 55,
          x: 68, y: 58
        },
      ],
      dangers: [
        { id: 'd3', name: 'Moray Eel', x: 50, y: 75, size: 35 },
      ],
      creature: {
        id: 'thresher-shark',
        name: 'Thresher Shark',
        img: 'assets/lvl2/thresher_shark.png',
        funFact: 'Thresher sharks use their extraordinary tail \u2014 which can be as long as their entire body \u2014 like a whip to stun schools of fish before eating them.',
        trivia: {
          question: 'What do thresher sharks use their long tail for?',
          options: [
            'Attracting mates with dances',
            'Whipping and stunning prey',
            'Steering through currents',
            'Camouflage in kelp forests'
          ],
          correctIndex: 1,
          correctMsg: 'Correct! +15 seconds bonus!',
          wrongMsg: 'Not quite! That cost you a life...',
        }
      }
    },
    {
      id: 3,
      name: 'The Abyss',
      task: 'Find the treasure key.',
      itemType: 'key',
      completionText: 'The key to the pirate\'s treasure is finally yours.',
      items: [
        {
          id: 'k1',
          name: 'Treasure Key',
          species: 'Golden Skeleton Key',
          habitat: 'Guarded in the deepest trench, where light has never reached',
          desc: 'The ocean\'s final gift. The key to everything that matters.',
          codeLetters: [],
          emoji: '\uD83D\uDD11',
          img: 'assets/lvl3/treasurekey.png',
          x: 45, y: 72
        },
      ],
      dangers: [
        { id: 'd4', name: 'Anglerfish', x: 80, y: 55, size: 40 },
      ],
      requireAllCreatures: true,
      creatures: [
        {
          id: 'orca',
          name: 'Orca',
          img: 'assets/lvl3/orca.png',
          funFact: 'Orcas are actually the largest members of the dolphin family, not whales! They\'re apex predators found in every ocean on Earth, and each pod has its own unique dialect of calls.',
          trivia: {
            question: 'Orcas are actually the largest member of which family?',
            options: [
              'The whale family',
              'The shark family',
              'The dolphin family',
              'The seal family'
            ],
            correctIndex: 2,
            correctMsg: 'Correct! +15 seconds bonus!',
            wrongMsg: 'Oh no! That cost you a life...',
          }
        },
        {
          id: 'humpback',
          name: 'Humpback Whale',
          img: 'assets/lvl3/humpback.png',
          funFact: 'Humpback whales are known for their spectacular breaching, launching their entire 40-ton body out of the water. They also travel one of the longest migration routes of any mammal — up to 16,000 km round trip each year.',
          trivia: {
            question: 'What is unique about humpback whale songs?',
            options: [
              'Only females sing to attract mates',
              'Each pod has its own evolving dialect',
              'They can only sing in warm waters',
              'Their songs are ultrasonic, inaudible to humans'
            ],
            correctIndex: 1,
            correctMsg: 'Correct! +15 seconds bonus!',
            wrongMsg: 'Oh no! That cost you a life...',
          }
        }
      ]
    }
  ]
};

// ============ GAME STATE ============

let gameState = {
  currentScreen: 'intro',
  currentLevel: 0,
  lives: GAME_CONFIG.maxLives,
  timeRemaining: GAME_CONFIG.totalTime,
  misclicks: 0,
  inventory: [],
  foundItems: { 1: [], 2: [], 3: [] },
  collectedLetters: [],
  timerInterval: null,
  isPaused: false,
  creaturesClicked: {},
};

// ============ DOM HELPERS ============

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ============ SVG TEMPLATES ============

function doubloonSVG(color) {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="cg_${color.replace('#','')}" cx="40%" cy="40%">
        <stop offset="0%" stop-color="${lighten(color, 40)}"/>
        <stop offset="100%" stop-color="${color}"/>
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="42" fill="url(#cg_${color.replace('#','')})"
      stroke="${darken(color, 30)}" stroke-width="3"/>
    <circle cx="50" cy="50" r="34" fill="none"
      stroke="${darken(color, 15)}" stroke-width="1.5"/>
    <text x="50" y="58" text-anchor="middle" font-size="28" font-weight="bold"
      fill="${darken(color, 30)}" font-family="serif">A</text>
  </svg>`;
}

function pearlSVG(color) {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="pg_${color.replace('#','')}" cx="35%" cy="35%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="50%" stop-color="${color}"/>
        <stop offset="100%" stop-color="${darken(color, 30)}"/>
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="38" fill="url(#pg_${color.replace('#','')})" opacity="0.9"/>
    <ellipse cx="38" cy="38" rx="12" ry="8" fill="rgba(255,255,255,0.4)" transform="rotate(-30 38 38)"/>
  </svg>`;
}

function seaUrchinSVG() {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="20" fill="#1a0a1a"/>
    ${Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * Math.PI * 2;
      const x1 = 50 + Math.cos(angle) * 20;
      const y1 = 50 + Math.sin(angle) * 20;
      const x2 = 50 + Math.cos(angle) * (35 + Math.random() * 10);
      const y2 = 50 + Math.sin(angle) * (35 + Math.random() * 10);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#2a1020" stroke-width="2.5" stroke-linecap="round"/>`;
    }).join('')}
    <circle cx="50" cy="50" r="12" fill="#2a1530"/>
  </svg>`;
}

function morayEelSVG() {
  return `<svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,30 Q30,10 50,25 Q70,40 90,20 Q105,10 115,25"
      fill="none" stroke="#2a3a20" stroke-width="12" stroke-linecap="round"/>
    <path d="M10,30 Q30,10 50,25 Q70,40 90,20 Q105,10 115,25"
      fill="none" stroke="#3a4a28" stroke-width="8" stroke-linecap="round"/>
    <circle cx="112" cy="23" r="3" fill="#88aa44"/>
    <circle cx="112" cy="23" r="1.5" fill="black"/>
    <path d="M118,26 L125,24 L118,28" fill="#3a4a28"/>
  </svg>`;
}

function anglerfishSVG() {
  return `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="55" cy="45" rx="35" ry="25" fill="#0a0a18"/>
    <ellipse cx="55" cy="45" rx="30" ry="20" fill="#121225"/>
    <circle cx="40" cy="38" r="5" fill="#1a1a40"/>
    <circle cx="40" cy="38" r="2.5" fill="#00ccff" opacity="0.6"/>
    <path d="M30,55 Q35,65 45,60 Q50,55 55,62 Q60,55 65,60 Q75,65 80,55"
      fill="none" stroke="#0a0a18" stroke-width="2"/>
    <line x1="35" y1="57" x2="38" y2="62" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
    <line x1="48" y1="58" x2="51" y2="63" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
    <line x1="58" y1="57" x2="61" y2="62" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
    <path d="M42,20 Q35,5 50,8" fill="none" stroke="#1a1a30" stroke-width="1.5"/>
    <circle cx="50" cy="8" r="4" fill="#00ffaa" opacity="0.5">
      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/>
    </circle>
    <path d="M88,40 Q100,30 95,45 Q100,55 88,50" fill="#0a0a18"/>
  </svg>`;
}

function thresherSharkSVG() {
  return `<svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
    <!-- Body -->
    <ellipse cx="130" cy="50" rx="70" ry="22" fill="#4a5568"/>
    <ellipse cx="130" cy="50" rx="65" ry="18" fill="#5a6578"/>
    <!-- Belly -->
    <ellipse cx="130" cy="56" rx="55" ry="12" fill="#8a9aaa"/>
    <!-- Head -->
    <ellipse cx="195" cy="48" rx="25" ry="16" fill="#4a5568"/>
    <ellipse cx="195" cy="52" rx="20" ry="10" fill="#8a9aaa"/>
    <!-- Eye -->
    <circle cx="205" cy="45" r="4" fill="#1a1a2a"/>
    <circle cx="206" cy="44" r="1.5" fill="#334"/>
    <!-- Mouth -->
    <path d="M215,52 Q220,55 215,58" fill="none" stroke="#3a3a4a" stroke-width="1.5"/>
    <!-- Dorsal fin -->
    <path d="M140,30 L128,10 L120,30" fill="#4a5568"/>
    <!-- Pectoral fins -->
    <path d="M155,62 L170,80 L145,68" fill="#4a5568"/>
    <path d="M110,62 L95,78 L108,68" fill="#4a5568"/>
    <!-- THE FAMOUS LONG TAIL -->
    <path d="M60,50 Q30,35 5,10 Q15,30 10,50 Q30,60 60,55" fill="#4a5568"/>
    <!-- Gill slits -->
    <line x1="178" y1="42" x2="178" y2="52" stroke="#3a4558" stroke-width="1"/>
    <line x1="174" y1="41" x2="174" y2="53" stroke="#3a4558" stroke-width="1"/>
    <line x1="170" y1="42" x2="170" y2="54" stroke="#3a4558" stroke-width="1"/>
  </svg>`;
}

function orcaSVG() {
  return `<svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
    <!-- Body -->
    <ellipse cx="150" cy="65" rx="90" ry="35" fill="#1a1a2a"/>
    <!-- White belly patch -->
    <ellipse cx="160" cy="75" rx="60" ry="20" fill="#f0f0f0"/>
    <!-- White eye patch -->
    <ellipse cx="220" cy="55" rx="12" ry="8" fill="#f0f0f0" transform="rotate(-10 220 55)"/>
    <!-- Eye -->
    <circle cx="225" cy="55" r="4" fill="#1a1a2a"/>
    <!-- Saddle patch (gray behind dorsal) -->
    <ellipse cx="130" cy="48" rx="25" ry="12" fill="#3a3a4a"/>
    <!-- Dorsal fin (tall!) -->
    <path d="M145,32 L140,0 L125,30" fill="#1a1a2a"/>
    <!-- Head shape -->
    <ellipse cx="230" cy="62" rx="30" ry="22" fill="#1a1a2a"/>
    <ellipse cx="240" cy="72" rx="18" ry="10" fill="#f0f0f0"/>
    <!-- Mouth line -->
    <path d="M255,65 Q260,68 255,72" fill="none" stroke="#111" stroke-width="1.5"/>
    <!-- Pectoral fin -->
    <path d="M180,82 L200,110 L165,90" fill="#1a1a2a"/>
    <!-- Tail fluke -->
    <path d="M60,60 Q40,40 20,35 Q35,55 30,65 Q35,75 20,90 Q45,80 60,70" fill="#1a1a2a"/>
    <!-- White chin/jaw -->
    <ellipse cx="245" cy="76" rx="10" ry="5" fill="#f0f0f0"/>
  </svg>`;
}

// ============ COLOR UTILS ============

function lighten(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + Math.round(255 * percent / 100));
  const g = Math.min(255, ((num >> 8) & 0x00FF) + Math.round(255 * percent / 100));
  const b = Math.min(255, (num & 0x0000FF) + Math.round(255 * percent / 100));
  return `rgb(${r},${g},${b})`;
}

function darken(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - Math.round(255 * percent / 100));
  const g = Math.max(0, ((num >> 8) & 0x00FF) - Math.round(255 * percent / 100));
  const b = Math.max(0, (num & 0x0000FF) - Math.round(255 * percent / 100));
  return `rgb(${r},${g},${b})`;
}

// ============ SCREEN MANAGEMENT ============

function showScreen(screenId) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  const screen = $(`#screen-${screenId}`);
  if (screen) screen.classList.add('active');
  gameState.currentScreen = screenId;
}

function showHUD() { $('#hud').classList.remove('hidden'); }
function hideHUD() { $('#hud').classList.add('hidden'); }

function showModal(modalId) {
  $(`#modal-${modalId}`).classList.remove('hidden');
  pauseTimer();
}

function hideModal(modalId) {
  $(`#modal-${modalId}`).classList.add('hidden');
  resumeTimer();
}

// ============ BUBBLES ============

function initBubbles() {
  const container = $('#bubbles-container');
  for (let i = 0; i < 15; i++) createBubble(container);
  setInterval(() => createBubble(container), 2000);
}

function createBubble(container) {
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  const size = 4 + Math.random() * 12;
  bubble.style.width = size + 'px';
  bubble.style.height = size + 'px';
  bubble.style.left = Math.random() * 100 + '%';
  bubble.style.bottom = '-20px';
  bubble.style.animationDuration = (8 + Math.random() * 12) + 's';
  bubble.style.animationDelay = Math.random() * 5 + 's';
  container.appendChild(bubble);
  setTimeout(() => bubble.remove(), 25000);
}

// ============ TIMER ============

function startTimer() {
  if (gameState.timerInterval) clearInterval(gameState.timerInterval);
  gameState.isPaused = false;
  gameState.timerInterval = setInterval(() => {
    if (gameState.isPaused) return;
    gameState.timeRemaining--;
    updateTimerDisplay();
    if (gameState.timeRemaining <= 0) {
      clearInterval(gameState.timerInterval);
      gameOver();
    }
  }, 1000);
}

function pauseTimer() { gameState.isPaused = true; }
function resumeTimer() { gameState.isPaused = false; }

function updateTimerDisplay() {
  const mins = Math.floor(gameState.timeRemaining / 60);
  const secs = gameState.timeRemaining % 60;
  $('#hud-timer').textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  if (gameState.timeRemaining <= 30) {
    $('#hud-timer').classList.add('urgent');
  } else {
    $('#hud-timer').classList.remove('urgent');
  }
}

// ============ LIVES ============

function loseLife() {
  if (gameState.lives <= 0) return;
  gameState.lives--;
  updateLivesDisplay();
  const flash = $('#danger-flash');
  flash.classList.remove('hidden');
  setTimeout(() => flash.classList.add('hidden'), 400);
  if (gameState.lives <= 0) {
    setTimeout(() => gameOver(), 500);
  }
}

function updateLivesDisplay() {
  $$('.heart').forEach((heart, i) => {
    heart.className = i < gameState.lives ? 'heart full' : 'heart empty';
  });
}

// ============ LEVEL MANAGEMENT ============

function startLevel(levelIndex) {
  gameState.currentLevel = levelIndex;
  const level = GAME_CONFIG.levels[levelIndex];

  showScreen('level-intro');
  hideHUD();

  $('#level-intro-number').textContent = `LVL ${level.id}`;
  $('#level-intro-name').textContent = level.name;
  $('#level-intro-task').textContent = level.task;

  setTimeout(() => {
    showScreen('game');
    showHUD();
    setupLevel(level);
    if (!gameState.timerInterval || gameState.timeRemaining === GAME_CONFIG.totalTime) {
      startTimer();
    } else {
      resumeTimer();
    }
  }, 2500);
}

function setupLevel(level) {
  $('#hud-level-number').textContent = `LVL ${level.id}`;
  $('#hud-level-name').textContent = level.name;
  $('#hud-task').textContent = level.task;
  $('#hud-count').textContent = gameState.foundItems[level.id].length;
  gameState.misclicks = 0;

  // Show correct level scene
  $$('.level-scene').forEach(s => s.style.display = 'none');
  $(`#level-${level.id}`).style.display = 'block';

  // Place hidden items
  const itemsContainer = $(`#scene-items-${level.id}`);
  itemsContainer.innerHTML = '';

  level.items.forEach(item => {
    if (gameState.foundItems[level.id].includes(item.id)) return;

    const el = document.createElement('div');
    el.className = `hidden-item ${level.itemType}`;
    el.dataset.itemId = item.id;
    el.style.left = item.x + '%';
    el.style.top = item.y + '%';
    el.style.transform = 'translate(-50%, -50%)';

    if (item.size) {
      el.style.width = item.size + 'px';
      el.style.height = item.size + 'px';
    }

    if (item.img) {
      // Use real images
      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.name;
      img.draggable = false;
      el.appendChild(img);
    } else if (level.itemType === 'doubloon') {
      el.innerHTML = doubloonSVG(item.color || '#ffd700');
    } else if (level.itemType === 'pearl') {
      const color = item.color || '#e0e8ff';
      el.innerHTML = pearlSVG(color);
      el.style.filter = `drop-shadow(0 0 6px ${color})`;
      el.style.opacity = '0.35';
    }

    itemsContainer.appendChild(el);
  });

  // Place danger creatures
  const dangersContainer = $(`#scene-dangers-${level.id}`);
  dangersContainer.innerHTML = '';

  level.dangers.forEach(danger => {
    const el = document.createElement('div');
    el.className = 'danger-creature';
    el.dataset.dangerId = danger.id;
    el.style.left = danger.x + '%';
    el.style.top = danger.y + '%';
    el.style.width = danger.size + 'px';
    el.style.height = danger.size + 'px';
    el.style.transform = 'translate(-50%, -50%)';

    if (danger.name === 'Sea Urchin') {
      el.innerHTML = seaUrchinSVG();
    } else if (danger.name === 'Moray Eel') {
      el.innerHTML = morayEelSVG();
      el.style.width = '80px';
      el.style.height = '40px';
    } else if (danger.name === 'Anglerfish') {
      el.innerHTML = anglerfishSVG();
      el.style.width = (danger.size * 2.5) + 'px';
      el.style.height = (danger.size * 1.6) + 'px';
    }

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      onDangerHit(danger, el);
    });

    dangersContainer.appendChild(el);
  });

  // Setup swimming creatures
  const allCreatures = [];
  if (level.creature) allCreatures.push(level.creature);
  if (level.creatures) allCreatures.push(...level.creatures);
  allCreatures.forEach(c => setupSwimmingCreature(c));
}

// ============ SWIMMING CREATURES (Trivia) ============

function setupSwimmingCreature(creature) {
  const el = $(`#${creature.id}`);
  if (!el) return;

  // Keep the HTML img if it exists, don't overwrite with SVG
  el.style.display = 'block';

  // Remove old listener by cloning
  const newEl = el.cloneNode(true);
  el.parentNode.replaceChild(newEl, el);

  if (!gameState.creaturesClicked[creature.id]) {
    newEl.style.cursor = 'pointer';
    newEl.style.opacity = '';
  } else {
    newEl.style.opacity = '0.3';
    newEl.style.cursor = 'default';
  }
}

function onCreatureClicked(creature, el) {
  gameState.creaturesClicked[creature.id] = true;

  showModal('trivia');

  // Populate trivia card
  if (creature.img) {
    $('#trivia-creature-img').innerHTML = `<img src="${creature.img}" alt="${creature.name}" style="width:100%;height:100%;object-fit:contain;">`;
  }

  $('#trivia-creature-name').textContent = creature.name;
  $('#trivia-fun-fact').textContent = creature.funFact;
  $('#trivia-question').textContent = creature.trivia.question;

  const optionsContainer = $('#trivia-options');
  optionsContainer.innerHTML = '';
  const result = $('#trivia-result');
  result.classList.add('hidden');
  result.className = 'trivia-result hidden';

  creature.trivia.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'trivia-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      onTriviaAnswer(creature, i, btn, optionsContainer);
    });
    optionsContainer.appendChild(btn);
  });
}

function onTriviaAnswer(creature, selectedIndex, selectedBtn, container) {
  const trivia = creature.trivia;
  const isCorrect = selectedIndex === trivia.correctIndex;

  // Disable all options
  container.querySelectorAll('.trivia-option').forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === trivia.correctIndex) btn.classList.add('correct');
    if (i === selectedIndex && !isCorrect) btn.classList.add('wrong');
  });

  const result = $('#trivia-result');
  result.classList.remove('hidden');

  if (isCorrect) {
    result.textContent = trivia.correctMsg;
    result.className = 'trivia-result correct-result';
    gameState.timeRemaining = Math.min(gameState.timeRemaining + 15, GAME_CONFIG.totalTime);
    updateTimerDisplay();
  } else {
    result.textContent = trivia.wrongMsg;
    result.className = 'trivia-result wrong-result';
    loseLife();
  }

  // Auto-close after delay
  setTimeout(() => {
    hideModal('trivia');
    const el = $(`#${creature.id}`);
    if (el) {
      el.style.opacity = '0.3';
      el.style.cursor = 'default';
    }

    // If we were awaiting creature trivia to proceed, check if all requirements met
    if (gameState.awaitingCreature) {
      const level = GAME_CONFIG.levels[gameState.currentLevel];
      if (gameState.foundItems[level.id].length >= level.items.length) {
        let allDone = true;
        if (level.requireCreature && level.creature && !gameState.creaturesClicked[level.creature.id]) {
          allDone = false;
        }
        if (level.requireAllCreatures && level.creatures) {
          const unclicked = level.creatures.filter(c => !gameState.creaturesClicked[c.id]);
          if (unclicked.length > 0) {
            allDone = false;
            showMisclickWarning('Now find the ' + unclicked[0].name + '!');
          }
        }
        if (allDone) {
          gameState.awaitingCreature = false;
          setTimeout(() => showLevelComplete(level), 300);
        }
      }
    }
  }, 2000);
}

// ============ ITEM INTERACTION ============

function onItemFound(level, item, element) {
  element.classList.add('found');

  gameState.foundItems[level.id].push(item.id);
  const foundCount = gameState.foundItems[level.id].length;
  $('#hud-count').textContent = foundCount;

  // Collect code letters
  if (item.codeLetters && item.codeLetters.length > 0) {
    gameState.collectedLetters.push(...item.codeLetters);
  }

  gameState.inventory.push({ levelId: level.id, item: item });

  setTimeout(() => showItemCard(item, level.itemType), 400);
}

function showItemCard(item, itemType) {
  showModal('item-found');

  // Card image
  if (item.img) {
    $('#card-image').innerHTML = `<img src="${item.img}" style="width:120px;height:120px;object-fit:contain;border-radius:12px;filter:drop-shadow(0 0 12px rgba(255,215,0,0.4));" alt="${item.name}">`;
  } else if (itemType === 'doubloon') {
    $('#card-image').innerHTML = `<div style="width:80px;height:80px">${doubloonSVG(item.color || '#ffd700')}</div>`;
  } else if (itemType === 'pearl') {
    $('#card-image').innerHTML = `<div style="width:80px;height:80px">${pearlSVG(item.color || '#e0e8ff')}</div>`;
  }

  $('#card-name').textContent = item.name;
  $('#card-species').textContent = item.species || '';
  $('#card-habitat').textContent = item.habitat ? `\u{1F30A} ${item.habitat}` : '';
  $('#card-desc').textContent = item.desc;

  // Code letters
  const lettersContainer = $('#card-code-letters');
  lettersContainer.innerHTML = '';
  if (item.codeLetters && item.codeLetters.length > 0) {
    item.codeLetters.forEach((letter, i) => {
      const letterEl = document.createElement('span');
      letterEl.className = 'code-letter';
      letterEl.textContent = letter;
      letterEl.style.animationDelay = (i * 0.15) + 's';
      lettersContainer.appendChild(letterEl);
    });
  }
}

function collectCard() {
  hideModal('item-found');
  updateInventoryBar();

  const level = GAME_CONFIG.levels[gameState.currentLevel];
  if (gameState.foundItems[level.id].length >= level.items.length) {
    // Check if creature trivia is required
    if (level.requireCreature && level.creature && !gameState.creaturesClicked[level.creature.id]) {
      showMisclickWarning('Find and click the ' + level.creature.name + ' to proceed!');
      gameState.awaitingCreature = true;
    } else if (level.requireAllCreatures && level.creatures) {
      const unclicked = level.creatures.filter(c => !gameState.creaturesClicked[c.id]);
      if (unclicked.length > 0) {
        showMisclickWarning('Find and click the ' + unclicked[0].name + ' to proceed!');
        gameState.awaitingCreature = true;
      } else {
        setTimeout(() => showLevelComplete(level), 300);
      }
    } else {
      setTimeout(() => showLevelComplete(level), 300);
    }
  }
}

function updateInventoryBar() {
  const bar = $('#hud-inventory');
  bar.innerHTML = '';
  gameState.inventory.forEach((entry, i) => {
    const card = document.createElement('div');
    card.className = 'inventory-card';
    card.textContent = entry.item.emoji || '\u2726';
    card.title = entry.item.name;
    card.style.animationDelay = (i * 0.05) + 's';
    bar.appendChild(card);
  });
}

// ============ DANGER INTERACTION ============

function onDangerHit(danger, element) {
  element.classList.add('triggered');
  loseLife();
}

// ============ MISCLICK HANDLING ============

function onSceneMisclick(e) {
  if (gameState.currentScreen !== 'game') return;
  if (gameState.isPaused) return;

  showClickRipple(e.clientX, e.clientY, true);
  gameState.misclicks++;

  if (gameState.misclicks >= GAME_CONFIG.misclicksPerLife) {
    gameState.misclicks = 0;
    loseLife();
    showMisclickWarning('Careful! You lost a life.');
  } else {
    const remaining = GAME_CONFIG.misclicksPerLife - gameState.misclicks;
    showMisclickWarning(`Miss! ${remaining} more and you lose a life.`);
  }
}

function showClickRipple(x, y, isMiss) {
  const ripple = $('#click-ripple');
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.className = 'click-ripple' + (isMiss ? ' miss' : '');
  void ripple.offsetWidth;
  ripple.classList.add('show');
  setTimeout(() => ripple.classList.remove('show'), 500);
}

function showMisclickWarning(text) {
  const warning = $('#misclick-warning');
  warning.classList.remove('hidden');
  $('#misclick-text').textContent = text;
  setTimeout(() => warning.classList.add('hidden'), 1500);
}

// ============ LEVEL COMPLETE ============

function showLevelComplete(level) {
  pauseTimer();
  showModal('level-complete');

  $('#level-complete-subtitle').textContent = level.completionText;

  // Show the letters collected in this level
  const levelLetters = [];
  level.items.forEach(item => {
    if (item.codeLetters) levelLetters.push(...item.codeLetters);
  });

  const fragment = $('#code-fragment');
  fragment.textContent = levelLetters.length > 0 ? levelLetters.join('  ') : '\u2714 Complete';

  const cardsContainer = $('#level-complete-cards');
  cardsContainer.innerHTML = '';
  level.items.forEach(item => {
    const miniCard = document.createElement('div');
    miniCard.className = 'inventory-card';
    miniCard.textContent = item.emoji || '\u2726';
    miniCard.title = item.name;
    cardsContainer.appendChild(miniCard);
  });
}

function onLevelContinue() {
  hideModal('level-complete');
  const nextLevel = gameState.currentLevel + 1;
  if (nextLevel < GAME_CONFIG.levels.length) {
    startLevel(nextLevel);
  } else {
    hideHUD();
    showTreasureScreen();
  }
}

// ============ TREASURE CHEST ============

function showTreasureScreen() {
  clearInterval(gameState.timerInterval);
  showScreen('treasure');

  const codesContainer = $('#treasure-codes');
  codesContainer.innerHTML = '';

  // Show shuffled letter tiles
  const lettersDiv = document.createElement('div');
  lettersDiv.className = 'treasure-letters';

  const shuffled = [...gameState.collectedLetters].sort(() => Math.random() - 0.5);
  shuffled.forEach(letter => {
    const tile = document.createElement('span');
    tile.className = 'treasure-letter';
    tile.textContent = letter;
    lettersDiv.appendChild(tile);
  });

  codesContainer.appendChild(lettersDiv);

  // Reset decode area
  $('#decode-area').style.display = '';
  $('#decoded-message').classList.add('hidden');
  $('#decoded-message').innerHTML = '';
}

function onDecode() {
  const btn = $('#btn-decode');
  btn.disabled = true;
  btn.textContent = 'DECODING...';
  btn.classList.add('decoding');

  const tiles = $$('.treasure-letter');
  const target = 'DOYOUWANTTOBEMYGIRLFRIEND';
  const container = $('.treasure-letters');
  const containerRect = container.getBoundingClientRect();

  // Phase 1: tiles start glowing and trembling
  tiles.forEach((tile, i) => {
    tile.style.transition = 'none';
    tile.classList.add('trembling');
    tile.style.animationDelay = (i * 0.03) + 's';
  });

  // Phase 2: after 1s, rearrange tiles to spell the message
  setTimeout(() => {
    // Record current positions
    const tileData = [];
    tiles.forEach(tile => {
      const rect = tile.getBoundingClientRect();
      tileData.push({
        el: tile,
        letter: tile.textContent,
        startX: rect.left - containerRect.left,
        startY: rect.top - containerRect.top,
      });
    });

    // Match each target letter to an available tile
    const used = new Set();
    const ordered = [];
    for (const ch of target) {
      for (let i = 0; i < tileData.length; i++) {
        if (!used.has(i) && tileData[i].letter === ch) {
          used.add(i);
          ordered.push(tileData[i]);
          break;
        }
      }
    }

    // Fix all tiles at their current absolute position
    tileData.forEach(td => {
      td.el.style.position = 'absolute';
      td.el.style.left = td.startX + 'px';
      td.el.style.top = td.startY + 'px';
      td.el.classList.remove('trembling');
    });
    container.style.position = 'relative';
    container.style.height = '200px';

    // Calculate target grid positions (with word spacing)
    const words = 'DO YOU WANT TO BE MY GIRLFRIEND'.split(' ');
    const tileW = 28, tileH = 34, gap = 4, wordGap = 14;
    const totalW = words.reduce((sum, w) => sum + w.length * (tileW + gap) + wordGap, -wordGap);
    let curX = Math.max(0, (containerRect.width - totalW) / 2);
    const curY = 80;
    const targetPositions = [];

    words.forEach((word, wi) => {
      for (const ch of word) {
        targetPositions.push({ x: curX, y: curY });
        curX += tileW + gap;
      }
      curX += wordGap;
    });

    // Animate each tile to its target position
    ordered.forEach((td, i) => {
      setTimeout(() => {
        td.el.style.transition = 'left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        td.el.style.left = targetPositions[i].x + 'px';
        td.el.style.top = targetPositions[i].y + 'px';
        td.el.classList.add('decoded');
      }, i * 60);
    });

    // Phase 3: after all tiles land, show the full message and unlock
    const totalAnimTime = ordered.length * 60 + 800;
    setTimeout(() => {
      // Flash all tiles
      ordered.forEach(td => td.el.classList.add('flash'));

      setTimeout(() => {
        $('#decode-area').style.display = 'none';
        const msg = $('#decoded-message');
        msg.classList.remove('hidden');
        msg.innerHTML = '<span class="decoded-text">Do you wanna be my girlfriend?</span>';

        // Unlock the chest
        $('#treasure-chest').classList.add('unlocked');
        setTimeout(() => {
          showScreen('proposal');
          initProposal();
        }, 2500);
      }, 1000);
    }, totalAnimTime);

  }, 1200);
}

// ============ PROPOSAL ============

function initProposal() {
  const container = $('#proposal-hearts-container');
  container.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = ['\u2764\uFE0F', '\uD83D\uDC95', '\uD83D\uDC97', '\uD83D\uDC96', '\u2728'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
    heart.style.animationDuration = (3 + Math.random() * 4) + 's';
    heart.style.animationDelay = Math.random() * 6 + 's';
    container.appendChild(heart);
  }

  setInterval(() => {
    if (gameState.currentScreen !== 'proposal') return;
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = ['\u2764\uFE0F', '\uD83D\uDC95', '\uD83D\uDC97', '\uD83D\uDC96', '\u2728'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
    heart.style.animationDuration = (3 + Math.random() * 4) + 's';
    heart.style.animationDelay = '0s';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
  }, 800);
}

// No button dodge
let noAttempts = 0;

function onNoHover() {
  noAttempts++;
  const btn = $('#btn-no');

  if (noAttempts >= 5) {
    btn.textContent = 'Fine... Yes!';
    btn.style.position = 'relative';
    btn.style.left = '0px';
    btn.style.top = '0px';
    btn.onclick = onYesClick;
    btn.onmouseenter = null;
    return;
  }

  const maxX = window.innerWidth - 80;
  const maxY = window.innerHeight - 40;
  btn.style.position = 'fixed';
  btn.style.left = Math.random() * maxX + 'px';
  btn.style.top = Math.random() * maxY + 'px';
  btn.style.zIndex = '999';

  const scale = Math.max(0.5, 1 - noAttempts * 0.1);
  btn.style.transform = `scale(${scale})`;

  const yesBtn = $('#btn-yes');
  yesBtn.style.transform = `scale(${1 + noAttempts * 0.1})`;
}

function onYesClick() {
  showScreen('celebration');
  showCelebration();
}

function showCelebration() {
  $('.celebration-title').innerHTML = '<img src="assets/lvl3/kk47.jpeg" class="celebration-photo" alt="">';
  $('.celebration-subtitle').textContent = 'The ocean is alive again.';

  const particlesContainer = $('#celebration-particles');
  particlesContainer.innerHTML = '';
  const colors = ['#ff6b8a', '#ffd700', '#00e5ff', '#ff4060', '#80f0ff', '#ff88aa', '#ffaa00'];

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = (5 + Math.random() * 10) + 'px';
    confetti.style.height = (5 + Math.random() * 10) + 'px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    particlesContainer.appendChild(confetti);
  }

  setInterval(() => {
    if (gameState.currentScreen !== 'celebration') return;
    for (let i = 0; i < 5; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = (5 + Math.random() * 10) + 'px';
      confetti.style.height = (5 + Math.random() * 10) + 'px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
      confetti.style.animationDelay = '0s';
      particlesContainer.appendChild(confetti);
      setTimeout(() => confetti.remove(), 6000);
    }
  }, 1500);
}

// ============ GAME OVER ============

function gameOver() {
  clearInterval(gameState.timerInterval);
  hideHUD();
  showScreen('gameover');
}

function resetGame() {
  gameState = {
    currentScreen: 'intro',
    currentLevel: 0,
    lives: GAME_CONFIG.maxLives,
    timeRemaining: GAME_CONFIG.totalTime,
    misclicks: 0,
    inventory: [],
    foundItems: { 1: [], 2: [], 3: [] },
    collectedLetters: [],
    timerInterval: null,
    isPaused: false,
    creaturesClicked: {},
    awaitingCreature: false,
  };
  noAttempts = 0;
  updateLivesDisplay();
  updateTimerDisplay();
  updateInventoryBar();
  $('#hud-timer').classList.remove('urgent');
  $('#decode-area').style.display = '';
  $('#decoded-message').classList.add('hidden');
  $('#decoded-message').innerHTML = '';
  const decodeBtn = $('#btn-decode');
  decodeBtn.disabled = false;
  decodeBtn.textContent = 'DECODE';
  decodeBtn.classList.remove('decoding');
  $('#treasure-chest').classList.remove('unlocked');

  const noBtn = $('#btn-no');
  noBtn.textContent = 'no';
  noBtn.style.position = '';
  noBtn.style.left = '';
  noBtn.style.top = '';
  noBtn.style.transform = '';
  noBtn.style.zIndex = '';
  noBtn.onclick = null;
  noBtn.onmouseenter = onNoHover;

  $('#btn-yes').style.transform = '';
}

// ============ EVENT BINDINGS ============

function init() {
  initBubbles();
  $('#btn-begin').addEventListener('click', () => startLevel(0));
  $('#btn-collect').addEventListener('click', collectCard);
  $('#btn-level-continue').addEventListener('click', onLevelContinue);
  $('#btn-decode').addEventListener('click', onDecode);
  $('#btn-yes').addEventListener('click', onYesClick);
  $('#btn-no').addEventListener('mouseenter', onNoHover);
  $('#btn-retry').addEventListener('click', () => {
    resetGame();
    startLevel(0);
  });
  $('#screen-game').addEventListener('click', (e) => {
    if (gameState.currentScreen !== 'game' || gameState.isPaused) return;

    const level = GAME_CONFIG.levels[gameState.currentLevel];
    const cx = e.clientX;
    const cy = e.clientY;

    // Check hidden items by bounding rect
    const itemEls = $$(`#scene-items-${level.id} .hidden-item`);
    for (const el of itemEls) {
      const rect = el.getBoundingClientRect();
      if (cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom) {
        const itemId = el.dataset.itemId;
        const item = level.items.find(i => i.id === itemId);
        if (item && !gameState.foundItems[level.id].includes(itemId)) {
          onItemFound(level, item, el);
          return;
        }
      }
    }

    // Check danger creatures
    const dangerEls = $$(`#scene-dangers-${level.id} .danger-creature`);
    for (const el of dangerEls) {
      const rect = el.getBoundingClientRect();
      if (cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom) {
        const dangerId = el.dataset.dangerId;
        const danger = level.dangers.find(d => d.id === dangerId);
        if (danger) {
          onDangerHit(danger, el);
          return;
        }
      }
    }

    // Check swimming creatures (single or multiple)
    const allCreatures = [];
    if (level.creature) allCreatures.push(level.creature);
    if (level.creatures) allCreatures.push(...level.creatures);
    for (const creature of allCreatures) {
      const creatureEl = $(`#${creature.id}`);
      if (creatureEl && !gameState.creaturesClicked[creature.id]) {
        const rect = creatureEl.getBoundingClientRect();
        if (cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom) {
          creatureEl.classList.add('clicked');
          onCreatureClicked(creature, creatureEl);
          return;
        }
      }
    }

    onSceneMisclick(e);
  });
}

document.addEventListener('DOMContentLoaded', init);
