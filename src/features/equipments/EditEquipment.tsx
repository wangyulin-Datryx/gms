import { Form, Row, Col, Button, Input } from 'antd'
import { useAppDispatch } from '../../hook'
import { addEquipment } from './equipmentManagementSlice'
import { useState } from 'react'


const filedName: any = [['设备名称', 'name', true], ['设备类型', 'type', true], ['功率', 'kwh', true], ['产能', 'capacity', true], ['备注', 'comment', false]]

export default function EditEquipment() {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canAdd = addRequestStatus === 'idle'

  const getFields = () => {
    const children = [];
    for (let i = 0; i < 5; i++) {
      const required: boolean = filedName[2] as boolean
      children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={`${filedName[i][1]}`}
            label={`${filedName[i][0]}`}
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

  const onFinish = async (values: any) => {
    if (canAdd) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addEquipment(values))
      } catch (error) {
        console.log('Failed to add new equipment: ', error)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

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
          <Button 
            type="primary" 
            htmlType="submit"
            disabled={!canAdd}
          >
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
