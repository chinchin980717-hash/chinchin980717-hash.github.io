/* 《戀語解密 Flip!》每日登入與抽獎箱 v1.4.0 */
(() => {
  'use strict';
  const MAP_KEY = 'koiflip-map-v0.11.0';
  const GACHA_KEY = 'koiflip-gacha-v0.13.0';
  const DAILY_DATE_KEY = 'flip_last_login_date';
  const COIN_KEY = 'flip_wish_coins';
  const REWARD_TYPES = {
    EQUIPMENT_TICKET: { id: 'eq_ticket', name: '星光信封', type: 'ticket' },
    CHARACTER_TICKET: { id: 'char_ticket', name: '命定之契', type: 'ticket' },
    WISH_COIN: { id: 'wish_coin', name: '星願幣', type: 'currency' },
    MEMORY_SHARD: { id: 'memory_shard', name: '角色心願碎片', type: 'shard' }
  };
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; } };
  const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const today = () => new Date().toDateString();
  const ownedCharacters = () => {
    const gacha = read(GACHA_KEY, {});
    const ids = Array.isArray(gacha.ownedCharacters) ? gacha.ownedCharacters : ['ren', 'souta', 'aoi'];
    return ids.length ? ids : ['ren', 'souta', 'aoi'];
  };
  const getState = () => ({
    lastLoginDate: localStorage.getItem(DAILY_DATE_KEY) || '',
    wishCoins: Math.max(0, Number(localStorage.getItem(COIN_KEY) || 0)),
    claimed: localStorage.getItem(DAILY_DATE_KEY) === today()
  });
  const render = (message = '') => {
    const state = getState();
    const button = document.querySelector('#daily-claim-btn');
    const status = document.querySelector('#daily-status');
    const coins = document.querySelector('#daily-wish-coins');
    if (button) { button.disabled = state.claimed; button.textContent = state.claimed ? '今日已簽到' : '領取今日獎勵'; }
    if (status) status.textContent = message || (state.claimed ? '星之祈學園已記錄今天的簽到，明天再來開箱。' : '每天登入一次，開啟隨機獎勵箱。');
    if (coins) coins.textContent = String(state.wishCoins);
    const map = read(MAP_KEY, { characterTickets: 0, equipmentTickets: 0 });
    const ticketLabel = document.querySelector('#map-tickets');
    if (ticketLabel) ticketLabel.textContent = `${Number(map.characterTickets || map.tickets || 0)} / ${Number(map.equipmentTickets || 0)}`;
  };
  const claim = () => {
    const state = getState();
    if (state.claimed) return render('今天已經在星之祈學園簽到過囉！明天請再來吧～');
    const rand = Math.random();
    let reward;
    if (rand < 0.05) reward = { type: 'ticket', item: REWARD_TYPES.CHARACTER_TICKET, amount: 1 };
    else if (rand < 0.15) reward = { type: 'ticket', item: REWARD_TYPES.EQUIPMENT_TICKET, amount: 1 };
    else if (rand < 0.65) {
      const id = ownedCharacters()[Math.floor(Math.random() * ownedCharacters().length)];
      reward = { type: 'shard', item: REWARD_TYPES.MEMORY_SHARD, characterId: id, amount: 8 };
    } else reward = { type: 'currency', item: REWARD_TYPES.WISH_COIN, amount: Math.floor(Math.random() * 101) + 50 };
    const map = read(MAP_KEY, { energy: 10, tickets: 0, characterTickets: 0, equipmentTickets: 0 });
    map.characterTickets = Math.max(0, Number(map.characterTickets ?? map.tickets ?? 0));
    map.equipmentTickets = Math.max(0, Number(map.equipmentTickets || 0));
    const gacha = read(GACHA_KEY, { ownedCharacters: ['ren', 'souta', 'aoi'], memoryShards: {} });
    gacha.memoryShards ||= {};
    let message = '';
    if (reward.type === 'ticket') {
      if (reward.item.id === 'char_ticket') map.characterTickets += reward.amount;
      else map.equipmentTickets += reward.amount;
      map.tickets = map.characterTickets;
      message = `今日抽獎箱：${reward.item.name} ×${reward.amount}！已加入招募券。`;
    } else if (reward.type === 'shard') {
      gacha.memoryShards[reward.characterId] = (gacha.memoryShards[reward.characterId] || 0) + reward.amount;
      message = `今日抽獎箱：角色心願碎片（${reward.characterId}）×${reward.amount}！`;
    } else {
      const coins = state.wishCoins + reward.amount;
      localStorage.setItem(COIN_KEY, String(coins));
      message = `今日抽獎箱：星願幣 ×${reward.amount}！目前共有 ${coins} 枚。`;
    }
    save(MAP_KEY, map); save(GACHA_KEY, gacha); localStorage.setItem(DAILY_DATE_KEY, today()); render(message);
  };
  const init = () => { document.querySelector('#daily-claim-btn')?.addEventListener('click', claim); render(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.DailyLoginGachaManager = { claimDailyReward: claim, getState };
})();
