import { Progress } from "antd"
import { ThunderboltOutlined } from "@ant-design/icons"
import { useHistory } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

const today = moment().format('YYYY-MM-DDTHH:mm:ss[Z]')

export default function WarningInfo() {
  const history = useHistory()
  const [warnings, setWarnings] = useState<number>()

  useEffect(() => {
    const fetchWarnings = async () => {
      try {
        const response: any = await axios.post('api/history/countWarnings',
          {month: today}
        )
        setWarnings(response.data)
      } catch (err) {
        console.log('Failed to get wanrings: ', err)
      }
    }
    fetchWarnings()
  }, [])

  const handleClick = () => {
    history.push("/warning-info-detail")
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
          <h4>预警信息</h4>
          <p style={{color: 'red'}}>{`${warnings}条预警`}</p>
          {/* <p>{`超用量  电压不足`}</p> */}
        </div>
        <div className="flex justify-center items-center mb2">
          <Progress type="circle" percent={6} format={percent => `${percent} 条预警`} />
        </div>
      </div>
    </div>
  )
}
