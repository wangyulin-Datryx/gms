import { Form, Row, Col, Button, Input, Divider } from 'antd'
import { useState } from 'react'
import SelectedItems from './SelectedItems'

import type { DataSourceType } from '../equipments/EquipmentManagement'
import type { GroupDataType } from '../equipmentsGroup/EquipGroupManagement'

const { TextArea } = Input

export default function DetailProductLine({ setVisible, record }: any) {
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
    <p className="flex flex-wrap justify-between mb4">
      <span>产线名称：{record.lineName}</span>
      <span>产线编号：{record.lineNo}</span>
      <span>设备群组数量：{record.groupAmount}</span>
      <span>设备总数量：{record.deviceAmount}</span>
    </p>
    
    <h4>产线内设备列表</h4>
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
    </>
  )
}
