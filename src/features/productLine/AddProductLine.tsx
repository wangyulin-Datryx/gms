import { Form, Row, Col, Button, Input, Divider } from 'antd'
import SelectedItems from './SelectedItems'
const { TextArea } = Input

export default function AddProductLine({ setVisible }: any) {
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    console.log('add values', values)
    setVisible(false);
  }

  return (
    <>
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
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
              新增
            </Button>
            <Button htmlType="button" onClick={() => setVisible(false)}>
              取消
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    <h4>选择设备</h4>
    <SelectedItems />
    </>
  )
}
