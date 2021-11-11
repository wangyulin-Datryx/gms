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
    const addParams = {...values, ids: selectedRowKeys}
    console.log('addParams', addParams)
    try {
      const response: any = await axios.post(
        'api/deviceGroup/addDeviceGroup',
        addParams
      )
      console.log("addRes", response)
    } catch(err) {
      console.log("Failed to add group: ", err)
    }
    console.log('add values', addParams)
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
            label='设备群组名称'
            // validateTrigger={["onBlur"]}
            // rules={[
            //   { 
            //     required: true,
            //     message: "请输入设备群组名称"
            //   },
            //   {
            //     validator: async(_:any, value: string) => {
            //       console.log('inputValue', value)
            //       const response: any = await axios(
            //         `api/deviceGroup/selectCountByDeviceGroupName?name=${value}`
            //       )
            //       console.log('validate', response)
            //       if (response.data.code == -1) {
            //         return Promise.reject("此名称已存在哦～")
            //       } else {
            //         return Promise.resolve()
            //       }
            //     }
            //   }
            // ]}
          >
            <Input placeholder="请输入设备群组名称" />
          </Form.Item>
        </Col>
        <Col span={24} key='9'>
          <Form.Item
            name='comments'
            label='备注'
          >
            <TextArea placeholder="请输入备注" rows={2} />
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
    <EquipmentSelect 
      selectedRowKeys={selectedRowKeys}
      setSelctedRowKeys={setSelctedRowKeys}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
    />
        
  </>
  )
}
