/* 《戀語解密 Flip!》星期制七日簽到 v3.0.0：週一 Day 1，漏簽不補。 */
(() => {
  'use strict';
  const DAILY_DATE_KEY = 'flip_last_login_date';
  const CHECKIN_KEY = 'koiflip-daily-checkin-v1';
  const DAY_COUNT = 7;
  const WEEKDAYS = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  const REWARD_LABELS = [
    '', '星幣 ×500', '記憶碎片 ×5', '能量飲料 ×2', '裝備抽獎券 ×1',
    '星幣 ×1,000', '能量飲料 ×3', '隨機抽獎箱 ×1'
  ];
  const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
    catch { return fallback; }
  };
  const getToday = () => new Date().toDateString();
  const getDateId = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const getDayNumber = (date = new Date()) => date.getDay() === 0 ? 7 : date.getDay();
  const getWeekStart = (date = new Date()) => {
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
    return start;
  };
  function normalizeDate(value) {
    if (!value) return '';
    const text = String(value);
    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
    const parsed = new Date(text);
    return Number.isNaN(parsed.getTime()) ? '' : getDateId(parsed);
  }
  function getState() {
    const saved = read(CHECKIN_KEY, {});
    const legacyDate = localStorage.getItem(DAILY_DATE_KEY) || '';
    const today = new Date();
    const todayId = getDateId(today);
    const weekStartId = getDateId(getWeekStart(today));
    const lastDate = normalizeDate(saved.lastDate || legacyDate);
    const claimedDates = new Set(
      (Array.isArray(saved.claimedDates) ? saved.claimedDates : [])
        .map(normalizeDate)
        .filter(date => date >= weekStartId && date <= todayId)
    );
    // Migrate the previous single-date format without pretending missed days were claimed.
    if (lastDate >= weekStartId && lastDate <= todayId) claimedDates.add(lastDate);
    const todayClaimed = claimedDates.has(todayId) || legacyDate === getToday();
    return {
      day: getDayNumber(today),
      cycleDay: getDayNumber(today),
      totalCheckins: Math.max(0, Math.floor(Number(saved.totalCheckins) || 0)),
      lastDate,
      claimed: todayClaimed,
      claimedDates: [...claimedDates],
      claimedCount: claimedDates.size,
      weekStartId
    };
  }
  function dateForDay(day, weekStartId = getState().weekStartId) {
    const [year, month, date] = weekStartId.split('-').map(Number);
    const result = new Date(year, month - 1, date + Number(day) - 1);
    return getDateId(result);
  }
  function render(message = '') {
    const state = getState();
    const todayDay = state.day;
    const board = document.querySelector('#daily-login-days');
    const button = document.querySelector('#daily-claim-btn');
    const status = document.querySelector('#daily-status');
    const coins = document.querySelector('#daily-wish-coins');
    const cycle = document.querySelector('#checkin-cycle-label');
    if (board) {
      board.innerHTML = Array.from({ length: DAY_COUNT }, (_, index) => {
        const day = index + 1;
        const dateId = dateForDay(day, state.weekStartId);
        const complete = state.claimedDates.includes(dateId);
        const current = day === todayDay;
        const missed = day < todayDay && !complete;
        const statusText = complete ? '已簽到' : missed ? '已錯過 · 不補簽' : current ? (state.claimed ? '今日已領' : '今日可簽') : '尚未開放';
        const className = [complete ? 'is-complete' : '', current ? 'is-current' : '', missed ? 'is-missed' : '', day > todayDay ? 'is-upcoming' : ''].filter(Boolean).join(' ');
        return `<div class="checkin-day ${className}" aria-label="第 ${day} 天，${WEEKDAYS[index]}，${statusText}">
          <small>DAY ${String(day).padStart(2, '0')} · ${WEEKDAYS[index]}</small><span class="checkin-day-icon">${complete ? '✓' : missed ? '—' : current ? '✦' : '·'}</span><strong>${REWARD_LABELS[day]}</strong><em>${statusText}</em>
        </div>`;
      }).join('');
    }
    if (cycle) cycle.textContent = `本週 ${state.claimedCount} / ${DAY_COUNT} · 今日 Day ${todayDay}`;
    if (button) {
      button.disabled = state.claimed;
      button.textContent = state.claimed ? '今日已簽到' : `簽到並寄送 Day ${todayDay} 獎勵`;
    }
    if (status) {
      status.textContent = message || (state.claimed
        ? `${WEEKDAYS[todayDay - 1]}（Day ${todayDay}）已簽到，獎勵已寄到郵箱。漏簽的日期不補簽。`
        : `今天是${WEEKDAYS[todayDay - 1]}（Day ${todayDay}），可領取「${REWARD_LABELS[todayDay]}」。漏簽的日期不補簽。`);
    }
    if (coins) coins.textContent = String(Math.max(0, Number(localStorage.getItem('flip_wish_coins') || 0)));
  }

  function claim() {
    const state = getState();
    if (state.claimed) {
      render('今天已經簽到過囉；明天會依星期領取下一天的固定獎勵。');
      return false;
    }
    const mailbox = window.FlipMailboxInventory;
    if (!mailbox || typeof mailbox.addDailyCheckinMail !== 'function') {
      render('郵箱系統尚未載入，請重新整理後再試一次。');
      return false;
    }
    const day = state.day;
    const todayId = getDateId();
    const id = `daily-checkin-${todayId}`;
    const reward = mailbox.prepareCheckinReward?.(day);
    const added = mailbox.addDailyCheckinMail({ id, day, date: getToday(), reward });
    if (!added && !mailbox.hasMail?.(id)) {
      render('簽到獎勵郵件未能保存，請確認本機儲存空間後再試。');
      return false;
    }
    const nextDates = new Set(state.claimedDates);
    nextDates.add(todayId);
    const nextState = {
      version: 2,
      totalCheckins: state.totalCheckins + (added ? 1 : 0),
      lastDate: todayId,
      claimedDates: [...nextDates]
    };
    try {
      localStorage.setItem(CHECKIN_KEY, JSON.stringify(nextState));
      // Keep the old date key so previous versions cannot grant a second reward today.
      localStorage.setItem(DAILY_DATE_KEY, getToday());
    } catch {
      render('郵件已建立，但簽到狀態保存失敗；請勿重複操作，先到郵箱確認獎勵。');
      return false;
    }
    render(`${WEEKDAYS[day - 1]} Day ${day} 簽到成功！${added ? '固定獎勵已寄到郵箱。' : '今日獎勵已在郵箱中。'}`);
    return true;
  }
  function init() {
    document.querySelector('#daily-claim-btn')?.addEventListener('click', claim);
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
  window.DailyLoginGachaManager = { claimDailyReward: claim, getState, getDayNumber, render };
})();
