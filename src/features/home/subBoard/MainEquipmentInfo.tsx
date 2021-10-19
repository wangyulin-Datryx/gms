import { ThunderboltOutlined } from "@ant-design/icons"
import { ReactComponent as EquipmentSVG} from '../../../assets/images/equipment.svg'
import { useHistory } from "react-router-dom"

export default function MainEquipmentInfo() {
  const history = useHistory()
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
          <p style={{color: 'red'}}>{`设备：T1011`}</p>
          <p>{`用电量：5863.25 kWh`}</p>
          <p>{`上月同期9.6%`}</p>
          <p>{`上月用电5319.45 kWh`}</p>
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
