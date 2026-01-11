export function getDefaultSettings() {
  return {
    themeId: 'morning-glory',
    customPrimaryColor: null,
    darkMode: false,
    fontSize: 16,
    lineHeight: 'standard', // compact, standard, loose
    customColors: {}, // User defined overrides
    language: 'zh-CN',
    animationsEnabled: true,
    animationSpeed: 'normal',
    highContrast: false,
    notifications: {
      enabled: true,
      sound: false,
      desktop: false
    },
    privacy: {
      analyticsEnabled: false,
      profileVisible: true
    },
    storage: {
      cloudSyncEnabled: false,
      autoSyncEnabled: true,
      autoSyncIntervalSec: 30
    },
    functionality: {
      shortcuts: {},
      autoSaveIntervalMin: 5, // 1-30 minutes
      defaultFileLocation: ''
    }
  };
}

export function mergeSettings(input) {
  const defaults = getDefaultSettings();
  if (!input || typeof input !== 'object') return defaults;
  const next = {
    ...defaults,
    ...pick(input, ['themeId', 'darkMode', 'fontSize', 'lineHeight', 'language', 'animationsEnabled', 'animationSpeed', 'highContrast']),
    customColors: { ...(input.customColors || {}) },
    notifications: { ...defaults.notifications, ...pick(input.notifications, ['enabled', 'sound', 'desktop']) },
    privacy: { ...defaults.privacy, ...pick(input.privacy, ['analyticsEnabled', 'profileVisible']) },
    storage: { ...defaults.storage, ...pick(input.storage, ['cloudSyncEnabled', 'autoSyncEnabled', 'autoSyncIntervalSec']) },
    functionality: { ...defaults.functionality, ...pick(input.functionality || {}, ['shortcuts', 'autoSaveIntervalMin', 'defaultFileLocation']) }
  };
  next.fontSize = clampNumber(next.fontSize, 12, 32, defaults.fontSize);
  next.storage.autoSyncIntervalSec = clampNumber(next.storage.autoSyncIntervalSec, 5, 300, defaults.storage.autoSyncIntervalSec);
  next.functionality.autoSaveIntervalMin = clampNumber(next.functionality.autoSaveIntervalMin, 1, 30, defaults.functionality.autoSaveIntervalMin);
  
  if (!['slow', 'normal', 'fast'].includes(next.animationSpeed)) next.animationSpeed = defaults.animationSpeed;
  if (!['compact', 'standard', 'loose'].includes(next.lineHeight)) next.lineHeight = defaults.lineHeight;
  if (!['zh-CN', 'zh-TW', 'en-US', 'ja-JP', 'ko-KR', 'ar-SA'].includes(next.language)) next.language = defaults.language;
  if (typeof next.themeId !== 'string' || !next.themeId) next.themeId = defaults.themeId;
  if (next.customPrimaryColor && typeof next.customPrimaryColor !== 'string') next.customPrimaryColor = null; // Legacy support
  
  next.darkMode = Boolean(next.darkMode);
  next.animationsEnabled = Boolean(next.animationsEnabled);
  next.highContrast = Boolean(next.highContrast);
  next.notifications.enabled = Boolean(next.notifications.enabled);
  next.notifications.sound = Boolean(next.notifications.sound);
  next.notifications.desktop = Boolean(next.notifications.desktop);
  next.privacy.analyticsEnabled = Boolean(next.privacy.analyticsEnabled);
  next.privacy.profileVisible = Boolean(next.privacy.profileVisible);
  next.storage.cloudSyncEnabled = Boolean(next.storage.cloudSyncEnabled);
  next.storage.autoSyncEnabled = Boolean(next.storage.autoSyncEnabled);
  return next;
}

function pick(obj, keys) {
  if (!obj || typeof obj !== 'object') return {};
  const out = {};
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) out[k] = obj[k];
  }
  return out;
}

function clampNumber(value, min, max, fallback) {
  if (typeof value !== 'number' || Number.isNaN(value)) return fallback;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

