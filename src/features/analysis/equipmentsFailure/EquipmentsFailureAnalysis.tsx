import { Tabs } from 'antd'
import YearAnalysis from './YearAnalysis'
import MonthAnalysis from './MonthAnalysis'

const { TabPane } = Tabs

export default function EquipmentsFailureAnalysis() {
  return (
    <Tabs tabBarStyle={{marginLeft: '2rem', marginRight: '2rem'}} size='large' defaultActiveKey='年' className='pa3 bg-white'>
      <TabPane tab="年" key='年'>
        <YearAnalysis />
      </TabPane>
      <TabPane tab="月" key="月">
      <MonthAnalysis />
      </TabPane>
    </Tabs>
    
  )
}
