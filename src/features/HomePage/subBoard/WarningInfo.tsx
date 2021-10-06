import { Progress, Divider, Button } from "antd"
import { ThunderboltOutlined } from "@ant-design/icons"

export default function WarningInfo() {
  return (
    <>
      <div className="flex pt3 justify-around">
        <div 
          className="br-100 pa1 ba b--black-10 h3 w3 bg-blue" 
          style={{display: 'flex', justifyContent: "center", alignItems: 'center'}}>
          <ThunderboltOutlined 
            style={{ 
              fontSize: '32px', 
              color: 'white' }}
          />
        </div>
        <div>
          <h4>预警信息</h4>
          <p style={{color: 'red'}}>{`6条预警`}</p>
          <p>{`超用量`}</p>
        </div>
        <div>
          <Progress type="circle" percent={6} format={percent => `${percent} 条预警`} />
        </div>
      </div>
      <Divider></Divider>
      <div className="flex mb3 justify-around">
        <Button>详细查看</Button>
        <Button>历史预警</Button>
      </div>
    </>
  )
}
