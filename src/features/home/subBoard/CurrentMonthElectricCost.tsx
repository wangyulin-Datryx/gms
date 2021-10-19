import { ThunderboltOutlined } from "@ant-design/icons"
import { ReactComponent as ElectricCostSVG } from '../../../assets/images/electricCost.svg'
import { useHistory } from "react-router-dom"

export default function CurrentMonthElectricCost() {
  const history = useHistory()
  const handleClick = () => {
    history.push("/volume-analysis-month")
  }

  return (
    <div onClick={handleClick} className="grow pointer">
      <div className="flex pt3 justify-around">
        <div 
          className="br-100 pa1 bg-blue flex justify-center items-center" 
          style={{width: '50px', height: '50px'}}>
          <ThunderboltOutlined 
            style={{ 
              fontSize: '20px', 
              color: 'white' }}
          />
        </div>
        <div>
          <h4>本月用电</h4>
          <p >{`5863.25 kWh`}</p>
          <p>{`上月同期 9.6%`}</p>
          <p>{`上月用电 5319.45 KWh`}</p>
        </div>
        <div className="flex justify-center items-center">
          <ElectricCostSVG 
            style={{ height: 80, width: 80 }} 
            fill='rgb(113, 212, 212)'  
          />
        </div>
      </div>
    </div>
  )
}