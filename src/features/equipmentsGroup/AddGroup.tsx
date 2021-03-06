import { Form, Row, Col, Button, Input, Divider } from 'antd'
import { useState } from 'react'
import axios from 'axios'
import EquipmentSelect from './EquipmentSelect'
import type { DataSourceType } from '../equipments/EquipmentManagement'
const { TextArea } = Input

export default function AddGroup({ setVisible }: any) {
  const [form] = Form.useForm()

  const [selectedRowKeys, setSelctedRowKeys] = useState<React.Key[]>([])
  const [selectedRows, setSelectedRows] = useState<DataSourceType[]>([])

  const onFinish = async (values: any) => {
    const addParams = {...values, deviceIds: selectedRowKeys}
    console.log('addParams', addParams)
    try {
      const response: any = await axios.post(
        'api/deviceGroup/addDeviceGroup',
        addParams
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
    >
      <Row gutter={24}>
        <Col span={24} key='1'>
          <Form.Item
            name='deviceGroupName'
            label='设备群组名称'
            validateTrigger={["onBlur", "onChange"]}
            rules={[
              {
                validateTrigger: ["onBlur"],
                validator: async(_:any, value: string) => {
                  console.log('inputValue', value)
                  const response: any = await axios(
                    `api/deviceGroup/selectCountByDeviceGroupName?deviceGroupName=${value}`
                  )
                  console.log('validate', response)
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
                message: "请输入设备群组名称"
              },
              {
                validateTrigger: ["onChange", "onBlur"],
                max: 12, 
                message: "不能超过12个字符" 
              },
              
            ]}
          >
            <Input placeholder="请输入设备群组名称" />
          </Form.Item>
        </Col>
        <Col span={24} key='9'>
          <Form.Item
            name='comments'
            label='备注'
          >
            <TextArea placeholder="请输入备注" rows={2} maxLength={30} showCount />
          </Form.Item>
        </Col>
      </Row>
    </Form>
    <h4>选择设备</h4>
    <EquipmentSelect 
      selectedRowKeys={selectedRowKeys}
      setSelctedRowKeys={setSelctedRowKeys}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
    />
    <Divider />
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
