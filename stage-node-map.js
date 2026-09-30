/* 《戀語解密 Flip!》之字形關卡地圖元件 */
(() => {
  'use strict';
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  class StageNodeMap {
    constructor(containerElement, stages = [], onSelectStage = null) {
      if (!containerElement) throw new TypeError('StageNodeMap requires a map container.');
      this.container = containerElement;
      this.stages = Array.isArray(stages) ? stages : [];
      this.onSelectStage = onSelectStage;
      this.handleClick = event => {
        const item = event.target.closest('.map-node-item[data-id]');
        if (!item || !this.container.contains(item)) return;
        const stage = this.stages.find(candidate => candidate.id === item.dataset.id);
        if (!stage || !stage.unlocked) return;
        this.onSelectStage?.(stage);
      };
      this.container.addEventListener('click', this.handleClick);
    }

    setStages(stages) {
      this.stages = Array.isArray(stages) ? stages : [];
    }

    render() {
      this.container.innerHTML = `
        <div class="map-header"><h3>🗺️ 櫻花校舍冒險地圖</h3><p class="slogan">逐一解鎖關卡，完成日語挑戰與校園冒險</p></div>
        <div class="map-path-container"><div class="map-nodes-wrapper">
          ${this.stages.map((stage, index) => {
            const alignClass = index % 2 === 0 ? 'node-left' : 'node-right';
            const statusClass = !stage.unlocked ? 'locked' : stage.cleared ? 'cleared' : 'unlocked';
            const icon = stage.cleared ? '✓' : stage.type === 'boss' ? '♛' : String(stage.order ?? index + 1);
            const subtitle = stage.subtitle || `${stage.enemy || '冒險關卡'} · 消耗 ${Number(stage.cost) || 0} 體力`;
            const status = !stage.unlocked ? '尚未解鎖' : stage.cleared ? '已通關' : '可以挑戰';
            return `<button class="map-node-item ${alignClass} ${statusClass} ${stage.type === 'boss' ? 'is-boss' : ''} ${stage.selected ? 'is-selected' : ''}" data-id="${escapeHTML(stage.id)}" type="button" ${stage.unlocked ? '' : 'disabled'} aria-label="${escapeHTML(`${stage.name}，${status}`)}">
              <span class="node-circle"><span class="node-number">${escapeHTML(icon)}</span>${stage.cleared ? '<span class="star" aria-hidden="true">★</span>' : !stage.unlocked ? '<span class="lock" aria-hidden="true">🔒</span>' : ''}</span>
              <span class="node-label"><span class="node-title">${Number(stage.order) || index + 1}. ${escapeHTML(stage.name)}</span><span class="node-sub">${escapeHTML(subtitle)}</span><span class="node-status">${status}</span></span>
            </button>`;
          }).join('')}
        </div></div>`;
    }

    destroy() {
      this.container.removeEventListener('click', this.handleClick);
      this.container.replaceChildren();
    }
  }
  window.StageNodeMap = StageNodeMap;
})();
