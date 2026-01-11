// 本地用户数据管理工具

// 存储键名
const USERS_KEY = 'ttstar_users';
const CURRENT_USER_KEY = 'ttstar_current_user';
const LOGIN_HISTORY_KEY = 'ttstar_login_history';
const AUTO_LOGIN_KEY = 'ttstar_auto_login';

// 历史登录记录最大数量
const MAX_LOGIN_HISTORY = 5;

// 获取所有用户数据
export function getAllUsers() {
  try {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error('获取用户数据失败:', error);
    return [];
  }
}

// 保存所有用户数据
export function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('保存用户数据失败:', error);
    return false;
  }
}

// 根据用户名查找用户
export function findUserByUsername(username) {
  const users = getAllUsers();
  return users.find(user => user.username.toLowerCase() === username.toLowerCase());
}

// 注册新用户
export function registerUser(userData) {
  // 检查用户名是否已存在
  if (findUserByUsername(userData.username)) {
    return { success: false, error: '用户名已存在' };
  }

  const users = getAllUsers();
  
  // 创建新用户对象
  const newUser = {
    id: 'user-' + Date.now(),
    username: userData.username,
    password: userData.password, // 注意：实际项目中应该加密存储
    role: 'user',
    createdAt: new Date().toISOString(),
    ...(userData.birthday && { birthday: userData.birthday }),
    ...(userData.gender && { gender: userData.gender }),
    ...(userData.school && { school: userData.school })
  };

  // 保存新用户
  users.push(newUser);
  if (saveUsers(users)) {
    return { success: true, user: newUser };
  } else {
    return { success: false, error: '保存用户数据失败' };
  }
}

// 用户登录
export function loginUser(username, password) {
  const user = findUserByUsername(username);
  
  if (!user) {
    return { success: false, error: '用户名不存在' };
  }
  
  if (user.password !== password) {
    return { success: false, error: '密码错误' };
  }
  
  // 保存当前登录用户信息（不包含密码）
  const { password: _, ...userWithoutPassword } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  
  // 添加到登录历史记录
  addLoginHistory(username);
  
  return { success: true, user: userWithoutPassword };
}

// 获取当前登录用户
export function getCurrentUser() {
  try {
    const userJson = localStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('获取当前用户失败:', error);
    return null;
  }
}

// 用户登出
export function logoutUser() {
  try {
    // 清除当前用户信息
    localStorage.removeItem(CURRENT_USER_KEY);
    // 清除临时会话数据
    localStorage.removeItem('app-settings');
    return true;
  } catch (error) {
    console.error('登出失败:', error);
    return false;
  }
}

// 检查用户是否已登录
export function isLoggedIn() {
  return getCurrentUser() !== null;
}

// 获取历史登录记录
export function getLoginHistory() {
  try {
    const historyJson = localStorage.getItem(LOGIN_HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error('获取登录历史失败:', error);
    return [];
  }
}

// 添加登录记录
export function addLoginHistory(username) {
  try {
    let history = getLoginHistory();
    // 移除已存在的相同用户名记录
    history = history.filter(item => item.username.toLowerCase() !== username.toLowerCase());
    // 添加新记录到开头
    history.unshift({
      username: username,
      lastLogin: new Date().toISOString()
    });
    // 限制记录数量
    if (history.length > MAX_LOGIN_HISTORY) {
      history = history.slice(0, MAX_LOGIN_HISTORY);
    }
    localStorage.setItem(LOGIN_HISTORY_KEY, JSON.stringify(history));
    return true;
  } catch (error) {
    console.error('添加登录历史失败:', error);
    return false;
  }
}

// 清除历史登录记录
export function clearLoginHistory() {
  try {
    localStorage.removeItem(LOGIN_HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('清除登录历史失败:', error);
    return false;
  }
}

// 设置自动登录
export function setAutoLogin(username, enable) {
  try {
    let autoLoginUsers = getAutoLoginUsers();
    if (enable) {
      // 添加到自动登录列表
      if (!autoLoginUsers.includes(username.toLowerCase())) {
        autoLoginUsers.push(username.toLowerCase());
      }
    } else {
      // 从自动登录列表中移除
      autoLoginUsers = autoLoginUsers.filter(user => user !== username.toLowerCase());
    }
    localStorage.setItem(AUTO_LOGIN_KEY, JSON.stringify(autoLoginUsers));
    return true;
  } catch (error) {
    console.error('设置自动登录失败:', error);
    return false;
  }
}

// 获取自动登录用户列表
export function getAutoLoginUsers() {
  try {
    const autoLoginJson = localStorage.getItem(AUTO_LOGIN_KEY);
    return autoLoginJson ? JSON.parse(autoLoginJson) : [];
  } catch (error) {
    console.error('获取自动登录用户列表失败:', error);
    return [];
  }
}

// 检查用户是否开启自动登录
export function isAutoLoginEnabled(username) {
  const autoLoginUsers = getAutoLoginUsers();
  return autoLoginUsers.includes(username.toLowerCase());
}