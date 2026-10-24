// 單機地圖資料 v0.31.9：節點固定，進度由 localStorage 保存；題庫由關卡指定。
window.MAP_NODES = [
  { id:'stage-01', order:1, name:'櫻花校舍入口', type:'normal', enemy:'忘卻迷霧', cost:2, difficulty:'easy', questionPool:'n5_basic', questionCount:4, reward:'招募券 ×1', unlocked:true, description:'放學後的校舍裡，飄著會讓人忘記單字的霧。先從 N5 基礎單字開始。' },
  { id:'stage-02', order:2, name:'圖書館走廊', type:'normal', enemy:'文法小怪', cost:3, difficulty:'normal', questionPool:'n5_school', questionCount:5, reward:'招募券 ×1', unlocked:false, description:'走廊盡頭傳來翻書聲，學校與日常單字考驗正在等待。' },
  { id:'stage-03', order:3, name:'天台的約定', type:'boss', enemy:'學測魔王', cost:5, difficulty:'hard', questionPool:'n4_basic', questionCount:6, reward:'招募券 ×2＋月下書頁', unlocked:false, description:'在櫻花樹下，與本章的 Boss 進行 N4 單字決戰。' }
];
