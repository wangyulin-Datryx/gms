import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import {
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  ContainerOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu

export default function Menus() {
  return (
    <Menu 
      theme="dark" 
      mode="inline" 
      defaultSelectedKeys={['1']}
    >
      <Menu.Item key="home" icon={<UserOutlined />}>
        <Link to="/">首页</Link>
      </Menu.Item>
      <SubMenu key="analysis" icon={<ContainerOutlined />} title="分析">
        <Menu.Item key="volume-analysis" icon={<VideoCameraOutlined />}>
          <Link to="/volume-analysis">用量分析</Link>
        </Menu.Item>
        <Menu.Item key="equipment-consumption" icon={<VideoCameraOutlined />}>
          <Link to="/equipment-consumption">设备维度分析</Link>
        </Menu.Item>
        <Menu.Item key="equipment-failure" icon={<VideoCameraOutlined />}>
          <Link to="/equipment-failure-analysis">设备故障</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="3" icon={<UploadOutlined />}>
        诊断
      </Menu.Item>
      {/* <Menu.Item key="4" icon={<BarChartOutlined />}>
        nav 4
      </Menu.Item>
      <Menu.Item key="5" icon={<CloudOutlined />}>
        nav 5
      </Menu.Item>
      <Menu.Item key="6" icon={<AppstoreOutlined />}>
        nav 6
      </Menu.Item>
      <Menu.Item key="7" icon={<TeamOutlined />}>
        nav 7
      </Menu.Item>
      <Menu.Item key="8" icon={<ShopOutlined />}>
        nav 8
      </Menu.Item> */}
    </Menu>
  )
}

