import { Form, Row, Col, Button, Input, Divider } from 'antd'
import axios from 'axios'
const { TextArea } = Input

export default function EditEquipment({ setVisible, record }: any) {
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    const updateParams = {
      ...values,
      id: record.id
    }
    console.log("update params", updateParams)
    try {
      const response: any = await axios.post('api/device/updateDevice', updateParams)
      if (response.status == 200) {
        setVisible(false);
      }
    } catch(err) {
      console.log("Failed to update: ", err)
    } 
  }

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      initialValues={record}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={24} key='1'>
          <Form.Item
            name='name'
            label='设备名称'
            validateTrigger={["onBlur", "onChange"]}
            rules={[
              {
                validateTrigger: ["onBlur"],
                validator: async(_:any, value: string) => {
                  console.log('inputValue',value)
                  console.log('record',record)
                  if (record.name === value.trim()) {
                    return Promise.resolve()
                  }
                  const response: any = await axios(
                    `api/device/selectCountByDeviceName?name=${value}`
                  )
                  console.log('validate', response.data)
                  if (response.data.code == -1) {
                    return Promise.reject("此名称已存在哦～")
                  } else {
                    return Promise.resolve()
                  }
                }
              },
              { 
                validateTrigger: ["onChange", "onBlur"],
                required: true,
                message: "请输入设备名称"
              },
              { 
                validateTrigger: ["onChange", "onBlur"],
                max: 12,
                message: "不能超过12个字符"
              },
              
            ]}
          >
            <Input placeholder="请输入设备名称" />
          </Form.Item>
        </Col>
        <Col span={12} key='2'>
          <Form.Item
            name='kwh'
            label='功率/kw'
          >
            <Input placeholder="请输入设备的功率" />
          </Form.Item>
        </Col>
        <Col span={12} key='3'>
          <Form.Item
            name='ratedCurrent'
            label='额定电流(A)'
          >
            <Input placeholder="请输入设备额定电流" />
          </Form.Item>
        </Col>
        <Col span={12} key='4'>
          <Form.Item
            name='energyConsumption'
            label='能耗(kw/h)'
          >
            <Input placeholder="请输入设备的能耗" />
          </Form.Item>
        </Col>
        <Col span={12} key='5'>
          <Form.Item
            name='standardWorkHour'
            label='标准工时(h)'
          >
            <Input placeholder="" />
          </Form.Item>
        </Col>
        <Col span={12} key='6'>
          <Form.Item
            name='capacity'
            label='产能'
          >
            <Input placeholder="请输入设备的产能" />
          </Form.Item>
        </Col>
        <Col span={24} key='7'>
          <Form.Item
            label='电流正常范围(A)'
          >
            <Input.Group compact>
            <Form.Item name="minCurrent">
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
              <Form.Item name="minVoltage">
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
              <Form.Item name="maxVoltage">
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
        <Col span={24} key='9'>
          <Form.Item
            name='comments'
            label='备注'
          >
            <TextArea rows={2} />
          </Form.Item>
        </Col>
        <Divider />
        <Col span={24} >
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
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
