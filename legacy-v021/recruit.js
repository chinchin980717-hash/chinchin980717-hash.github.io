// 獨立劇情招募頁 v0.14.0：只依賴 data/gacha.js，方便獨立更新卡池。
const $ = (selector) => document.querySelector(selector);
const GACHA_KEY = 'koiflip-gacha-v0.13.0';
const MAP_KEY = 'koiflip-map-v0.10.0';
const EQUIPMENT_KEY = 'koiflip-equipment-v0.11.0';
const RELIC_KEY = 'koiflip-relics-v0.12.0';
const POOL = (window.GACHA_POOLS || [])[0] || { name:'校舍心動招募', entries:[], pity:{pulls:10,minimumRarity:3} };
const CHARACTER_NAMES = {ren:'涼宮 蓮',souta:'橘 奏太',aoi:'櫻井 葵',rin:'黑羽 凜',haru:'白石 春',kai:'神谷 海',yuki:'月城 雪',suzu:'神樂 鈴',ami:'星野 亞美'};
let mapState = JSON.parse(localStorage.getItem(MAP_KEY)||'null') || {energy:10,tickets:0,unlocked:['stage-01'],selected:null};
let gachaState = JSON.parse(localStorage.getItem(GACHA_KEY)||'null') || {pulls:0,pullsSinceRare:0,ownedCharacters:['ren','souta','aoi'],ownedEquipment:[],ownedRelics:[],memoryShards:{}};
let equipmentState = JSON.parse(localStorage.getItem(EQUIPMENT_KEY)||'null') || {owned:['president-pen','dictionary-pendant','sakura-bookmark'],equipped:{}};
let relicState = JSON.parse(localStorage.getItem(RELIC_KEY)||'null') || {owned:['first-sakura-omamori'],equipped:['first-sakura-omamori']};
function save(key,value){localStorage.setItem(key,JSON.stringify(value))}
function getEquipment(id){return (window.EQUIPMENT_CATALOG||[]).find(item=>item.id===id)}
function getRelic(id){return (window.RELIC_CATALOG||[]).find(item=>item.id===id)}
function displayName(entry){if(entry.type==='character')return CHARACTER_NAMES[entry.id]||entry.id;if(entry.type==='equipment')return getEquipment(entry.id)?.name||entry.id;if(entry.type==='relic')return getRelic(entry.id)?.name||entry.id;return entry.id}
function weightedPick(entries){const total=entries.reduce((sum,item)=>sum+(item.weight||1),0);let point=Math.random()*total;for(const item of entries){point-=item.weight||1;if(point<=0)return item}return entries[entries.length-1]}
function render(){
  $('#recruit-tickets').textContent=String(mapState.tickets||0);
  const until=Math.max(0,POOL.pity.pulls-(gachaState.pullsSinceRare||0));
  $('#recruit-pity').textContent=until===0?'下一抽保底':String(until);
  $('#pull-one-btn').disabled=(mapState.tickets||0)<1;
  $('#pull-ten-btn').disabled=(mapState.tickets||0)<10;
  $('#pool-description').textContent=`${POOL.name||'劇情招募'} · 用冒險與學習得到的招募券，尋找新的學習夥伴。`;
  $('#recruit-pity-note').textContent=`十連招募至少包含 1 件稀有以上物品；連續 ${POOL.pity.pulls-1} 抽未出現稀有時，下一抽必定稀有。`;
}
function grant(entry){
  const name=displayName(entry);let duplicate=false;let detail='';
  if(entry.type==='character'){
    if(gachaState.ownedCharacters.includes(entry.id)){duplicate=true;gachaState.memoryShards[entry.id]=(gachaState.memoryShards[entry.id]||0)+1;detail='重複角色轉換為記憶碎片 ×1'}
    else{gachaState.ownedCharacters.push(entry.id);detail='新角色已加入角色圖鑑'}
  }else if(entry.type==='equipment'){
    if(!gachaState.ownedEquipment.includes(entry.id))gachaState.ownedEquipment.push(entry.id);
    if(!equipmentState.owned.includes(entry.id))equipmentState.owned.push(entry.id);save(EQUIPMENT_KEY,equipmentState);detail='已加入裝備庫，可在角色詳情頁裝備';
  }else if(entry.type==='relic'){
    if(!gachaState.ownedRelics.includes(entry.id))gachaState.ownedRelics.push(entry.id);
    if(!relicState.owned.includes(entry.id))relicState.owned.push(entry.id);save(RELIC_KEY,relicState);detail='已加入聖物庫，可在地圖頁攜帶';
  }
  return {entry,name,duplicate,detail};
}
function pull(count){
  if((mapState.tickets||0)<count){$('#recruit-results').innerHTML='<p class="recruit-error">招募券不足。完成學習或關卡可以取得更多招募券。</p>';return}
  const entries=POOL.entries||[];if(!entries.length)return;mapState.tickets-=count;const results=[];let hasRare=false;
  for(let i=0;i<count;i++){
    let entry=weightedPick(entries);const mustGuarantee=(i===count-1&&count===10&&!hasRare)||(gachaState.pullsSinceRare>=POOL.pity.pulls-1);
    if(mustGuarantee){const rare=entries.filter(item=>item.rarity>=POOL.pity.minimumRarity);if(rare.length)entry=weightedPick(rare)}
    if(entry.rarity>=POOL.pity.minimumRarity){hasRare=true;gachaState.pullsSinceRare=0}else gachaState.pullsSinceRare++;
    gachaState.pulls++;results.push(grant(entry));
  }
  save(MAP_KEY,mapState);save(GACHA_KEY,gachaState);render();
  $('#recruit-results').innerHTML=`<div class="recruit-result-heading"><strong>${count===10?'十連招募完成':'招募完成'}</strong><small>本次消耗招募券 ×${count}</small></div><div class="recruit-result-grid">${results.map(result=>`<div class="recruit-result-card rarity-${result.entry.rarity}"><span>${result.entry.type==='character'?'♛':result.entry.type==='equipment'?'✦':'❖'}</span><div><strong>${result.name}</strong><small>${result.entry.type==='character'?'角色':result.entry.type==='equipment'?'裝備':'聖物'} · ${'★'.repeat(result.entry.rarity)}</small><em>${result.duplicate?'記憶碎片 ×1':result.detail}</em></div></div>`).join('')}</div>`;
}
$('#back-button').addEventListener('click',()=>history.back());
$('#pull-one-btn').addEventListener('click',()=>pull(1));
$('#pull-ten-btn').addEventListener('click',()=>pull(10));
render();
