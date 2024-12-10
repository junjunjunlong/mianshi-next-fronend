
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/index";
import { findMenusByPath } from "../../config/menu";
import checkAccess from "./checkAccess";
import ACCESS_ENUM from "./accessEnum";
import { Forbiddeen } from "@/app/forbidden";

const AccessLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  // ****** 逻辑代码 ******


  // 1、获取当前路由
  const pathName = usePathname();
  // 2、获取当前用户
  const loginUser = useSelector((state: RootState) => state.loginUser)
  // 3、根据当前路径获取菜单
  const menuLay = findMenusByPath(pathName)

  // 4、校验权限（调用access权限方法）
  const needAccess = menuLay?.access ?? ACCESS_ENUM.NOT_LOGIN
  const isCheckAccess = checkAccess(loginUser, needAccess)

  if (!isCheckAccess) {
    return <Forbiddeen />
  }
  return <>{children}</>;
};

export default AccessLayout
