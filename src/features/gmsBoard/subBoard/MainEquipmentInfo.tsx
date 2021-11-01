import { ThunderboltOutlined } from "@ant-design/icons"
import { ReactComponent as EquipmentSVG} from '../../../assets/images/equipment.svg'
import { useHistory } from "react-router-dom"
import { useAppSelector } from "../../../hook"
import { selectEquipments } from "../../gmsBoard/realtimeSlice"
import { List } from 'antd'

export default function MainEquipmentInfo() {
  const history = useHistory()
  const allEquipments = useAppSelector(selectEquipments)

  const allEquipmentsWithRecords = allEquipments?.filter(
    equipment => equipment.status === 1
  )
  const data = allEquipmentsWithRecords?.map(equipment => {
    const length = equipment.collectors[0].records.length
    return {
      key: equipment.deviceId,
      id: equipment.deviceId, 
      name: equipment.name,
      currentAmount: equipment.collectors[0].records[length-1]?.currentAmount
    }
  })
  data.sort((a, b) => (a.currentAmount > b.currentAmount) ? -1 : 1)

  const listData = data.slice(0, 3)

  const handleClick = () => {
    history.push("/equipment-consumption")
  }
  return (
    <div onClick={handleClick} className="grow pointer">
      <div className="flex pt3 justify-around">
        <div 
          className="br-100 pa1 bg-blue flex justify-center items-center" 
          style={{width: '50px', height: '50px'}}
        >
          <ThunderboltOutlined 
            style={{ 
              fontSize: '20px', 
              color: 'white' }}
          />
        </div>
        <div>
          <h4>重点耗能设备</h4>
          <List
            itemLayout="horizontal"
            dataSource={listData}
            renderItem={(item: any) => {
              const id = item.id
              return (
                <List.Item>
                  <div>{item.name}</div>
                  <div>{item.currentAmount?.toFixed(2)}kWh</div>
                </List.Item>
              )}
            }
          />
        </div>
        <div className="flex justify-center items-center">
          <EquipmentSVG 
            style={{ height: 90, width: 90 }} 
            fill='rgb(113, 212, 212)' 
          />
        </div>
      </div>
    </div>
  )
}
