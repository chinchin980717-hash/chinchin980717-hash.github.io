// 劇情內招募機資料 v0.8.0
export const GACHA_POOLS = [
  {
    id:'school-heart-recruit',
    name:'校舍心動招募',
    cost:{ item:'recruit-ticket', amount:1 },
    pity:{ pulls:10, minimumRarity:3 },
    entries:[
      { type:'character', id:'ren', rarity:3, weight:20 },
      { type:'character', id:'souta', rarity:3, weight:20 },
      { type:'character', id:'aoi', rarity:3, weight:20 },
      { type:'equipment', id:'dictionary-pendant', rarity:3, weight:15 },
      { type:'relic', id:'unsent-letter', rarity:3, weight:15 },
      { type:'equipment', id:'sakura-bookmark', rarity:2, weight:10 }
    ]
  }
];

export const createGachaState = () => ({
  pullsByPool: { 'school-heart-recruit': 0 },
  ownedCharacters: ['ren','souta','aoi'],
  ownedEquipment: [],
  ownedRelics: [],
  memoryShards: {}
});
