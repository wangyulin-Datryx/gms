import { 
  Menu, 
  Dropdown,
  Popover, 
  Avatar
} from 'antd';
import { 
  DownOutlined,
  UserOutlined 
} from '@ant-design/icons';
import './Header.css'
import { Link } from 'react-router-dom';

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
);

const dashBoard = (
  <Menu>
    <Menu.Item key="0">
      <a href="https://www.antgroup.com">总览看板</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://www.aliyun.com">库存看板</a>
    </Menu.Item>
  </Menu>
);

const UserTable = () => {
  const text = <span>登录用户：admin</span>
  const content = (
    <div>
      <Link to="/login">登出</Link>
    </div>
  )
  return (
    <div className="user-table">
      <Avatar size={30} icon={<UserOutlined />} />
        <Popover placement="bottomRight" title={text} content={content} trigger="click">
          <p style={{marginLeft: "5px", color:"black"}}>admin</p>
        </Popover>
    </div> 
  )
}

const Header= () => {
  return (
    <div className="header">
      <Dropdown overlay={myWorkTable} trigger={['click']}>
        <p className="ant-dropdown-link dropdown-text" onClick={e => e.preventDefault()}>
          我的工作台 <DownOutlined style={{ marginLeft: '2%' }}/>
        </p>
      </Dropdown>
      <p className="ant-dropdown-link dropdown-text" onClick={e => e.preventDefault()}>
        消息中心 
      </p>
      {/* <Dropdown overlay={dashBoard} trigger={['click']}>
        <p className="ant-dropdown-link dropdown-text" onClick={e => e.preventDefault()}>
          工厂大数据看板 <DownOutlined style={{ marginLeft: '2%' }}/>
        </p>
      </Dropdown> */}
      {/* <div style={{ float: "right", marginRight: "5%" }}>
        <UserTable />
      </div> */}
    </div>
  )
}

export default Header