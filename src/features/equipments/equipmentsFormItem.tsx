import { Col, Form, Input } from 'antd'

export default function equipmentsFormItem() {
  return (
    <>
    <Col span={8} key='1'>
      <Form.Item
        name='name'
        label='设备名称'
        rules={[
          {
            required: true,
            message: 'Input something!',
          },
        ]}
      >
        <Input placeholder="" />
      </Form.Item>
    </Col>
    <Col span={8} key='2'>
      <Form.Item
        name='type'
        label='设备类型'
        rules={[
          {
            required: true,
            message: 'Input something!',
          },
        ]}
      >
        <Input placeholder="" />
      </Form.Item>
    </Col>
    <Col span={8} key='3'>
      <Form.Item
        name='info'
        label='功率'
        rules={[
          {
            required: true,
            message: 'Input something!',
          },
        ]}
      >
        <Input placeholder="" />
      </Form.Item>
    </Col>
    <Col span={8} key='4'>
      <Form.Item
        name='capacity'
        label='产能'
        rules={[
          {
            required: true,
            message: 'Input something!',
          },
        ]}
      >
        <Input placeholder="" />
      </Form.Item>
    </Col>
    <Col span={8} key='5'>
      <Form.Item
        name='comment'
        label='备注'
        rules={[
          {
            required: true,
            message: 'Input something!',
          },
        ]}
      >
        <Input placeholder="" />
      </Form.Item>
    </Col>
    </>
  )
}