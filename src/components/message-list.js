import { LitElement, html, css } from 'lit';

// 消息组件，实现消息展示和交互功能
export class MessageList extends LitElement {
  static properties = {
    messages: { type: Array },
    isLoading: { type: Boolean },
    hasUnreadMessages: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      max-width: 600px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .message-container {
      background: var(--color-bg-main);
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: var(--color-bg-surface);
      border-bottom: 1px solid var(--glass-border);
    }

    .title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-text-main);
      margin: 0;
    }

    .action-btn {
      background: var(--color-primary);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .action-btn:hover {
      background: var(--color-primary-hover);
      transform: translateY(-1px);
    }

    .action-btn:active {
      transform: translateY(0);
    }

    .action-btn:disabled {
      background: var(--color-text-secondary);
      cursor: not-allowed;
      transform: none;
    }

    .messages-list {
      list-style: none;
      padding: 0;
      margin: 0;
      max-height: 600px;
      overflow-y: auto;
      /* 性能优化：使用虚拟滚动相关样式 */
      contain: content;
      will-change: scroll-position;
    }

    .message-item {
      padding: 16px 20px;
      border-bottom: 1px solid var(--glass-border);
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      /* 性能优化：减少重绘 */
      will-change: background-color, transform;
      contain: layout;
    }

    .message-item:last-child {
      border-bottom: none;
    }

    .message-item:hover {
      background-color: var(--color-bg-surface);
      transform: translateX(4px);
    }

    .message-content {
      flex: 1;
      min-width: 0;
    }

    .message-title {
      font-size: 1rem;
      margin: 0 0 6px 0;
      transition: color 0.2s, font-weight 0.2s;
    }

    .message-title.unread {
      color: #111827;
      font-weight: bold;
    }

    .message-title.read {
      color: #6B7280;
      font-weight: normal;
    }

    .message-preview {
      font-size: 0.9rem;
      color: var(--color-text-secondary);
      margin: 0 0 8px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .message-time {
      font-size: 0.8rem;
      color: var(--color-text-tertiary);
      margin: 0;
    }

    .message-status {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
      margin-left: 16px;
    }

    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #EF4444;
      flex-shrink: 0;
    }

    .empty-state {
      padding: 60px 20px;
      text-align: center;
      color: var(--color-text-secondary);
    }

    .empty-icon {
      font-size: 3rem;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    .loading-state {
      padding: 40px 20px;
      text-align: center;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-bg-surface);
      border-top: 3px solid var(--color-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      :host {
        padding: 0 12px;
      }

      .header {
        padding: 16px;
      }

      .title {
        font-size: 1.25rem;
      }

      .message-item {
        padding: 12px 16px;
      }
    }
  `;

  constructor() {
    super();
    this.messages = [];
    this.isLoading = false;
    this.hasUnreadMessages = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadMessages();
  }

  // 加载消息数据
  async _loadMessages() {
    this.isLoading = true;
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 从本地存储加载消息
      const savedMessages = localStorage.getItem('messages');
      
      if (savedMessages) {
        this.messages = JSON.parse(savedMessages);
      } else {
        // 生成模拟数据
        this.messages = this._generateMockMessages();
        this._saveMessages();
      }
      
      this._updateUnreadStatus();
    } catch (error) {
      console.error('加载消息失败:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // 生成模拟消息数据
  _generateMockMessages() {
    const messages = [
      {
        id: 1,
        title: '欢迎使用抬头望星',
        content: '感谢您注册使用我们的服务！在这里，您可以管理您的日常任务、使用各种实用工具，享受流畅的用户体验。',
        time: new Date(Date.now() - 3600000).toISOString(),
        read: false
      },
      {
        id: 2,
        title: '新版本更新通知',
        content: '我们刚刚发布了新版本，增加了更多实用功能和性能优化。快去体验吧！',
        time: new Date(Date.now() - 7200000).toISOString(),
        read: true
      },
      {
        id: 3,
        title: '提醒：完成您的个人资料',
        content: '请完善您的个人资料，让我们更好地为您服务。',
        time: new Date(Date.now() - 10800000).toISOString(),
        read: false
      },
      {
        id: 4,
        title: '系统维护通知',
        content: '我们将在今晚23:00-次日1:00进行系统维护，期间服务可能会暂时中断。',
        time: new Date(Date.now() - 14400000).toISOString(),
        read: true
      },
      {
        id: 5,
        title: '积分奖励通知',
        content: '您已获得100积分奖励！继续使用我们的服务，可获得更多积分。',
        time: new Date(Date.now() - 18000000).toISOString(),
        read: false
      }
    ];
    
    return messages;
  }

  // 保存消息到本地存储
  _saveMessages() {
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }

  // 更新未读消息状态
  _updateUnreadStatus() {
    this.hasUnreadMessages = this.messages.some(msg => !msg.read);
    
    // 通知父组件更新未读状态
    this.dispatchEvent(new CustomEvent('unread-status-changed', {
      detail: { hasUnread: this.hasUnreadMessages },
      bubbles: true,
      composed: true
    }));
  }

  // 标记单条消息为已读 - 优化性能：批量更新
  _markAsRead(messageId) {
    const messageIndex = this.messages.findIndex(msg => msg.id === messageId);
    if (messageIndex !== -1 && !this.messages[messageIndex].read) {
      // 使用展开语法创建新数组，保持不可变性
      const newMessages = [...this.messages];
      newMessages[messageIndex] = {
        ...newMessages[messageIndex],
        read: true
      };
      
      // 批量更新，减少重渲染
      this.messages = newMessages;
      this._saveMessages();
      this._updateUnreadStatus();
    }
  }

  // 一键标记所有消息为已读
  async _markAllAsRead() {
    if (!this.hasUnreadMessages) return;
    
    this.isLoading = true;
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 更新所有未读消息状态
      this.messages = this.messages.map(msg => ({
        ...msg,
        read: true
      }));
      
      this._saveMessages();
      this._updateUnreadStatus();
      
      // 显示成功反馈
      this._showToast('所有消息已标记为已读');
    } catch (error) {
      console.error('标记消息失败:', error);
      this._showToast('操作失败，请重试', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  // 处理消息点击
  _handleMessageClick(message) {
    this._markAsRead(message.id);
    
    // 这里可以添加打开消息详情的逻辑
    console.log('查看消息详情:', message);
  }

  // 显示操作反馈
  _showToast(message, type = 'success') {
    // 简单的toast实现，可以根据需要扩展
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
      background: ${type === 'success' ? '#10B981' : '#EF4444'};
    `;
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out forwards';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
  }

  render() {
    if (this.isLoading) {
      return html`
        <div class="loading-state">
          <div class="loading-spinner"></div>
          <p>加载消息中...</p>
        </div>
      `;
    }

    return html`
      <div class="message-container">
        <div class="header">
          <h1 class="title">消息中心</h1>
          <button 
            class="action-btn"
            @click=${this._markAllAsRead}
            ?disabled=${!this.hasUnreadMessages}
          >
            <span>${this.isLoading ? '⏳' : '✓'}</span>
            一键已读
          </button>
        </div>
        
        ${this.messages.length === 0 ? html`
          <div class="empty-state">
            <div class="empty-icon">📭</div>
            <p>暂无消息</p>
          </div>
        ` : html`
          <ul class="messages-list" role="list">
            ${this.messages.map(message => html`
              <li 
                class="message-item"
                @click=${() => this._handleMessageClick(message)}
                role="listitem"
                data-message-id=${message.id}
                data-read=${message.read}
              >
                <div class="message-content">
                  <h3 class="message-title ${message.read ? 'read' : 'unread'}">
                    ${message.title}
                  </h3>
                  <p class="message-preview">${message.content}</p>
                  <p class="message-time">${this._formatTime(message.time)}</p>
                </div>
                ${!message.read ? html`<div class="message-status"><span class="status-dot" role="presentation"></span></div>` : ''}
              </li>
            `)}
          </ul>
        `}
      </div>

      <style>
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      </style>
    `;
  }

  // 格式化时间显示
  _formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) {
      return '刚刚';
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}分钟前`;
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}小时前`;
    } else {
      return date.toLocaleDateString();
    }
  }
}

customElements.define('message-list', MessageList);
