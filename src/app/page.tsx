import React from 'react';
import { Flex, message } from 'antd';

import Title from 'antd/es/typography/Title';
import Link from 'next/link';
import './index.scss'
import QuestionBackListCom from '@/components/QuestionBackList';
import { listQuestionBankVoByPageUsingPost } from '@/api/questionBankController';
import { listQuestionVoByPageUsingPost } from '@/api/questionController';
import QuestionListCom from '@/components/QuestionList';


export default async function HomePage() {
  let questionBackList = []
  // 题目
  let questionList = []
  let questionBackCardLoading = true
  let questionCardLoading = true
  // 题库列表
  try {
    const questionBackListRes = await listQuestionBankVoByPageUsingPost({
      current: 1,
      sortField: 'createTime',
      sortOrder: 'desc',
    })
    questionBackList = questionBackListRes.data.records ?? []
    questionBackCardLoading = false
  } catch (error) {
    message.error('获取题库列表失败:' + (error as Error).message)
  }

  try {
    const questionListRes = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      sortOrder: 'descend',
    })
    questionList = questionListRes.data.records ?? [];
    questionCardLoading = false
  } catch (error) {
    message.error('获取题目列表失败:' + (error as Error).message)
  }



  return (
    <div id='root-home'>
      <Flex className='flex-box' justify='space-between' align='center'>
        <Title level={3}>题库</Title>
        <Link href='/questionBank'>更多</Link>
      </Flex>
      <div className='question-box'>
        <QuestionBackListCom questionBackList={questionBackList} cardLoading={questionBackCardLoading} />
      </div>
      <Flex className='flex-box' justify='space-between' align='center'>
        <Title level={3}>题目</Title>
        <Link href='/questionBank'>更多</Link>
      </Flex>
      <QuestionListCom questionList={questionList} cardLoading={questionCardLoading} />

    </div>
  );
}
