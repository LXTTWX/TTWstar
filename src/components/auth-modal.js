import { LitElement, html, css } from 'lit';
import './date-picker.js';
import { validatePassword } from '../utils/password.js';
import { registerUser, loginUser } from '../utils/userData.js';

export class AuthModal extends LitElement {
  static properties = {
    mode: { type: String }, // 'login' or 'register'
    error: { type: String },
    isLoading: { type: Boolean }
  };

  constructor() {
    super();
    this.mode = 'login';
    this.error = '';
    this.isLoading = false;
  }

  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
    }

    .modal {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      padding: 40px;
      width: 400px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
      color: white;
      animation: popup 0.3s ease-out;
    }

    @keyframes popup {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    h2 {
      text-align: center;
      margin-bottom: 30px;
      font-weight: 300;
      letter-spacing: 2px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.8);
    }

    input, select {
      width: 100%;
      padding: 12px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: white;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.2s;
    }

    input:focus, select:focus {
      border-color: #a0a0ff;
    }

    button {
      width: 100%;
      padding: 12px;
      background: linear-gradient(45deg, #6a11cb, #2575fc);
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    button:hover {
      opacity: 0.9;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .switch-mode {
      text-align: center;
      margin-top: 20px;
      font-size: 0.9rem;
    }

    .switch-mode a {
      color: #a0a0ff;
      text-decoration: none;
      cursor: pointer;
    }

    .error {
      color: #ff6b6b;
      text-align: center;
      margin-bottom: 15px;
      font-size: 0.9rem;
    }
  `;

  render() {
    return html`
      <div class="modal">
        <h2>${this.mode === 'login' ? '登录' : '注册'}</h2>
        ${this.error ? html`<div class="error">${this.error}</div>` : ''}
        
        <form @submit=${this._handleSubmit}>
          <div class="form-group">
            <label>用户名</label>
            <input type="text" name="username" required minlength="4" maxlength="20" @input=${this._clearError}>
          </div>
          
          <div class="form-group">
            <label>密码</label>
            <input type="password" name="password" required @input=${this._onPasswordInput}>
          </div>

          ${this.mode === 'register' ? html`
            <div class="form-group">
              <date-picker name="birthday" label="生日"></date-picker>
            </div>
            <div class="form-group">
              <label>性别</label>
              <select name="gender">
                <option value="other">保密</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
            <div class="form-group">
              <label>就读学校</label>
              <input type="text" name="school">
            </div>
          ` : ''}

          <button type="submit" ?disabled=${this.isLoading}>
            ${this.isLoading ? '处理中...' : (this.mode === 'login' ? '进入星空' : '创建账号')}
          </button>
        </form>

        <div class="switch-mode">
          ${this.mode === 'login' 
            ? html`还没有账号? <a @click=${() => this._switchMode('register')}>立即注册</a>`
            : html`已有账号? <a @click=${() => this._switchMode('login')}>直接登录</a>`
          }
        </div>
      </div>
    `;
  }

  _switchMode(mode) {
    this.mode = mode;
    this.error = '';
  }

  _clearError() {
    if (this.error) this.error = '';
  }

  _onPasswordInput(e) {
    if (!this.error) return;
    const password = e.target.value;
    const passwordError = validatePassword(password);
    if (!passwordError) this.error = '';
  }

  async _handleSubmit(e) {
    e.preventDefault();
    this.isLoading = true;
    this.error = '';

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (this.mode === 'register') {
      const passwordError = validatePassword(data.password);
      if (passwordError) {
        this.error = passwordError;
        this.isLoading = false;
        return;
      }
    }

    // Manual extraction for date-picker since it's a web component
    if (this.mode === 'register') {
      const datePicker = this.shadowRoot.querySelector('date-picker');
      if (datePicker) {
        data.birthday = datePicker.value;
      }
    }

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      if (this.mode === 'register') {
        const result = registerUser(data);
        if (result.success) {
            this.mode = 'login';
            this.error = '注册成功，请登录';
            // 清空表单
            if (e.target) {
              e.target.reset();
            }
          } else {
            this.error = result.error;
          }
      } else {
        const result = loginUser(data.username, data.password);
        if (result.success) {
          this.dispatchEvent(new CustomEvent('login-success', { 
            detail: { user: result.user } 
          }));
        } else {
          this.error = result.error;
        }
      }
    } catch (err) {
      this.error = '操作失败，请稍后重试';
      console.error('认证失败:', err);
    } finally {
      this.isLoading = false;
    }
  }
}

customElements.define('auth-modal', AuthModal);
