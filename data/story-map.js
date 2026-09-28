// 《戀語解密 Flip!》劇情章節地圖 v0.26.0
// 主線關卡採獨立進度，不影響冒險地圖體力、招募券或既有存檔。
window.STORY_CHAPTERS = [
  {
    id: 'chapter-01', order: 1, title: '櫻花校舍篇', subtitle: '放學後的第一個暗號', available: true,
    description: '從鞋櫃裡的神秘紙條開始，沿著日文線索找出第一個約定。',
    nodes: [
      { id: 'c1-node-01', order: 1, title: '放學後的暗號', location: '櫻花校舍 · 放學後', icon: '✉', type: 'prologue', description: '找到寫著「好き」的紙條，與伴學夥伴展開故事。' },
      { id: 'c1-node-02', order: 2, title: '遺失的書頁', location: '舊校舍 · 圖書室', icon: '📖', type: 'story', description: '在書架間找回一頁筆記，解開「秘密」的線索。', scenes: [
        { location: '舊校舍 · 圖書室', speaker: '旁白', title: '空了一頁的筆記', text: '舊圖書室的借閱簿裡，夾著一張被撕走一半的書頁。書頁邊緣寫著「秘密」，墨跡還沒有完全乾。' },
        { location: '舊校舍 · 靠窗書架', speaker: '{{partner}}', title: '{{player}}也在找這個嗎？', text: '「原來{{player}}也看見了。」{{partner}}把另一半紙頁遞過來。兩段筆跡拼在一起，指向了屋頂的方向。' }
      ] },
      { id: 'c1-node-03', order: 3, title: '屋頂的星光', location: '校舍屋頂 · 黃昏', icon: '✦', type: 'story', description: '循著紙頁上的星圖前往屋頂，找到下一個日文暗號。', scenes: [
        { location: '校舍屋頂 · 黃昏', speaker: '旁白', title: '星圖上的記號', text: '夕陽快要沉入校舍後方。紙頁上的星點與天空重疊時，最後一顆星旁浮現出「約束」兩個字。' },
        { location: '校舍屋頂 · 欄杆旁', speaker: '{{partner}}', title: '一起守住約定', text: '「約束，就是說出口以後要記得的事。」{{partner}}看向{{player}}，語氣比平常認真了一點。「那我們也約好，解開這個暗號後再一起往前。」' }
      ] },
      { id: 'c1-node-04', order: 4, title: '雨中的借傘', location: '校門口 · 細雨', icon: '☂', type: 'story', description: '突如其來的細雨讓線索沾濕，也讓兩人的距離更近。', scenes: [
        { location: '校門口 · 細雨', speaker: '旁白', title: '同一把傘', text: '離開屋頂時，天空落下細雨。{{player}}和{{partner}}只找到一把傘，傘柄上刻著「一緒」——像是特意留下的提示。' },
        { location: '通學道 · 櫻花坡', speaker: '{{partner}}', title: '並肩的距離', text: '「一緒，是一起的意思。」{{partner}}把傘往{{player}}這邊挪了些。「路還有一段，今天就一起走吧。」' }
      ] },
      { id: 'c1-node-05', order: 5, title: '櫻花樹下的答案', location: '校園中庭 · 夜色初起', icon: '✿', type: 'story', description: '把所有日文線索連起來，揭開第一章的最後答案。', scenes: [
        { location: '校園中庭 · 櫻花樹下', speaker: '旁白', title: '最後一張紙條', text: '紙條上的「好き、秘密、約束、一緒」終於連成一句完整的訊息。櫻花樹下還藏著最後一張卡片。' },
        { location: '校園中庭 · 櫻花樹下', speaker: '{{partner}}', title: '下一章的邀請', text: '「看來答案不是結束，而是新的開始。」{{partner}}把卡片交給{{player}}。卡片背面寫著：下次見面，帶著這份心意到圖書館來。' }
      ] }
    ]
  },
  {
    id: 'chapter-02', order: 2, title: '圖書館的祕密', subtitle: '第二章 · 尚未開放', available: false,
    description: '新的借閱紀錄與一封沒有寄件人的信，將帶出下一段故事。',
    nodes: [
      { id: 'c2-node-01', order: 1, title: '沒有署名的信', icon: '✉' },
      { id: 'c2-node-02', order: 2, title: '借閱紀錄', icon: '📚' },
      { id: 'c2-node-03', order: 3, title: '深夜自習室', icon: '☾' },
      { id: 'c2-node-04', order: 4, title: '藏書室的腳步聲', icon: '🔎' },
      { id: 'c2-node-05', order: 5, title: '書頁背面的名字', icon: '🔒' }
    ]
  },
  {
    id: 'chapter-03', order: 3, title: '星光祭典篇', subtitle: '第三章 · 尚未開放', available: false,
    description: '祭典夜空中的星光，似乎和最初那張紙條有關。',
    nodes: [
      { id: 'c3-node-01', order: 1, title: '祭典前夕', icon: '🏮' },
      { id: 'c3-node-02', order: 2, title: '遺失的邀請函', icon: '🎐' },
      { id: 'c3-node-03', order: 3, title: '夜空的暗號', icon: '✦' },
      { id: 'c3-node-04', order: 4, title: '最後一班電車', icon: '🚉' },
      { id: 'c3-node-05', order: 5, title: '星光下的約定', icon: '🔒' }
    ]
  }
];
