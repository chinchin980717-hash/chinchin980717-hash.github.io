const frame=document.querySelector('#game-frame');
const title=document.querySelector('#stage-title');
const index=document.querySelector('#stage-index');
const captionTitle=document.querySelector('#stage-caption-title');
const description=document.querySelector('#stage-description');
const flowBtn=document.querySelector('#flow-btn');
let flowTimer=null;
const views={
  home:{label:'遊戲主頁',caption:'主頁與最愛角色',desc:'主頁儀表板、最愛角色卡與二次元手遊側邊選單入口.',index:'01'},
  menu:{label:'側邊選單',caption:'精緻化導航抽屜',desc:'展示品牌標頭、主目的地分組與半透明遮罩效果。',index:'02'},
  roster:{label:'角色養成',caption:'角色養成與裝備欄',desc:'角色資訊、好感度、戰鬥屬性、技能與裝備配置。',index:'03'},
  map:{label:'冒險地圖',caption:'櫻花校舍冒險地圖',desc:'章節節點、隊伍聖物、體力與出擊入口。',index:'04'},
  select:{label:'選擇角色',caption:'伴學路線選擇',desc:'選擇男神線或女神線，確認本次學習旅程的夥伴。',index:'05'},
  story:{label:'序章劇情',caption:'Chapter 01 乙女序章',desc:'角色登場、場景對話、分支選項與心動值變化。',index:'06'},
  learning:{label:'日語學習',caption:'翻牌解密學習',desc:'角色對話、選項、翻牌配對與 Combo 學習流程。',index:'06'},
  battle:{label:'戰鬥畫面',caption:'戰鬥與技能演出',desc:'敵我 HP、日語戰鬥指令、角色技能與完整 VFX。',index:'07'},
  result:{label:'結算畫面',caption:'Chapter Clear 結算',desc:'最高 Combo、完成時間、心動值與下一步入口。',index:'08'}
};
function game(){return frame.contentWindow}
function loaded(){try{const doc=frame.contentDocument;if(doc?.querySelector('#enter-btn')){doc.querySelector('#enter-btn').click()} }catch(e){} }
function activate(name){
  const view=views[name]; if(!view)return;
  clearInterval(flowTimer);flowTimer=null;flowBtn.classList.remove('playing');flowBtn.innerHTML='<span>▶</span> 播放完整流程';
  document.querySelectorAll('.preview-nav-item[data-view]').forEach(btn=>btn.classList.toggle('active',btn.dataset.view===name));
  title.textContent=view.label;index.textContent=view.index;captionTitle.textContent=view.caption;description.textContent=view.desc;
  if(name==='menu'){game().showScreen('title');setTimeout(()=>game().document.querySelector('#menu-toggle')?.click(),100);return}
  if(name==='home'){game().showScreen('title');return}
  if(name==='roster'){game().openRoster();return}
  if(name==='map'){game().openMap();return}
  if(name==='select'){game().showScreen('title');setTimeout(()=>game().document.querySelector('#start-btn')?.click(),80);return}
  if(name==='story'){game().startStory();return}
  if(name==='learning'){game().resetGame();game().showScreen('game');return}
  if(name==='battle'){frame.src='game.html?preview=1&v=0.21.0#battle';return}
  if(name==='result'){game().showScreen('result');return}
}
function startFlow(){
  clearInterval(flowTimer);let n=0;const sequence=['home','menu','roster','map','select','story','learning','battle','result'];flowBtn.classList.add('playing');flowBtn.innerHTML='<span>Ⅱ</span> 播放中';activate(sequence[n]);flowTimer=setInterval(()=>{n+=1;if(n>=sequence.length){clearInterval(flowTimer);flowTimer=null;flowBtn.classList.remove('playing');flowBtn.innerHTML='<span>▶</span> 再播一次';return}activate(sequence[n])},2300)
}
frame.addEventListener('load',loaded);
document.querySelectorAll('.preview-nav-item[data-view]').forEach(btn=>btn.addEventListener('click',()=>activate(btn.dataset.view)));
flowBtn.addEventListener('click',startFlow);
