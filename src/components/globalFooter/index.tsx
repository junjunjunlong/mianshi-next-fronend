import React from 'react';
// import { Button, } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
import "./index.scss";

export default function GllobalFooter() {
  const yearPl = new Date().getFullYear();
  return (
    <div className='gllobal-footer'>
      <div>{yearPl} © 面试匠刷题平台</div>
      <div className='author'>
        作者：<a href="https://github.com/zhengyuxiang">龙哒哒</a>
      </div>
      {/* 这是面试鸭底部footer</div> */}
    </div>
  );
}
