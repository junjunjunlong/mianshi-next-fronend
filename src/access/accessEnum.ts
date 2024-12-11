/**
 * 权限定义
 */
const ACCESS_ENUM = {
  NOT_LOGIN: "notLogin",
  USER: "user",
  ADMIN: "admin",
};

// 默认没有登录情况
export const DEFAULT_NOT_LOGIN_USER: API.LoginUserVO = {
  "userAvatar": "/assets/nologin.png",
  "userName": "未登录",
  "userProfile": "暂无简介",
  "userRole": ACCESS_ENUM.NOT_LOGIN,
}

export default ACCESS_ENUM;