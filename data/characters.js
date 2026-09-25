// 《戀語解密 Flip!》角色資料 v0.5.0
// 先用資料模組管理，之後可替換成 API 或資料庫。
export const CHARACTERS = [
  {
    id: 'ren',
    name: '涼宮 蓮',
    route: 'male',
    rarity: 3,
    role: '攻擊型',
    element: 'heart',
    avatar: '♛',
    quote: '別誤會了，我只是順便幫你複習日文而已！',
    baseStats: { hp: 120, attack: 34, defense: 18, speed: 24 },
    growth: { hp: 12, attack: 5, defense: 3, speed: 2 },
    skills: [
      { id: 'sharp-answer', name: '犀利解答', description: '答對日語題目後，下一次攻擊傷害提升。' }
    ],
    affectionLines: {
      0: '準備好了嗎？翻開卡牌，讓我看看你的日文實力吧！',
      20: '你的努力，我……姑且有看見。',
      50: '今天也一起學習吧。不要讓我等太久。'
    }
  },
  {
    id: 'souta',
    name: '橘 奏太',
    route: 'male',
    rarity: 3,
    role: '支援型',
    element: 'light',
    avatar: '✦',
    quote: '別太勉強自己，你的努力我一直看在眼裡。',
    baseStats: { hp: 105, attack: 23, defense: 22, speed: 20 },
    growth: { hp: 10, attack: 3, defense: 4, speed: 2 },
    skills: [
      { id: 'encourage', name: '溫柔鼓勵', description: '答對日語題目時，為全隊恢復少量 HP。' }
    ],
    affectionLines: {
      0: '慢慢來，我會陪你把每個單字都記住。',
      20: '今天的發音比昨天更自然了。',
      50: '能和你一起學習，是我每天最期待的事。'
    }
  },
  {
    id: 'aoi',
    name: '櫻井 葵',
    route: 'female',
    rarity: 3,
    role: '均衡型',
    element: 'sakura',
    avatar: '🌸',
    quote: '笨蛋！過來我教你啦，才不是因為在意你。',
    baseStats: { hp: 110, attack: 28, defense: 20, speed: 25 },
    growth: { hp: 11, attack: 4, defense: 3, speed: 3 },
    skills: [
      { id: 'tsundere-rush', name: '傲嬌突擊', description: '連續答對時，額外獲得一點好感度。' }
    ],
    affectionLines: {
      0: '先說好，我只是剛好有空才陪你。',
      20: '你最近……好像真的有在進步。',
      50: '下次也一起走吧。只、只是順路！'
    }
  }
];

export const createCharacterState = (characterId) => ({
  characterId,
  level: 1,
  exp: 0,
  affection: 0,
  equipment: [],
  unlockedSkills: [],
  battleCount: 0
});
