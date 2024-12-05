"use client";
import {
  GithubFilled,
  LogoutOutlined,
  PlusCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import {
  ProLayout,
} from '@ant-design/pro-components';
import {
  Dropdown,
  Input,
} from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';


const SearchInput = () => {
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
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
        prefix={
          <SearchOutlined
          />
        }
        placeholder="搜索题目"
        variant="borderless"
      />
      <PlusCircleFilled
        style={{
          fontSize: 24,
        }}
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {

  const pathname = usePathname()

  return (
    <div
      id="basicLayout"
      className='basicLayout'
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <ProLayout
        layout='top'
        location={{
          pathname
        }}
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
          title: '龙达达',
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      label: '退出登录',
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
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return (
            <div
              style={{
                textAlign: 'center',
                paddingBlockStart: 12,
              }}
            >
              <div>© 2021 Made with love</div>
              <div>by Ant Design</div>
            </div>
          );
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        // 菜单
        menuDataRender={() => {
          return [
            {
              path: '/backs',
              name: '欢迎',
            },
            {
              path: '/questions',
              name: '题目大全',
            },
          ]
        }}
        // 菜单点击
        menuItemRender={(item, dom) => (
          <Link
            href={item.path || '/'}
          >
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div >
  );
};