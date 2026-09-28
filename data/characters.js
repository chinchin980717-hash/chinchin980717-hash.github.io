// 《戀語解密 Flip!》角色資料 v0.28.0
// 先用資料模組管理，之後可替換成 API 或資料庫。
window.CHARACTERS = [
  {
    id: 'ren',
    name: '涼宮 蓮',
    route: 'male',
    rarity: 3,
    role: '攻擊型',
    element: 'heart',
    avatar: '♛',
    image: 'assets/ren-library.jpg',
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
  },
  {
    id:'suzu', name:'神樂 鈴', route:'female', rarity:3, role:'支援型', tag:'神秘巫女', element:'sakura', avatar:'⛩', unlockMethod:'story',
    image:'assets/kagura-suzu-shrine.jpg',
    quote:'願神明的祝福，伴隨你的日語學習之旅。',
    baseStats:{hp:112,attack:24,defense:23,speed:21}, growth:{hp:11,attack:3,defense:3,speed:2},
    skills:[{id:'shrine-blessing',name:'神樂祝禱',description:'答對日語題目時，為全隊恢復少量生命。'}],
    affectionLines:{0:'願神明的祝福伴隨你。先把今天的日文暗號念清楚吧。',20:'你的努力，神明一定也有看見。',50:'祭典的鈴聲響起時……我想和你一起聽。'}
  },
  {
    id:'ami', name:'星野 亞美', route:'female', rarity:3, role:'支援型', tag:'元氣後輩', element:'light', avatar:'🎤', unlockMethod:'story',
    image:'assets/hoshino-ami-stage.jpg',
    quote:'學長學長！快聽我剛寫好的日文新歌！',
    baseStats:{hp:100,attack:26,defense:18,speed:28}, growth:{hp:10,attack:3,defense:2,speed:3},
    skills:[{id:'genki-encore',name:'元氣安可',description:'答對日語題目後，提升隊伍速度並恢復少量生命。'}],
    affectionLines:{0:'學長學長！今天的日文暗號，要不要用歌唱的方式記住？',20:'你的應援我收到了！下一首歌也要唱給你聽。',50:'站上舞台前，我最想看到的觀眾就是你。'}
  },
  {
    id: 'rin',
    name: '黑羽 凜',
    route: 'male',
    rarity: 3,
    role: '主唱',
    tag: '霸道主唱',
    element: 'moon',
    avatar: '♪',
    image: 'assets/kuroha-rin-live.jpg',
    quote: '湊近一點，這句日文我只想唱給你聽。'
  },
  {
    id: 'haru',
    name: '白石 春',
    route: 'male',
    rarity: 3,
    role: '作家',
    tag: '溫柔作家',
    element: 'light',
    avatar: '✒',
    image: 'assets/haru-library.jpg',
    quote: '每個單字都是一封還沒寄出的情書。'
  },
  {
    id:'saku', name:'神崎 朔', route:'male', rarity:3, role:'控制型', tag:'天文社觀測者', element:'moon', avatar:'✦', unlockMethod:'story',
    image:'assets/kanzaki-saku-observatory.jpg',
    quote:'星星會指路，但和你一起走的方向，我想自己選。',
    baseStats:{hp:102,attack:22,defense:21,speed:27}, growth:{hp:10,attack:3,defense:3,speed:3},
    skills:[{id:'starlit-analysis',name:'星軌推演',description:'答對日語題目後，降低敵方下一次攻擊威力。'}],
    affectionLines:{0:'今晚的星空很清楚。要不要一起找出北極星？',20:'你記住的每個單字，都像替夜空添了一顆星。',50:'下次觀星……我只想和你一起來。'}
  },
  {
    id:'iori', name:'桐生 律', route:'male', rarity:3, role:'防禦型', tag:'弓道部沉靜主將', element:'star', avatar:'🏹', unlockMethod:'story',
    quote:'呼吸放慢，先聽清楚，再把答案射中。',
    baseStats:{hp:132,attack:21,defense:29,speed:15}, growth:{hp:13,attack:2,defense:4,speed:1},
    skills:[{id:'still-water-guard',name:'靜水之勢',description:'答對日語題目時，為隊伍生成守護屏障。'}],
    affectionLines:{0:'弓道講究專注，學日文也是。準備好就開始吧。',20:'你的發音比上次穩多了，值得肯定。',50:'練習結束後……願意陪我走一段回家的路嗎？'}
  },
  {
    id:'akari', name:'水野 朱莉', route:'female', rarity:3, role:'支援型', tag:'機械社天才修理員', element:'heart', avatar:'🔧', unlockMethod:'story',
    quote:'我不太會說漂亮話……不過你卡住的問題，我一定能和你一起修好。',
    baseStats:{hp:113,attack:21,defense:23,speed:23}, growth:{hp:11,attack:2,defense:3,speed:2},
    skills:[{id:'toolbox-support',name:'工具箱援護',description:'答對日語題目時，替全隊恢復少量生命。'}],
    affectionLines:{0:'這個小故障我來修！你先陪我複習一下零件的日文名稱。',20:'你每次認真思考的樣子，讓我也想把作品做得更好。',50:'我想把最重要的作品送給你……可以嗎？'}
  },
  {
    id:'kotori', name:'七瀨 琴里', route:'female', rarity:3, role:'控制型', tag:'廣播社晨間主持', element:'sakura', avatar:'🎙', unlockMethod:'story',
    image:'assets/nanase-kotori-radio.jpg',
    quote:'早安——今天的日文暗號，就由我用最好的聲音念給你聽。',
    baseStats:{hp:100,attack:26,defense:18,speed:28}, growth:{hp:10,attack:3,defense:2,speed:3},
    skills:[{id:'morning-signal',name:'早晨暗號',description:'答對日語題目後，削弱敵人的下一次攻擊。'}],
    affectionLines:{0:'早安！今天也一起把日文說得更自然吧。',20:'你的聲音一出現在廣播裡，我就會忍不住笑。',50:'明天的晨間點歌……我可以把第一首歌留給你嗎？'}
  },
  {
    id:'rei', name:'鳴海 怜', route:'female', rarity:3, role:'支援型', tag:'貓系攝影師', element:'light', avatar:'📷', unlockMethod:'story',
    image:'assets/narumi-rei-studio.jpg',
    quote:'笑一個。你的答案，剛好落在我鏡頭裡。',
    baseStats:{hp:108,attack:27,defense:19,speed:27}, growth:{hp:10,attack:4,defense:2,speed:3},
    skills:[{id:'snapshot-focus',name:'瞬間對焦',description:'答對日語題目時，替隊伍穩定節奏並恢復少量生命。'}],
    affectionLines:{0:'別躲，光線剛好。先陪我把這個日文暗號念清楚。',20:'你專心思考的表情，很適合留在今天的底片裡。',50:'這張照片……我只想留給你看。'}
  }
];

window.createCharacterState = (characterId) => ({
  characterId,
  level: 1,
  exp: 0,
  affection: 0,
  equipment: [],
  unlockedSkills: [],
  battleCount: 0
});
