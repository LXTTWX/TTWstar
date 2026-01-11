export function validatePassword(password) {
  if (!password) return '密码不能为空';
  if (password.length < 8) return '密码长度不足8位';
  if (!/[A-Z]/.test(password)) return '密码必须包含至少一个大写字母';
  if (!/[a-z]/.test(password)) return '密码必须包含至少一个小写字母';
  if (!/\d/.test(password)) return '密码必须包含至少一个数字';
  return null;
}

