import { ThunderboltOutlined } from "@ant-design/icons"
import { ReactComponent as ElectricCostSVG } from '../../../assets/images/electricCost.svg'
import { useHistory } from "react-router-dom"
import { useState, useEffect } from 'react'
import moment from 'moment'
import axios from "axios"

export default function CurrentMonthElectricCost() {
  const history = useHistory()
  const [currentMonthData, setCurrentMonthData] = useState<number>()
  const [lastMonthData, setLastMonthData] = useState<number>()

  useEffect(() => {
    const currentMondth = moment().format('YYYY-MM-DDTHH:mm:ss[Z]')
    const lastMonth = moment().subtract(1, 'month').format('YYYY-MM-DDTHH:mm:ss[Z]')
    const fetchData = async () => {
      try {
        const currentMonthRes: any = await axios.post(
          "api/history/monthSum",
          {month: currentMondth}
        )
        const lastMonthRes: any = await axios.post(
          "api/history/monthSum",
          {month: lastMonth}
        )
        setCurrentMonthData(currentMonthRes.data.data)
        setLastMonthData(lastMonthRes.data.data)
      } catch(error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handleClick = () => {
    history.push("/volume-analysis")
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
          <p >{`${currentMonthData?.toFixed(2)} kW`}</p>
          <p>{`上月用电 ${lastMonthData} kW`}</p>
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
