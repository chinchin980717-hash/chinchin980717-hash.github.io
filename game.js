const vocabPairs = [
  { id: 1, jp: '好き', kana: 'すき', zh: '喜歡' },
  { id: 2, jp: '約束', kana: 'やくそく', zh: '約定' },
  { id: 3, jp: '秘密', kana: 'ひみつ', zh: '秘密' },
  { id: 4, jp: '友達', kana: 'ともだち', zh: '朋友' }
];

const screens = {
  title: document.querySelector('#title-screen'),
  select: document.querySelector('#select-screen'),
  game: document.querySelector('#game-screen'),
  result: document.querySelector('#result-screen')
};
const $ = (selector) => document.querySelector(selector);
let flipped = [];
let matched = 0;
let combo = 0;
let bestCombo = 0;
let locked = false;
let startedAt = 0;
let soundOn = true;

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove('is-active'));
  screens[name].classList.add('is-active');
}

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function speak(text) {
  if (!soundOn || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

function createCards() {
  const cards = shuffle(vocabPairs.flatMap((pair) => [
    { ...pair, type: 'jp', value: pair.jp },
    { ...pair, type: 'zh', value: pair.zh }
  ]));
  $('#card-grid').innerHTML = cards.map((card, index) => `
    <button class="card" type="button" data-id="${card.id}" data-type="${card.type}" data-index="${index}" aria-label="未翻開的卡牌">
      <span class="card-inner">
        <span class="card-face card-front">✦</span>
        <span class="card-face card-back ${card.type}">
          <strong>${card.value}</strong>
          <small>${card.type === 'jp' ? card.kana : '中文意思'}</small>
        </span>
      </span>
    </button>
  `).join('');
  $('#card-grid').querySelectorAll('.card').forEach((card) => card.addEventListener('click', () => flipCard(card)));
}

function resetGame() {
  flipped = [];
  matched = 0;
  combo = 0;
  bestCombo = 0;
  locked = false;
  startedAt = Date.now();
  $('#combo').textContent = '0';
  $('#progress-label').textContent = '配對進度 0 / 4';
  $('#progress-bar').style.width = '0%';
  $('#message').textContent = '先翻開一張卡牌吧！';
  createCards();
}

function flipCard(card) {
  if (locked || card.classList.contains('is-flipped') || card.classList.contains('is-matched')) return;
  card.classList.add('is-flipped');
  flipped.push(card);
  if (card.dataset.type === 'jp') {
    const pair = vocabPairs.find((item) => String(item.id) === card.dataset.id);
    speak(pair.jp);
  }
  if (flipped.length === 2) checkMatch();
}

function checkMatch() {
  locked = true;
  const [first, second] = flipped;
  const isMatch = first.dataset.id === second.dataset.id && first.dataset.type !== second.dataset.type;
  if (isMatch) {
    matched += 1;
    combo += 1;
    bestCombo = Math.max(bestCombo, combo);
    first.classList.add('is-matched');
    second.classList.add('is-matched');
    $('#combo').textContent = String(combo);
    $('#progress-label').textContent = `配對進度 ${matched} / 4`;
    $('#progress-bar').style.width = `${matched * 25}%`;
    $('#message').textContent = combo >= 2 ? `太好了！連續配對 ${combo} 次。` : '配對成功！繼續找下一組。';
    flipped = [];
    locked = false;
    if (matched === vocabPairs.length) finishGame();
  } else {
    combo = 0;
    $('#combo').textContent = '0';
    $('#message').textContent = '這兩張不是一組，再試試看！';
    setTimeout(() => {
      first.classList.remove('is-flipped');
      second.classList.remove('is-flipped');
      flipped = [];
      locked = false;
    }, 800);
  }
}

function finishGame() {
  const seconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
  setTimeout(() => {
    $('#final-combo').textContent = String(bestCombo);
    $('#final-time').textContent = String(seconds);
    showScreen('result');
  }, 650);
}

$('#start-btn').addEventListener('click', () => showScreen('select'));
$('.back-to-title').addEventListener('click', () => showScreen('title'));
$('#practice-btn').addEventListener('click', () => { resetGame(); showScreen('game'); });
$('#quit-btn').addEventListener('click', () => showScreen('select'));
$('#again-btn').addEventListener('click', () => { resetGame(); showScreen('game'); });
$('#result-home-btn').addEventListener('click', () => showScreen('title'));
$('#sound-btn').addEventListener('click', () => {
  soundOn = !soundOn;
  $('#sound-btn').innerHTML = soundOn ? '🔊 <span>發音開</span>' : '🔇 <span>發音關</span>';
  if (!soundOn && 'speechSynthesis' in window) window.speechSynthesis.cancel();
});

document.querySelectorAll('.option-card:not(.disabled)').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.option-card').forEach((item) => item.classList.remove('selected'));
    button.classList.add('selected');
  });
});
