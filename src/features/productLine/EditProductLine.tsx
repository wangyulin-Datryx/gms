import { Form, Row, Col, Button, Input, Divider } from 'antd'
const { TextArea } = Input

export default function EditProductLine({ setVisible, record }: any) {
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    setVisible(false);
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
            label='产线名称'
            rules={[
              {
                required: true,
                message: 'Input something!',
              },
            ]}
          >
            <Input placeholder="请输入产线名称" />
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
