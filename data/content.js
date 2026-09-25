// 《戀語解密 Flip!》學習與戰鬥內容 v0.5.0
export const LESSONS = [
  {
    id: 'n5-heart-01',
    title: '心動基礎單字 01',
    level: 'N5',
    reward: { exp: 30, gold: 20, affection: 3 },
    words: [
      { id: '好き', jp: '好き', kana: 'すき', zh: '喜歡', example: 'あなたが好きです。' },
      { id: '約束', jp: '約束', kana: 'やくそく', zh: '約定', example: '約束を守ります。' },
      { id: '秘密', jp: '秘密', kana: 'ひみつ', zh: '秘密', example: 'これは秘密です。' },
      { id: '友達', jp: '友達', kana: 'ともだち', zh: '朋友', example: '友達と勉強します。' }
    ]
  },
  {
    id: 'n5-heart-02',
    title: '心動基礎單字 02',
    level: 'N5',
    reward: { exp: 35, gold: 25, affection: 4 },
    words: [
      { id: '逢いたい', jp: '逢いたい', kana: 'あいたい', zh: '想見你', example: '早く逢いたいです。' },
      { id: '笑顔', jp: '笑顔', kana: 'えがお', zh: '笑容', example: 'あなたの笑顔が好きです。' },
      { id: '大切', jp: '大切', kana: 'たいせつ', zh: '重要、珍惜', example: '大切な思い出です。' },
      { id: '一緒', jp: '一緒', kana: 'いっしょ', zh: '一起', example: '一緒に行きましょう。' }
    ]
  }
];

export const ENEMIES = [
  { id: '忘卻迷霧', name: '忘卻迷霧', kind: 'normal', hp: 80, attack: 12, reward: { exp: 20, gold: 15 }, weakness: 'light' },
  { id: '文法小怪', name: '文法小怪', kind: 'normal', hp: 110, attack: 15, reward: { exp: 28, gold: 20 }, weakness: 'heart' },
  { id: '學測魔王', name: '學測魔王', kind: 'boss', hp: 300, attack: 25, reward: { exp: 80, gold: 100 }, weakness: 'sakura' }
];

export const STAGES = [
  { id: 'stage-01', chapter: 1, name: '櫻花校舍・放學後', cost: 3, enemies: ['忘卻迷霧', '文法小怪'], clearReward: { gold: 40, ticket: 1 } },
  { id: 'stage-02', chapter: 1, name: '圖書館的祕密', cost: 4, enemies: ['文法小怪', '學測魔王'], clearReward: { gold: 80, ticket: 2 } }
];
