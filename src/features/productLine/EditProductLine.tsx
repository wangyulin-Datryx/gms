import { Form, Row, Col, Button, Input, Divider } from 'antd'
import { useState } from 'react'
import axios from 'axios'
import SelectedItems from './SelectedItems'

import type { DataSourceType } from '../equipments/EquipmentManagement'
import type { GroupDataType } from '../equipmentsGroup/EquipGroupManagement'

const { TextArea } = Input

export default function EditProductLine({ setVisible, record }: any) {
  const [form] = Form.useForm()
  const [selectedEquipRowKeys, setSelctedEquipRowKeys] = useState<React.Key[]>([])
  const [selectedEquipRows, setSelectedEquipRows] = useState<DataSourceType[]>([])

  const [selectedGroupRowKeys, setSelctedGroupRowKeys] = useState<React.Key[]>([])
  const [selectedGroupRows, setSelectedGroupRows] = useState<GroupDataType[]>([])

  const selectedEquipIds = [...selectedEquipRowKeys]
  const selectedGroupIds = [...selectedGroupRowKeys]

  const onFinish = async (form: any) => {
    const formItems = form.getFieldsValue()
    const editLineParmas = {
      ...formItems, 
      id: record.id,
      deviceIds: selectedEquipIds,
      groupIds: selectedGroupIds
    }
    console.log('edit values', editLineParmas)
    try {
      const response: any = await axios.post(
        'api/deviceProduction/updateDevice',
        editLineParmas
      )
      if (response.status === 200) {
        setVisible(false);
      }
      console.log("addRes", response)
    } catch(err) {
      console.log("Failed to add group: ", err)
    }
  }

  return (
    <>
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
      initialValues={record}
    >
      <Row gutter={24}>
        <Col span={24} key='1'>
          <Form.Item
            name='lineName'
            label='产线名称'
            rules={[
              {
                required: true,
                message: '请输入产线名称',
              },
              {
                max: 12,
                message: '不能超过12个字符',
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
            <TextArea rows={2} maxLength={30} showCount/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    <h4>选择设备</h4>
    <SelectedItems 
      selectedGroupRowKeys={selectedGroupRowKeys}
      setSelctedGroupRowKeys={setSelctedGroupRowKeys}
      selectedGroupRows={selectedGroupRows}
      setSelectedGroupRows={setSelectedGroupRows}
      selectedEquipRowKeys={selectedEquipRowKeys}
      setSelctedEquipRowKeys={setSelctedEquipRowKeys}
      selectedEquipRows={selectedEquipRows}
      setSelectedEquipRows={setSelectedEquipRows}
    />
    <div className="flex justify-center">
        <Button 
          className="mr4" 
          type="primary" 
          onClick={() => onFinish(form)}
        >
          保存
        </Button>
        <Button htmlType="button" onClick={() => setVisible(false)}>
          取消
        </Button>
    </div>
    </>
  )
}
