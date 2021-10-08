import { Progress } from 'antd'
import { useState } from 'react'

export default function DataEquipmentInfo() {
  const [totalCollector, setTotalCollector] = useState(12)
  const [onlineCollector, setOnlineCollector] = useState(6)
  const [totalElectric, setTotalElectric] = useState(15)
  const [onlineElectric, setOnlineElectric] = useState(6)
  const [totalWater, setTotalWater] = useState(15)
  const [onlineWater, setOnlineWater] = useState(6)
  const [totalGas, setTotalGas] = useState(15)
  const [onlineGas, setOnlineGas] = useState(6)

  return (
    <>
      <h1 className="f4 blue  pt3 mt2">在线情况统计</h1>
      <div className="mb3">
        <h4>采集器</h4>
        <span style={{color: "#444"}}>上线数/总数</span>
        <Progress 
          percent={onlineCollector/totalCollector*100} 
          format={percent => `${onlineCollector}/${totalCollector}`}
        />
      </div>
      <div className="mb3">
        <h4>电表</h4>
        <span style={{color: "#444"}}>上线数/总数</span>
        <Progress 
          percent={onlineElectric/totalElectric*100} 
          format={percent => `${onlineElectric}/${totalElectric}`}
        />
      </div>
      <div className="mb3">
        <h4>水表</h4>
        <span style={{color: "#444"}}>上线数/总数</span>
        <Progress 
          percent={onlineWater/totalWater*100} 
          format={percent => `${onlineWater}/${totalWater}`}
        />
      </div>
      <div>
        <h4>气表</h4>
        <span style={{color: "#444"}}>上线数/总数</span>
        <Progress 
          percent={onlineGas/totalGas*100} 
          format={percent => `${onlineGas}/${totalGas}`}
        />
      </div>
    </>
  )
}
