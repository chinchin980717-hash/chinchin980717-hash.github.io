# GameState 資料規格 v0.5.0

初期使用 `localStorage` 保存，避免一開始就引入後端。

```js
const GameState = {
  version: 'v0.5.0',
  player: {
    name: 'Player',
    gold: 120,
    energy: 10,
    tickets: 0,
    currentRoute: 'male',
    unlockedStages: ['stage-01'],
    completedLessons: []
  },
  roster: {
    ren: {
      characterId: 'ren',
      level: 1,
      exp: 0,
      affection: 0,
      equipment: [],
      unlockedSkills: [],
      battleCount: 0
    }
  },
  party: ['ren'],
  battle: {
    currentStageId: null,
    turn: 0,
    status: 'idle'
  },
  settings: {
    soundOn: true,
    autoPlayDialogue: false,
    textSpeed: 'normal'
  }
};
```

## 必須操作

- `loadGameState()`：讀取存檔，若無存檔就建立初始狀態
- `saveGameState()`：每次學習完成、升級、戰鬥結束時保存
- `addCharacterExp(characterId, amount)`：處理升級與剩餘經驗
- `addAffection(characterId, amount)`：更新好感度並觸發新台詞
- `completeLesson(lessonId, result)`：發放課程獎勵
- `startStage(stageId)`：檢查體力並建立戰鬥狀態
- `resolveBattle(result)`：發放戰鬥獎勵、更新戰鬥次數

## 設計原則

1. **角色資料與角色目前狀態分離**：角色固定資料放在 `data/characters.js`，玩家進度放在 `GameState.roster`。
2. **學習必須有回饋**：每次完成課程至少獲得角色經驗，答題正確率影響額外獎勵。
3. **戰鬥服務角色養成**：出擊獲得素材，但不能取代學習；Boss 解鎖條件可以要求先完成指定課程。
4. **每個角色都能養成**：不設不可使用的角色，差異放在定位、技能、台詞與路線。
5. **免費原型先不做抽卡**：角色直接解鎖，之後若要加入收集系統再另行設計。
