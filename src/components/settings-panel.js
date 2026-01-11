import { LitElement, html, css } from 'lit';
import { getDefaultSettings, mergeSettings } from '../utils/settings.js';
import { validatePassword } from '../utils/password.js';

export class SettingsPanel extends LitElement {
  static properties = {
    settings: { type: Object },
    isVisible: { type: Boolean, reflect: true },
    section: { type: String },
    confirmState: { type: Object },
    cloudState: { type: Object },
    backups: { type: Array },
    passwordForm: { type: Object }
  };

  constructor() {
    super();
    this.isVisible = false;
    this.section = 'personal';
    this.confirmState = null;
    this.cloudState = { status: 'idle', message: '' };
    this.backups = [];
    this.passwordForm = { oldPassword: '', newPassword: '', confirmPassword: '', error: '', ok: '' };
    this.languages = [
      { code: 'zh-CN', name: '简体中文' },
      { code: 'zh-TW', name: '繁体中文' },
      { code: 'en-US', name: 'English' },
      { code: 'ja-JP', name: '日本語' },
      { code: 'ko-KR', name: '한국어' },
      { code: 'ar-SA', name: 'العربية' }
    ];
    this.themes = [
      {
        name: '晨曦微光 (默认)',
        id: 'morning-glory',
        colors: {
          primary: '#2563EB',
          secondary: '#4F46E5',
          accent: '#F59E0B',
          bgMain: '#FFFFFF',
          bgSurface: '#F3F4F6',
          bgCard: '#FFFFFF',
          textMain: '#111827',
          textSecondary: '#4B5563',
          textDisabled: '#9CA3AF',
          glassBg: 'rgba(255, 255, 255, 0.8)',
          glassBorder: 'rgba(0, 0, 0, 0.05)',
          stateError: '#EF4444'
        }
      },
      {
        name: '深色专业版',
        id: 'dark-pro',
        colors: {
          primary: '#3B82F6',
          secondary: '#60A5FA',
          accent: '#F59E0B',
          bgMain: '#18181B',
          bgSurface: '#27272A',
          bgCard: '#1F1F23',
          textMain: '#F4F4F5',
          textSecondary: '#A1A1AA',
          textDisabled: '#52525B',
          glassBg: 'rgba(24, 24, 27, 0.85)',
          glassBorder: 'rgba(255, 255, 255, 0.08)',
          stateError: '#EF4444'
        }
      },
      {
        name: '浅色简约版',
        id: 'light-minimal',
        colors: {
          primary: '#171717',
          secondary: '#404040',
          accent: '#737373',
          bgMain: '#FAFAFA',
          bgSurface: '#FFFFFF',
          bgCard: '#FFFFFF',
          textMain: '#171717',
          textSecondary: '#52525B',
          textDisabled: '#A1A1AA',
          glassBg: 'rgba(255, 255, 255, 0.9)',
          glassBorder: 'rgba(0, 0, 0, 0.04)',
          stateError: '#DC2626'
        }
      },
      {
        name: '高对比度版',
        id: 'high-contrast',
        colors: {
          primary: '#FFFF00',
          secondary: '#00FFFF',
          accent: '#FF00FF',
          bgMain: '#000000',
          bgSurface: '#000000',
          bgCard: '#121212',
          textMain: '#FFFFFF',
          textSecondary: '#FFFF00',
          textDisabled: '#00FFFF',
          glassBg: 'rgba(0, 0, 0, 0.95)',
          glassBorder: '#FFFFFF',
          stateError: '#FF0000'
        }
      },
      {
        name: '深海蔚蓝',
        id: 'deep-sea',
        colors: {
          primary: '#0EA5E9',
          secondary: '#0284C7',
          accent: '#38BDF8',
          bgMain: '#F0F9FF',
          bgSurface: '#E0F2FE',
          bgCard: '#FFFFFF',
          textMain: '#0C4A6E',
          textSecondary: '#075985',
          textDisabled: '#94A3B8',
          glassBg: 'rgba(255, 255, 255, 0.75)',
          glassBorder: 'rgba(2, 132, 199, 0.12)',
          stateError: '#EF4444'
        }
      },
      {
        name: '暗夜极光',
        id: 'aurora-night',
        colors: {
          primary: '#10B981',
          secondary: '#3B82F6',
          accent: '#8B5CF6',
          bgMain: '#0B1220',
          bgSurface: '#111827',
          bgCard: '#0F172A',
          textMain: '#F9FAFB',
          textSecondary: 'rgba(249, 250, 251, 0.75)',
          textDisabled: 'rgba(249, 250, 251, 0.45)',
          glassBg: 'rgba(15, 23, 42, 0.65)',
          glassBorder: 'rgba(255, 255, 255, 0.08)',
          stateError: '#F87171'
        }
      },
      {
        name: '落日余晖',
        id: 'sunset-glow',
        colors: {
          primary: '#F59E0B',
          secondary: '#DC2626',
          accent: '#FCD34D',
          bgMain: '#FFFBEB',
          bgSurface: '#FEF3C7',
          bgCard: '#FFFFFF',
          textMain: '#451A03',
          textSecondary: '#78350F',
          textDisabled: '#A16207',
          glassBg: 'rgba(255, 255, 255, 0.75)',
          glassBorder: 'rgba(245, 158, 11, 0.15)',
          stateError: '#DC2626'
        }
      },
      {
        name: '森林物语',
        id: 'forest-whisper',
        colors: {
          primary: '#059669',
          secondary: '#047857',
          accent: '#34D399',
          bgMain: '#ECFDF5',
          bgSurface: '#D1FAE5',
          bgCard: '#FFFFFF',
          textMain: '#064E3B',
          textSecondary: '#065F46',
          textDisabled: '#6B7280',
          glassBg: 'rgba(255, 255, 255, 0.75)',
          glassBorder: 'rgba(5, 150, 105, 0.15)',
          stateError: '#EF4444'
        }
      },
      {
        name: '薰衣草田',
        id: 'lavender-field',
        colors: {
          primary: '#8B5CF6',
          secondary: '#7C3AED',
          accent: '#C4B5FD',
          bgMain: '#F5F3FF',
          bgSurface: '#EDE9FE',
          bgCard: '#FFFFFF',
          textMain: '#4C1D95',
          textSecondary: '#5B21B6',
          textDisabled: '#6B7280',
          glassBg: 'rgba(255, 255, 255, 0.75)',
          glassBorder: 'rgba(124, 58, 237, 0.15)',
          stateError: '#EF4444'
        }
      }
    ];
    this.settings = this._loadLocalSettings();
    this._applySettings();
  }

  connectedCallback() {
    super.connectedCallback();
    this._setupAutoSyncTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearAutoSyncTimer();
  }

  open() {
    this.isVisible = true;
    if (this.settings.storage.cloudSyncEnabled) {
      this._pullFromCloud();
      this._loadCloudBackups();
    }
  }

  close() {
    this.isVisible = false;
    this.confirmState = null;
  }

  _loadLocalSettings() {
    const saved = localStorage.getItem('app-settings');
    if (saved) {
      try {
        return mergeSettings(JSON.parse(saved));
      } catch {
        return mergeSettings(null);
      }
    }
    const initial = mergeSettings(null);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      initial.themeId = 'aurora-night';
    }
    return initial;
  }

  _saveLocalSettings() {
    localStorage.setItem('app-settings', JSON.stringify(this.settings));
  }

  toggleDarkMode() {
    this._updateSetting('darkMode', !this.settings.darkMode);
  }

  _applySettings() {
    const root = document.documentElement;
    // Dark Mode Override
    const effectiveThemeId = this.settings.darkMode ? 'aurora-night' : this.settings.themeId;
    const theme = this.themes.find(t => t.id === effectiveThemeId) || this.themes.find(t => t.id === 'aurora-night') || this.themes[0];
    
    // Apply colors with user overrides
    const baseColors = { ...theme.colors };
    const customColors = this.settings.customColors || {};
    
    // Legacy support for customPrimaryColor
    if (this.settings.customPrimaryColor) {
      customColors.primary = this.settings.customPrimaryColor;
    }

    // Merge overrides
    const colors = { ...baseColors, ...customColors };

    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-bg-main', colors.bgMain);
    root.style.setProperty('--color-bg-surface', colors.bgSurface);
    root.style.setProperty('--color-bg-card', colors.bgCard);
    root.style.setProperty('--color-text-main', colors.textMain);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
    root.style.setProperty('--color-text-disabled', colors.textDisabled);
    root.style.setProperty('--glass-bg', colors.glassBg);
    root.style.setProperty('--glass-border', colors.glassBorder);
    root.style.setProperty('--color-state-error', colors.stateError);
    root.style.setProperty('--base-font-size', `${this.settings.fontSize}px`);

    // Line Height
    let lh = '1.5';
    if (this.settings.lineHeight === 'compact') lh = '1.3';
    if (this.settings.lineHeight === 'loose') lh = '1.7';
    root.style.setProperty('--base-line-height', lh);
    document.body.style.lineHeight = lh;

    document.documentElement.lang = this.settings.language;

    if (this.settings.highContrast || effectiveThemeId === 'high-contrast') {
      root.style.setProperty('--glass-border', colors.glassBorder); // Force theme border for high contrast
      root.style.setProperty('--shadow-card', '0 0 0 2px ' + colors.textMain);
      if (!this.settings.highContrast) {
        // If high contrast theme is selected but toggle is off, sync it or just apply visual
        // We let the theme decide colors, but highContrast toggle adds extra borders
      }
    } else {
      root.style.setProperty('--shadow-card', '2px 2px 12px rgba(0, 0, 0, 0.08)');
    }

    if (this.settings.animationsEnabled) {
      let duration = '0.3s';
      if (this.settings.animationSpeed === 'slow') duration = '0.6s';
      if (this.settings.animationSpeed === 'fast') duration = '0.15s';
      root.style.setProperty('--transition-speed', duration);
    } else {
      root.style.setProperty('--transition-speed', '0s');
    }

    this.dispatchEvent(new CustomEvent('settings-changed', {
      detail: this.settings,
      bubbles: true,
      composed: true
    }));
  }

  _updateSetting(path, value) {
    const next = structuredClone(this.settings);
    setByPath(next, path, value);
    this.settings = mergeSettings(next);
    this._saveLocalSettings();
    this._applySettings();
    this._setupAutoSyncTimer();
    if (this.settings.storage.cloudSyncEnabled) this._scheduleCloudPush();
  }

  _setSection(section) {
    this.section = section;
  }

  _requestConfirm(title, message, action) {
    this.confirmState = { title, message, action };
  }

  _confirmYes() {
    const action = this.confirmState?.action;
    this.confirmState = null;
    if (typeof action === 'function') action();
  }

  _confirmNo() {
    this.confirmState = null;
  }

  _handleOverlayClick() {
    if (this.confirmState) return;
    this.close();
  }

  _handleThemeHover(theme) {
    const root = document.documentElement;
    const colors = theme.colors;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-bg-main', colors.bgMain);
    root.style.setProperty('--color-bg-surface', colors.bgSurface);
    root.style.setProperty('--color-bg-card', colors.bgCard);
    root.style.setProperty('--color-text-main', colors.textMain);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
    root.style.setProperty('--color-text-disabled', colors.textDisabled);
    root.style.setProperty('--glass-bg', colors.glassBg);
    root.style.setProperty('--glass-border', colors.glassBorder);
    root.style.setProperty('--color-state-error', colors.stateError);
  }

  _handleThemeLeave() {
    this._applySettings();
  }

  _selectTheme(themeId) {
    this._updateSetting('themeId', themeId);
  }

  _getToken() {
    return localStorage.getItem('token');
  }

  async _apiFetch(path, options = {}) {
    // Mock for static site
    await new Promise(r => setTimeout(r, 500)); // Delay

    // Helper to get/set mock db
    const getDb = () => JSON.parse(localStorage.getItem('mock_cloud_db') || '{"settings":{}, "backups":[]}');
    const saveDb = (data) => localStorage.setItem('mock_cloud_db', JSON.stringify(data));

    if (path === '/api/settings') {
      if (options.method === 'GET') {
        const db = getDb();
        return { ok: true, json: async () => ({ settings: db.settings }) };
      }
      if (options.method === 'PUT') {
        const db = getDb();
        const body = JSON.parse(options.body);
        db.settings = body.settings;
        saveDb(db);
        return { ok: true, json: async () => ({ success: true }) };
      }
    }

    if (path === '/api/settings/backups') {
      if (options.method === 'GET') {
        const db = getDb();
        return { ok: true, json: async () => ({ backups: db.backups }) };
      }
      if (options.method === 'POST') {
        const db = getDb();
        const newBackup = { id: Date.now(), createdAt: new Date().toISOString(), settings: this.settings };
        db.backups.unshift(newBackup);
        if (db.backups.length > 20) db.backups.pop();
        saveDb(db);
        return { ok: true, json: async () => ({ success: true }) };
      }
    }

    if (path === '/api/settings/restore') {
        const db = getDb();
        const body = JSON.parse(options.body);
        const backup = db.backups.find(b => b.id === body.backupId);
        if (!backup) return { ok: false, json: async () => ({ error: 'Backup not found' }) };
        return { ok: true, json: async () => ({ settings: backup.settings }) };
    }

    if (path === '/api/auth/change-password') {
        return { ok: true, json: async () => ({ success: true }) };
    }

    return { ok: false, status: 404, json: async () => ({ error: 'Not Found' }) };
  }

  _setCloudState(status, message = '') {
    this.cloudState = { status, message };
  }

  async _pullFromCloud() {
    this._setCloudState('loading', '正在从云端读取设置...');
    try {
      const res = await this._apiFetch('/api/settings', { method: 'GET' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '云端读取失败');
      const merged = mergeSettings({ ...data.settings, storage: { ...data.settings.storage, cloudSyncEnabled: true } });
      this.settings = merged;
      this._saveLocalSettings();
      this._applySettings();
      this._setCloudState('ok', '云端设置已同步到本机');
    } catch (e) {
      this._setCloudState('error', e.message || '云端读取失败');
    }
  }

  async _pushToCloud() {
    this._setCloudState('loading', '正在同步到云端...');
    try {
      const res = await this._apiFetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: this.settings })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '云端同步失败');
      this._setCloudState('ok', '云端同步成功');
    } catch (e) {
      this._setCloudState('error', e.message || '云端同步失败');
    }
  }

  _scheduleCloudPush() {
    clearTimeout(this._cloudPushTimer);
    this._cloudPushTimer = setTimeout(() => {
      if (this.settings.storage.cloudSyncEnabled) this._pushToCloud();
    }, 500);
  }

  _setupAutoSyncTimer() {
    this._clearAutoSyncTimer();
    const enabled = this.settings.storage.cloudSyncEnabled && this.settings.storage.autoSyncEnabled;
    if (!enabled) return;
    const intervalMs = this.settings.storage.autoSyncIntervalSec * 1000;
    this._autoSyncTimer = setInterval(() => {
      if (this.settings.storage.cloudSyncEnabled) this._pushToCloud();
    }, intervalMs);
  }

  _clearAutoSyncTimer() {
    if (this._autoSyncTimer) clearInterval(this._autoSyncTimer);
    this._autoSyncTimer = null;
  }

  _enableCloudSync() {
    const token = this._getToken();
    if (!token) {
      this._setCloudState('error', '未登录，无法启用云端同步');
      return;
    }
    this._requestConfirm(
      '启用云端同步',
      '启用后，设置将保存到本机并同步到云端。是否继续？',
      () => {
        this._updateSetting('storage.cloudSyncEnabled', true);
        this._pullFromCloud();
        this._pushToCloud();
        this._loadCloudBackups();
      }
    );
  }

  _disableCloudSync() {
    this._requestConfirm(
      '关闭云端同步',
      '关闭后将不再自动同步到云端，本地设置仍会保存。是否继续？',
      () => this._updateSetting('storage.cloudSyncEnabled', false)
    );
  }

  async _loadCloudBackups() {
    try {
      const res = await this._apiFetch('/api/settings/backups', { method: 'GET' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '读取备份失败');
      this.backups = Array.isArray(data.backups) ? data.backups : [];
    } catch {
      this.backups = [];
    }
  }

  async _createCloudBackup() {
    const token = this._getToken();
    if (!token) {
      this._setCloudState('error', '未登录，无法创建云端备份');
      return;
    }
    this._setCloudState('loading', '正在创建云端备份...');
    try {
      const res = await this._apiFetch('/api/settings/backups', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '创建备份失败');
      await this._loadCloudBackups();
      this._setCloudState('ok', '云端备份已创建');
    } catch (e) {
      this._setCloudState('error', e.message || '创建备份失败');
    }
  }

  _restoreCloudBackup(backupId) {
    this._requestConfirm(
      '从云端备份恢复',
      '恢复会覆盖当前设置，且立即生效。是否继续？',
      async () => {
        this._setCloudState('loading', '正在恢复云端备份...');
        try {
          const res = await this._apiFetch('/api/settings/restore', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ backupId })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || '恢复失败');
          const merged = mergeSettings({ ...data.settings, storage: { ...data.settings.storage, cloudSyncEnabled: this.settings.storage.cloudSyncEnabled } });
          this.settings = merged;
          this._saveLocalSettings();
          this._applySettings();
          this._setCloudState('ok', '云端备份恢复成功');
        } catch (e) {
          this._setCloudState('error', e.message || '恢复失败');
        }
      }
    );
  }

  _downloadLocalBackup() {
    const payload = { version: 1, createdAt: new Date().toISOString(), settings: this.settings };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `app-settings-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  _triggerRestoreInput() {
    const input = this.shadowRoot.getElementById('restore-file');
    if (input) input.click();
  }

  async _restoreFromFile(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const incoming = mergeSettings(parsed?.settings || parsed);
      this._requestConfirm(
        '从本地备份恢复',
        '恢复会覆盖当前设置，且立即生效。是否继续？',
        () => {
          const keepCloud = this.settings.storage.cloudSyncEnabled;
          this.settings = mergeSettings({ ...incoming, storage: { ...incoming.storage, cloudSyncEnabled: keepCloud } });
          this._saveLocalSettings();
          this._applySettings();
          if (keepCloud) this._scheduleCloudPush();
        }
      );
    } catch {
      this._setCloudState('error', '备份文件解析失败，请确认文件格式正确');
    }
  }

  _resetSettings() {
    this._requestConfirm(
      '重置设置',
      '重置会恢复默认配置，且立即生效。是否继续？',
      () => {
        const defaults = getDefaultSettings();
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          defaults.themeId = 'aurora-night';
        }
        const keepCloud = this.settings.storage.cloudSyncEnabled;
        defaults.storage.cloudSyncEnabled = keepCloud;
        this.settings = mergeSettings(defaults);
        this._saveLocalSettings();
        this._applySettings();
        if (keepCloud) this._scheduleCloudPush();
      }
    );
  }

  _updatePasswordField(key, value) {
    this.passwordForm = { ...this.passwordForm, [key]: value, error: '', ok: '' };
  }

  _submitChangePassword() {
    const { oldPassword, newPassword, confirmPassword } = this.passwordForm;
    if (!oldPassword || !newPassword || !confirmPassword) {
      this.passwordForm = { ...this.passwordForm, error: '请完整填写旧密码、新密码和确认密码', ok: '' };
      return;
    }
    if (newPassword !== confirmPassword) {
      this.passwordForm = { ...this.passwordForm, error: '两次输入的新密码不一致', ok: '' };
      return;
    }
    const error = validatePassword(newPassword);
    if (error) {
      this.passwordForm = { ...this.passwordForm, error, ok: '' };
      return;
    }
    this._requestConfirm(
      '修改密码',
      '修改密码后需要使用新密码重新登录。是否继续？',
      async () => {
        this.passwordForm = { ...this.passwordForm, error: '', ok: '' };
        try {
          const res = await this._apiFetch('/api/auth/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldPassword, newPassword })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || '密码修改失败');
          this.passwordForm = { oldPassword: '', newPassword: '', confirmPassword: '', error: '', ok: '密码修改成功' };
        } catch (e) {
          this.passwordForm = { ...this.passwordForm, error: e.message || '密码修改失败', ok: '' };
        }
      }
    );
  }

  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      pointer-events: none;
      font-size: var(--base-font-size);
    }

    :host([isVisible]) {
      pointer-events: auto;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.18);
      opacity: 0;
      transition: opacity var(--transition-speed);
    }

    :host([isVisible]) .overlay {
      opacity: 1;
    }

    .panel {
      position: absolute;
      top: 0;
      right: 0;
      width: 420px;
      height: 100%;
      background: var(--color-bg-main);
      box-shadow: -8px 0 40px rgba(0, 0, 0, 0.12);
      transform: translateX(100%);
      transition: transform var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      color: var(--color-text-main);
      border-left: 1px solid var(--glass-border);
    }

    :host([isVisible]) .panel {
      transform: translateX(0);
    }

    .header {
      padding: 18px 18px 14px;
      border-bottom: 1px solid var(--glass-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--color-bg-surface);
      gap: 12px;
    }

    .title {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .title h2 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-text-main);
      line-height: 1.25;
    }

    .subtitle {
      font-size: 0.85rem;
      color: var(--color-text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .close-btn {
      background: transparent;
      border: 1px solid var(--glass-border);
      color: var(--color-text-secondary);
      font-size: 1.1rem;
      cursor: pointer;
      padding: 8px 10px;
      border-radius: 10px;
      transition: background 0.2s, color 0.2s, border-color 0.2s;
      min-width: 44px;
      min-height: 44px;
    }

    .close-btn:hover {
      background: var(--color-bg-card);
      color: var(--color-primary);
      border-color: var(--color-primary);
    }

    .body {
      display: grid;
      grid-template-columns: 140px 1fr;
      flex: 1;
      min-height: 0;
    }

    .nav {
      border-right: 1px solid var(--glass-border);
      padding: 12px;
      background: var(--color-bg-surface);
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow-y: auto;
    }

    .nav-btn {
      width: 100%;
      text-align: left;
      background: transparent;
      border: 1px solid transparent;
      padding: 10px 12px;
      border-radius: 12px;
      cursor: pointer;
      color: var(--color-text-main);
      transition: background 0.2s, border-color 0.2s, color 0.2s;
      min-height: 44px;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .nav-btn:hover {
      background: var(--color-bg-card);
      border-color: var(--glass-border);
      color: var(--color-primary);
    }

    .nav-btn.active {
      background: var(--color-bg-card);
      border-color: rgba(0, 0, 0, 0.08);
      color: var(--color-primary);
      box-shadow: var(--shadow-card);
    }

    .content {
      overflow-y: auto;
      padding: 18px;
      min-width: 0;
    }

    .section {
      margin-bottom: 22px;
      padding: 14px;
      border-radius: 14px;
      background: var(--color-bg-card);
      border: 1px solid var(--glass-border);
      box-shadow: var(--shadow-card);
    }

    .section h3 {
      margin: 0 0 6px;
      font-size: 1rem;
    }

    .desc {
      margin: 0 0 14px;
      color: var(--color-text-secondary);
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      align-items: center;
      padding: 12px 0;
      border-top: 1px solid var(--glass-border);
    }

    .row:first-of-type {
      border-top: none;
      padding-top: 0;
    }

    .row:last-of-type {
      padding-bottom: 0;
    }

    .label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .label strong {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--color-text-main);
      line-height: 1.25;
    }

    .label span {
      font-size: 0.85rem;
      color: var(--color-text-secondary);
      line-height: 1.35;
    }

    .control select,
    .control input[type="number"],
    .control input[type="password"] {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      background: var(--color-bg-main);
      color: var(--color-text-main);
      outline: none;
      min-height: 44px;
      box-sizing: border-box;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .control input[type="range"] {
      width: 180px;
    }

    .control select:focus,
    .control input[type="number"]:focus,
    .control input[type="password"]:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
      flex: 0 0 auto;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.2);
      transition: 0.2s;
      border-radius: 24px;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.2s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background-color: var(--color-primary);
    }

    input:checked + .slider:before {
      transform: translateX(20px);
    }

    .theme-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-top: 12px;
    }

    .theme-card {
      border: 2px solid transparent;
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
      background: var(--color-bg-surface);
      min-height: 200px;
    }

    .theme-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
    }

    .theme-card.active {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.16);
    }

    .theme-preview {
      width: 200px;
      height: 200px;
      max-width: 100%;
      display: grid;
      place-items: center;
      position: relative;
      overflow: hidden;
    }

    .theme-info {
      padding: 12px;
      text-align: center;
      font-size: 0.95rem;
      font-weight: 700;
      border-top: 1px solid rgba(0, 0, 0, 0.06);
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      border-radius: 999px;
      font-size: 0.85rem;
      border: 1px solid var(--glass-border);
      background: var(--color-bg-card);
      color: var(--color-text-secondary);
      max-width: 220px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .pill.ok {
      color: #047857;
      border-color: rgba(16, 185, 129, 0.35);
    }

    .pill.error {
      color: var(--color-state-error);
      border-color: rgba(239, 68, 68, 0.35);
    }

    .pill.loading {
      color: var(--color-text-secondary);
    }

    .btn {
      border: 1px solid var(--glass-border);
      background: var(--color-bg-main);
      color: var(--color-text-main);
      border-radius: 12px;
      padding: 10px 12px;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s, color 0.2s;
      min-height: 44px;
      min-width: 120px;
      font-weight: 700;
    }

    .btn:hover {
      border-color: rgba(0, 0, 0, 0.12);
      background: var(--color-bg-surface);
      color: var(--color-primary);
    }

    .btn.primary {
      background: var(--color-primary);
      color: white;
      border-color: var(--color-primary);
    }

    .btn.primary:hover {
      background: var(--color-secondary);
      border-color: var(--color-secondary);
      color: white;
    }

    .btn.danger {
      border-color: rgba(239, 68, 68, 0.35);
      color: var(--color-state-error);
    }

    .btn.danger:hover {
      background: rgba(239, 68, 68, 0.08);
      color: var(--color-state-error);
    }

    .btn-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 12px;
    }

    .confirm {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      background: rgba(0, 0, 0, 0.25);
      z-index: 2000;
      padding: 16px;
    }

    .confirm-card {
      width: min(520px, 100%);
      background: var(--color-bg-main);
      border: 1px solid var(--glass-border);
      border-radius: 16px;
      box-shadow: 0 18px 60px rgba(0, 0, 0, 0.18);
      padding: 16px;
    }

    .confirm-title {
      font-size: 1.05rem;
      font-weight: 800;
      margin: 0 0 8px;
      color: var(--color-text-main);
    }

    .confirm-msg {
      margin: 0 0 14px;
      color: var(--color-text-secondary);
      line-height: 1.5;
      font-size: 0.95rem;
    }

    .confirm-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      flex-wrap: wrap;
    }

    .hint {
      margin-top: 8px;
      color: var(--color-text-secondary);
      font-size: 0.85rem;
      line-height: 1.35;
    }

    .msg {
      margin-top: 8px;
      font-size: 0.9rem;
      color: var(--color-text-secondary);
      line-height: 1.35;
    }

    .msg.error {
      color: var(--color-state-error);
    }

    .msg.ok {
      color: #047857;
    }

    @media (max-width: 680px) {
      .panel {
        width: 100%;
      }

      .body {
        grid-template-columns: 1fr;
      }

      .nav {
        flex-direction: row;
        gap: 8px;
        overflow-x: auto;
        overflow-y: hidden;
        border-right: none;
        border-bottom: 1px solid var(--glass-border);
      }

      .nav-btn {
        white-space: nowrap;
        width: auto;
      }

      .control input[type="range"] {
        width: 160px;
      }
    }
  `;

  _updateCustomColor(key, value) {
    const customColors = { ...(this.settings.customColors || {}) };
    if (value === null) {
      delete customColors[key];
    } else {
      customColors[key] = value;
    }
    this._updateSetting('customColors', customColors);
  }

  _renderColorPicker(key, label) {
    const theme = this.themes.find(t => t.id === this.settings.themeId) || this.themes[0];
    const defaultColor = theme.colors[key];
    const currentColor = this.settings.customColors?.[key] || defaultColor;
    
    return html`
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <span style="font-size: 0.75rem; color: var(--color-text-secondary);">${label}</span>
        <div style="display: flex; gap: 6px; align-items: center;">
          <input type="color" .value=${currentColor} @input=${(e) => this._updateCustomColor(key, e.target.value)} style="width: 100%; height: 32px; padding: 0; border: 1px solid var(--glass-border); border-radius: 6px;">
          ${this.settings.customColors?.[key] ? html`
            <button class="btn" style="padding: 0; width: 24px; height: 24px; min-width: 24px; min-height: 24px; display: grid; place-items: center;" @click=${() => this._updateCustomColor(key, null)} title="重置">×</button>
          ` : ''}
        </div>
      </div>
    `;
  }

  _handleExportTheme() {
    const theme = this.themes.find(t => t.id === this.settings.themeId) || this.themes[0];
    const exportData = {
      name: `Custom ${theme.name}`,
      colors: { ...theme.colors, ...(this.settings.customColors || {}) }
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${this.settings.themeId}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  _triggerThemeImport() {
    this.shadowRoot.getElementById('theme-import-file').click();
  }

  async _handleImportTheme(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (data.colors && typeof data.colors === 'object') {
        // We import it as custom overrides
        this._updateSetting('customColors', data.colors);
      }
    } catch {
      alert('主题文件解析失败');
    }
  }

  render() {
    if (!this.isVisible) return html``;
    const cloudStatusText = this._getCloudStatusText();
    const cloudClass = this.cloudState.status === 'ok' ? 'ok' : this.cloudState.status === 'error' ? 'error' : this.cloudState.status === 'loading' ? 'loading' : '';
    return html`
      <div class="overlay" @click=${this._handleOverlayClick}></div>
      <div class="panel" @click=${(e) => e.stopPropagation()}>
        <div class="header">
          <div class="title">
            <h2>系统设置</h2>
            <div class="subtitle">所有变更将立即生效，并自动保存</div>
          </div>
          <div class="pill ${cloudClass}">${cloudStatusText}</div>
          <button class="close-btn" @click=${() => this.close()}>关闭</button>
        </div>

        <div class="body">
          <div class="nav">
            <button class="nav-btn ${this.section === 'personal' ? 'active' : ''}" @click=${() => this._setSection('personal')}>🎨 个性化</button>
            <button class="nav-btn ${this.section === 'system' ? 'active' : ''}" @click=${() => this._setSection('system')}>🧩 系统配置</button>
            <button class="nav-btn ${this.section === 'storage' ? 'active' : ''}" @click=${() => this._setSection('storage')}>💾 存储与同步</button>
            <button class="nav-btn ${this.section === 'security' ? 'active' : ''}" @click=${() => this._setSection('security')}>🔒 账户安全</button>
            <button class="nav-btn ${this.section === 'backup' ? 'active' : ''}" @click=${() => this._setSection('backup')}>🗄️ 备份恢复</button>
          </div>
          <div class="content">
            ${this.section === 'personal' ? this._renderPersonal() : ''}
            ${this.section === 'system' ? this._renderSystem() : ''}
            ${this.section === 'storage' ? this._renderStorage() : ''}
            ${this.section === 'security' ? this._renderSecurity() : ''}
            ${this.section === 'backup' ? this._renderBackup() : ''}
          </div>
        </div>
      </div>

      ${this.confirmState ? html`
        <div class="confirm" @click=${this._confirmNo}>
          <div class="confirm-card" @click=${(e) => e.stopPropagation()}>
            <div class="confirm-title">${this.confirmState.title}</div>
            <div class="confirm-msg">${this.confirmState.message}</div>
            <div class="confirm-actions">
              <button class="btn" @click=${this._confirmNo}>取消</button>
              <button class="btn primary" @click=${this._confirmYes}>确认</button>
            </div>
          </div>
        </div>
      ` : ''}
    `;
  }

  _getCloudStatusText() {
    if (!this.settings.storage.cloudSyncEnabled) return '云端同步：未开启';
    if (this.cloudState.status === 'loading') return this.cloudState.message || '云端同步：进行中';
    if (this.cloudState.status === 'ok') return '云端同步：已连接';
    if (this.cloudState.status === 'error') return this.cloudState.message || '云端同步：失败';
    return '云端同步：已开启';
  }

  _renderPersonal() {
    const isDarkMode = this.settings.darkMode;
    return html`
      <div class="section">
        <h3>主题</h3>
        <p class="desc">
          ${isDarkMode ? '深色模式下主题设置已禁用。切换回浅色模式以自定义主题。' : '鼠标悬停可预览主题效果，点击即可应用。主题切换不触发布局重排。'}
        </p>
        
        <div class="row" ?disabled=${isDarkMode} style="${isDarkMode ? 'opacity: 0.6; pointer-events: none;' : ''}">
          <div class="label">
            <strong>自定义主题色</strong>
            <span>选择一个颜色以覆盖当前主题的主色调。</span>
          </div>
          <div class="control" style="display: flex; gap: 10px; align-items: center;">
            <input type="color" .value=${this.settings.customPrimaryColor || '#2563EB'} @input=${(e) => this._updateSetting('customPrimaryColor', e.target.value)}>
            <button class="btn" style="padding: 4px 12px; min-height: 32px; font-size: 0.85rem;" @click=${() => this._updateSetting('customPrimaryColor', null)}>重置</button>
          </div>
        </div>

        <div class="row" ?disabled=${isDarkMode} style="${isDarkMode ? 'opacity: 0.6; pointer-events: none;' : ''}">
          <div class="label">
            <strong>主题操作</strong>
            <span>导入或导出当前主题配置。</span>
          </div>
          <div class="btn-group" style="margin: 0;">
            <button class="btn" @click=${this._handleExportTheme}>导出配置</button>
            <button class="btn" @click=${this._triggerThemeImport}>导入配置</button>
            <input type="file" id="theme-import-file" accept=".json" style="display: none" @change=${this._handleImportTheme}>
          </div>
        </div>

        <div class="row" ?disabled=${isDarkMode} style="${isDarkMode ? 'opacity: 0.6; pointer-events: none;' : ''}">
          <div class="label">
            <strong>界面元素颜色自定义</strong>
            <span>精细调整界面各部分的颜色。</span>
          </div>
          <div class="control" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px;">
            ${this._renderColorPicker('primary', '主色调')}
            ${this._renderColorPicker('secondary', '次色调')}
            ${this._renderColorPicker('accent', '强调色')}
            ${this._renderColorPicker('bgMain', '主背景')}
            ${this._renderColorPicker('bgSurface', '表面背景')}
            ${this._renderColorPicker('textMain', '主要文字')}
          </div>
        </div>

        <div class="theme-grid" style="${isDarkMode ? 'opacity: 0.6; pointer-events: none;' : ''}">
          ${this.themes.map(theme => html`
            <div
              class="theme-card ${this.settings.themeId === theme.id ? 'active' : ''}"
              @click=${() => this._selectTheme(theme.id)}
              @mouseenter=${() => this._handleThemeHover(theme)}
              @mouseleave=${this._handleThemeLeave}
            >
              <div class="theme-preview" style="background: ${theme.colors.bgMain}">
                <div style="
                  width: 120px;
                  height: 120px;
                  border-radius: 24px;
                  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
                  box-shadow: 2px 10px 24px rgba(0,0,0,0.18);
                  border: 1px solid ${theme.colors.glassBorder};
                "></div>
              </div>
              <div class="theme-info">${theme.name}</div>
            </div>
          `)}
        </div>
      </div>

      <div class="section">
        <h3>字体与语言</h3>
        <p class="desc">调整字体大小与语言偏好。语言偏好会保存并用于后续多语言扩展。</p>

        <div class="row">
          <div class="label">
            <strong>字体大小</strong>
            <span>建议范围 12–24，当前：${this.settings.fontSize}px</span>
          </div>
          <div class="control">
            <input type="range" min="12" max="24" step="1" .value=${String(this.settings.fontSize)} @input=${(e) => this._updateSetting('fontSize', Number(e.target.value))}>
          </div>
        </div>

        <div class="row">
          <div class="label">
            <strong>行间距</strong>
            <span>调整文本行之间的垂直距离。</span>
          </div>
          <div class="control">
            <select .value=${this.settings.lineHeight} @change=${(e) => this._updateSetting('lineHeight', e.target.value)}>
              <option value="compact">紧凑</option>
              <option value="standard">标准</option>
              <option value="loose">宽松</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="label">
            <strong>语言偏好</strong>
            <span>更改后立即生效（当前页面文案逐步覆盖）。</span>
          </div>
          <div class="control">
            <select .value=${this.settings.language} @change=${(e) => this._updateSetting('language', e.target.value)}>
              ${this.languages.map(lang => html`<option value="${lang.code}">${lang.name}</option>`)}
            </select>
          </div>
        </div>
      </div>
    `;
  }

  _renderSystem() {
    return html`
      <div class="section">
        <h3>功能设置</h3>
        <p class="desc">自定义快捷键与自动化行为。</p>

        <div class="row">
          <div class="label">
            <strong>自动保存间隔</strong>
            <span>设置自动保存的频率（1-30分钟）。当前：${this.settings.functionality?.autoSaveIntervalMin || 5}分钟</span>
          </div>
          <div class="control">
            <input type="range" min="1" max="30" step="1" .value=${String(this.settings.functionality?.autoSaveIntervalMin || 5)} @input=${(e) => this._updateSetting('functionality.autoSaveIntervalMin', Number(e.target.value))}>
          </div>
        </div>

        <div class="row">
          <div class="label">
            <strong>默认文件位置</strong>
            <span>新建文件时的默认保存路径。</span>
          </div>
          <div class="control">
             <input type="text" placeholder="例如: /MyProject/Docs" .value=${this.settings.functionality?.defaultFileLocation || ''} @change=${(e) => this._updateSetting('functionality.defaultFileLocation', e.target.value)}>
          </div>
        </div>

        <div class="row">
           <div class="label">
            <strong>快捷键配置</strong>
            <span>自定义常用操作的快捷键。</span>
           </div>
           <div class="control">
             <button class="btn" @click=${() => alert('快捷键配置功能开发中...')}>配置快捷键</button>
           </div>
        </div>
      </div>

      <div class="section">
        <h3>动画与可访问性</h3>
        <p class="desc">关闭动画可减少眩晕与电量消耗；高对比度可提升文字与控件辨识度。</p>

        <div class="row">
          <div class="label">
            <strong>启用全局动画</strong>
            <span>关闭后，界面切换将变为无动画。</span>
          </div>
          <label class="switch">
            <input type="checkbox" .checked=${this.settings.animationsEnabled} @change=${(e) => this._updateSetting('animationsEnabled', e.target.checked)}>
            <span class="slider"></span>
          </label>
        </div>

        <div class="row">
          <div class="label">
            <strong>动画速度</strong>
            <span>建议保持“正常”，以获得更稳定的视觉节奏。</span>
          </div>
          <div class="control">
            <select .value=${this.settings.animationSpeed} @change=${(e) => this._updateSetting('animationSpeed', e.target.value)}>
              <option value="slow">慢</option>
              <option value="normal">正常</option>
              <option value="fast">快</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="label">
            <strong>高对比度模式</strong>
            <span>增强分隔线与阴影，提升层次和可读性。</span>
          </div>
          <label class="switch">
            <input type="checkbox" .checked=${this.settings.highContrast} @change=${(e) => this._updateSetting('highContrast', e.target.checked)}>
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="section">
        <h3>通知与隐私</h3>
        <p class="desc">通知开关会影响未来通知功能；隐私选项用于控制数据使用范围。</p>

        <div class="row">
          <div class="label">
            <strong>启用通知</strong>
            <span>开启后，未来的提醒与系统消息将可推送。</span>
          </div>
          <label class="switch">
            <input type="checkbox" .checked=${this.settings.notifications.enabled} @change=${(e) => this._updateSetting('notifications.enabled', e.target.checked)}>
            <span class="slider"></span>
          </label>
        </div>

        <div class="row">
          <div class="label">
            <strong>通知音效</strong>
            <span>需要先开启“启用通知”。</span>
          </div>
          <label class="switch">
            <input type="checkbox" ?disabled=${!this.settings.notifications.enabled} .checked=${this.settings.notifications.sound} @change=${(e) => this._updateSetting('notifications.sound', e.target.checked)}>
            <span class="slider"></span>
          </label>
        </div>

        <div class="row">
          <div class="label">
            <strong>桌面通知</strong>
            <span>开启后将尝试请求浏览器权限。</span>
          </div>
          <label class="switch">
            <input type="checkbox" ?disabled=${!this.settings.notifications.enabled} .checked=${this.settings.notifications.desktop} @change=${(e) => this._handleDesktopNotificationToggle(e.target.checked)}>
            <span class="slider"></span>
          </label>
        </div>

        <div class="row">
          <div class="label">
            <strong>允许匿名使用统计</strong>
            <span>用于改进体验，不包含密码等敏感信息。</span>
          </div>
          <label class="switch">
            <input type="checkbox" .checked=${this.settings.privacy.analyticsEnabled} @change=${(e) => this._updateSetting('privacy.analyticsEnabled', e.target.checked)}>
            <span class="slider"></span>
          </label>
        </div>
      </div>
    `;
  }

  async _handleDesktopNotificationToggle(nextValue) {
    if (nextValue) {
      if (!('Notification' in window)) {
        this._setCloudState('error', '当前浏览器不支持桌面通知');
        return;
      }
      if (Notification.permission === 'granted') {
        this._updateSetting('notifications.desktop', true);
        return;
      }
      const permission = await Notification.requestPermission();
      this._updateSetting('notifications.desktop', permission === 'granted');
      if (permission !== 'granted') this._setCloudState('error', '未授予通知权限');
    } else {
      this._updateSetting('notifications.desktop', false);
    }
  }

  _renderStorage() {
    const cloudEnabled = this.settings.storage.cloudSyncEnabled;
    return html`
      <div class="section">
        <h3>数据存储</h3>
        <p class="desc">所有设置默认保存在本地。启用云端同步需要登录，并会把设置保存到服务器。</p>

        <div class="row">
          <div class="label">
            <strong>云端同步</strong>
            <span>重要设置变更：开启/关闭会触发二次确认。</span>
          </div>
          <label class="switch">
            <input
              type="checkbox"
              .checked=${cloudEnabled}
              @change=${(e) => (e.target.checked ? this._enableCloudSync() : this._disableCloudSync())}
            >
            <span class="slider"></span>
          </label>
        </div>

        <div class="row">
          <div class="label">
            <strong>自动同步</strong>
            <span>开启后，将按间隔自动推送到云端。</span>
          </div>
          <label class="switch">
            <input type="checkbox" ?disabled=${!cloudEnabled} .checked=${this.settings.storage.autoSyncEnabled} @change=${(e) => this._updateSetting('storage.autoSyncEnabled', e.target.checked)}>
            <span class="slider"></span>
          </label>
        </div>

        <div class="row">
          <div class="label">
            <strong>自动同步间隔（秒）</strong>
            <span>范围 5–300，建议 30。间隔过短会增加网络请求。</span>
          </div>
          <div class="control">
            <input type="number" min="5" max="300" step="1" ?disabled=${!cloudEnabled || !this.settings.storage.autoSyncEnabled} .value=${String(this.settings.storage.autoSyncIntervalSec)} @change=${(e) => this._updateSetting('storage.autoSyncIntervalSec', Number(e.target.value))}>
          </div>
        </div>

        <div class="btn-group">
          <button class="btn" ?disabled=${!cloudEnabled} @click=${this._pullFromCloud}>从云端拉取</button>
          <button class="btn primary" ?disabled=${!cloudEnabled} @click=${this._pushToCloud}>立即同步</button>
        </div>
        <div class="hint">提示：云端拉取会以云端为准覆盖本地（主题等立即变化）。</div>
      </div>
    `;
  }

  _renderSecurity() {
    const hasToken = Boolean(this._getToken());
    return html`
      <div class="section">
        <h3>密码修改</h3>
        <p class="desc">请先输入旧密码，再设置新密码。新密码需满足：至少8位，包含大写、小写与数字。</p>

        <div class="row">
          <div class="label">
            <strong>旧密码</strong>
            <span>用于确认你是账户所有者。</span>
          </div>
          <div class="control" style="width: 240px">
            <input type="password" ?disabled=${!hasToken} .value=${this.passwordForm.oldPassword} @input=${(e) => this._updatePasswordField('oldPassword', e.target.value)}>
          </div>
        </div>

        <div class="row">
          <div class="label">
            <strong>新密码</strong>
            <span>建议使用不易猜测的组合，并避免与旧密码相同。</span>
          </div>
          <div class="control" style="width: 240px">
            <input type="password" ?disabled=${!hasToken} .value=${this.passwordForm.newPassword} @input=${(e) => this._updatePasswordField('newPassword', e.target.value)}>
          </div>
        </div>

        <div class="row">
          <div class="label">
            <strong>确认新密码</strong>
            <span>用于减少输入错误。</span>
          </div>
          <div class="control" style="width: 240px">
            <input type="password" ?disabled=${!hasToken} .value=${this.passwordForm.confirmPassword} @input=${(e) => this._updatePasswordField('confirmPassword', e.target.value)}>
          </div>
        </div>

        <div class="btn-group">
          <button class="btn primary" ?disabled=${!hasToken} @click=${this._submitChangePassword}>提交修改</button>
        </div>

        ${this.passwordForm.error ? html`<div class="msg error">${this.passwordForm.error}</div>` : ''}
        ${this.passwordForm.ok ? html`<div class="msg ok">${this.passwordForm.ok}</div>` : ''}
        ${!hasToken ? html`<div class="hint">未登录时无法修改密码，请先登录。</div>` : ''}
      </div>
    `;
  }

  _renderBackup() {
    const cloudEnabled = this.settings.storage.cloudSyncEnabled;
    return html`
      <div class="section">
        <h3>本地备份</h3>
        <p class="desc">建议在更换设备或清理浏览器数据前，先导出备份文件。恢复需要二次确认。</p>
        <div class="btn-group">
          <button class="btn" @click=${this._downloadLocalBackup}>导出本地备份</button>
          <button class="btn" @click=${this._triggerRestoreInput}>从文件恢复</button>
          <button class="btn danger" @click=${this._resetSettings}>重置为默认设置</button>
        </div>
        <input id="restore-file" type="file" accept="application/json" style="display:none" @change=${this._restoreFromFile}>
      </div>

      <div class="section">
        <h3>云端备份</h3>
        <p class="desc">云端备份会保存一份设置快照，可用于误操作后的快速恢复。最多保留20份。</p>
        <div class="btn-group">
          <button class="btn primary" ?disabled=${!cloudEnabled} @click=${this._createCloudBackup}>创建云端备份</button>
          <button class="btn" ?disabled=${!cloudEnabled} @click=${this._loadCloudBackups}>刷新列表</button>
        </div>
        ${!cloudEnabled ? html`<div class="hint">启用“云端同步”后才能使用云端备份。</div>` : ''}
        ${cloudEnabled ? html`
          <div class="hint">点击某条备份即可恢复（会触发二次确认）。</div>
          <div style="margin-top: 12px; display: grid; gap: 8px;">
            ${(this.backups || []).length === 0 ? html`<div class="hint">暂无备份</div>` : this.backups.map(b => html`
              <button class="btn" style="justify-content: space-between; width: 100%; display: flex;" @click=${() => this._restoreCloudBackup(b.id)}>
                <span>备份时间：${new Date(b.createdAt).toLocaleString()}</span>
                <span>恢复</span>
              </button>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }
}

function setByPath(obj, path, value) {
  const parts = String(path).split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const next = cur[key];
    if (!next || typeof next !== 'object') cur[key] = {};
    cur = cur[key];
  }
  cur[parts[parts.length - 1]] = value;
}

customElements.define('settings-panel', SettingsPanel);
