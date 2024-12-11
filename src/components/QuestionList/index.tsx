"use client";

/* 题目components */
import React from 'react';
import { Card, Avatar, List } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
import "./index.scss";
import Link from 'next/link';

// 静态类型定义
interface Props {
  questionList: API.QuestionBankAddRequest,
  cardLoading: boolean,
}

export default function QuestionList(props: Props) {
  const { questionList, cardLoading } = props;

  return (
    <div className='questionList'>

      <List
        grid={{ gutter: 16, column: 4, xs: 1, sm: 2, md: 3, lg: 3 }}
        dataSource={questionList as any[]}
        renderItem={(item) => (
          <List.Item>
            <Card loading={cardLoading} style={{ minWidth: 300 }}>
              <Card.Meta
                avatar={<Avatar src={item.picture} />}
                title={
                  <Link href={`/question/${item.id}`}>
                    {item.title}
                  </Link>
                }
                description={item.description}
              />
            </Card>
          </List.Item>
        )}
      />


    </div>
  );
}
