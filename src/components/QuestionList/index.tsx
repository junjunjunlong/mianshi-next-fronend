"use client";

/* 题目components */
import React from 'react';
import { Avatar, Card, List, Tag } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
import "./index.scss";
import Link from 'next/link';

// 静态类型定义
interface Props {
  questionList: API.QuestionVO[],
  cardLoading: boolean,
}

export default function QuestionList(props: Props) {
  const { questionList, cardLoading } = props;

  console.log(questionList, 'questionList');
  return (
    <Card className='questionList'>
      <List
        loading={cardLoading}
        dataSource={questionList}
        renderItem={(item) => (
          <List.Item extra={
            item.tagList?.map((tag, index) => {
              return <Tag key={tag + index}>{tag}</Tag>
            })
          }>
            <List.Item.Meta
              title={
                <Link href={`/questions/${item.id}`} >{item.title}</Link>
              }
            >
            </List.Item.Meta>
          </List.Item>
        )}
      />
    </Card>
  );
}
