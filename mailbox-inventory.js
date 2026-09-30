/* 《戀語解密 Flip!》本機郵箱與背包 v2.0.0 */
(() => {
  'use strict';
  const ECONOMY_KEY = 'koiflip-player-economy-v1';
  const MAP_KEY = 'koiflip-map-v0.11.0';
  const LEGACY_MAP_KEY = 'koiflip-map-v0.10.0';
  const GACHA_KEY = 'koiflip-gacha-v0.13.0';
  const EQUIPMENT_KEY = 'koiflip-equipment-v0.11.0';
  const RELIC_KEY = 'koiflip-relics-v0.12.0';
  const WISH_COIN_KEY = 'flip_wish_coins';
  const ENERGY_MAX = 10;
  const CHARACTER_NAMES = {
    ren: '涼宮 蓮', souta: '橘 奏太', aoi: '櫻井 葵', rin: '黑羽 凜', haru: '白石 春',
    kai: '神谷 海', yuki: '月城 雪', suzu: '神樂 鈴', ami: '星野 亞美', saku: '神崎 朔',
    iori: '桐生 律', akari: '水野 朱莉', kotori: '七瀨 琴里', rei: '鳴海 怜'
  };
  const DEFAULT_ECONOMY = () => ({ version: 2, mailbox: [], inventory: { dailyBoxes: 0, energyDrinks: 0 } });
  const readJSON = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
    catch { return fallback; }
  };
  const number = value => Number.isFinite(Number(value)) ? Math.max(0, Math.floor(Number(value))) : 0;
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const writeJSON = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { return false; }
  };

  function normalizeEconomy(value) {
    const state = value && typeof value === 'object' ? value : DEFAULT_ECONOMY();
    state.mailbox = Array.isArray(state.mailbox) ? state.mailbox : [];
    state.inventory = state.inventory && typeof state.inventory === 'object' ? state.inventory : {};
    state.inventory.dailyBoxes = number(state.inventory.dailyBoxes);
    state.inventory.energyDrinks = number(state.inventory.energyDrinks);
    state.version = 2;
    return state;
  }
  function loadEconomy() { return normalizeEconomy(readJSON(ECONOMY_KEY, DEFAULT_ECONOMY())); }
  function saveEconomy(state) { return writeJSON(ECONOMY_KEY, normalizeEconomy(state)); }
  function readMap() {
    const map = readJSON(MAP_KEY, null) || readJSON(LEGACY_MAP_KEY, null) || {};
    const characterTickets = Object.prototype.hasOwnProperty.call(map, 'characterTickets')
      ? number(map.characterTickets) : number(map.tickets);
    return {
      ...map,
      energy: Number.isFinite(Number(map.energy)) ? Math.max(0, Math.min(ENERGY_MAX, Math.floor(Number(map.energy)))) : ENERGY_MAX,
      characterTickets,
      equipmentTickets: number(map.equipmentTickets),
      tickets: characterTickets
    };
  }
  function serializeMap(map) {
    map.tickets = number(map.characterTickets);
    return JSON.stringify(map);
  }
  function readGacha() {
    const value = readJSON(GACHA_KEY, {}) || {};
    value.ownedCharacters = Array.isArray(value.ownedCharacters) && value.ownedCharacters.length
      ? value.ownedCharacters : ['ren', 'souta', 'aoi'];
    value.ownedEquipment = Array.isArray(value.ownedEquipment) ? value.ownedEquipment : [];
    value.ownedRelics = Array.isArray(value.ownedRelics) ? value.ownedRelics : [];
    value.memoryShards = value.memoryShards && typeof value.memoryShards === 'object' ? value.memoryShards : {};
    return value;
  }
  function randomOwnedCharacterId(gacha = readGacha()) {
    const ids = gacha.ownedCharacters.filter(id => typeof id === 'string' && id);
    return ids[Math.floor(Math.random() * ids.length)] || 'ren';
  }
  function prepareCheckinReward(day) {
    switch (number(day)) {
      case 1: return { type: 'currency', name: '星願幣', amount: 500 };
      case 2: return { type: 'memory-shard', characterId: randomOwnedCharacterId(), amount: 5 };
      case 3: return { type: 'energy-drink', amount: 2 };
      case 4: return { type: 'ticket', pool: 'equipment', amount: 1 };
      case 5: return { type: 'currency', name: '星願幣', amount: 1000 };
      case 6: return { type: 'energy-drink', amount: 3 };
      case 7: return { type: 'daily-gacha-box', amount: 1 };
      default: return null;
    }
  }
  function rewardLabel(reward) {
    if (!reward || typeof reward !== 'object') return '簽到獎勵';
    const amount = number(reward.amount) || 1;
    if (reward.type === 'currency') return `${reward.name || '星願幣'} ×${amount}`;
    if (reward.type === 'memory-shard') return `${CHARACTER_NAMES[reward.characterId] || '角色'}記憶碎片 ×${amount}`;
    if (reward.type === 'energy-drink') return `能量飲料 ×${amount}`;
    if (reward.type === 'ticket') return `${reward.pool === 'equipment' ? '裝備抽獎券' : '角色抽獎券'} ×${amount}`;
    if (reward.type === 'daily-gacha-box') return `週日隨機抽獎箱 ×${amount}`;
    return escapeHTML(reward.name || '簽到獎勵');
  }
  function unclaimedMailCount(state = loadEconomy()) {
    return state.mailbox.filter(mail => !mail.claimedAt).length;
  }
  function updateMenuCount(state = loadEconomy()) {
    const count = unclaimedMailCount(state);
    const label = document.querySelector('#mailbox-menu-label');
    if (label) label.textContent = count ? `Mailbox · ${count} 封待領` : 'Mailbox';
  }
  function addDailyCheckinMail({ id, day, date, reward }) {
    const state = loadEconomy();
    if (!id || state.mailbox.some(mail => mail.id === id)) return false;
    const dailyReward = reward && typeof reward === 'object' ? { ...reward } : prepareCheckinReward(day);
    if (!dailyReward) return false;
    state.mailbox.unshift({
      id: String(id), kind: 'daily-checkin-reward', day: number(day), date: String(date || ''),
      title: `七日簽到禮物 · 第 ${number(day)} 天`,
      body: `本日固定獎勵：${rewardLabel(dailyReward)}。領取後將加入對應資源或背包。`,
      createdAt: new Date().toISOString(), claimedAt: null, reward: dailyReward
    });
    if (!saveEconomy(state)) return false;
    updateMenuCount(state);
    return true;
  }
  function formatDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '日期未記錄' : date.toLocaleString('zh-TW', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
  function renderMailbox() {
    const state = loadEconomy();
    const list = document.querySelector('#mailbox-list');
    const count = unclaimedMailCount(state);
    const counter = document.querySelector('#mailbox-pending-count');
    const claimAll = document.querySelector('#mailbox-claim-all-btn');
    if (counter) counter.textContent = `${count} 封待領 · 共 ${state.mailbox.length} 封`;
    if (claimAll) claimAll.disabled = count === 0;
    if (list) {
      list.innerHTML = state.mailbox.length ? state.mailbox.map(mail => {
        const claimed = Boolean(mail.claimedAt);
        const reward = rewardLabel(mail.reward);
        return `<article class="mail-card${claimed ? ' is-claimed' : ''}">
          <div class="mail-card-icon" aria-hidden="true">${claimed ? '✓' : '✉'}</div>
          <div class="mail-card-copy"><div class="mail-card-title-row"><strong>${escapeHTML(mail.title || '遊戲郵件')}</strong><span>${claimed ? '已領取' : '待領取'}</span></div>
            <p>${escapeHTML(mail.body || `獎勵內容：${reward}`)}</p><small>${escapeHTML(formatDate(mail.createdAt))} · ${escapeHTML(reward)}</small>
            ${claimed ? '' : `<button class="primary-btn mail-claim-btn" type="button" data-claim-mail="${escapeHTML(mail.id)}">領取獎勵 <span>→</span></button>`}
          </div>
        </article>`;
      }).join('') : '<div class="empty-state"><span>✉</span><strong>郵箱目前是空的</strong><small>每日簽到獎勵會寄到這裡。</small></div>';
    }
    updateMenuCount(state);
  }

  // Apply all affected keys as one best-effort transaction; roll back if storage refuses a write.
  function commitStorage(writes) {
    const previous = new Map();
    const applied = [];
    try {
      for (const [key, value] of Object.entries(writes)) {
        previous.set(key, localStorage.getItem(key));
        localStorage.setItem(key, value);
        applied.push(key);
      }
      return true;
    } catch {
      for (const key of applied.reverse()) {
        try {
          const oldValue = previous.get(key);
          if (oldValue === null) localStorage.removeItem(key);
          else localStorage.setItem(key, oldValue);
        } catch { /* best effort rollback */ }
      }
      return false;
    }
  }
  function grantReward(reward, economy, writes) {
    if (!reward || typeof reward !== 'object') return false;
    const amount = number(reward.amount) || 1;
    if (reward.type === 'daily-gacha-box' || reward.id === 'daily-gacha-box') {
      economy.inventory.dailyBoxes += amount;
      return true;
    }
    if (reward.type === 'energy-drink') {
      economy.inventory.energyDrinks += amount;
      return true;
    }
    if (reward.type === 'currency') {
      const current = number(Object.prototype.hasOwnProperty.call(writes, WISH_COIN_KEY) ? writes[WISH_COIN_KEY] : localStorage.getItem(WISH_COIN_KEY));
      writes[WISH_COIN_KEY] = String(current + amount);
      return true;
    }
    if (reward.type === 'ticket') {
      const map = Object.prototype.hasOwnProperty.call(writes, MAP_KEY) ? { ...readMap(), ...(JSON.parse(writes[MAP_KEY] || '{}') || {}) } : readMap();
      if (reward.pool === 'equipment') map.equipmentTickets += amount;
      else map.characterTickets += amount;
      writes[MAP_KEY] = serializeMap(map);
      return true;
    }
    if (reward.type === 'memory-shard') {
      const gacha = Object.prototype.hasOwnProperty.call(writes, GACHA_KEY) ? { ...readGacha(), ...(JSON.parse(writes[GACHA_KEY] || '{}') || {}) } : readGacha();
      gacha.memoryShards = gacha.memoryShards && typeof gacha.memoryShards === 'object' ? gacha.memoryShards : {};
      const characterId = reward.characterId || randomOwnedCharacterId(gacha);
      gacha.memoryShards[characterId] = number(gacha.memoryShards[characterId]) + amount;
      writes[GACHA_KEY] = JSON.stringify(gacha);
      return true;
    }
    return false;
  }
  function notifyMapChanged() {
    window.FlipGameState?.refreshMapState?.();
    window.FlipGameState?.renderMapIfActive?.();
  }
  function claimMail(id) {
    const state = loadEconomy();
    const mail = state.mailbox.find(item => item.id === id);
    if (!mail || mail.claimedAt) return false;
    const writes = {};
    if (!grantReward(mail.reward, state, writes)) return false;
    mail.claimedAt = new Date().toISOString();
    writes[ECONOMY_KEY] = JSON.stringify(normalizeEconomy(state));
    if (!commitStorage(writes)) return false;
    if (writes[MAP_KEY]) notifyMapChanged();
    renderMailbox();
    renderInventory();
    return true;
  }
  function claimAllMail() {
    const state = loadEconomy();
    const writes = {};
    let received = 0;
    for (const mail of state.mailbox) {
      if (mail.claimedAt || !grantReward(mail.reward, state, writes)) continue;
      mail.claimedAt = new Date().toISOString();
      received++;
    }
    if (!received) return false;
    writes[ECONOMY_KEY] = JSON.stringify(normalizeEconomy(state));
    if (!commitStorage(writes)) return false;
    if (writes[MAP_KEY]) notifyMapChanged();
    renderMailbox();
    renderInventory();
    return true;
  }
  function itemCard(icon, title, detail, count, action = '') {
    return `<article class="inventory-item"><span class="inventory-item-icon" aria-hidden="true">${icon}</span><div class="inventory-item-copy"><strong>${escapeHTML(title)}</strong><small>${escapeHTML(detail)}</small></div><b class="inventory-item-count">×${number(count)}</b>${action}</article>`;
  }
  function renderInventory() {
    const host = document.querySelector('#inventory-grid');
    if (!host) return;
    const energyInfo = window.FlipGameState?.getEnergyState?.();
    const economy = loadEconomy();
    const map = readMap();
    const gacha = readGacha();
    const equipmentState = readJSON(EQUIPMENT_KEY, { owned: [] }) || { owned: [] };
    const relicState = readJSON(RELIC_KEY, { owned: [] }) || { owned: [] };
    const coins = number(localStorage.getItem(WISH_COIN_KEY));
    const boxes = economy.inventory.dailyBoxes;
    const drinks = economy.inventory.energyDrinks;
    const energy = energyInfo?.energy ?? map.energy;
    const equipmentCatalog = Array.isArray(window.EQUIPMENT_CATALOG) ? window.EQUIPMENT_CATALOG : [];
    const relicCatalog = Array.isArray(window.RELIC_CATALOG) ? window.RELIC_CATALOG : [];
    const equipmentIds = [...new Set([...(equipmentState.owned || []), ...gacha.ownedEquipment])];
    const relicIds = [...new Set([...(relicState.owned || []), ...gacha.ownedRelics])];
    const shards = Object.entries(gacha.memoryShards).filter(([, amount]) => number(amount) > 0);
    const equipmentCards = equipmentIds.map(id => {
      const item = equipmentCatalog.find(entry => entry.id === id);
      return itemCard('✦', item?.name || id, item?.description || '已收集裝備', 1);
    }).join('');
    const relicCards = relicIds.map(id => {
      const item = relicCatalog.find(entry => entry.id === id);
      return itemCard('❖', item?.name || id, item?.description || '已收集聖物', 1);
    }).join('');
    const shardCards = shards.map(([id, amount]) => itemCard('✧', `${CHARACTER_NAMES[id] || id}記憶碎片`, '角色招募重複時取得的培養素材', amount)).join('');
    const drinkAction = `<button class="secondary-btn inventory-use-drink-btn" type="button" data-use-energy-drink ${drinks && energy < ENERGY_MAX ? '' : 'disabled'}>使用一瓶（恢復 5 點）</button>`;
    host.innerHTML = `
      <section class="inventory-category"><h3>簽到與招募資源</h3><div class="inventory-item-grid">
        <article class="inventory-item inventory-box-item"><span class="inventory-item-icon" aria-hidden="true">🎁</span><div class="inventory-item-copy"><strong>週日隨機抽獎箱</strong><small>七種結果各 1/7：角色券 ×1、裝備券 ×1，或能量飲料 ×1–5。</small></div><b class="inventory-item-count">×${boxes}</b><button class="primary-btn inventory-open-box-btn" id="inventory-open-box-btn" type="button" ${boxes ? '' : 'disabled'}>開啟一箱</button><small class="inventory-odds">角色券、裝備券與能量飲料 ×1／×2／×3／×4／×5，各自機率均為 1/7。</small></article>
        <article class="inventory-item inventory-drink-item"><span class="inventory-item-icon" aria-hidden="true">🧪</span><div class="inventory-item-copy"><strong>能量飲料</strong><small>目前冒險能量 ${number(energy)} / ${ENERGY_MAX}；每瓶恢復 5 點，不超過上限。</small></div><b class="inventory-item-count">×${drinks}</b>${drinkAction}</article>
        ${itemCard('♛', '角色抽獎券', '命定之契 · 角色大池', map.characterTickets)}
        ${itemCard('✉', '裝備抽獎券', '星光信封 · 裝備大池', map.equipmentTickets)}
        ${itemCard('✧', '星願幣', '簽到與活動貨幣', coins)}
      </div></section>
      <section class="inventory-category"><h3>角色記憶碎片</h3><div class="inventory-item-grid">${shardCards || '<p class="inventory-empty">目前沒有角色碎片。</p>'}</div></section>
      <section class="inventory-category"><h3>裝備與聖物</h3><div class="inventory-item-grid">${equipmentCards}${relicCards}${equipmentCards || relicCards ? '' : '<p class="inventory-empty">目前沒有其他裝備或聖物。</p>'}</div></section>`;
    updateMenuCount(economy);
  }
  function rollBoxReward() {
    // Seven equally likely outcomes: two tickets and five distinct drink quantities.
    const outcome = Math.floor(Math.random() * 7);
    if (outcome === 0) return { type: 'ticket', pool: 'equipment', name: '裝備抽獎券', amount: 1 };
    if (outcome === 1) return { type: 'ticket', pool: 'character', name: '角色抽獎券', amount: 1 };
    return { type: 'energy-drink', name: '能量飲料', amount: outcome - 1 };
  }
  function openOneBox() {
    const economy = loadEconomy();
    if (economy.inventory.dailyBoxes < 1) return;
    const reward = rollBoxReward();
    const writes = {};
    economy.inventory.dailyBoxes--;
    if (!grantReward(reward, economy, writes)) return;
    writes[ECONOMY_KEY] = JSON.stringify(normalizeEconomy(economy));
    if (!commitStorage(writes)) {
      const result = document.querySelector('#inventory-result');
      if (result) result.textContent = '獎勵保存失敗，抽獎箱未扣除；請確認本機儲存空間後再試。';
      return;
    }
    if (writes[MAP_KEY]) notifyMapChanged();
    const result = document.querySelector('#inventory-result');
    if (result) result.textContent = `開箱成功：${rewardLabel(reward)}，已加入對應資源。`;
    renderInventory();
  }
  function useEnergyDrink() {
    const economy = loadEconomy();
    if (!economy.inventory.energyDrinks) return false;
    const energyInfo = window.FlipGameState?.getEnergyState?.();
    const map = readMap();
    const current = Math.max(0, Math.min(ENERGY_MAX, number(energyInfo?.energy ?? map.energy)));
    if (current >= ENERGY_MAX) {
      const result = document.querySelector('#inventory-result');
      if (result) result.textContent = '冒險能量已滿，能量飲料沒有消耗。';
      renderInventory();
      return false;
    }
    const restored = Math.min(5, ENERGY_MAX - current);
    map.energy = current + restored;
    if (map.energy >= ENERGY_MAX) map.lastEnergyAt = Date.now();
    economy.inventory.energyDrinks--;
    const writes = { [MAP_KEY]: serializeMap(map), [ECONOMY_KEY]: JSON.stringify(normalizeEconomy(economy)) };
    if (!commitStorage(writes)) {
      const result = document.querySelector('#inventory-result');
      if (result) result.textContent = '道具保存失敗，能量飲料未消耗；請確認本機儲存空間後再試。';
      return false;
    }
    notifyMapChanged();
    const result = document.querySelector('#inventory-result');
    if (result) result.textContent = `使用一瓶能量飲料，恢復 ${restored} 點冒險能量（${map.energy} / ${ENERGY_MAX}）。`;
    renderInventory();
    return true;
  }
  function init() {
    document.querySelector('#mailbox-list')?.addEventListener('click', event => {
      const button = event.target.closest('[data-claim-mail]');
      if (button) claimMail(button.dataset.claimMail);
    });
    document.querySelector('#mailbox-claim-all-btn')?.addEventListener('click', claimAllMail);
    document.querySelector('#inventory-grid')?.addEventListener('click', event => {
      if (event.target.closest('#inventory-open-box-btn')) openOneBox();
      if (event.target.closest('[data-use-energy-drink]')) useEnergyDrink();
    });
    renderMailbox();
  }
  const api = {
    addDailyCheckinMail, prepareCheckinReward, renderMailbox, renderInventory, claimMail, claimAllMail,
    getUnclaimedCount: () => unclaimedMailCount(), hasMail: id => loadEconomy().mailbox.some(mail => mail.id === id),
    rewardLabel
  };
  window.FlipMailboxInventory = api;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
  window.addEventListener('storage', event => {
    if ([ECONOMY_KEY, MAP_KEY, LEGACY_MAP_KEY, GACHA_KEY, EQUIPMENT_KEY, RELIC_KEY, WISH_COIN_KEY].includes(event.key)) {
      renderMailbox();
      if (document.querySelector('#inventory-screen')?.classList.contains('is-active')) renderInventory();
    }
  });
})();
