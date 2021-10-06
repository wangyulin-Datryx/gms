import { Progress } from 'antd'

export default function DataEquipmentInfo() {
  return (
    <>
      <h1 className="f4 blue  pt3 mt2">在线情况统计</h1>
      <div className="mb3">
        <h4>采集器</h4>
        <span style={{color: "#444"}}>上线数/总数</span>
        <Progress percent={30} />
      </div>
      <div className="mb3">
        <h4>电表</h4>
        <span style={{color: "#444"}}>上线数/总数</span>
        <Progress percent={30} />
      </div>
      <div className="mb3">
        <h4>水表</h4>
        <span style={{color: "#444"}}>上线数/总数</span>
        <Progress percent={30} />
      </div>
      <div>
        <h4>气表</h4>
        <span style={{color: "#444"}}>上线数/总数</span>
        <Progress percent={30} />
      </div>
    </>
  )
}
