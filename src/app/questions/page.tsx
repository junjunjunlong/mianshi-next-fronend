"use client";
import React, { useState } from 'react';
// import { Button, } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
import "./index.css";

import MDeditor from '@/components/MdEditor';
import MdViewer from '@/components/MdViewer';

export default function Questions() {

  const [text, setText] = useState("");

  return (
    <div className='questions'>
      <main >
        你好，这是 question 页面
        <MDeditor value={text} onChange={setText}></MDeditor>
        <MdViewer value={text}></MdViewer>
      </main>
    </div>
  );
}
