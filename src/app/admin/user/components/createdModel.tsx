"use client";
import React from 'react';
import { Modal } from 'antd';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { addUserUsingPost } from '@/api/userController';

interface Props {
  visible: boolean;
  columns: ProColumns<API.User>[];
  onCancel?: () => void;
  onsubmit?: (values: API.UserAddRequest) => void;
}
export default function CreatedModel(Props: Props) {
  const { visible, columns, onCancel, onsubmit } = Props;


  const handle = async (values: API.UserAddRequest) => {
    try {
      const res = await addUserUsingPost(values);
      console.log(res);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };
  return (
    <Modal
      destroyOnClose
      title={"创建"}
      open={visible}
      footer={null}
      okText="创建"
      cancelText="取消"
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (values: API.UserAddRequest) => {
          console.log(values);
          const resSu = await handle(values);
          if (resSu) {
            onsubmit?.(values);
          }
        }}
      />
    </Modal>
  );
}
