import { LitElement, html, css } from 'lit';

export class AboutModal extends LitElement {
  static properties = {
    isVisible: { type: Boolean },
    currentView: { type: String }, // 'updates' or 'about'
    showAllVersions: { type: Boolean },
    versionHistory: { type: Array }
  };

  constructor() {
    super();
    this.isVisible = false;
    this.currentView = 'updates'; // Default view: version updates
    this.showAllVersions = false;
    this.versionHistory = this._getVersionHistory();
  }

  // Version history data
  _getVersionHistory() {
    return [
      {
        version: 'V2.07.20250709.3',
        date: '2025-07-09',
        fixes: [
          '修复了登录状态保持问题',
          '优化了计时器功能的音频提醒',
          '解决了部署后资源路径错误',
          '修复了移动端样式错乱问题'
        ],
        features: [
          '新增了退出登录确认功能',
          '添加了账号切换功能',
          '完善了计时器双模式切换',
          '优化了响应式设计',
          '添加了浏览器通知功能'
        ]
      },
      {
        version: 'V2.07.20250709.2',
        date: '2025-07-09',
        fixes: [
          '修复了音频重复播放问题',
          '解决了设置面板保存失败问题'
        ],
        features: [
          '添加了多语言支持',
          '优化了主题切换动画'
        ]
      },
      {
        version: 'V2.07.20250708.1',
        date: '2025-07-08',
        fixes: [
          '修复了计算器计算错误问题',
          '解决了侧边栏导航闪烁问题'
        ],
        features: [
          '新增了单位转换器工具',
          '添加了数据导入/导出功能'
        ]
      },
      {
        version: 'V2.06.20250701.1',
        date: '2025-07-01',
        fixes: [],
        features: [
          '实现了基础计算器功能',
          '添加了计时器工具',
          '设计了现代化UI界面'
        ]
      }
    ];
  }

  static styles = css`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2000;
      justify-content: center;
      align-items: center;
    }

    :host([isVisible]) {
      display: flex;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
    }

    .modal {
      position: relative;
      width: 500px;
      background: rgba(20, 20, 30, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      color: white;
      text-align: left;
      animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      max-height: 80vh;
      overflow-y: auto;
    }

    @keyframes popIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    h2 {
      margin-top: 0;
      font-size: 2rem;
      background: linear-gradient(45deg, #fff, #a0a0ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
    }

    .version {
      font-family: monospace;
      background: rgba(255,255,255,0.1);
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #a0a0ff;
      margin-bottom: 15px;
    }

    .desc {
      margin: 20px 0;
      line-height: 1.6;
      color: rgba(255,255,255,0.8);
      text-align: center;
    }

    .footer {
      margin-top: 30px;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.5);
      text-align: center;
    }

    .close-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.2s;
    }

    .close-btn:hover {
      opacity: 1;
    }

    .tech-stack {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;
      flex-wrap: wrap;
    }

    .tech-badge {
      font-size: 0.8rem;
      padding: 5px 10px;
      border-radius: 15px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
    }

    /* Version updates styles */
    .version-updates {
      margin: 20px 0;
      text-align: left;
    }

    .update-item {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
      transition: all 0.2s;
    }

    .update-item:hover {
      background: rgba(255,255,255,0.08);
      transform: translateY(-2px);
    }

    .update-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .update-version {
      font-family: monospace;
      font-size: 1.1rem;
      font-weight: bold;
      color: #a0a0ff;
    }

    .update-date {
      font-size: 0.9rem;
      color: rgba(255,255,255,0.6);
    }

    .update-section {
      margin-bottom: 12px;
    }

    .update-section h4 {
      margin: 0 0 8px 0;
      font-size: 0.9rem;
      color: rgba(255,255,255,0.8);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .update-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .update-list li {
      padding: 4px 0;
      font-size: 0.9rem;
      color: rgba(255,255,255,0.7);
      position: relative;
      padding-left: 16px;
    }

    .update-list li:before {
      content: '•';
      position: absolute;
      left: 4px;
      color: #a0a0ff;
    }

    .show-more-btn {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s;
      margin: 10px 0;
      width: 100%;
    }

    .show-more-btn:hover {
      background: rgba(255,255,255,0.2);
    }

    .creator {
      text-align: center;
      margin: 20px 0;
      font-size: 1rem;
      color: rgba(255,255,255,0.8);
    }
  `;

  render() {
    // Get versions to display
    const versionsToDisplay = this.showAllVersions ? 
      this.versionHistory : 
      [this.versionHistory[0]];

    // Format date to 'YYYY-MM-DD'
    const formatDate = (dateString) => {
      return dateString;
    };

    return html`
      <div class="overlay" @click=${this.close}></div>
      <div class="modal">
        <button class="close-btn" @click=${this.close}>&times;</button>
        <h2>抬头望星</h2>
        <p class="desc">
          一个现代化、模块化的网页工具箱应用。<br>
          旨在提供优雅、高效的用户体验。
        </p>

        <div class="creator">创作者：دوكنكد。</div>

        <div class="tech-stack">
          <span class="tech-badge">Lit</span>
          <span class="tech-badge">Vite</span>
          <span class="tech-badge">HTML5</span>
          <span class="tech-badge">CSS3</span>
          <span class="tech-badge">ES6</span>
        </div>

        <div class="version-updates">
          <h3 style="text-align: center; margin-bottom: 20px;">版本更新公告</h3>
          ${versionsToDisplay.map(version => html`
            <div class="update-item">
              <div class="update-header">
                <span class="update-version">${version.version}</span>
                <span class="update-date">${formatDate(version.date)}</span>
              </div>
              ${version.fixes.length > 0 ? html`
                <div class="update-section">
                  <h4>修复内容</h4>
                  <ul class="update-list">
                    ${version.fixes.map(fix => html`<li>${fix}</li>`)}
                  </ul>
                </div>
              ` : ''}
              ${version.features.length > 0 ? html`
                <div class="update-section">
                  <h4>更新内容</h4>
                  <ul class="update-list">
                    ${version.features.map(feature => html`<li>${feature}</li>`)}
                  </ul>
                </div>
              ` : ''}
            </div>
          `)}
        </div>

        ${this.versionHistory.length > 1 ? html`
          <button 
            class="show-more-btn" 
            @click=${() => this.showAllVersions = !this.showAllVersions}
          >
            ${this.showAllVersions ? '收起历史版本' : '显示更多版本'}
          </button>
        ` : ''}

        <div class="footer">
          &copy; 2026 最后的希望 Project. All rights reserved.
        </div>
      </div>
    `;
  }

  open() {
    this.isVisible = true;
    this.setAttribute('isVisible', '');
  }

  close() {
    this.isVisible = false;
    this.removeAttribute('isVisible');
    this.showAllVersions = false; // Reset when closing
  }
}

customElements.define('about-modal', AboutModal);
