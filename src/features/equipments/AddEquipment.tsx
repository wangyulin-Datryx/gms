import { Form, Row, Col, Button, Input, Divider, InputNumber } from 'antd'
import axios from 'axios'
const { TextArea } = Input

export default function AddEquipment({ setVisible }: any) {
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    
    const addParams = {...values, info: "test"}
    console.log('add values', addParams)
    try {
      const response: any = await axios.post('api/device/addDevice',addParams)
      if (response.status == 200) {
        setVisible(false);
      }
    } catch(err) {
      console.log("Failed to add equipment: ", err)
    }
  }

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
      initialValues={{
        minCurrent: 0,
        minVoltage: 176,
        maxVoltage: 264
      }}
    >
      <Row gutter={24}>
        <Col span={24} key='1'>
          <Form.Item
            name='name'
            label='设备名称'
            validateTrigger={["onBlur"]}
            rules={[
              { 
                required: true,
                message: "请输入设备名称"
              },
              {
                validator: async(_:any, value: string) => {
                  console.log('inputValue', value)
                  const response: any = await axios(
                    `api/device/selectCountByDeviceName?name=${value}`
                  )
                  console.log('validate', response)
                  if (response.data.code == -1) {
                    return Promise.reject("此名称已存在哦～")
                  } else {
                    return Promise.resolve()
                  }
                }
              }
            ]}
          >
            <Input placeholder="请输入设备名称" />
          </Form.Item>
        </Col>
        <Col span={12} key='2'>
          <Form.Item
            name='kwh'
            label='功率/kw'
            validateTrigger={["onChange"]}
            rules={[
              { 
                validator: (_:any, value: string) => {
                  let rgx=/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,4})?$/
                  if (value) {
                    console.log("value", value)
                    return rgx.test(value) ? 
                      Promise.resolve() : 
                      Promise.reject("请输入数字且小数点不超过4位")
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <Input placeholder="请输入设备的功率" />
          </Form.Item>
        </Col>
        <Col span={12} key='3'>
          <Form.Item
            name='ratedCurrent'
            label='额定电流(A)'
            validateTrigger={["onChange"]}
            rules={[
              { 
                validator: (_:any, value: string) => {
                  let rgx=/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,4})?$/
                  if (value) {
                    console.log("value", value)
                    return rgx.test(value) ? 
                      Promise.resolve() : 
                      Promise.reject("请输入数字且小数点不超过4位")
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <Input placeholder="请输入设备额定电流" />
          </Form.Item>
        </Col>
        <Col span={12} key='4'>
          <Form.Item
            name='energyConsumption'
            label='能耗(kw/h)'
            validateTrigger={["onChange"]}
            rules={[
              { 
                validator: (_:any, value: string) => {
                  let rgx=/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,4})?$/
                  if (value) {
                    console.log("value", value)
                    return rgx.test(value) ? 
                      Promise.resolve() : 
                      Promise.reject("请输入数字且小数点不超过4位")
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <Input placeholder="请输入设备的能耗" />
          </Form.Item>
        </Col>
        <Col span={12} key='5'>
          <Form.Item
            name='standardWorkHour'
            label='标准工时(h)'
            validateTrigger={["onChange"]}
            rules={[
              { 
                validator: (_:any, value: string) => {
                  let rgx=/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,4})?$/
                  if (value) {
                    console.log("value", value)
                    return rgx.test(value) ? 
                      Promise.resolve() : 
                      Promise.reject("请输入数字且小数点不超过4位")
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <Input placeholder="请输入标准工时" />
          </Form.Item>
        </Col>
        <Col span={12} key='6'>
          <Form.Item
            name='capacity'
            label='产能'
            rules={[{max: 12, message: "不能超过12个字符" }]}
          >
            <Input placeholder="请输入设备的产能" />
          </Form.Item>
        </Col>
        <Col span={24} key='7'>
          <Form.Item
            label='电流正常范围(A)'
          >
            <Input.Group compact>
              <Form.Item
                name='minCurrent'
              >
                <Input style={{ width: 100, textAlign: 'center' }} placeholder="最小值" />
              </Form.Item>
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: 'none',
                }}
                placeholder="~"
                disabled
              />
              <Form.Item name="maxCurrent">
                <Input
                  className="site-input-right"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                  placeholder="最大值"
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col span={24} key='8'>
          <Form.Item
            label='电压正常范围(V)'
          >
            <Input.Group compact>
              <Form.Item 
                name="minVoltage"
              >
                <InputNumber 
                  style={{ width: 100, textAlign: 'center' }} 
                  placeholder="最小值" 
                  min={176}
                  max={264}
                />
              </Form.Item>
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: 'none',
                }}
                placeholder="~"
                disabled
              />
              <Form.Item name="maxVoltage">
                <InputNumber
                  className="site-input-right"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                  placeholder="最大值"
                  min={176}
                  max={264}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col span={24} key='9'>
          <Form.Item
            name='comments'
            label='备注'
          >
            <TextArea rows={2} showCount maxLength={30}/>
          </Form.Item>
        </Col>
        <Divider />
        <Col span={24} >
          <Form.Item>
            <Button type="primary" htmlType="submit">
              新增
            </Button>
            <Button htmlType="button" onClick={() => setVisible(false)}>
              取消
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
