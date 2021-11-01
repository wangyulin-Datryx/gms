import { Form, Row, Col, Button, Input } from 'antd'
import { useAppDispatch } from '../../hook'
import { addEquipment } from './equipmentsSlice'
import { useState } from 'react'
import equipmentsFormItem from './equipmentsFormItem'


const filedName: any = [['设备名称', 'name', true], ['设备类型', 'type', true], ['功率', 'info', true], ['产能', 'capacity', true], ['备注', 'comment', false]]

export default function AddAEquipment() {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canAdd = addRequestStatus === 'idle'



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
      <Row gutter={24}>
        {equipmentsFormItem}
      </Row>
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
