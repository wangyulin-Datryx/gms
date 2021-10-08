import { Divider, Button } from "antd"
import { ThunderboltOutlined } from "@ant-design/icons"

export default function CurrentMonthElectricCost() {
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
          <h4>本月用电</h4>
          <p >{`5863.25 kWh`}</p>
          <p>{`上月同期 9.6%`}</p>
          <p>{`上月用电 5319.45 KWh`}</p>
        </div>
      </div>
      <Divider></Divider>
      <div className="flex mb3 justify-around">
        <Button>上月查看</Button>
        <Button>本月查看</Button>
      </div>
    </>
  )
}
