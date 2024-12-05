"use client";
import React from "react";
import { Dropdown, Input } from "antd";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import GlobalFooter from "@/components/globalFooter";
import menus from "../../../config/menu";

const SearchInput = () => {
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={<SearchOutlined />}
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();

  return (
    <div
      id="basicLayout"
      className="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        layout="top"
        title="面试匠刷题平台"
        logo={
          <Image
            src="/assets/logo_1.png"
            alt="面试匠"
            width={32}
            height={32}
            style={{ marginRight: 6 }}
          />
        }
        location={{
          pathname,
        }}
        avatarProps={{
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          size: "small",
          title: "龙达达",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <SearchInput key={"SearchOutlined"} />,
            <GithubFilled key="GithubFilled" />,
          ];
        }}
        headerTitleRender={(logo, title) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        footerRender={() => {
          return (
            <GlobalFooter />
          );
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        // 菜单
        menuDataRender={() => {
          return menus;
        }}
        // 菜单点击
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"}>{dom}</Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}
