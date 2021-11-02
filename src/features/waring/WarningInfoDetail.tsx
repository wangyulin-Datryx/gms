import { Row, Col, List } from 'antd'
import { ReactComponent as Arrow } from '../../assets/images/arrow.svg'
import WarningTypeBar from "./WarningTypeBar"
import WarningEquipmentBar from './WarningEquipmentBar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import moment from 'moment'

const date = moment().format('YYYY-MM-DDTHH:mm:ss[Z]')

export default function WarningInfoDetail() {
  const [warningList, setWarningList] = useState<any[]>([])

  useEffect(() => {
    const fetchWarningList = async () => {
      const response: any = await axios.post('api/history/selectWarningsList', 
        {month: date}
      )
      const data = response.data.data.map((warning: any) => {
        return {
          name: warning.name,
          warningType: warning.warningsType
        }
      })
      setWarningList(data)
      console.log('warningList', data)
    }
    fetchWarningList()
  }, [])
  const ListHeader = (
    <div className='flex justify-between'>
      <div className='fw5'>
        <Arrow />
        预警信息列表
      </div>
      <div className='mr3 pl3 pr3 ba b--black-20 br2'>预警类型</div>
    </div>
  )

  return (
    <div className='bg-white pa3 ma3 h-100'>
      <h1 className='blue f3'>待处理预警</h1>
      <Row gutter={[32, 0]}>
        <Col lg={6}>
        <List
          header={ListHeader}
          itemLayout="horizontal"
          dataSource={warningList}
          renderItem={(item: any, index) => {
            const id = item.id
            return (
              <List.Item 
                key={id} 
              >
                <div><span className={`sequence sequence${index+1}`}>{index+1}</span>{item.name}</div>
                <div>{item.warningType}</div>
              </List.Item>
            )}
          }
        />
        </Col>
        <Col lg={18} xs={24}>
        <Row>
          <Col span={24} xs={24}>
            <WarningTypeBar />
          </Col>
          <Col span={12} xs={24}>
            <WarningEquipmentBar />
          </Col>
        </Row>
        </Col>
      </Row>
    </div>
  )
}
