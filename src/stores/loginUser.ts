import ACCESS_ENUM from "@/access/accessEnum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "@/stores/index";

// 默认用户
const DEFAULT_USER: API.LoginUserVO = {
  userName: "未登录",
  userProfile: "暂无简介",
  userAvatar: "/assets/notLoginUser.png",
  userRole: ACCESS_ENUM.NOT_LOGIN,  // 角色
};

/**
 * 登录用户全局状态
 */
export const loginUserSlice = createSlice({
  name: "loginUser",
  // 初始值
  initialState: DEFAULT_USER,  
  // 修改状态
  reducers: { 
    setLoginUser: (state, action: PayloadAction<API.LoginUserVO>) => {
      // 尽量返回新对象，避免造成污染以及不可预知的问题
      return {
        ...action.payload,
      };
    },
  },
});

// 修改状态
export const { setLoginUser } = loginUserSlice.actions;

export default loginUserSlice.reducer;
