import DatryxIcon from '../assets/images/datryx-icon.png'
import { Form, Input, Button } from 'antd'
import './Login.css'

const Login = () => {
  return (
    <div className="login">
      <div className="logo">
        <img alt="logo" src={DatryxIcon} />
      </div>
      <div className="form">
        <h1>登录</h1>
        <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              
              autoComplete="off"
          >
              <Form.Item
                  label="用户名"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
              >
                  <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                  提交
                  </Button>
              </Form.Item>
          </Form>
      </div>
      <p className="record"><span>京ICP备2021024082号-1</span>&emsp;&emsp;<span>京公网安备11010502045380号</span></p>
    </div>
  )
}

export default Login