import { 
  Menu, 
  Dropdown,
  Popover, 
  Avatar,
  Row,
  Col,
  Button,
  Drawer
} from 'antd';
import { 
  MenuOutlined,
  DownOutlined,
  UserOutlined,
  DeleteRowOutlined
} from '@ant-design/icons';
import ESGLogo from '../assets/images/esg1.png'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Menus from './Menus';
import './Header.css'

const myWorkTable = (
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="https://www.aliyun.com">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
)

const UserTable = () => {
  const username: string | null = localStorage.getItem("username")

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  const userContent = (
    <div>
      <a onClick={handleLogOut}><DeleteRowOutlined style={{ marginRight: 10 }} />登出</a>
    </div>
  )

  return (
    <div 
    style={{ display: "flex", alignItems: "baseline", justifyContent: "end", marginRight:'10px'}} 
    className="usertab"
    >
      <Avatar size={30} icon={<UserOutlined />} />
      <Popover placement="bottom" title={`登录用户: ${username || "admin"}`} content={userContent} trigger="click" >
        <h4 style={{ marginLeft: 10, cursor: "pointer" }}>{username || "admin"}   </h4>
      </Popover>
    </div>
  )
}

const Header= () => {
  const [visible, setVisible] = useState(false)
  const [logo, setLogo] = useState('')

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response:any = await axios.get(
          "api/factory/logo", 
           {responseType: 'arraybuffer'}
        )
        
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          )
        )
        setLogo("data:;base64," + base64)
      } catch(error) {
        console.log(error)
      }
    }
    fetchLogo()
  },[])

  return (
    <Row 
      className='bg-white pt2' 
      style={{alignItems: 'baseline'}}
    >
      <Col md={{span: 2, order: 0}} xs={{order: 2, span:16}} >
        <Button
          className='drawer-button ml4'
          type='primary'
          icon={<MenuOutlined />}
          onClick={() => setVisible(true)}
        />
        <Drawer
          title="GMS"
          placement='left'
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <Menus />
        </Drawer>
      </Col>
      <Col md={{span:8, order: 0}} xs={{offset: 1, span:8}}>
        <Dropdown overlay={myWorkTable} trigger={['click']}>
          <p 
            className="ant-dropdown-link dropdown-text" 
            onClick={e => e.preventDefault()}
          >
            我的工作台 <DownOutlined style={{ marginLeft: '2%' }}/>
          </p>
        </Dropdown>
      </Col>
      <Col md={{span:5, order: 0}} xs={{span: 6}}>
        <p className="ant-dropdown-link dropdown-text" onClick={e => e.preventDefault()}>
          消息中心 
        </p>
      </Col>
      <Col md={{offset: 2, span: 3, order: 0}} xs={{order:2, }}>
        <UserTable />
      </Col>
      <Col md={{span:3, order: 0}} xs={{order: 1}}>
        <img 
          src={logo} 
          alt="ESGlogo" 
          style={{width: '130px', height: '40px', borderRadius: "10px"}}
        />
      </Col>
    </Row>
  )
}

export default Header