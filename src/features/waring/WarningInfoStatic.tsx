import { Tabs } from 'antd'
import YearWarningStatic from './YearWarningStatic'
import QuarterWarningStatic from './QuarterWarningStatic'
import MonthWarningStatic from './MonthWarningStatic'

const { TabPane } = Tabs

export default function WarningInfoStatic() {
  return (
    <Tabs tabBarStyle={{marginLeft: '2rem', marginRight: '2rem'}} size='large' defaultActiveKey='年' className='pa3 bg-white'>
      <TabPane tab="年" key='年'>
        <YearWarningStatic />
      </TabPane>
      <TabPane tab="季度" key="季度">
        <QuarterWarningStatic />
      </TabPane>
      <TabPane tab="月" key="月">
      <MonthWarningStatic />
      </TabPane>
    </Tabs>
  )
}
