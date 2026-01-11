import { LitElement, html, css } from 'lit';
import { getCurrentUser, logoutUser, getLoginHistory, isAutoLoginEnabled } from '../utils/userData.js';

export class AppHeader extends LitElement {
  static properties = {
    greeting: { type: String },
    username: { type: String },
    isMenuOpen: { type: Boolean },
    isSettingsOpen: { type: Boolean },
    darkMode: { type: Boolean },
    hasUnreadMessages: { type: Boolean },
    isLogoutConfirmOpen: { type: Boolean },
    isSwitchAccountOpen: { type: Boolean },
    loginHistory: { type: Array },
    isLoading: { type: Boolean },
    currentAction: { type: String },
    error: { type: String }
  };

  constructor() {
    super();
    this.username = 'User';
    this.isMenuOpen = false;
    this.isSettingsOpen = false;
    this.darkMode = false;
    this.hasUnreadMessages = false;
    this.isLogoutConfirmOpen = false;
    this.isSwitchAccountOpen = false;
    this.loginHistory = [];
    this.isLoading = false;
    this.currentAction = '';
    this.error = '';
    this.updateGreeting();
    setInterval(() => this.updateGreeting(), 60000);
  }

  connectedCallback() {
    super.connectedCallback();
    // 获取当前登录用户
    const user = getCurrentUser();
    if (user) {
      this.username = user.username;
    }
  }

  updateGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) this.greeting = '早上好';
    else if (hour < 18) this.greeting = '下午好';
    else this.greeting = '晚上好';
  }

  static styles = css`
    :host {
      display: block;
      height: var(--header-height);
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      z-index: 20;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--glass-border);
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: none;
    }

    .user-area {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .greeting {
      font-size: 0.9rem;
      color: var(--color-text-secondary);
      font-weight: 500;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--color-bg-surface);
      cursor: pointer;
      transition: transform 0.2s, border-color 0.2s;
      border: 2px solid var(--color-bg-surface);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .avatar:hover {
      transform: scale(1.05);
      border-color: var(--color-primary);
    }

    .avatar:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    /* Main Menu */
    .user-menu {
      position: absolute;
      top: 70px;
      right: 20px;
      background: var(--color-bg-main);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      padding: 8px;
      width: 220px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      transform-origin: top right;
      transform: scaleY(0);
      opacity: 0;
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms ease;
      z-index: 100;
      overflow: hidden;
    }

    .user-menu.open {
      transform: scaleY(1);
      opacity: 1;
    }

    /* Settings Submenu */
    .settings-submenu {
      position: absolute;
      top: 0;
      right: 100%;
      background: var(--color-bg-main);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      padding: 8px;
      width: 220px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      transform-origin: top right;
      transform: translateX(20px) scaleX(0);
      opacity: 0;
      transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease;
      z-index: 99;
    }

    .settings-submenu.open {
      transform: translateX(0) scaleX(1);
      opacity: 1;
    }

    /* Menu Items */
    .menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 16px;
      color: var(--color-text-main);
      text-decoration: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.15s, color 0.2s;
      font-size: 0.95rem;
      position: relative;
      user-select: none;
      outline: none;
    }

    .menu-item:hover {
      background-color: var(--color-bg-surface);
      color: var(--color-primary);
      transform: translateY(-1px);
    }

    .menu-item:focus {
      background-color: var(--color-bg-surface);
      outline: 2px solid var(--color-primary);
    }

    .menu-item:active {
      transform: translateY(0);
    }

    .menu-item.selected {
      background-color: var(--color-bg-surface);
      color: var(--color-primary);
    }

    .menu-item.has-submenu::after {
      content: '⟩';
      font-size: 0.8rem;
      opacity: 0.7;
    }

    /* Unread Messages Indicator */
    .notification-dot {
      position: absolute;
      top: 12px;
      right: 16px;
      width: 8px;
      height: 8px;
      background: #EF4444;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.8;
      }
    }

    /* Dividers */
    .menu-divider {
      height: 1px;
      background: var(--glass-border);
      margin: 8px 0;
    }

    /* Accessibility */
    [role="menu"] {
      outline: none;
    }

    [role="menuitem"] {
      cursor: pointer;
    }

    [role="menuitem"]:hover {
      background-color: var(--color-bg-surface);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .header-content {
        padding: 0 12px;
      }

      .logo {
        font-size: 1.2rem;
      }

      .greeting {
        display: none;
      }

      .user-menu,
      .settings-submenu {
        right: 12px;
        left: 12px;
        width: auto;
        max-width: 300px;
      }

      .settings-submenu {
        top: 100%;
        right: 0;
        transform-origin: top right;
        transform: translateY(20px) scaleY(0);
      }

      .settings-submenu.open {
        transform: translateY(0) scaleY(1);
      }
    }

    /* High Contrast Support */
    @media (prefers-contrast: high) {
      .menu-item {
        border: 1px solid transparent;
      }

      .menu-item:hover {
        border-color: var(--color-primary);
      }
    }

    /* Reduced Motion Support */
    @media (prefers-reduced-motion: reduce) {
      .user-menu,
      .settings-submenu,
      .menu-item,
      .avatar {
        transition: none;
      }
    }

    /* Confirmation Dialog */
    .confirm-dialog {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .confirm-dialog-content {
      background: var(--color-bg-main);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      padding: 24px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .confirm-dialog-title {
      font-size: 1.25rem;
      font-weight: 500;
      margin-bottom: 12px;
      text-align: center;
    }

    .confirm-dialog-message {
      color: var(--color-text-secondary);
      margin-bottom: 20px;
      text-align: center;
      line-height: 1.5;
    }

    .confirm-dialog-buttons {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    .confirm-dialog-button {
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    .confirm-dialog-button.cancel {
      background: var(--color-bg-surface);
      color: var(--color-text-main);
      border: 1px solid var(--glass-border);
    }

    .confirm-dialog-button.cancel:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .confirm-dialog-button.confirm {
      background: var(--color-state-error);
      color: white;
    }

    .confirm-dialog-button.confirm:hover {
      background: var(--color-state-error-hover);
    }

    /* Switch Account Dialog */
    .switch-account-dialog {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .switch-account-content {
      background: var(--color-bg-main);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      padding: 24px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .switch-account-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .switch-account-title {
      font-size: 1.25rem;
      font-weight: 500;
    }

    .close-button {
      background: none;
      border: none;
      color: var(--color-text-secondary);
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
    }

    .close-button:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .account-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-height: 300px;
      overflow-y: auto;
    }

    .account-item {
      display: flex;
      align-items: center;
      padding: 12px;
      background: var(--color-bg-surface);
      border: 1px solid var(--glass-border);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .account-item:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(4px);
    }

    .account-item.selected {
      border-color: var(--color-primary);
      background: rgba(90, 100, 255, 0.1);
    }

    .account-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--color-primary);
      margin-right: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: 500;
    }

    .account-info {
      flex: 1;
    }

    .account-username {
      font-weight: 500;
      margin-bottom: 2px;
    }

    .account-last-login {
      font-size: 0.8rem;
      color: var(--color-text-secondary);
    }

    .auto-login-indicator {
      color: var(--color-primary);
      font-size: 0.8rem;
      background: rgba(90, 100, 255, 0.1);
      padding: 2px 6px;
      border-radius: 10px;
    }

    /* Password Input Dialog */
    .password-dialog {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .password-dialog-content {
      background: var(--color-bg-main);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      padding: 24px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .password-dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .password-dialog-title {
      font-size: 1.25rem;
      font-weight: 500;
    }

    .password-form-group {
      margin-bottom: 20px;
    }

    .password-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: var(--color-text-secondary);
    }

    .password-input {
      width: 100%;
      padding: 10px;
      background: var(--color-bg-surface);
      border: 1px solid var(--glass-border);
      border-radius: 6px;
      color: var(--color-text-main);
      font-size: 1rem;
    }

    .password-input:focus {
      outline: none;
      border-color: var(--color-primary);
    }

    .password-dialog-buttons {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .password-dialog-button {
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    .password-dialog-button.cancel {
      background: var(--color-bg-surface);
      color: var(--color-text-main);
      border: 1px solid var(--glass-border);
    }

    .password-dialog-button.cancel:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .password-dialog-button.submit {
      background: var(--color-primary);
      color: white;
    }

    .password-dialog-button.submit:hover {
      background: var(--color-primary-hover);
    }

    /* Loading State */
    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  render() {
    return html`
      <div class="header-content">
        <div class="logo">抬头望星</div>
        <div class="user-area">
          <span class="greeting">${this.greeting}, ${this.username}</span>
          <div 
            class="avatar" 
            @click=${this._toggleMenu}
            @keydown=${this._handleKeyDown}
            tabindex="0"
            role="button"
            aria-haspopup="menu"
            aria-expanded=${this.isMenuOpen}
            aria-controls="user-menu"
          >
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=${this.username}" 
              width="100%" 
              height="100%" 
              alt="用户头像" 
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      <!-- Main User Menu -->
      <div 
        id="user-menu"
        class="user-menu ${this.isMenuOpen ? 'open' : ''}"
        role="menu"
        aria-labelledby="user-avatar"
        @click=${this._handleMenuClick}
      >
        <!-- Core Menu Items -->
        <div 
          class="menu-item" 
          @click=${() => this._handleAction('messages')}
          role="menuitem"
          tabindex="0"
          aria-label="消息"
          aria-haspopup="false"
        >
          <span>💬</span> 消息
          ${this.hasUnreadMessages ? html`<span class="notification-dot" aria-hidden="true"></span>` : ''}
        </div>
        
        <!-- Settings with Submenu -->
        <div 
          class="menu-item has-submenu"
          @click=${() => this._toggleSettingsSubmenu()}
          role="menuitem"
          tabindex="0"
          aria-haspopup="menu"
          aria-expanded=${this.isSettingsOpen}
          aria-controls="settings-submenu"
        >
          <span>⚙️</span> 设置
        </div>
        
        <!-- About -->
        <div 
          class="menu-item" 
          @click=${() => this._handleAction('about')}
          role="menuitem"
          tabindex="0"
          aria-label="关于"
        >
          <span>ℹ️</span> 关于
        </div>
        
        <!-- Divider -->
        <div class="menu-divider"></div>
        
        <!-- Account Switch -->
        <div 
          class="menu-item" 
          @click=${() => this._handleAction('switch-account')}
          role="menuitem"
          tabindex="0"
          aria-label="切换账号"
        >
          <span>🔄</span> 切换账号
        </div>
        
        <!-- Logout -->
        <div 
          class="menu-item" 
          @click=${() => this._handleAction('logout')}
          role="menuitem"
          tabindex="0"
          aria-label="退出账号"
          style="color: var(--color-state-error)"
        >
          <span>🚪</span> 退出账号
        </div>
      </div>
      
      <!-- Settings Submenu -->
      <div 
        id="settings-submenu"
        class="settings-submenu ${this.isSettingsOpen ? 'open' : ''}"
        role="menu"
        aria-labelledby="settings-menu"
      >
        <!-- Personal Profile -->
        <div 
          class="menu-item" 
          @click=${() => this._handleAction('profile-edit')}
          role="menuitem"
          tabindex="0"
          aria-label="个人资料编辑"
        >
          <span>👤</span> 个人资料
        </div>
        
        <!-- Notification Settings -->
        <div 
          class="menu-item" 
          @click=${() => this._handleAction('notification-settings')}
          role="menuitem"
          tabindex="0"
          aria-label="通知设置"
        >
          <span>🔔</span> 通知设置
        </div>
        
        <!-- Privacy Settings -->
        <div 
          class="menu-item" 
          @click=${() => this._handleAction('privacy-settings')}
          role="menuitem"
          tabindex="0"
          aria-label="隐私设置"
        >
          <span>🔒</span> 隐私设置
        </div>
        
        <!-- Theme Settings -->
        <div 
          class="menu-item" 
          @click=${() => this._handleAction('theme-settings')}
          role="menuitem"
          tabindex="0"
          aria-label="主题与外观"
        >
          <span>${this.darkMode ? '☀️' : '🌙'}</span> ${this.darkMode ? '浅色模式' : '深色模式'}
        </div>
        
        <!-- Account Security -->
        <div 
          class="menu-item" 
          @click=${() => this._handleAction('security-settings')}
          role="menuitem"
          tabindex="0"
          aria-label="账号安全"
        >
          <span>🛡️</span> 账号安全
        </div>
      </div>

      <!-- Logout Confirmation Dialog -->
      ${this.isLogoutConfirmOpen ? html`
        <div class="confirm-dialog" role="alertdialog" aria-labelledby="logout-confirm-title">
          <div class="confirm-dialog-content">
            <h3 class="confirm-dialog-title" id="logout-confirm-title">退出登录</h3>
            <p class="confirm-dialog-message">确定要退出当前账号吗？</p>
            <div class="confirm-dialog-buttons">
              <button 
                class="confirm-dialog-button cancel" 
                @click=${() => this.isLogoutConfirmOpen = false}
              >
                取消
              </button>
              <button 
                class="confirm-dialog-button confirm" 
                @click=${this._confirmLogout}
              >
                确认退出
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Switch Account Dialog -->
      ${this.isSwitchAccountOpen ? html`
        <div class="switch-account-dialog" role="dialog" aria-labelledby="switch-account-title">
          <div class="switch-account-content">
            <div class="switch-account-header">
              <h3 class="switch-account-title" id="switch-account-title">切换账号</h3>
              <button 
                class="close-button" 
                @click=${() => this.isSwitchAccountOpen = false}
                aria-label="关闭"
              >
                ×
              </button>
            </div>
            <div class="account-list">
              ${this.isLoading ? html`
                <div class="loading">
                  <div class="loading-spinner"></div>
                </div>
              ` : this.loginHistory.length > 0 ? html`
                ${this.loginHistory.map((account) => {
                  const isAutoLogin = isAutoLoginEnabled(account.username);
                  const isCurrentUser = account.username === this.username;
                  return html`
                    <div 
                      class="account-item ${isCurrentUser ? 'selected' : ''}" 
                      @click=${() => this._selectAccount(account.username)}
                      role="button"
                      tabindex="0"
                    >
                      <div class="account-avatar">
                        ${account.username.charAt(0).toUpperCase()}
                      </div>
                      <div class="account-info">
                        <div class="account-username">
                          ${account.username}
                          ${isCurrentUser ? html`<span style="font-size: 0.8rem; color: var(--color-primary); margin-left: 8px;">(当前)</span>` : ''}
                        </div>
                        <div class="account-last-login">
                          ${new Date(account.lastLogin).toLocaleString()}
                        </div>
                      </div>
                      ${isAutoLogin ? html`<span class="auto-login-indicator">自动登录</span>` : ''}
                    </div>
                  `;
                })}
              ` : html`
                <div style="text-align: center; color: var(--color-text-secondary); padding: 20px;">
                  暂无登录历史
                </div>
              `}
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Password Input Dialog -->
      ${this.currentAction === 'password-required' ? html`
        <div class="password-dialog" role="dialog" aria-labelledby="password-dialog-title">
          <div class="password-dialog-content">
            <div class="password-dialog-header">
              <h3 class="password-dialog-title" id="password-dialog-title">请输入密码</h3>
              <button 
                class="close-button" 
                @click=${() => this.currentAction = ''}
                aria-label="关闭"
              >
                ×
              </button>
            </div>
            <form @submit=${this._handlePasswordSubmit}>
              <div class="password-form-group">
                <label for="password-input" class="password-label">密码</label>
                <input 
                  type="password" 
                  id="password-input" 
                  class="password-input" 
                  placeholder="请输入密码" 
                  required
                  autofocus
                >
              </div>
              <div class="password-dialog-buttons">
                <button 
                  type="button" 
                  class="password-dialog-button cancel" 
                  @click=${() => this.currentAction = ''}
                >
                  取消
                </button>
                <button 
                  type="submit" 
                  class="password-dialog-button submit"
                  ?disabled=${this.isLoading}
                >
                  ${this.isLoading ? html`<div class="loading-spinner"></div>` : '登录'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}
    `;
  }

  _toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  _toggleSettingsSubmenu() {
    this.isSettingsOpen = !this.isSettingsOpen;
  }

  _handleAction(action) {
    this.isMenuOpen = false;
    if (action === 'logout') {
      this.isLogoutConfirmOpen = true;
    } else if (action === 'switch-account') {
      this._openSwitchAccountDialog();
    } else if (action === 'toggle-dark-mode') {
      this.dispatchEvent(new CustomEvent('toggle-dark-mode', { bubbles: true, composed: true }));
    } else if (action === 'settings') {
      this.dispatchEvent(new CustomEvent('toggle-settings', { bubbles: true, composed: true }));
    } else if (action === 'about') {
      this.dispatchEvent(new CustomEvent('navigate', { 
        detail: { id: 'about' },
        bubbles: true, 
        composed: true 
      }));
    } else if (action === 'profile') {
      // Profile handling
    }
  }

  // Confirm logout
  async _confirmLogout() {
    this.isLoading = true;
    try {
      // Simulate some processing time
      await new Promise(resolve => setTimeout(resolve, 500));
      const success = logoutUser();
      if (success) {
        // 发出登出成功事件，通知应用更新状态
        this.dispatchEvent(new CustomEvent('logout-success', {
          bubbles: true,
          composed: true
        }));
        // 关闭所有弹窗
        this.isLogoutConfirmOpen = false;
        this.isMenuOpen = false;
        this.isSettingsOpen = false;
      } else {
        // 显示登出失败消息
        console.error('登出失败，请重试');
        // 可以添加一个用户可见的错误提示
        this.error = '登出失败，请重试';
        setTimeout(() => {
          this.error = '';
        }, 3000);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      this.error = '登出过程中发生错误';
      setTimeout(() => {
        this.error = '';
      }, 3000);
    } finally {
      this.isLoading = false;
    }
  }

  // Open switch account dialog
  async _openSwitchAccountDialog() {
    this.isLoading = true;
    try {
      // Get login history
      this.loginHistory = getLoginHistory();
      this.isSwitchAccountOpen = true;
    } catch (error) {
      console.error('Failed to load login history:', error);
      // Show error message
    } finally {
      this.isLoading = false;
    }
  }

  // Select account from the list
  _selectAccount(username) {
    // Check if it's the current user
    if (username === this.username) {
      this.isSwitchAccountOpen = false;
      return;
    }

    // Check if auto-login is enabled
    if (isAutoLoginEnabled(username)) {
      // Auto-login
      this._handleAutoLogin(username);
    } else {
      // Need password
      this.selectedAccount = username;
      this.currentAction = 'password-required';
    }
    this.isSwitchAccountOpen = false;
  }

  // Handle auto-login
  async _handleAutoLogin(username) {
    this.isLoading = true;
    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, we would validate the user and set the session
      // For this implementation, we'll just reload the page to trigger login flow
      window.location.reload();
    } catch (error) {
      console.error('Auto-login failed:', error);
      // Show error message
      this.isLoading = false;
    }
  }

  // Handle password submission
  async _handlePasswordSubmit(e) {
    e.preventDefault();
    this.isLoading = true;
    const passwordInput = this.shadowRoot.getElementById('password-input');
    const password = passwordInput.value;

    try {
      // Simulate password validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, we would validate the password here
      // If valid, we would set the session and reload the page
      window.location.reload();
    } catch (error) {
      console.error('Password validation failed:', error);
      // Show error message
    } finally {
      this.isLoading = false;
      this.currentAction = '';
    }
  }
}

customElements.define('app-header', AppHeader);
