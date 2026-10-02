// 雙大池招募頁 v0.29.0：角色池與裝備池分開計算券數及保底。
const $ = (selector) => document.querySelector(selector);
const GACHA_KEY = 'koiflip-gacha-v0.13.0';
const MAP_KEY = 'koiflip-map-v0.11.0';
const LEGACY_MAP_KEY = 'koiflip-map-v0.10.0';
const EQUIPMENT_KEY = 'koiflip-equipment-v0.11.0';
const RELIC_KEY = 'koiflip-relics-v0.12.0';
const POOLS = window.GACHA_POOLS || [];
const CHARACTER_NAMES = {ren:'涼宮 蓮',souta:'橘 奏太',aoi:'櫻井 葵',rin:'黑羽 凜',haru:'白石 春',kai:'神谷 海',yuki:'月城 雪',suzu:'神樂 鈴',ami:'星野 亞美'};
const POOL_COPY = {
  'character-banner': { label:'命定之契', title:'翻開命定之契', note:'角色大池只會招募角色；重複角色會轉換成角色心願碎片。', icon:'♛' },
  'equipment-banner': { label:'星光信封', title:'拆開星光信封', note:'裝備大池包含裝備與聖物；獲得後會加入裝備庫或冒險地圖聖物庫。', icon:'✦' }
};
let mapState = JSON.parse(localStorage.getItem(MAP_KEY) || localStorage.getItem(LEGACY_MAP_KEY) || 'null') || {energy:10,tickets:0,characterTickets:0,equipmentTickets:0,unlocked:['stage-01'],selected:null};
mapState.characterTickets = Number.isFinite(Number(mapState.characterTickets)) ? Math.max(0, Math.floor(Number(mapState.characterTickets))) : Math.max(0, Math.floor(Number(mapState.tickets) || 0));
mapState.equipmentTickets = Number.isFinite(Number(mapState.equipmentTickets)) ? Math.max(0, Math.floor(Number(mapState.equipmentTickets))) : 0;
let gachaState = JSON.parse(localStorage.getItem(GACHA_KEY) || 'null') || {pulls:0,pullsSinceRare:0,bannerState:{},ownedCharacters:['ren','souta','aoi'],ownedEquipment:[],ownedRelics:[],memoryShards:{}};
gachaState.ownedCharacters ||= ['ren','souta','aoi'];
gachaState.ownedEquipment ||= [];
gachaState.memoryShards ||= {};
gachaState.bannerState ||= {};
const activePoolId = () => document.querySelector('.recruit-banner-tab.active')?.dataset.pool || 'character-banner';
const getPool = () => POOLS.find(pool => pool.id === activePoolId()) || POOLS[0];
const getBannerState = pool => {
  const legacy = pool.id === 'character-banner' ? {pulls:gachaState.pulls || 0, pullsSinceRare:gachaState.pullsSinceRare || 0} : {pulls:0,pullsSinceRare:0};
  gachaState.bannerState[pool.id] ||= legacy;
  return gachaState.bannerState[pool.id];
};
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function saveAll() { mapState.tickets = mapState.characterTickets; save(MAP_KEY, mapState); save(GACHA_KEY, gachaState); }
function getEquipment(id) { return (window.EQUIPMENT_CATALOG || []).find(item => item.id === id); }
function getRelic(id) { return (window.RELIC_CATALOG || []).find(item => item.id === id); }
function displayName(entry) { if (entry.type === 'character') return CHARACTER_NAMES[entry.id] || entry.id; if (entry.type === 'equipment') return getEquipment(entry.id)?.name || entry.id; if (entry.type === 'relic') return getRelic(entry.id)?.name || entry.id; return entry.id; }
function weightedPick(entries) { const total = entries.reduce((sum, item) => sum + (item.weight || 1), 0); let point = Math.random() * total; for (const item of entries) { point -= item.weight || 1; if (point <= 0) return item; } return entries[entries.length - 1]; }
function render() {
  const pool = getPool(); const copy = POOL_COPY[pool.id] || POOL_COPY['character-banner']; const banner = getBannerState(pool); const tickets = mapState[pool.ticketKey] || 0;
  $('#recruit-tickets').textContent = String(tickets); $('#character-ticket-count').textContent = String(mapState.characterTickets || 0); $('#equipment-ticket-count').textContent = String(mapState.equipmentTickets || 0); $('#ticket-label').firstChild.textContent = `${copy.label} `;
  const until = Math.max(0, pool.pity.pulls - (banner.pullsSinceRare || 0)); $('#recruit-pity').textContent = until === 0 ? '下一抽保底' : String(until);
  $('#pull-one-btn').disabled = tickets < 1; $('#pull-ten-btn').disabled = tickets < 10;
  $('#pool-description').textContent = `${pool.name} · 使用對應招募券，尋找新的學習夥伴。`;
  $('#machine-title').textContent = copy.title; $('#machine-note').textContent = copy.note; $('#recruit-orbit').textContent = copy.icon;
  $('#recruit-pity-note').textContent = `十連招募至少包含 1 件稀有以上物品；連續 ${pool.pity.pulls - 1} 抽未出現稀有時，下一抽必定稀有。`;
  document.title = `${pool.name}｜戀語解密 Flip!`;
}
function grant(entry) {
  const name = displayName(entry); let duplicate = false; let detail = '';
  if (entry.type === 'character') {
    if (gachaState.ownedCharacters.includes(entry.id)) { duplicate = true; gachaState.memoryShards[entry.id] = (gachaState.memoryShards[entry.id] || 0) + 1; detail = '重複角色轉換為記憶碎片 ×1'; }
    else { gachaState.ownedCharacters.push(entry.id); detail = '新角色已加入角色圖鑑'; }
  } else if (entry.type === 'equipment') {
    if (!gachaState.ownedEquipment.includes(entry.id)) gachaState.ownedEquipment.push(entry.id);
    const equipmentState = JSON.parse(localStorage.getItem(EQUIPMENT_KEY) || 'null') || {owned:[],equipped:{}};
    equipmentState.owned ||= []; if (!equipmentState.owned.includes(entry.id)) equipmentState.owned.push(entry.id); save(EQUIPMENT_KEY, equipmentState); detail = '已加入裝備庫，可在角色詳情頁裝備';
  } else if (entry.type === 'relic') {
    const relicState = JSON.parse(localStorage.getItem(RELIC_KEY) || 'null') || {owned:[],equipped:['first-sakura-omamori']};
    relicState.owned ||= []; if (!relicState.owned.includes(entry.id)) relicState.owned.push(entry.id); save(RELIC_KEY, relicState); detail = '已加入聖物庫，可在冒險地圖配置';
  }
  return {entry, name, duplicate, detail};
}
function resultPortraitMarkup(result) { if (result.entry.type === 'character') { const character = (window.CHARACTERS || []).find(item => item.id === result.entry.id); if (character?.image) return `<img class="recruit-result-portrait" src="${character.image}" alt="" loading="lazy">`; } return `<span>${result.entry.type === 'character' ? '♛' : '✦'}</span>`; }
function pull(count) {
  const pool = getPool(); const tickets = mapState[pool.ticketKey] || 0;
  if (tickets < count) { $('#recruit-results').innerHTML = `<p class="recruit-error">${POOL_COPY[pool.id].label}不足。請先完成學習、冒險或每日登入。</p>`; return; }
  const entries = pool.entries || []; if (!entries.length) return; const banner = getBannerState(pool); mapState[pool.ticketKey] = tickets - count; const results = []; let hasRare = false;
  for (let i = 0; i < count; i++) {
    let entry = weightedPick(entries); const mustGuarantee = (i === count - 1 && count === 10 && !hasRare) || banner.pullsSinceRare >= pool.pity.pulls - 1;
    if (mustGuarantee) { const rare = entries.filter(item => item.rarity >= pool.pity.minimumRarity); if (rare.length) entry = weightedPick(rare); }
    if (entry.rarity >= pool.pity.minimumRarity) { hasRare = true; banner.pullsSinceRare = 0; } else banner.pullsSinceRare++;
    banner.pulls++; results.push(grant(entry));
  }
  saveAll(); render();
  $('#recruit-results').innerHTML = `<div class="recruit-result-heading"><strong>${count === 10 ? '十連招募完成' : '招募完成'}</strong><small>${pool.name} · 消耗 ${POOL_COPY[pool.id].label} ×${count}</small></div><div class="recruit-result-grid">${results.map(result => `<div class="recruit-result-card rarity-${result.entry.rarity}">${resultPortraitMarkup(result)}<div><strong>${result.name}</strong><small>${result.entry.type === 'character' ? '角色' : result.entry.type === 'relic' ? '聖物' : '裝備'} · ${'★'.repeat(result.entry.rarity)}</small><em>${result.duplicate ? '記憶碎片 ×1' : result.detail}</em></div></div>`).join('')}</div>`;
}
document.querySelectorAll('.recruit-banner-tab').forEach(tab => tab.addEventListener('click', () => { document.querySelectorAll('.recruit-banner-tab').forEach(item => item.classList.toggle('active', item === tab)); $('#recruit-results').innerHTML = '<p class="empty-recruit">招募結果會在這裡出現。</p>'; render(); }));
$('#back-button').addEventListener('click', () => location.href='game.html#home'); $('#pull-one-btn').addEventListener('click', () => pull(1)); $('#pull-ten-btn').addEventListener('click', () => pull(10)); render();
