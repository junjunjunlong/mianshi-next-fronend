import { MenuDataItem } from "@ant-design/pro-components";
import menus from "../../config/menu";
import checkAccess from "./checkAccess";

// 权限过滤菜单
export default function menuAccess(loginUser: API.LoginUserVO, menuItems: MenuDataItem[]= menus){
    return menuItems.filter((item)=>{
      // 根据当前用户权限判断是否显示菜单
      if(!checkAccess(loginUser, item.access)){
        return false
      }
      if(item.children){
        item.children = menuAccess(loginUser, item.children)
      }
      return true;
    })
}