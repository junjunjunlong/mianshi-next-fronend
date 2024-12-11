"use client";
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import './index.scss'
import { userLoginUsingPost } from '@/api/userController';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/stores';
import { setLoginUser } from '@/stores/loginUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {

  const [form] = ProForm.useForm();  //表单实例
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const doSubmit = async (values: API.UserLoginRequest): Promise<void> => {
    try {
      const res = await userLoginUsingPost(values);
      if (res.data) {
        message.success('登录成功');
        dispatch(setLoginUser(res.data as API.LoginUserVO));
        router.replace('/')
        form.resetFields();
      }
    } catch (e) {
      message.error('登录失败：' + (e as Error).message);
    }
  }

  return (
    <ProConfigProvider hashed={false}>
      <div id='login-wrapper'>
        <LoginForm
          form={form}
          logo="/assets/logo_1.png"
          title="面试匠-登录"
          subTitle="面试匠-面试官面试者沟通工具"
          onFinish={doSubmit}
        >
          <ProFormText
            name="userAccount"
            className='login-form'
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'请输入用户账号'}
            rules={[
              {
                required: true,
                message: '请输入用户账号!',
              },
            ]}
          />
          <ProFormText.Password
            name="userPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'请输入密码'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <div
            style={{
              marginBlockEnd: 24,
              textAlign: 'end',
            }}
          >
            还没账号?
            <Link href="/user/register" > 注册</Link>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};