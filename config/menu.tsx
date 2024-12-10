import { MenuDataItem } from "@ant-design/pro-layout";
import { CrownOutlined } from "@ant-design/icons";
import ACCESS_ENUM from "@/access/accessEnum";

// 菜单列表
const menus = [
  {
    path: "/",
    name: "主页",
  },
  {
    path: "/banks",
    name: "题库",
  },
  {
    path: "/questions",
    name: "题目",
  },
  {
    name: "面试鸭",
    path: "https://mianshiya.com",
    // 打开新页面
    target: "_target",
  },
  {
    path: "/admin",
    name: "管理",
    access: ACCESS_ENUM.ADMIN,
    icon: <CrownOutlined />,
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
        access: ACCESS_ENUM.ADMIN,
      }
    ],
  },
] as MenuDataItem[];
// 导出
export default menus;


// 根据路径查找所有菜单
export const findMenusByPath = (path: string) => {
  return findMenuByPath(menus, path)
}

// 递归查找菜单
export const findMenuByPath = (menus: MenuDataItem[], path: string): MenuDataItem | null => {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu;
    }
    if (menu.children) {
      const childMenu = findMenuByPath(menu.children, path);
      if (childMenu) {
        return childMenu;
      }
    }
  }
  return null
}


