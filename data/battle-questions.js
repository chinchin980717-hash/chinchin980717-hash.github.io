// 日語戰鬥題庫資料 v0.31.9：依難度與關卡用途分組。
// 題目是靜態資料，不寫入 localStorage；玩家存檔只保存進度與學習成果。
window.BATTLE_QUESTION_POOLS = {
  n5_basic: [
    { id:'n5-basic-001', type:'meaning', level:'N5', jp:'好き', kana:'すき', prompt:'「好き」的意思是？', answer:'喜歡', choices:['約定','喜歡','秘密','朋友'], explanation:'好き（すき）表示喜歡。' },
    { id:'n5-basic-002', type:'meaning', level:'N5', jp:'約束', kana:'やくそく', prompt:'「約束」的意思是？', answer:'約定', choices:['笑容','想見你','約定','一起'], explanation:'約束（やくそく）表示約定。' },
    { id:'n5-basic-003', type:'meaning', level:'N5', jp:'秘密', kana:'ひみつ', prompt:'「秘密」的意思是？', answer:'秘密', choices:['秘密','朋友','重要','笑容'], explanation:'秘密（ひみつ）表示秘密。' },
    { id:'n5-basic-004', type:'meaning', level:'N5', jp:'友達', kana:'ともだち', prompt:'「友達」的意思是？', answer:'朋友', choices:['一起','朋友','約定','想見你'], explanation:'友達（ともだち）表示朋友。' },
    { id:'n5-basic-005', type:'meaning', level:'N5', jp:'笑顔', kana:'えがお', prompt:'「笑顔」的意思是？', answer:'笑容', choices:['笑容','勇氣','秘密','放學'], explanation:'笑顔（えがお）表示笑容。' },
    { id:'n5-basic-006', type:'meaning', level:'N5', jp:'大切', kana:'たいせつ', prompt:'「大切」的意思是？', answer:'重要、珍惜', choices:['重要、珍惜','一起','朋友','想見你'], explanation:'大切（たいせつ）表示重要，也可以表示珍惜。' },
    { id:'n5-basic-007', type:'meaning', level:'N5', jp:'一緒', kana:'いっしょ', prompt:'「一緒」的意思是？', answer:'一起', choices:['一起','喜歡','放學','勇氣'], explanation:'一緒（いっしょ）表示一起。' },
    { id:'n5-basic-008', type:'meaning', level:'N5', jp:'逢いたい', kana:'あいたい', prompt:'「逢いたい」的意思是？', answer:'想見你', choices:['想見你','重要','約定','笑容'], explanation:'逢いたい（あいたい）表示想見你。' }
  ],
  n5_school: [
    { id:'n5-school-001', type:'meaning', level:'N5', jp:'学校', kana:'がっこう', prompt:'「学校」的意思是？', answer:'學校', choices:['圖書館','學校','教室','社團'], explanation:'学校（がっこう）表示學校。' },
    { id:'n5-school-002', type:'meaning', level:'N5', jp:'先生', kana:'せんせい', prompt:'「先生」的意思是？', answer:'老師', choices:['學生','老師','朋友','同學'], explanation:'先生（せんせい）表示老師。' },
    { id:'n5-school-003', type:'meaning', level:'N5', jp:'図書館', kana:'としょかん', prompt:'「図書館」的意思是？', answer:'圖書館', choices:['操場','圖書館','教室','車站'], explanation:'図書館（としょかん）表示圖書館。' },
    { id:'n5-school-004', type:'meaning', level:'N5', jp:'教室', kana:'きょうしつ', prompt:'「教室」的意思是？', answer:'教室', choices:['社團','教室','校舍','公園'], explanation:'教室（きょうしつ）表示教室。' },
    { id:'n5-school-005', type:'meaning', level:'N5', jp:'宿題', kana:'しゅくだい', prompt:'「宿題」的意思是？', answer:'作業', choices:['考試','作業','課本','答案'], explanation:'宿題（しゅくだい）表示作業、作業題。' },
    { id:'n5-school-006', type:'meaning', level:'N5', jp:'勉強', kana:'べんきょう', prompt:'「勉強」的意思是？', answer:'學習', choices:['休息','學習','約會','遊戲'], explanation:'勉強（べんきょう）表示學習。' },
    { id:'n5-school-007', type:'meaning', level:'N5', jp:'毎日', kana:'まいにち', prompt:'「毎日」的意思是？', answer:'每天', choices:['昨天','明天','每天','現在'], explanation:'毎日（まいにち）表示每天。' },
    { id:'n5-school-008', type:'meaning', level:'N5', jp:'放課後', kana:'ほうかご', prompt:'「放課後」的意思是？', answer:'放學後', choices:['上課前','放學後','午休時','考試後'], explanation:'放課後（ほうかご）表示放學後。' }
  ],
  n4_basic: [
    { id:'n4-basic-001', type:'meaning', level:'N4', jp:'必要', kana:'ひつよう', prompt:'「必要」的意思是？', answer:'必要', choices:['方便','必要','危險','特別'], explanation:'必要（ひつよう）表示必要。' },
    { id:'n4-basic-002', type:'meaning', level:'N4', jp:'大事', kana:'だいじ', prompt:'「大事」的意思是？', answer:'重要', choices:['安靜','重要','簡單','遲到'], explanation:'大事（だいじ）表示重要、要緊。' },
    { id:'n4-basic-003', type:'meaning', level:'N4', jp:'確かめる', kana:'たしかめる', prompt:'「確かめる」的意思是？', answer:'確認', choices:['忘記','確認','移動','等待'], explanation:'確かめる（たしかめる）表示確認、查明。' },
    { id:'n4-basic-004', type:'meaning', level:'N4', jp:'守る', kana:'まもる', prompt:'「守る」的意思是？', answer:'守護', choices:['守護','尋找','準備','改變'], explanation:'守る（まもる）表示守護、遵守。' },
    { id:'n4-basic-005', type:'meaning', level:'N4', jp:'間に合う', kana:'まにあう', prompt:'「間に合う」的意思是？', answer:'趕得上', choices:['趕得上','迷路','遲到','放棄'], explanation:'間に合う（まにあう）表示趕得上、來得及。' },
    { id:'n4-basic-006', type:'meaning', level:'N4', jp:'伝える', kana:'つたえる', prompt:'「伝える」的意思是？', answer:'傳達', choices:['隱藏','傳達','借出','返回'], explanation:'伝える（つたえる）表示傳達、告訴。' },
    { id:'n4-basic-007', type:'meaning', level:'N4', jp:'気持ち', kana:'きもち', prompt:'「気持ち」的意思是？', answer:'心情', choices:['心情','聲音','約定','方向'], explanation:'気持ち（きもち）表示心情、感受。' },
    { id:'n4-basic-008', type:'meaning', level:'N4', jp:'思い出', kana:'おもいで', prompt:'「思い出」的意思是？', answer:'回憶', choices:['回憶','未來','消息','願望'], explanation:'思い出（おもいで）表示回憶。' }
  ]
};
