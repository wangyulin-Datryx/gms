import { Progress } from "antd"
import { ThunderboltOutlined } from "@ant-design/icons"

export default function WarningInfo() {
  return (
    <>
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
          <p style={{color: 'red'}}>{`6条预警`}</p>
          <p>{`超用量  电压不足`}</p>
        </div>
        <div className="flex justify-center items-center mb2">
          <Progress type="circle" percent={6} format={percent => `${percent} 条预警`} />
        </div>
      </div>
    </>
  )
}
