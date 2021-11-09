import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import {
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MonitorOutlined,
  AlertOutlined
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
      <Menu.Item key="3" icon={<AlertOutlined />}>
        <Link to="/warning-info-statics">预警信息</Link>
      </Menu.Item>
      <Menu.Item key="equipment-status" icon={<UploadOutlined />}>
        <Link to="/equipment-status">设备状态</Link>
      </Menu.Item>
      <Menu.Item key="ammeter-management" icon={<MonitorOutlined />}>
        <Link to="/ammeter-management">电表管理</Link>
      </Menu.Item>
      <Menu.Item key="equipment-management" icon={<DesktopOutlined />}>
        <Link to="/equipment-management">设备管理</Link>
      </Menu.Item>
      <Menu.Item key="equipments-group-management" icon={<DesktopOutlined />}>
        <Link to="/equipments-group-management">设备群组管理</Link>
      </Menu.Item>
      <Menu.Item key="product-line-management" icon={<DesktopOutlined />}>
        <Link to="/product-line-management">产线管理</Link>
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

