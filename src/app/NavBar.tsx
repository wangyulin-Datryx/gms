import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  ContainerOutlined
} from '@ant-design/icons';
import DatryxIcon from '../assets/images/datryx-icon.png'
import Menus from './Menus'

const { Sider } = Layout
const { SubMenu } = Menu

const NavBar = () => {
  return (
    <>
      <Sider
        breakpoint='lg'
        collapsedWidth={0}
        trigger={null}
        style={{
          overflow: 'auto',
        }}
      >
        <div className="flex justify-start items-center pa2 mb2">
          <img 
            src={DatryxIcon} 
            alt="logo" 
            style={{width: '50px', height: '50px'}}
          />
          <h2 style={{color: "white", marginLeft: '10px'}}>GMS系统</h2>
        </div>
        <Menus />
        <p style={{color: 'rgba(255, 255, 255, .9)', position: 'fixed', bottom: '5px', left: '23px', fontSize: '12px'}}>始祖科技版权所有
        <br></br>
        版本：V8.71</p>
      </Sider>
    </>
  )
}

export default NavBar
 