// 角色圖鑑：列出所有角色，清楚區分已解鎖與尚未解鎖。
const $ = (selector) => document.querySelector(selector);
const GACHA_KEY = 'koiflip-gacha-v0.13.0';
const ROSTER_KEY = 'koiflip-roster-v0.7.0';
const FAVORITES_KEY = 'koiflip-favorites-v0.15.0';
const allCharacters = Array.isArray(window.CHARACTERS) ? window.CHARACTERS : [];
const characterList = allCharacters.length
  ? allCharacters
  : (window.CHARACTERS?.male || []).concat(window.CHARACTERS?.female || []);

let gachaState = JSON.parse(localStorage.getItem(GACHA_KEY) || 'null') || {
  ownedCharacters: ['ren', 'souta', 'aoi'],
  memoryShards: {}
};
let rosterState = JSON.parse(localStorage.getItem(ROSTER_KEY) || 'null') || {};
const ELEMENT_LABELS = {
  heart: '心動', light: '星光', sakura: '櫻花', moon: '月光', star: '星光'
};
let currentFilter = 'all';
let favoriteIds = JSON.parse(localStorage.getItem(FAVORITES_KEY) || 'null') || ['ren', 'souta', 'aoi'];

function saveFavorites() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
}

function toggleFavorite(id) {
  if (favoriteIds.includes(id)) {
    favoriteIds = favoriteIds.filter(item => item !== id);
  } else {
    favoriteIds.push(id);
  }
  saveFavorites();
  render();
}

function getUnlockHint(character) {
  if (character.unlockMethod === 'story') return '完成相關劇情後解鎖';
  return '可透過角色招募取得';
}

function renderCard(character, isOwned) {
  const state = rosterState[character.id] || { level: 1, exp: 0, affection: 0 };
  const shards = gachaState.memoryShards?.[character.id] || 0;
  const stars = '★'.repeat(character.rarity || 3);
  const avatar = character.image
    ? `<img src="${character.image}" alt="" loading="lazy">`
    : (character.avatar || '✦');
  const portrait = character.image
    ? `<div class="codex-art-frame${isOwned ? '' : ' is-locked'}">
         <img class="codex-character-art" src="${character.image}" alt="${character.name}角色形象" loading="lazy">
         ${isOwned ? '' : '<div class="codex-art-lock-overlay" aria-hidden="true"><span>🔒</span><strong>未解鎖</strong></div>'}
       </div>`
    : '';
  const status = isOwned
    ? `<b class="codex-rarity">${stars}</b>`
    : '<b class="codex-locked-badge" aria-label="未解鎖">🔒 未解鎖</b>';
  const details = isOwned
    ? `<div class="codex-meta">
         <span>屬性 <strong>${ELEMENT_LABELS[character.element] || character.element || '心動'}</strong></span>
         <span>Lv.<strong>${state.level || 1}</strong></span>
         <span>好感 <strong>${state.affection || 0}</strong></span>
       </div>
       <p class="codex-quote">「${character.quote || '一起踏上新的學習旅程吧。'}」</p>`
    : `<div class="codex-meta codex-meta-locked"><span>角色狀態<strong>未解鎖</strong></span></div>
       <p class="codex-locked-hint">解鎖後可查看角色屬性、好感度與專屬台詞。</p>`;
  const footer = isOwned
    ? `<span>${shards ? `記憶碎片 ×${shards}` : '已加入圖鑑'}</span>
       <div class="codex-card-actions">
         <button class="favorite-toggle ${favoriteIds.includes(character.id) ? 'is-favorite' : ''}" data-favorite="${character.id}" type="button">${favoriteIds.includes(character.id) ? '♥ 最愛' : '♡ 設為最愛'}</button>
         <a href="game.html" class="codex-detail-link">前往養成 →</a>
       </div>`
    : `<span class="codex-unlock-hint">${getUnlockHint(character)}</span>`;

  return `<article class="codex-card${isOwned ? '' : ' is-locked'}" data-character-id="${character.id}"${isOwned ? '' : ` aria-label="${character.name}，未解鎖"`}>
    <div class="codex-card-top">
      <span class="codex-avatar${isOwned ? '' : ' is-locked'}">${avatar}</span>
      <div class="codex-card-heading">
        <p>${character.route === 'male' ? 'OTOME ROUTE' : 'GALGAME ROUTE'}</p>
        <h2>${character.name}</h2>
        <small>${character.tag || character.role || '伴學夥伴'} · ${character.role || '伴學夥伴'}</small>
      </div>
      ${status}
    </div>
    ${portrait}
    ${details}
    <div class="codex-card-foot">${footer}</div>
  </article>`;
}

function render() {
  const storyUnlockedIds = characterList
    .filter(character => character.unlockMethod === 'story')
    .map(character => character.id);
  const ownedIds = new Set([
    ...(gachaState.ownedCharacters || ['ren', 'souta', 'aoi']),
    ...storyUnlockedIds
  ]);
  const ownedCount = characterList.filter(character => ownedIds.has(character.id)).length;
  const visible = characterList.filter(character => currentFilter === 'all' || character.route === currentFilter);

  $('#owned-count').textContent = String(ownedCount);
  $('#total-count').textContent = String(characterList.length);
  $('#collection-rate').textContent = `${characterList.length ? Math.round(ownedCount / characterList.length * 100) : 0}%`;
  $('#character-codex-grid').innerHTML = visible.length
    ? visible.map(character => renderCard(character, ownedIds.has(character.id))).join('')
    : '<p class="codex-empty">這個分類目前沒有角色。</p>';

  document.querySelectorAll('[data-favorite]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      toggleFavorite(button.dataset.favorite);
    });
  });
}

document.querySelectorAll('.codex-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    currentFilter = tab.dataset.filter;
    document.querySelectorAll('.codex-tab').forEach(item => item.classList.toggle('active', item === tab));
    render();
  });
});

$('#back-button').addEventListener('click', () => history.back());
render();
