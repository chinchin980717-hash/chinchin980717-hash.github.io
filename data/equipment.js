// 裝備與聖物資料 v0.8.0
export const EQUIPMENT = [
  { id:'sakura-bookmark', name:'櫻花書籤', slot:'learning', rarity:2, stats:{ speed:3 }, effect:{ type:'comboBonus', value:1 }, description:'連續答對時，Combo 額外增加。' },
  { id:'dictionary-pendant', name:'詞典吊墜', slot:'accessory', rarity:3, stats:{ attack:4 }, effect:{ type:'correctDamage', value:5 }, description:'日語題目答對時追加少量傷害。' },
  { id:'president-pen', name:'會長的鋼筆', slot:'weapon', rarity:2, stats:{ defense:3 }, effect:{ type:'wrongDamageReduce', value:4 }, description:'答錯時降低一次敵人反擊傷害。' }
];

export const RELICS = [
  { id:'first-sakura-omamori', name:'初櫻御守', rarity:3, effect:{ type:'firstWrongProtection', value:20 }, description:'每場第一次答錯時，保留 20% HP。' },
  { id:'unsent-letter', name:'未寄出的情書', rarity:3, effect:{ type:'firstCorrectAffection', value:8 }, description:'第一次答對時，額外增加好感度。' },
  { id:'moonlit-page', name:'月下書頁', rarity:4, effect:{ type:'lowHpWeakness', value:1.2 }, description:'敵人 HP 低於 40% 時，弱點傷害提高。' }
];
