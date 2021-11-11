import { Form, Row, Col, Button, Input, Divider } from 'antd'
import { useState } from 'react'
import SelectedItems from './SelectedItems'

import type { DataSourceType } from '../equipments/EquipmentManagement'
import type { GroupDataType } from '../equipmentsGroup/EquipGroupManagement'

const { TextArea } = Input

export default function AddProductLine({ setVisible }: any) {
  const [form] = Form.useForm()
  const [selectedEquipRowKeys, setSelctedEquipRowKeys] = useState<React.Key[]>([])
  const [selectedEquipRows, setSelectedEquipRows] = useState<DataSourceType[]>([])

  const [selectedGroupRowKeys, setSelctedGroupRowKeys] = useState<React.Key[]>([])
  const [selectedGroupRows, setSelectedGroupRows] = useState<GroupDataType[]>([])

  const selectedEquipIds = [...selectedEquipRowKeys]
  const selectedGroupIds = [...selectedGroupRowKeys]

  const onFinish = async (form: any) => {
    const addFormParams = form.getFieldsValue()
    const addLineParmas = {
      ...addFormParams, 
      deviceIds: selectedEquipIds,
      groupIds: selectedGroupIds
    }
    console.log('add values', addLineParmas)
    // setVisible(false);
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
      <Button className="mr4" type="primary" onClick={() => onFinish(form)}>
        新增
      </Button>
      <Button htmlType="button" onClick={() => setVisible(false)}>
        取消
      </Button>
    </div>
    </>
  )
}
