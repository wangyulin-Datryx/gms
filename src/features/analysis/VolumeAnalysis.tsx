import { Tabs } from 'antd'
import YearVolumeAanlysis from './YearVolumeAanlysis'
import MonthVolumeAnalysis from './MonthVolumeAnalysis'
import QuarteVolumeAnalysis from './QuarterVolumeAnalysis'

const { TabPane } = Tabs

export default function VolumeAnalysis() {
  return (
    <Tabs tabBarStyle={{marginLeft: '2rem', marginRight: '2rem'}} size='large' defaultActiveKey='年' className='pa3 bg-white'>
      <TabPane tab="年" key='年'>
        <YearVolumeAanlysis />
      </TabPane>
      <TabPane tab="季度" key="季度">
        <QuarteVolumeAnalysis />
      </TabPane>
      <TabPane tab="月" key="月">
      <MonthVolumeAnalysis />
      </TabPane>
    </Tabs>
    
  )
}
