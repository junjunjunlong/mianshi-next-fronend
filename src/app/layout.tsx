"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/layout/BasicLayout";
import React, { useCallback, useEffect, } from "react";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";
import { getLoginUserUsingGet } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import AccessLayout from "@/access/accessLayout";
import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 执行初始化逻辑的布局（多封装一层）
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  /**
   * 全局初始化函数，有全局单次调用的代码，都可以写到这里
   */

  // *********** React-Hook 只能在函数外使用 *********** //
  const dispatch = useDispatch<AppDispatch>();

  const doinit = useCallback(async () => {
    // 登录初始化处理
    const res = await getLoginUserUsingGet();
    if (res.data) {
      // 登录成功
    } else {
      return;
      setTimeout(() => {
        const aa = {
          userName: "测试登录",
          userProfile: "暂无简介",
          userAvatar: "/assets/avatar.jpg",
          userRole: ACCESS_ENUM.ADMIN,  // 角色
        }
        dispatch(setLoginUser(aa))
      }, 3000);
    }
  }, [])

  useEffect(() => {
    doinit();
  }, []);

  return <>{children}</>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout >
                  {children}
                </AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
