import { Form, Row, Col, Button, Input, Divider } from 'antd'
import { useState } from 'react'
import axios from "axios"

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

  const onFinish = async (values: any) => {
    // const addFormParams = form.getFieldsValue()
    const addLineParmas = {
      ...values, 
      deviceIds: selectedEquipIds,
      groupIds: selectedGroupIds
    }
    console.log('add values', addLineParmas)
    try {
      const response: any = await axios.post(
        "api/deviceProduction/addDeviceProduction",
        addLineParmas
      )
      if (response.status === 200) {
        setVisible(false)
      }
    } catch(err) {
      console.log("Failed to add Line: ", err)
    }
  }

  return (
    <>
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
    >
      <Row gutter={24}>
        <Col span={24} key='1'>
          <Form.Item
            name='lineName'
            label='产线名称'
            validateTrigger={["onBlur", "onChange"]}
            rules={[
              {
                validateTrigger: ["onBlur"],
                validator: async(_:any, value: string) => {
                  console.log('inputValue', value)
                  const response: any = await axios(
                    `api/deviceProduction/selectCountByDeviceProductionName?productionName=${value}`
                  )
                  console.log('validate', response)
                  if (response.data.code !== -1) {
                    return Promise.reject("此名称已存在哦～")
                  } else {
                    return Promise.resolve()
                  }
                }
              },
              { 
                validateTrigger: ["onChange", "onBlur"],
                required: true,
                message: "请输入产线名称"
              },
              {
                validateTrigger: ["onChange", "onBlur"],
                max: 12, 
                message: "不能超过12个字符" 
              }
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
    <Form form={form} onFinish={onFinish}>
    <Form.Item>
      <Button 
        className="mr4" 
        type="primary" 
        htmlType="submit"
      >
        新增
      </Button>
      <Button htmlType="button" onClick={() => setVisible(false)}>
        取消
      </Button>
    </Form.Item>
    </Form>
    </div>
    </>
  )
}
