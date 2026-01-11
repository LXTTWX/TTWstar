import { LitElement, html, css } from 'lit';
import './timer-tool.js';
import './unit-converter.js';
import './calculator-tool.js';
import './message-list.js';

export class AppMain extends LitElement {
  static properties = {
    currentView: { type: String }
  };

  constructor() {
    super();
    this.currentView = 'dashboard';
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    .container {
      padding: 20px;
      height: 100%;
      box-sizing: border-box;
      overflow-y: auto;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 24px;
      padding: 10px 0 50px 0;
      width: 100%;
      box-sizing: border-box;
    }

    .card {
      background: var(--glass-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--glass-border);
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 24px;
      padding: 24px;
      color: var(--color-text-main);
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
                  box-shadow 0.4s ease, 
                  border-color 0.3s ease;
      cursor: pointer;
      opacity: 0;
      animation: slideIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      box-shadow: var(--shadow-card), inset 0 0 20px rgba(255, 255, 255, 0.02);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      position: relative;
      overflow: hidden;
      text-align: left;
    }

    /* Ambient colored blob for liquid feel */
    .card::before {
      content: '';
      position: absolute;
      top: -50px;
      right: -50px;
      width: 120px;
      height: 120px;
      background: var(--color-primary);
      filter: blur(60px);
      opacity: 0.15;
      border-radius: 50%;
      transition: all 0.6s ease;
      z-index: 0;
    }

    /* Surface shine effect */
    .card::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 200%;
      height: 100%;
      background: linear-gradient(
        115deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.05) 30%, 
        rgba(255, 255, 255, 0.15) 50%, 
        rgba(255, 255, 255, 0.05) 70%, 
        transparent 100%
      );
      transform: skewX(-20deg);
      pointer-events: none;
      transition: none;
    }

    .card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: var(--shadow-hover), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
      z-index: 1;
    }

    .card:hover::before {
      opacity: 0.25;
      transform: scale(1.5) translate(-20px, 20px);
    }

    .card:hover::after {
      left: 100%;
      transition: left 0.7s ease-in-out;
    }

    .icon, h2, p {
      position: relative;
      z-index: 1;
    }

    .back-btn {
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      color: var(--color-text-main);
      font-size: 1rem;
      cursor: pointer;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 12px;
      transition: all 0.2s;
      backdrop-filter: blur(10px);
    }

    .back-btn:hover {
      background: var(--color-bg-surface);
      color: var(--color-primary);
      transform: translateX(-4px);
    }

    .tool-container {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 40px;
      border: 1px solid var(--glass-border);
      box-shadow: var(--shadow-card);
      animation: fadeIn 0.4s ease-out;
      max-width: 1200px;
      margin: 0 auto;
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    h2 { 
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text-main);
      letter-spacing: -0.01em;
    }
    
    p { 
      margin: 0;
      font-size: 0.95rem;
      color: var(--color-text-secondary);
      line-height: 1.5;
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 4px;
      display: block;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
      transition: transform 0.3s ease;
    }

    .card:hover .icon {
      transform: scale(1.1) rotate(5deg);
    }

    @media (max-width: 600px) {
      .grid {
        grid-template-columns: 1fr;
        gap: 16px;
        padding: 0 0 30px 0;
      }
      .card {
        padding: 20px;
        flex-direction: row;
        align-items: center;
      }
      .icon {
        margin-bottom: 0;
        margin-right: 16px;
        font-size: 2rem;
      }
      .tool-container {
        padding: 20px;
      }
    }
  `;

  render() {
    if (this.currentView === 'dashboard') {
      return html`
        <div class="grid">
          ${this._renderCards()}
        </div>
      `;
    }

    return html`
      <div class="container">
        <button class="back-btn" @click=${() => this._navigate('dashboard')}>
          ← 返回仪表盘
        </button>
        <div class="tool-container">
          ${this._renderTool()}
        </div>
      </div>
    `;
  }

  _renderTool() {
    switch(this.currentView) {
      case 'timer': return html`<timer-tool></timer-tool>`;
      case 'converter': return html`<unit-converter></unit-converter>`;
      case 'calculator': return html`<calculator-tool></calculator-tool>`;
      case 'messages': return html`<message-list @unread-status-changed=${this._handleUnreadStatusChanged}></message-list>`;
      default: return html`<div>功能开发中...</div>`;
    }
  }

  _handleUnreadStatusChanged(e) {
    // 向父组件传递未读消息状态变化
    this.dispatchEvent(new CustomEvent('unread-status-changed', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  _renderCards() {
    const features = [
      { id: 'messages', title: '消息中心', icon: '💬', desc: '查看系统通知和消息' },
      { id: 'timer', title: '计时器', icon: '⏱️', desc: '精准倒计时与秒表' },
      { id: 'converter', title: '单位转换', icon: '⚖️', desc: '32种单位实时换算' },
      { id: 'color', title: '颜色工具', icon: '🎨', desc: 'HSL/RGB/HEX 转换' },
      { id: 'todo', title: '待办事项', icon: '📝', desc: '高效任务管理' },
      { id: 'weather', title: '天气', icon: '☁️', desc: '实时天气查看' },
      { id: 'settings', title: '设置', icon: '⚙️', desc: '个性化偏好设置' }
    ];

    return features.map((f, index) => html`
      <div class="card" 
           style="animation-delay: ${index * 0.1}s"
           @click=${() => this._navigate(f.id)}>
        <span class="icon">${f.icon}</span>
        <h2>${f.title}</h2>
        <p>${f.desc}</p>
      </div>
    `);
  }

  _navigate(view) {
    if (view === 'settings') {
      this.dispatchEvent(new CustomEvent('toggle-settings', { bubbles: true, composed: true }));
    } else {
      this.currentView = view;
      this.dispatchEvent(new CustomEvent('view-changed', { 
        detail: { view },
        bubbles: true, 
        composed: true 
      }));
    }
  }
}

customElements.define('app-main', AppMain);
