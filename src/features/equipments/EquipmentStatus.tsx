import { Tabs } from 'antd'
import YearStatusStatic from './YearStatusStatic'
import QuarterStatusStatic from './QuarterStatusStatic'
import MonthStatusStatic from './MonthStatusStatic'

const { TabPane } = Tabs

export default function EquipmentStatus() {
  return (
    <Tabs tabBarStyle={{marginLeft: '2rem', marginRight: '2rem'}} size='large' defaultActiveKey='年' className='pa3 bg-white'>
    <TabPane tab="年" key='年'>
      <YearStatusStatic />
    </TabPane>
    {/* <TabPane tab="季度" key="季度">
      <QuarterStatusStatic />
    </TabPane> */}
    <TabPane tab="月" key="月">
    <MonthStatusStatic />
    </TabPane>
  </Tabs>
  )
}


