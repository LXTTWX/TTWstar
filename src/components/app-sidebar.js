import { LitElement, html, css } from 'lit';

export class AppSidebar extends LitElement {
  static properties = {
    categories: { type: Array },
    searchQuery: { type: String }
  };

  constructor() {
    super();
    this.searchQuery = '';
    this.categories = [
      {
        name: '工具箱',
        children: [
          { name: '计时器', id: 'timer', pinyin: 'jsq' },
          { name: '单位转换', id: 'converter', pinyin: 'dwzh' },
          { name: '计算器', id: 'calculator', pinyin: 'jsq' }
        ]
      },
      {
        name: '开发工具',
        children: [
          { name: 'JSON格式化', id: 'json-fmt', pinyin: 'jsongsh' },
          { name: 'Base64编解码', id: 'base64', pinyin: 'base64bjm' }
        ]
      }
    ];
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(20px);
      border-right: 1px solid var(--glass-border);
      padding: 20px;
      box-sizing: border-box;
      overflow-y: auto;
      transition: background 0.3s ease;
    }

    .search-box {
      margin-bottom: 20px;
    }

    .search-input {
      width: 100%;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: rgba(255, 255, 255, 0.8);
      color: var(--color-text-main);
      outline: none;
      box-sizing: border-box;
      transition: all 0.2s;
    }
    
    .search-input:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px rgba(var(--primary-hue), var(--primary-sat), var(--primary-light), 0.1);
    }

    .category-group {
      margin-bottom: 15px;
    }

    .category-title {
      font-size: 0.8rem;
      text-transform: uppercase;
      color: var(--color-text-secondary);
      margin-bottom: 10px;
      padding-left: 10px;
      font-weight: 600;
      opacity: 0.8;
    }

    .nav-item {
      display: block;
      padding: 10px 15px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      color: var(--color-text-main);
      text-decoration: none;
      margin-bottom: 4px;
    }

    .nav-item:hover {
      background: rgba(0, 0, 0, 0.05);
      color: var(--color-primary);
      transform: translateX(4px);
    }
  `;

  render() {
    const filteredCategories = this._filterCategories();
    return html`
      <div class="search-box">
        <input 
          type="text" 
          class="search-input" 
          placeholder="搜索功能..." 
          .value=${this.searchQuery}
          @input=${this._onSearch}
        >
      </div>
      
      <div class="nav-tree">
        ${filteredCategories.map(group => html`
          <div class="category-group">
            <div class="category-title">${group.name}</div>
            ${group.children.map(item => html`
              <a class="nav-item" @click=${() => this._selectItem(item.id)}>
                ${item.name}
              </a>
            `)}
          </div>
        `)}
      </div>
    `;
  }

  _onSearch(e) {
    this.searchQuery = e.target.value;
  }

  _filterCategories() {
    if (!this.searchQuery) return this.categories;
    const lowerQuery = this.searchQuery.toLowerCase();
    
    return this.categories.map(group => {
      const filteredChildren = group.children.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) ||
        (item.pinyin && item.pinyin.includes(lowerQuery))
      );
      if (filteredChildren.length > 0) {
        return { ...group, children: filteredChildren };
      }
      return null;
    }).filter(group => group !== null);
  }

  _selectItem(id) {
    this.dispatchEvent(new CustomEvent('navigate', { 
      detail: { id },
      bubbles: true, 
      composed: true 
    }));
  }
}

customElements.define('app-sidebar', AppSidebar);
