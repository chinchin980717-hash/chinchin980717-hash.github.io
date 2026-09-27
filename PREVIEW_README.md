# 戀語解密 Flip!｜完整介面預覽包

## 線上預覽

開啟 `preview.html`，即可使用左側控制面板展示正式遊戲的所有主要介面：

1. 遊戲主頁
2. 側邊選單
3. 角色養成
4. 冒險地圖
5. 伴學路線選擇
6. 日語翻牌學習
7. 戰鬥畫面與技能 VFX
8. Chapter Clear 結算
9. 劇情招募獨立頁

右側 iframe 直接載入正式 `game.html`，不是靜態截圖或仿製畫面。按下「播放完整流程」會依序切換前 8 個遊戲畫面。

## 本地預覽

在此資料夾執行：

```bash
python3 -m http.server 4184
```

再開啟：

```text
http://127.0.0.1:4184/preview.html
```

## 檔案說明

- `preview.html`：預覽器版面與頁面選單
- `preview.css`：預覽器展示台與響應式樣式
- `preview.js`：iframe 畫面切換與完整流程播放
- `game.html`、`game.js`、`game.css`：正式遊戲主頁、流程與戰鬥畫面
- `data/`：正式遊戲資料模組

預覽版本：`v0.19.0`
