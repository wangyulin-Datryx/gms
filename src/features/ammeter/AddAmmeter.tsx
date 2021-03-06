import { Form, Row, Col, Button, Input, Divider } from 'antd'
import { useState } from 'react'
import SelectedItems from './SelectedItems'
import axios from "axios"

import type { DataSourceType } from '../equipments/EquipmentManagement'
import type { GroupDataType } from '../equipmentsGroup/EquipGroupManagement'
import type { LineDataType } from '../productLine/ProductLineManagement'

const { TextArea } = Input

export default function AddAmmeter({ setVisible }: any) {
  const [form] = Form.useForm()
  const [selectedEquipRowKeys, setSelctedEquipRowKeys] = useState<React.Key[]>([])
  const [selectedEquipRows, setSelectedEquipRows] = useState<DataSourceType[]>([])

  const [selectedGroupRowKeys, setSelctedGroupRowKeys] = useState<React.Key[]>([])
  const [selectedGroupRows, setSelectedGroupRows] = useState<GroupDataType[]>([])

  const [selectedLineRowKeys, setSelctedLineRowKeys] = useState<React.Key[]>([])
  const [selectedLineRows, setSelectedLineRows] = useState<LineDataType[]>([])

  const [isClickable, setIsClickable] = useState<boolean>(true);

  const selectedEquipIds = [...selectedEquipRowKeys]
  const selectedGroupIds = [...selectedGroupRowKeys]
  const selectedLineIds = [...selectedLineRowKeys]

  const onFinish = async (values: any) => {
    const addAmmeterParams = {
      ...values, 
      comments: values.comments ? values.comments : null,
      deviceIds: selectedEquipIds,
      groupIds: selectedGroupIds,
      lineIds: selectedLineIds,
    }
    console.log("addAmmeterParams", addAmmeterParams)
    try {
      const response: any = await axios.post(
        "api/collector/addAmmeterCollector",
        addAmmeterParams
      )
      console.log("addAmmeterRes", response)
      if (response.status === 200) {
        setVisible(false);
      }
    } catch(err) {
      console.log("Failed to add ammeters: ", err)
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
        <Col span={12} key='1'>
          <Form.Item
            name='type'
            label='????????????'
            rules={[
              {
                required: true,
                message: '?????????????????????',
              },
            ]}
          >
            <Input placeholder="?????????????????????" />
          </Form.Item>
        </Col>
        <Col span={12} key='2'>
          <Form.Item
            name='GPRSID'
            label='GPRSID'
            rules={[
              {
                required: true,
                message: '?????????GPRSID',
              },
            ]}
          >
            <Input placeholder="?????????GPRSID" />
          </Form.Item>
        </Col>
        <Col span={24} key='3'>
          <Form.Item
            name='transformerCoefficient'
            label='???????????????????????????'
            rules={[
              {
                required: true,
                message: '????????????????????????????????????',
              },
            ]}
          >
            <Input placeholder="???????????????" />
          </Form.Item>
        </Col>
        <Col span={24} key='9'>
          <Form.Item
            name='comments'
            label='??????'
          >
            <TextArea showCount maxLength={30} rows={2} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
    <h4>??????????????????</h4>
    <SelectedItems 
      isClickable={isClickable}
      setIsClickable={setIsClickable}
      selectedGroupRowKeys={selectedGroupRowKeys}
      setSelctedGroupRowKeys={setSelctedGroupRowKeys}
      selectedGroupRows={selectedGroupRows}
      setSelectedGroupRows={setSelectedGroupRows}
      selectedEquipRowKeys={selectedEquipRowKeys}
      setSelctedEquipRowKeys={setSelctedEquipRowKeys}
      selectedEquipRows={selectedEquipRows}
      setSelectedEquipRows={setSelectedEquipRows}
      selectedLineRowKeys={selectedLineRowKeys}
      setSelctedLineRowKeys={setSelctedLineRowKeys}
      selectedLineRows={selectedLineRows}
      setSelectedLineRows={setSelectedLineRows}
    />
    <div className="flex justify-center">
      <Form form={form} onFinish={onFinish}>
      <Form.Item>
      <Button 
        className="mr4" 
        type="primary" 
        htmlType="submit"
        onClick={() => onFinish(form)}
      >
        ??????
      </Button>
      <Button htmlType="button" onClick={() => setVisible(false)}>
        ??????
      </Button>
      </Form.Item>
      </Form>
    </div>
    </>
  )
}
