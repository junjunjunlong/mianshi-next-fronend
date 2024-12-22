"use client"; "use client";
import React from 'react';
import { useRef } from 'react';
import { message, Modal } from 'antd';
import { ProColumns, ProTable, ActionType } from '@ant-design/pro-components';
import { updateUserUsingPost } from '@/api/userController';

interface Props {
  visible: boolean;
  columns: ProColumns<API.User>[];
  defaultValues?: API.User;
  onCancel?: () => void;
  onsubmit?: (values: API.UserUpdateRequest) => void;
}
export default function UpdataModal(Props: Props) {
  const { visible, columns, defaultValues, onCancel, onsubmit } = Props;

  const actionRef = useRef<ActionType>();
  const handle = async (values: API.UserUpdateRequest) => {
    try {
      const res = await updateUserUsingPost({ ...defaultValues, ...values, });
      if (res.data) return true;
    } catch (e) {
      message.error((e as Error).message || "修改失败");
      return false;
    }
  };
  return (
    <Modal
      destroyOnClose
      title={"修改"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        form={{
          initialValues: defaultValues,
        }}
        actionRef={actionRef}
        columns={columns}
        onSubmit={async (values: API.UserUpdateRequest) => {
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
