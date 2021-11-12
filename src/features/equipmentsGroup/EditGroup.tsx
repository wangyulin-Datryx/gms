import { Form, Row, Col, Button, Input, Divider } from 'antd'
import { useState } from 'react'
import axios from 'axios'
import EquipmentSelect from './EquipmentSelect'
import type { DataSourceType } from '../equipments/EquipmentManagement'
const { TextArea } = Input

export default function EditGroup({ setVisible, record }: any) {
  const [form] = Form.useForm()

  const [selectedRowKeys, setSelctedRowKeys] = useState<React.Key[]>([])
  const [selectedRows, setSelectedRows] = useState<DataSourceType[]>([])

  const onFinish = async (form: any) => {
    const formItems = form.getFieldsValue()
    const editParams = {
      ...formItems, 
      id: record.id
    }
    console.log('editParams', editParams)
    try {
      const response: any = await axios.post(
        'api/deviceGroup/updateDevice',
        editParams
      )
      if (response.status === 200) {
        setVisible(false);
      }
      console.log("addRes", response)
    } catch(err) {
      console.log("Failed to add group: ", err)
    }
  }
  console.log("record", record)

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
            name='deviceGroupName'
            label='设备群组名称'
            validateTrigger={["onBlur", "onChange"]}
            rules={[
              {
                validateTrigger: ["onBlur"],
                validator: async(_:any, value: string) => {
                  console.log('inputValue',value)
                  console.log('record',record.deviceGroupName)
                  if (record.deviceGroupName === value.trim()) {
                    return Promise.resolve()
                  }
                  const response: any = await axios(
                    `api/deviceGroup/selectCountByDeviceGroupName?deviceGroupName=${value}`
                  )
                  console.log('validate', response.data)
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
      <Button className="mr4" type="primary" onClick={() => onFinish(form)}>
        保存
      </Button>
      <Button htmlType="button" onClick={() => setVisible(false)}>
        取消
      </Button>
    </div>   
  </>
  )
}
