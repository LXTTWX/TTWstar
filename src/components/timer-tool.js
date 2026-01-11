import { LitElement, html, css } from 'lit';

export class TimerTool extends LitElement {
  static properties = {
    time: { type: Number },
    isRunning: { type: Boolean },
    mode: { type: String }, // 'stopwatch' or 'timer'
    presets: { type: Array },
    inputTime: { type: Number }, // For timer input in minutes
    showTimeInput: { type: Boolean }, // Show custom time input
    customHours: { type: Number },
    customMinutes: { type: Number },
    customSeconds: { type: Number },
    isAlerting: { type: Boolean } // Whether we're in the alert phase (last 10 seconds)
  };

  constructor() {
    super();
    this.time = 0;
    this.isRunning = false;
    this.mode = 'stopwatch';
    this.interval = null;
    this.presets = [1, 5, 10, 25, 30, 60];
    this.inputTime = 5;
    this.showTimeInput = false;
    this.customHours = 0;
    this.customMinutes = 5;
    this.customSeconds = 0;
    this.isAlerting = false;
    this._showEndModal = false;
    this._warningSound = null;
    this._endSound = null;
    // Preload sounds
    this._preloadSounds();
  }

  static styles = css`
    :host {
      display: block;
      color: white;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .display {
      font-size: 5rem;
      font-weight: 200;
      font-feature-settings: "tnum";
      font-variant-numeric: tabular-nums;
      text-shadow: 0 0 20px rgba(160, 160, 255, 0.3);
      transition: color 0.3s ease;
    }

    .display.alert {
      color: #ff6b6b;
      text-shadow: 0 0 20px rgba(255, 107, 107, 0.6);
      animation: pulse 1s infinite alternate;
    }

    @keyframes pulse {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0.7;
      }
    }

    .controls {
      display: flex;
      gap: 15px;
    }

    button {
      padding: 12px 24px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.05);
      color: white;
      border-radius: 8px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    button:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }

    button.primary {
      background: linear-gradient(45deg, #6a11cb, #2575fc);
      border: none;
    }

    .tabs {
      display: flex;
      background: rgba(0,0,0,0.2);
      border-radius: 8px;
      padding: 4px;
      margin-bottom: 20px;
    }

    .tab {
      padding: 8px 16px;
      cursor: pointer;
      border-radius: 6px;
      opacity: 0.7;
    }

    .tab.active {
      background: rgba(255,255,255,0.1);
      opacity: 1;
    }

    .presets {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 20px;
    }

    .preset-btn {
      padding: 6px 12px;
      font-size: 0.9rem;
      border-radius: 20px;
      background: rgba(255,255,255,0.05);
    }

    .time-input-container {
      background: rgba(0,0,0,0.2);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .time-input-row {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: center;
    }

    .time-input-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }

    .time-input-label {
      font-size: 0.8rem;
      opacity: 0.7;
    }

    .time-input {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      width: 60px;
      padding: 8px;
      border-radius: 6px;
      font-size: 1.2rem;
      text-align: center;
      font-feature-settings: "tnum";
    }

    .time-input:focus {
      outline: 2px solid rgba(255,255,255,0.3);
    }

    .set-time-btn {
      margin-top: 15px;
      width: 100%;
    }

    /* Modal styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: rgba(255,255,255,0.95);
      border-radius: 16px;
      padding: 30px;
      text-align: center;
      min-width: 300px;
    }

    .modal-title {
      color: var(--color-text-main);
      font-size: 2rem;
      margin: 0 0 15px 0;
    }

    .modal-message {
      color: var(--color-text-secondary);
      font-size: 1.2rem;
      margin: 0 0 25px 0;
    }

    .modal-btn {
      background: var(--color-primary);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 1.1rem;
      cursor: pointer;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .display {
        font-size: 3.5rem;
      }
      
      .time-input-row {
        gap: 5px;
      }
      
      .time-input {
        width: 50px;
        font-size: 1rem;
        padding: 6px;
      }
      
      .time-input-container {
        padding: 15px;
      }
    }
  `;

  render() {
    return html`
      <div class="container">
        <div class="tabs">
          <div class="tab ${this.mode === 'stopwatch' ? 'active' : ''}" @click=${() => this._setMode('stopwatch')}>秒表</div>
          <div class="tab ${this.mode === 'timer' ? 'active' : ''}" @click=${() => this._setMode('timer')}>倒计时</div>
        </div>

        <div class="display ${this.isAlerting ? 'alert' : ''}">${this._formatTime(this.time)}</div>

        <div class="controls">
          <button class="primary" @click=${this._toggle}>
            ${this.isRunning ? '暂停' : '开始'}
          </button>
          <button @click=${this._reset}>重置</button>
          ${this.mode === 'timer' ? html`
            <button @click=${() => this._toggleTimeInput}>${this.showTimeInput ? '取消' : '设置时间'}</button>
          ` : ''}
        </div>

        ${this.mode === 'timer' && this.showTimeInput ? html`
          <div class="time-input-container">
            <div class="time-input-row">
              <div class="time-input-group">
                <div class="time-input-label">小时</div>
                <input 
                  type="number" 
                  class="time-input" 
                  min="0" 
                  max="23" 
                  .value=${this.customHours} 
                  @input=${(e) => this.customHours = Math.max(0, Math.min(23, parseInt(e.target.value) || 0))}
                >
              </div>
              <div>:</div>
              <div class="time-input-group">
                <div class="time-input-label">分钟</div>
                <input 
                  type="number" 
                  class="time-input" 
                  min="0" 
                  max="59" 
                  .value=${this.customMinutes} 
                  @input=${(e) => this.customMinutes = Math.max(0, Math.min(59, parseInt(e.target.value) || 0))}
                >
              </div>
              <div>:</div>
              <div class="time-input-group">
                <div class="time-input-label">秒钟</div>
                <input 
                  type="number" 
                  class="time-input" 
                  min="0" 
                  max="59" 
                  .value=${this.customSeconds} 
                  @input=${(e) => this.customSeconds = Math.max(0, Math.min(59, parseInt(e.target.value) || 0))}
                >
              </div>
            </div>
            <button class="primary set-time-btn" @click=${this._setCustomTime}>设置</button>
          </div>
        ` : ''}

        ${this.mode === 'timer' && !this.showTimeInput ? html`
          <div class="presets">
            ${this.presets.map(min => html`
              <button class="preset-btn" @click=${() => this._setTimer(min)}>${min} 分钟</button>
            `)}
          </div>
        ` : ''}
      </div>

      <!-- End timer modal -->
      ${this._showEndModal ? html`
        <div class="modal-overlay">
          <div class="modal-content">
            <h2 class="modal-title">⏰</h2>
            <p class="modal-message">计时结束</p>
            <button class="modal-btn" @click=${() => this._showEndModal = false}>确定</button>
          </div>
        </div>
      ` : ''}
    `;
  }

  _formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const millis = Math.floor((ms % 1000) / 10);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${millis.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${millis.toString().padStart(2, '0')}`;
  }

  _setMode(mode) {
    this.mode = mode;
    this._reset();
  }

  _toggle() {
    if (this.isRunning) {
      clearInterval(this.interval);
      this.isRunning = false;
    } else {
      const startTime = Date.now() - (this.mode === 'stopwatch' ? this.time : 0);
      const targetTime = Date.now() + this.time;
      
      this.interval = setInterval(() => {
        if (this.mode === 'stopwatch') {
          this.time = Date.now() - startTime;
        } else {
          const remaining = targetTime - Date.now();
          this.isAlerting = remaining <= 10000 && remaining > 0; // Last 10 seconds alert
          
          // Play warning sound every second during last 3 seconds
          if (remaining <= 3000 && remaining > 0 && remaining % 1000 < 100) {
            this._playWarningSound();
          }
          
          if (remaining <= 0) {
            this.time = 0;
            this.isAlerting = false;
            this._reset();
            this._handleTimerEnd();
          } else {
            this.time = remaining;
          }
        }
      }, 10);
      this.isRunning = true;
    }
  }

  _reset() {
    clearInterval(this.interval);
    this.isRunning = false;
    this.isAlerting = false;
    this._showEndModal = false;
    this.time = this.mode === 'stopwatch' ? 0 : this.inputTime * 60 * 1000;
  }

  _setTimer(minutes) {
    this.inputTime = minutes;
    this._reset();
  }

  _notify() {
    if (Notification.permission === 'granted') {
      new Notification('时间到!', { body: '您的倒计时已结束。' });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }

  // Audio preloading and generation methods
  _preloadSounds() {
    try {
      // Generate warning sound (800Hz, 200ms)
      const warningBuffer = this._generateTone(800, 200);
      this._warningSound = this._createAudioFromBuffer(warningBuffer);
      
      // Generate end sound (440Hz, 500ms)
      const endBuffer = this._generateTone(440, 500);
      this._endSound = this._createAudioFromBuffer(endBuffer);
    } catch (error) {
      console.error('Failed to preload sounds:', error);
      this._warningSound = new Audio();
      this._endSound = new Audio();
    }
  }

  // Generate a sine wave tone
  _generateTone(frequency, durationMs) {
    const sampleRate = 44100;
    const duration = durationMs / 1000;
    const numSamples = Math.floor(duration * sampleRate);
    const buffer = new ArrayBuffer(numSamples * 2);
    const view = new DataView(buffer);
    
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const sample = Math.sin(2 * Math.PI * frequency * t) * 0.3;
      const intSample = Math.max(-32768, Math.min(32767, sample * 32768));
      view.setInt16(i * 2, intSample, true);
    }
    
    return buffer;
  }

  // Create audio element from buffer
  _createAudioFromBuffer(buffer) {
    const audio = new Audio();
    const blob = new Blob([buffer], { type: 'audio/wav' });
    audio.src = URL.createObjectURL(blob);
    return audio;
  }

  // Play warning sound
  _playWarningSound() {
    if (this._warningSound) {
      this._warningSound.currentTime = 0;
      this._warningSound.play().catch(err => console.warn('Failed to play warning sound:', err));
    }
  }

  // Play end sound
  _playEndSound() {
    if (this._endSound) {
      this._endSound.currentTime = 0;
      this._endSound.play().catch(err => console.warn('Failed to play end sound:', err));
    }
  }

  // Toggle time input visibility
  _toggleTimeInput() {
    this.showTimeInput = !this.showTimeInput;
  }

  // Set custom time from input fields
  _setCustomTime() {
    const totalSeconds = (this.customHours * 3600) + (this.customMinutes * 60) + this.customSeconds;
    if (totalSeconds > 0) {
      this.inputTime = totalSeconds / 60;
      this._reset();
      this.showTimeInput = false;
    }
  }

  // Handle timer end
  _handleTimerEnd() {
    this._playEndSound();
    this._showEndModal = true;
    this._notify();
  }
}

customElements.define('timer-tool', TimerTool);
