import { Form, Row, Col, Button, Input } from 'antd'

const ammeterFieldName: any = [
  ["电表编号", 'collectorId', true], 
  ['电表型号', 'type', true], 
  ['GPRSID', 'GPRSID', true],
  ['互感器型号', 'sensor', false],
  ['设备ID', 'deviceId', true]
]

export default function AddAmmeter() {
  const [form] = Form.useForm()

  const getFields = () => {
    const children = [];
    for (let i = 0; i < 5; i++) {
      const required: boolean = ammeterFieldName[i][2]
      children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={`${ammeterFieldName[i][0]}`}
            label={`${ammeterFieldName[i][0]}`}
            rules={[
              {
                required: required,
                message: 'Input something!',
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
        </Col>,
      );
    }
    return children;
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  return (
    <div className='bg-white pa3 vh-100'>
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            新增
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
            }}
          >
            重置
          </Button>
        </Col>
      </Row>
    </Form>
    </div>
  )
}
