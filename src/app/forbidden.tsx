/**
 * 无权限页面 
 */
import { Result, Button } from 'antd';

export const Forbiddeen = () => {
  return (
    <Result
      status={403}
      title="对不起，你没有权限访问此页面。"
      subTitle="对不起，你没有权限访问此页面。"
      extra={[
        <Button type="primary" key="console" href='/'>
          返回首页
        </Button>
      ]}
    />
  )
}