import { useState } from 'react'
import { Tabs } from 'antd'

import EquipmentsSelect from './EquipmentsSelect'
import GroupsSelect from './GroupsSelect'

import type { DataSourceType } from '../equipments/EquipmentManagement'
import type { GroupDataType } from '../equipmentsGroup/EquipGroupManagement'

const { TabPane } = Tabs

export default function SelectedItems() {
  const [selectedEquipRowKeys, setSelctedEquipRowKeys] = useState<React.Key[]>([])
  const [selectedEquipRows, setSelectedEquipRows] = useState<DataSourceType[]>([])
  const [selectedGroupRowKeys, setSelctedGroupRowKeys] = useState<React.Key[]>([])
  const [selectedGroupRows, setSelectedGroupRows] = useState<GroupDataType[]>([])

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="按设备群组" key="1">
        <GroupsSelect />
      </TabPane>
      <TabPane tab="按设备" key="2">
        <EquipmentsSelect
          selectedRowKeys={selectedEquipRowKeys}
          selectedRows={selectedGroupRows}
          setSelctedRowKeys={setSelctedGroupRowKeys}
          setSelectedRows={setSelectedGroupRows}
        />
      </TabPane>
    </Tabs>
  )
}
