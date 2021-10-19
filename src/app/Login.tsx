import DatryxIcon from '../assets/images/datryx-icon.png'
import BackgroundImg from '../assets/images/login-background.jpg'
import { Form, Input, Button } from 'antd'
import axios from 'axios'

const Login = () => {

  const onFinish = async ({ username, password }: any) => {
    try {
      const response:any = await axios.post('http://8.130.177.91:8080/auth/login', {
        username, password
      })
      localStorage.setItem('loginToken', response.data.data)
      localStorage.setItem('username', username)
      window.location.reload()
    } catch(error){
      console.log(error)
    }
  }

  return (
    <div 
      className="flex flex-column items-center justify-center vh-100 cover" 
      style={{backgroundImage: `url(${BackgroundImg})`}}
    >
      <div className="absolute left-1 top-1">
        <img alt="logo" src={DatryxIcon} style={{width: '50px', height: '50px'}}/>
      </div>
      <div className="bg-white pa5 br2 shadow-3 flex flex-column items-center">
        <h1>登录</h1>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "输入用户名" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "输入密码" }]}
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
      <p className="mt2"><span>京ICP备2021024082号-1</span>&emsp;&emsp;<span>京公网安备11010502045380号</span></p>
    </div>
  )
}

export default Login