"use client";
import React, { useState } from 'react';
import { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Space, Typography, Popconfirm, message } from 'antd';
import "./index.scss";
import { listUserByPageUsingPost, deleteUserUsingPost } from '@/api/userController';
import CreatedModel from './components/createdModel';
import UpdataModal from './components/updataModal';


const User: React.FC = () => {

  const columns: ProColumns<API.User>[] = [
    {
      title: "账号",
      dataIndex: "userAccount",
      valueType: "text",
      width: 120,
    },
    {
      title: "用户名",
      dataIndex: "userName",
      valueType: "text",
      width: 120,
    },
    {
      title: "头像",
      dataIndex: "userAvatar",
      valueType: "image",
      width: 120,
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
    },
    {
      title: "简介",
      dataIndex: "userProfile",
      valueType: "textarea",
      width: 120,
    },
    {
      title: "权限",
      dataIndex: "userRole",
      width: 80,
      valueEnum: {
        user: {
          text: "用户",
        },
        admin: {
          text: "管理员",
        },
      },
    },
    {
      title: "创建时间",
      sorter: true,
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
      width: 120,
    },
    {
      title: "更新时间",
      sorter: true,
      dataIndex: "updateTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
      width: 120,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              console.log(record, "修改===record");
              setmodalVisibleEdit(true);
              setDefaultValue(record)
            }}
          >
            修改
          </Typography.Link>
          <Popconfirm
            title="是否删除"
            description="请确认是否删除该条数据？"
            onConfirm={
              async () => {
                try {
                  const res = await deleteUserUsingPost({ id: record.id })
                  if (res.data) {
                    message.success("删除成功")
                    actionRef.current?.reload(true)
                  }
                } catch (e) {
                  message.error((e as Error).message)
                }
              }
            }
            okText="Yes"
            cancelText="No"
          >
            <Typography.Link type="danger" >
              删除
            </Typography.Link>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  const [modalVisibleAdd, setmodalVisibleAdd] = useState(false)
  const [modalVisibleEdit, setmodalVisibleEdit] = useState(false)
  const [defaultValue, setDefaultValue] = useState<API.UserQueryRequest>({});

  const actionRef = useRef<ActionType>();
  return (
    <div className='user-contanter'>
      <CreatedModel
        visible={modalVisibleAdd}
        onsubmit={() => {
          setmodalVisibleAdd(false)
          actionRef.current?.reload(true)
        }}
        onCancel={() => {
          setmodalVisibleAdd(false)
        }}
        columns={columns}
      />
      <UpdataModal
        visible={modalVisibleEdit}
        defaultValues={defaultValue}
        onsubmit={() => {
          setmodalVisibleEdit(false)
          actionRef.current?.reload(true)
        }}
        onCancel={() => {
          setmodalVisibleEdit(false)
        }}
        columns={columns}
      />
      <PageContainer>
        <ProTable<API.User>
          columns={columns}
          cardBordered
          actionRef={actionRef}
          request={async (params, sort, filter) => {
            const sortField = Object.keys(sort)?.[0];
            // const sortOrder = sort?.[sortField];
            const { code, data } = await listUserByPageUsingPost({
              ...params,
              sortField,
              ...filter,
            });
            return {
              data: data?.records,
              total: Number(data.total),
              success: code === 0
            };
          }}
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          pagination={{
            pageSize: 10,
          }}
          dateFormatter="string"
          headerTitle={"查询表格"}
          toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              onClick={() => {
                setmodalVisibleAdd(true)
              }}
              type="primary"
            >
              新建
            </Button>
          ]}
        />
      </PageContainer>

    </div>
  );
};

export default User