import { LitElement, html, css } from 'lit';

export class DatePicker extends LitElement {
  static properties = {
    name: { type: String },
    label: { type: String },
    value: { type: String }, // YYYY-MM-DD
    _viewDate: { state: true },
    _isOpen: { state: true }
  };

  constructor() {
    super();
    this.value = '';
    this._viewDate = new Date();
    this._isOpen = false;
    this.minYear = 1900;
    this.maxDate = new Date();
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
  }

  _handleOutsideClick(e) {
    const path = typeof e.composedPath === 'function' ? e.composedPath() : [];
    if (this._isOpen && !path.includes(this)) {
      this._isOpen = false;
    }
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .input-wrapper {
      position: relative;
      cursor: pointer;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.8);
    }

    .date-input {
      width: 100%;
      padding: 12px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: white;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.2s;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      appearance: none;
    }

    .date-input:hover, .date-input.active {
      border-color: rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.05);
    }

    .date-input:focus-visible {
      border-color: var(--color-primary, #a0a0ff);
      box-shadow: 0 0 0 3px rgba(160, 160, 255, 0.15);
    }

    .calendar-icon {
      opacity: 0.7;
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      width: 300px;
      margin-top: 8px;
      background: #1a1a20;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      z-index: 1000;
      padding: 16px;
      animation: slideDown 0.2s ease-out;
      display: none;
    }

    .dropdown.open {
      display: block;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .month-year {
      font-weight: 600;
      color: white;
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .month-year select {
      background: rgba(255, 255, 255, 0.08);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 6px 8px;
      outline: none;
      cursor: pointer;
    }

    .month-year select:focus-visible {
      border-color: var(--color-primary, #a0a0ff);
      box-shadow: 0 0 0 3px rgba(160, 160, 255, 0.15);
    }

    .nav-btn {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 1.2rem;
    }

    .nav-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      margin-bottom: 8px;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.5);
    }

    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }

    .day {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      cursor: pointer;
      border-radius: 50%;
      color: rgba(255, 255, 255, 0.9);
      transition: all 0.2s;
      background: none;
      border: none;
      padding: 0;
    }

    .day:hover:not(.empty) {
      background: rgba(255, 255, 255, 0.1);
    }

    .day.selected {
      background: var(--color-primary, #6a11cb);
      color: white;
      font-weight: bold;
    }

    .day.today {
      border: 1px solid var(--color-primary, #6a11cb);
    }

    .day.empty {
      cursor: default;
    }

    .day.other-month {
      color: rgba(255, 255, 255, 0.3);
    }

    .day:disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }

    .day:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(160, 160, 255, 0.15);
    }

    .actions {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .action-btn {
      background: none;
      border: none;
      color: var(--color-primary, #a0a0ff);
      cursor: pointer;
      font-size: 0.9rem;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .action-btn:hover {
      background: rgba(160, 160, 255, 0.1);
    }
    
    /* Mobile optimization */
    @media (max-width: 480px) {
      .dropdown {
        width: 100%;
        left: 0;
        right: 0;
        position: fixed;
        bottom: 0;
        top: auto;
        margin: 0;
        border-radius: 16px 16px 0 0;
        border: none;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .day {
        padding: 8px;
      }
    }
  `;

  render() {
    const displayValue = this.value || '年 / 月 / 日';
    const isPlaceholder = !this.value;
    const currentYear = this.maxDate.getFullYear();
    const currentMonthIndex = this.maxDate.getMonth();

    return html`
      ${this.label ? html`<label>${this.label}</label>` : ''}
      <div class="input-wrapper">
        <button
          type="button"
          class="date-input ${this._isOpen ? 'active' : ''}"
          style="${isPlaceholder ? 'color: rgba(255,255,255,0.5)' : ''}"
          aria-haspopup="dialog"
          aria-expanded=${this._isOpen ? 'true' : 'false'}
          @click=${this._toggleOpen}
          @keydown=${this._onInputKeydown}
        >
          ${displayValue}
          <span class="calendar-icon">📅</span>
        </button>
        
        <input type="hidden" name="${this.name}" .value=${this.value}>

        <div class="dropdown ${this._isOpen ? 'open' : ''}" @click=${e => e.stopPropagation()} @keydown=${this._onDropdownKeydown}>
          <div class="header">
            <button class="nav-btn" @click=${() => this._changeMonth(-1)}>←</button>
            <div class="month-year">
              <select
                aria-label="选择年份"
                .value=${String(this._viewDate.getFullYear())}
                @change=${e => this._setYear(parseInt(e.target.value, 10))}
              >
                ${Array.from({ length: currentYear - this.minYear + 1 }, (_, i) => this.minYear + i).map(y => html`
                  <option value=${String(y)}>${y}年</option>
                `)}
              </select>
              <select
                aria-label="选择月份"
                .value=${String(this._viewDate.getMonth() + 1)}
                @change=${e => this._setMonth(parseInt(e.target.value, 10) - 1)}
              >
                ${Array.from({ length: 12 }, (_, i) => i + 1).map(m => html`
                  <option value=${String(m)} ?disabled=${this._viewDate.getFullYear() === currentYear && (m - 1) > currentMonthIndex}>${m}月</option>
                `)}
              </select>
            </div>
            <button class="nav-btn" @click=${() => this._changeMonth(1)}>→</button>
          </div>

          <div class="weekdays">
            <div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div>
          </div>

          <div class="days">
            ${this._renderDays()}
          </div>

          <div class="actions">
            <button class="action-btn" @click=${this._clear}>清除</button>
            <button class="action-btn" @click=${this._today}>今天</button>
          </div>
        </div>
      </div>
    `;
  }

  _renderDays() {
    const year = this._viewDate.getFullYear();
    const month = this._viewDate.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Prev month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const dayValue = daysInPrevMonth - i;
      const d = new Date(year, month - 1, dayValue);
      const disabled = !this._isDateSelectable(d);
      days.push(html`
        <button
          type="button"
          class="day other-month"
          ?disabled=${disabled}
          data-date=${this._formatDate(d.getFullYear(), d.getMonth(), d.getDate())}
          @click=${() => this._selectDay(d.getFullYear(), d.getMonth(), d.getDate())}
        >${dayValue}</button>
      `);
    }

    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = this.value === this._formatDate(year, month, i);
      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === i;
      const d = new Date(year, month, i);
      const disabled = !this._isDateSelectable(d);
      
      days.push(html`
        <button
          type="button"
          class="day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}"
          ?disabled=${disabled}
          data-date=${this._formatDate(d.getFullYear(), d.getMonth(), d.getDate())}
          @click=${() => this._selectDay(d.getFullYear(), d.getMonth(), d.getDate())}
        >${i}</button>
      `);
    }

    // Next month days
    const remainingCells = 42 - days.length; // 6 rows * 7 cols
    for (let i = 1; i <= remainingCells; i++) {
      const d = new Date(year, month + 1, i);
      const disabled = !this._isDateSelectable(d);
      days.push(html`
        <button
          type="button"
          class="day other-month"
          ?disabled=${disabled}
          data-date=${this._formatDate(d.getFullYear(), d.getMonth(), d.getDate())}
          @click=${() => this._selectDay(d.getFullYear(), d.getMonth(), d.getDate())}
        >${i}</button>
      `);
    }

    return days;
  }

  _formatDate(year, month, day) {
    const d = new Date(year, month, day);
    // Adjust for month overflow/underflow automatically handled by Date constructor
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const da = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${da}`;
  }

  _toggleOpen() {
    this._isOpen = !this._isOpen;
    if (this._isOpen && this.value) {
      this._viewDate = this._clampViewDate(new Date(this.value));
    }
    if (this._isOpen) {
      this.updateComplete.then(() => {
        const selected = this.renderRoot.querySelector(`.day.selected`);
        const firstEnabled = this.renderRoot.querySelector(`.day:not([disabled])`);
        const target = selected || firstEnabled;
        if (target && typeof target.focus === 'function') {
          target.focus();
        }
      });
    }
  }

  _changeMonth(delta) {
    const newDate = new Date(this._viewDate);
    newDate.setMonth(newDate.getMonth() + delta);
    this._viewDate = this._clampViewDate(newDate);
  }

  _selectDay(year, month, day) {
    const selected = new Date(year, month, day);
    if (!this._isDateSelectable(selected)) return;
    this.value = this._formatDate(selected.getFullYear(), selected.getMonth(), selected.getDate());
    this._isOpen = false;
    this.dispatchEvent(new CustomEvent('change', { 
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  _clear(e) {
    e.stopPropagation();
    this.value = '';
    this._isOpen = false;
  }

  _today(e) {
    e.stopPropagation();
    const now = new Date();
    this._selectDay(now.getFullYear(), now.getMonth(), now.getDate());
  }

  _setYear(year) {
    const newDate = new Date(this._viewDate);
    newDate.setFullYear(year);
    this._viewDate = this._clampViewDate(newDate);
  }

  _setMonth(monthIndex) {
    const newDate = new Date(this._viewDate);
    newDate.setMonth(monthIndex);
    this._viewDate = this._clampViewDate(newDate);
  }

  _clampViewDate(date) {
    const min = new Date(this.minYear, 0, 1);
    const max = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), 1);
    const d = new Date(date);
    d.setDate(1);
    if (d < min) return min;
    if (d > max) return max;
    return d;
  }

  _isDateSelectable(date) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const min = new Date(this.minYear, 0, 1);
    const max = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate());
    return d >= min && d <= max;
  }

  _onInputKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._toggleOpen();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      this._isOpen = false;
    }
  }

  _onDropdownKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      this._isOpen = false;
      return;
    }

    const keyToDelta = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7
    };

    if (!(e.key in keyToDelta)) return;
    e.preventDefault();

    const active = this.renderRoot.activeElement;
    const dateStr = active?.dataset?.date;
    if (!dateStr) return;

    const base = new Date(dateStr);
    base.setDate(base.getDate() + keyToDelta[e.key]);
    if (!this._isDateSelectable(base)) return;

    this._viewDate = this._clampViewDate(base);
    const targetDateStr = this._formatDate(base.getFullYear(), base.getMonth(), base.getDate());
    this.updateComplete.then(() => {
      const target = this.renderRoot.querySelector(`.day[data-date="${targetDateStr}"]:not([disabled])`);
      if (target && typeof target.focus === 'function') target.focus();
    });
  }
}

customElements.define('date-picker', DatePicker);
