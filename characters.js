// 角色圖鑑：純角色資料展示；收錄狀態不控制劇情、學習或角色養成。
const $ = (selector) => document.querySelector(selector);
const GACHA_KEY = 'koiflip-gacha-v0.13.0';
const characterList = Array.isArray(window.CHARACTERS) ? window.CHARACTERS : [];
const ELEMENT_LABELS = {
  heart: '心動', light: '星光', sakura: '櫻花', moon: '月光', star: '星光'
};
const DEFAULT_OWNED = ['ren', 'souta', 'aoi'];
let currentFilter = 'all';

function readGachaState() {
  try {
    const saved = JSON.parse(localStorage.getItem(GACHA_KEY) || 'null');
    return saved && typeof saved === 'object' ? saved : { ownedCharacters: DEFAULT_OWNED };
  } catch {
    return { ownedCharacters: DEFAULT_OWNED };
  }
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function renderCard(character, isOwned) {
  const stars = '★'.repeat(Math.max(1, Number(character.rarity) || 3));
  const routeLabel = character.route === 'male' ? 'OTOME ROUTE · 男神線' : 'GALGAME ROUTE · 女神線';
  const role = character.tag || character.role || '伴學夥伴';
  const subtitle = character.tag && character.role && character.tag !== character.role
    ? `${character.tag} · ${character.role}`
    : role;
  const element = ELEMENT_LABELS[character.element] || character.element || '心動';
  const quote = character.quote || '一起踏上新的旅程吧。';
  const skill = Array.isArray(character.skills) ? character.skills[0] : null;
  const portrait = character.image
    ? `<div class="codex-art-frame${isOwned ? '' : ' is-locked'}">
         <img class="codex-character-art" src="${escapeHTML(character.image)}" alt="${escapeHTML(character.name)}角色形象" loading="lazy">
         ${isOwned ? '' : '<div class="codex-art-lock-overlay" aria-hidden="true"><span>🔒</span><strong>未解鎖</strong></div>'}
       </div>`
    : `<div class="codex-art-placeholder${isOwned ? '' : ' is-locked'}" aria-hidden="true">${escapeHTML(character.avatar || '✦')}${isOwned ? '' : '<span>🔒</span>'}</div>`;
  const status = isOwned
    ? `<b class="codex-rarity">${stars} <span>已收錄</span></b>`
    : '<b class="codex-locked-badge" aria-label="未解鎖">🔒 未解鎖</b>';

  return `<article class="codex-card${isOwned ? '' : ' is-locked'}" data-character-id="${escapeHTML(character.id)}">
    <div class="codex-card-top">
      <span class="codex-avatar" aria-hidden="true">${escapeHTML(character.avatar || '✦')}</span>
      <div class="codex-card-heading">
        <p>${routeLabel}</p>
        <h2>${escapeHTML(character.name)}</h2>
        <small>${escapeHTML(subtitle)}</small>
      </div>
      ${status}
    </div>
    ${portrait}
    <div class="codex-meta">
      <span>角色定位 <strong>${escapeHTML(character.role || '伴學夥伴')}</strong></span>
      <span>屬性 <strong>${escapeHTML(element)}</strong></span>
      <span>稀有度 <strong>${stars}</strong></span>
    </div>
    <blockquote class="codex-quote">「${escapeHTML(quote)}」</blockquote>
    ${skill ? `<div class="codex-profile-skill"><small>專屬技能 · ${escapeHTML(skill.name || '角色技能')}</small><p>${escapeHTML(skill.description || '')}</p></div>` : ''}
    <div class="codex-card-foot"><span>${isOwned ? '已加入角色圖鑑' : '尚未收錄 · 收錄狀態不影響劇情與學習'}</span></div>
  </article>`;
}

function render() {
  const gachaState = readGachaState();
  const ownedIds = new Set(Array.isArray(gachaState.ownedCharacters) ? gachaState.ownedCharacters : DEFAULT_OWNED);
  const visible = characterList.filter(character => currentFilter === 'all' || character.route === currentFilter);
  const ownedCount = characterList.filter(character => ownedIds.has(character.id)).length;

  $('#owned-count').textContent = String(ownedCount);
  $('#total-count').textContent = String(characterList.length);
  $('#collection-rate').textContent = `${characterList.length ? Math.round(ownedCount / characterList.length * 100) : 0}%`;
  $('#character-codex-grid').innerHTML = visible.length
    ? visible.map(character => renderCard(character, ownedIds.has(character.id))).join('')
    : '<p class="codex-empty">這個分類目前沒有角色。</p>';
}

document.querySelectorAll('.codex-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    currentFilter = tab.dataset.filter;
    document.querySelectorAll('.codex-tab').forEach(item => item.classList.toggle('active', item === tab));
    render();
  });
});

$('#back-button').addEventListener('click', () => location.href='game.html');
window.addEventListener('storage', event => { if (event.key === GACHA_KEY) render(); });
render();
