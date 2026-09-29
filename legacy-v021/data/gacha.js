// 劇情內招募機資料 v0.13.0
window.GACHA_POOLS = [
  {
    id:'school-heart-recruit',
    name:'校舍心動招募',
    cost:{ item:'recruit-ticket', amount:1 },
    pity:{ pulls:10, minimumRarity:3 },
    entries:[
      { type:'character', id:'ren', rarity:3, weight:12 },
      { type:'character', id:'souta', rarity:3, weight:12 },
      { type:'character', id:'aoi', rarity:3, weight:12 },
      { type:'character', id:'rin', rarity:3, weight:10 },
      { type:'character', id:'haru', rarity:3, weight:10 },
      { type:'character', id:'kai', rarity:3, weight:10 },
      { type:'character', id:'yuki', rarity:3, weight:10 },
      { type:'character', id:'suzu', rarity:3, weight:10 },
      { type:'character', id:'ami', rarity:3, weight:10 },
      { type:'equipment', id:'dictionary-pendant', rarity:3, weight:7 },
      { type:'equipment', id:'president-pen', rarity:2, weight:4 },
      { type:'equipment', id:'sakura-bookmark', rarity:2, weight:4 },
      { type:'relic', id:'unsent-letter', rarity:3, weight:4 },
      { type:'relic', id:'first-sakura-omamori', rarity:3, weight:3 },
      { type:'relic', id:'moonlit-page', rarity:4, weight:2 }
    ]
  }
];
window.createGachaState = () => ({
  pulls: 0,
  pullsSinceRare: 0,
  ownedCharacters: ['ren','souta','aoi'],
  ownedEquipment: [],
  ownedRelics: [],
  memoryShards: {}
});
