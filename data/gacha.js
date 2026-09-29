// 《戀語解密 Flip!》雙大池招募資料 v0.28.5
// 更新卡池時，只需調整下方兩個 pool 的 entries、weight 與 pity。
window.GACHA_POOLS = [
  {
    id: 'character-banner',
    type: 'character',
    name: '命定之契｜角色大池',
    shortName: '角色大池',
    ticketKey: 'characterTickets',
    cost: { item: 'character-ticket', amount: 1 },
    pity: { pulls: 30, minimumRarity: 3 },
    entries: [
      { type: 'character', id: 'ren', rarity: 3, weight: 12 },
      { type: 'character', id: 'souta', rarity: 3, weight: 12 },
      { type: 'character', id: 'aoi', rarity: 3, weight: 12 },
      { type: 'character', id: 'rin', rarity: 3, weight: 10 },
      { type: 'character', id: 'haru', rarity: 3, weight: 10 },
      { type: 'character', id: 'kai', rarity: 3, weight: 10 },
      { type: 'character', id: 'yuki', rarity: 3, weight: 10 },
      { type: 'character', id: 'suzu', rarity: 3, weight: 10 },
      { type: 'character', id: 'ami', rarity: 3, weight: 10 }
    ]
  },
  {
    id: 'equipment-banner',
    type: 'equipment',
    name: '星光信封｜裝備大池',
    shortName: '裝備大池',
    ticketKey: 'equipmentTickets',
    cost: { item: 'equipment-ticket', amount: 1 },
    pity: { pulls: 30, minimumRarity: 3 },
    entries: [
      { type: 'equipment', id: 'dictionary-pendant', rarity: 3, weight: 14 },
      { type: 'equipment', id: 'president-pen', rarity: 2, weight: 12 },
      { type: 'equipment', id: 'sakura-bookmark', rarity: 2, weight: 12 },
      { type: 'relic', id: 'unsent-letter', rarity: 3, weight: 4 },
      { type: 'relic', id: 'first-sakura-omamori', rarity: 3, weight: 3 },
      { type: 'relic', id: 'moonlit-page', rarity: 4, weight: 2 }
    ]
  }
];
window.createGachaState = () => ({
  pulls: 0,
  pullsSinceRare: 0,
  bannerState: {
    'character-banner': { pulls: 0, pullsSinceRare: 0 },
    'equipment-banner': { pulls: 0, pullsSinceRare: 0 }
  },
  ownedCharacters: ['ren', 'souta', 'aoi'],
  ownedEquipment: [],
  ownedRelics: [],
  memoryShards: {}
});
