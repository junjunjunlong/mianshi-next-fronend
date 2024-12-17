"use server";
import React from 'react';
import { Flex, message } from 'antd';

import Title from 'antd/es/typography/Title';
import './index.scss'
import QuestionBackListCom from '@/components/QuestionBackList';
import { listQuestionBankVoByPageUsingPost } from '@/api/questionBankController';



export default async function Banks() {
  const pageSize= 200;
  let questionBackList = []
  let questionBackCardLoading = true
  try {
    const questionBackListRes = await listQuestionBankVoByPageUsingPost({
      pageSize,
      sortField: 'createTime',
      sortOrder: 'desc',
    })
    questionBackList = questionBackListRes.data.records ?? []
    questionBackCardLoading = false
  } catch (error) {
    message.error('获取题库列表失败:' + error.message)
  }

  return (
    <div className='banks-contant max-width-container'>
      <Flex className='flex-box' justify='space-between' align='center'>
        <Title level={3}>题库大全</Title>
      </Flex>
        <QuestionBackListCom questionBackList={questionBackList} cardLoading={questionBackCardLoading} />
    </div>
  );
}
