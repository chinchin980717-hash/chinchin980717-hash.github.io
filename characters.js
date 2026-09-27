// 角色圖鑑頁 v0.15.0：讀取招募與養成共用存檔。
const $ = (selector) => document.querySelector(selector);
const GACHA_KEY = 'koiflip-gacha-v0.13.0';
const ROSTER_KEY = 'koiflip-roster-v0.7.0';
const FAVORITES_KEY = 'koiflip-favorites-v0.15.0';
const allCharacters = Array.isArray(window.CHARACTERS) ? window.CHARACTERS : [];
const characterList = allCharacters.length ? allCharacters : (window.CHARACTERS?.male||[]).concat(window.CHARACTERS?.female||[]);
let gachaState = JSON.parse(localStorage.getItem(GACHA_KEY)||'null') || {ownedCharacters:['ren','souta','aoi'],memoryShards:{}};
let rosterState = JSON.parse(localStorage.getItem(ROSTER_KEY)||'null') || {};
const ELEMENT_LABELS={heart:'心動',light:'星光',sakura:'櫻花',moon:'月光',star:'星光'};
let currentFilter = 'all';
let favoriteIds = JSON.parse(localStorage.getItem(FAVORITES_KEY)||'null') || ['ren','souta','aoi'];
function saveFavorites(){localStorage.setItem(FAVORITES_KEY,JSON.stringify(favoriteIds))}
function toggleFavorite(id){if(favoriteIds.includes(id)){favoriteIds=favoriteIds.filter(item=>item!==id)}else{favoriteIds.push(id)}saveFavorites();render()}
function getCharacter(id){return characterList.find(character=>character.id===id)}
function render(){
  const ownedIds=gachaState.ownedCharacters||['ren','souta','aoi'];
  const owned=ownedIds.map(getCharacter).filter(Boolean);
  const visible=owned.filter(character=>currentFilter==='all'||character.route===currentFilter);
  $('#owned-count').textContent=String(owned.length);$('#total-count').textContent=String(characterList.length);$('#collection-rate').textContent=`${characterList.length?Math.round(owned.length/characterList.length*100):0}%`;
  $('#character-codex-grid').innerHTML=visible.length?visible.map(character=>{const state=rosterState[character.id]||{level:1,exp:0,affection:0};const shards=gachaState.memoryShards?.[character.id]||0;const stars='★'.repeat(character.rarity||3);return `<article class="codex-card"><div class="codex-card-top"><span class="codex-avatar">${character.avatar}</span><div class="codex-card-heading"><p>${character.route==='male'?'OTOME ROUTE':'GALGAME ROUTE'}</p><h2>${character.name}</h2><small>${character.tag||character.role||'伴學夥伴'} · ${character.role||'伴學夥伴'}</small></div><b class="codex-rarity">${stars}</b></div><div class="codex-meta"><span>屬性 <strong>${ELEMENT_LABELS[character.element]||character.element||'心動'}</strong></span><span>Lv.<strong>${state.level||1}</strong></span><span>好感 <strong>${state.affection||0}</strong></span></div><p class="codex-quote">「${character.quote}」</p><div class="codex-card-foot"><span>${shards?`記憶碎片 ×${shards}`:'已加入圖鑑'}</span><div class="codex-card-actions"><button class="favorite-toggle ${favoriteIds.includes(character.id)?'is-favorite':''}" data-favorite="${character.id}" type="button">${favoriteIds.includes(character.id)?'♥ 最愛':'♡ 設為最愛'}</button><a href="game.html" class="codex-detail-link">前往養成 →</a></div></div></article>`}).join(''):'<p class="codex-empty">這個分類目前還沒有已擁有角色。</p>';document.querySelectorAll('[data-favorite]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();toggleFavorite(button.dataset.favorite)}));
}
document.querySelectorAll('.codex-tab').forEach(tab=>tab.addEventListener('click',()=>{currentFilter=tab.dataset.filter;document.querySelectorAll('.codex-tab').forEach(item=>item.classList.toggle('active',item===tab));render()}));
$('#back-button').addEventListener('click',()=>history.back());
render();
