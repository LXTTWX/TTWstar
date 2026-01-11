import { LitElement, html, css } from 'lit';
import './components/app-header.js';
import './components/app-sidebar.js';
import './components/app-main.js';
import './components/auth-modal.js';
import './components/settings-panel.js';
import './components/about-modal.js';
import { mergeSettings } from './utils/settings.js';
import { getCurrentUser } from './utils/userData.js';

export class AppRoot extends LitElement {
  static properties = {
    isSidebarOpen: { type: Boolean },
    isAuthenticated: { type: Boolean },
    user: { type: Object },
    darkMode: { type: Boolean },
    hasUnreadMessages: { type: Boolean }
  };

  constructor() {
    super();
    this.isSidebarOpen = true;
    this.isAuthenticated = false;
    this.user = null;
    this.darkMode = false;
    this.hasUnreadMessages = false;
  }

  connectedCallback() {
    super.connectedCallback();
    // 使用新的用户数据管理工具检查登录状态
    const user = getCurrentUser();
    if (user) {
      this.isAuthenticated = true;
      this.user = user;
    }
    this._initSettings();
  }

  _initSettings() {
    const saved = localStorage.getItem('app-settings');
    const settings = mergeSettings(saved ? JSON.parse(saved) : null);
    this.darkMode = settings.darkMode;
  }

  static styles = css`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
      background: var(--color-bg-main);
      color: var(--color-text-main);
      overflow: hidden;
    }

    .layout {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .content-wrapper {
      display: flex;
      flex: 1;
      overflow: hidden;
      position: relative;
    }

    app-sidebar {
      width: var(--sidebar-width);
      transition: transform var(--transition-speed) ease;
      z-index: 10;
    }

    app-main {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      position: relative;
    }

    .stars {
      display: none;
    }
  `;

  render() {
    return html`
      <div class="layout">
        <div class="stars"></div>
        ${!this.isAuthenticated ? html`
          <auth-modal @login-success=${this._onLogin}></auth-modal>
        ` : html`
          <app-header 
            .username=${this.user?.username || 'User'}
            .darkMode=${this.darkMode}
            .hasUnreadMessages=${this.hasUnreadMessages}
            @toggle-settings=${this._toggleSettings}
            @toggle-dark-mode=${this._toggleDarkMode}
            @logout-success=${this._onLogout}
          ></app-header>
          <div class="content-wrapper">
            <app-sidebar @navigate=${this._onNavigate}></app-sidebar>
            <app-main 
              id="main" 
              @toggle-settings=${this._toggleSettings}
              @unread-status-changed=${this._handleUnreadStatusChanged}
            ></app-main>
          </div>
          <settings-panel id="settings" @settings-changed=${this._onSettingsChanged}></settings-panel>
          <about-modal id="about"></about-modal>
        `}
      </div>
    `;
  }

  _onLogin(e) {
    const { token, user } = e.detail;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.isAuthenticated = true;
    this.user = user;
  }

  _onLogout() {
    // 更新应用状态为未认证
    this.isAuthenticated = false;
    this.user = null;
    // 重置其他相关状态
    this.hasUnreadMessages = false;
    this.darkMode = false;
    // 清除可能的遗留数据
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  _onNavigate(e) {
    const main = this.shadowRoot.getElementById('main');
    if (main) {
      if (e.detail.id === 'settings') {
        this._toggleSettings();
      } else if (e.detail.id === 'about') {
        this._toggleAbout();
      } else {
        main._navigate(e.detail.id);
      }
    }
  }

  _toggleSettings() {
    const settings = this.shadowRoot.getElementById('settings');
    if (settings) {
      settings.open();
    }
  }

  _toggleAbout() {
    const about = this.shadowRoot.getElementById('about');
    if (about) {
      about.open();
    }
  }

  _toggleDarkMode() {
    const settings = this.shadowRoot.getElementById('settings');
    if (settings) {
      settings.toggleDarkMode();
    }
  }

  _onSettingsChanged(e) {
    this.darkMode = e.detail.darkMode;
  }

  _handleUnreadStatusChanged(e) {
    this.hasUnreadMessages = e.detail.hasUnread;
  }
}

customElements.define('app-root', AppRoot);
