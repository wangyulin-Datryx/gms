import { useState } from 'react'
import { Tabs } from 'antd'

import EquipmentsSelect from './EquipmentsSelect'
import GroupsSelect from './GroupsSelect'
import LineSelect from './LineSelect'

import type { DataSourceType } from '../equipments/EquipmentManagement'
import type { GroupDataType } from '../equipmentsGroup/EquipGroupManagement'
import type { LineDataType } from '../productLine/ProductLineManagement'

const { TabPane } = Tabs

export default function SelectedItems({
  isClickable, setIsClickable,
  selectedEquipRowKeys, setSelctedEquipRowKeys,
  selectedEquipRows, setSelectedEquipRows,
  selectedGroupRowKeys, setSelctedGroupRowKeys,
  selectedGroupRows, setSelectedGroupRows,
  selectedLineRowKeys, setSelctedLineRowKeys,
  selectedLineRows, setSelectedLineRows
}: any) {

  const handleEquipCancelClick = (id: any) => {
    const filteredRowKeys = selectedEquipRowKeys.filter(
      (rowKey:any) => rowKey !== id)
    const filteredRows = selectedEquipRows.filter(
      (row: DataSourceType) => row.id !== id
    )
    setSelctedEquipRowKeys(filteredRowKeys)
    setSelectedEquipRows(filteredRows)
    setIsClickable(true)
  }

  const handleGroupCancelClick = (id: any) => {
    const filteredRowKeys = selectedGroupRowKeys.filter(
      (rowKey:any) => rowKey !== id)
    const filteredRows = selectedGroupRows.filter(
      (row: GroupDataType) => row.id !== id
    )
    setSelctedGroupRowKeys(filteredRowKeys)
    setSelectedGroupRows(filteredRows)
    setIsClickable(true)
  }

  const handleLineCancelClick = (id: any) => {
    const filteredRowKeys = selectedLineRowKeys.filter(
      (rowKey: any) => rowKey !== id
    )
    const filteredRows = selectedLineRows.filter(
      (row: LineDataType) => row.id !== id 
    )
    setSelctedLineRowKeys(filteredRowKeys)
    setSelectedLineRows(filteredRows)
    setIsClickable(true)
  }

  const selectedEquipCard = selectedEquipRows?.map((row: any) => (
      <p 
        key={row.id} 
        onClick={() => handleEquipCancelClick(row.id)}
        className="dim pointer mr3"
      >
        {row.name}  &#10005;
      </p>
    )
  )

  const selectedGroupCard = selectedGroupRows?.map((row: any) => (
      <p 
        key={row.id} 
        onClick={() => handleGroupCancelClick(row.id)}
        className="dim pointer mr3 "
      >
        {row.deviceGroupName}  &#10005;
      </p>
    )
  )

  const selectedLineCard = selectedLineRows?.map((row: any) => (
    <p
      key={row.id}
      onClick={() => handleLineCancelClick(row.id)}
      className="dim pointer mr3"
    >
      {row.lineName}  &#10005;
    </p>
  ))

  const selectedCard = [
    ...selectedEquipCard, 
    ...selectedGroupCard,
    ...selectedLineCard,
  ]

  return (
    <>
    <div className="flex flex-wrap pa2">
      {selectedCard}
    </div>
    <Tabs defaultActiveKey="1">
      <TabPane tab="按产线" key="1">
        <LineSelect 
          isClickable={isClickable}
          setIsClickable={setIsClickable}
          selectedLineRowKeys={selectedLineRowKeys}
          setSelctedLineRowKeys={setSelctedLineRowKeys}
          selectedLineRows={selectedLineRows}
          setSelectedLineRows={setSelectedLineRows}
        />
      </TabPane>
      <TabPane tab="按设备群组" key="2">
        <GroupsSelect 
          isClickable={isClickable}
          setIsClickable={setIsClickable}
          selectedGroupRowKeys={selectedGroupRowKeys}
          setSelctedGroupRowKeys={setSelctedGroupRowKeys}
          selectedGroupRows={selectedGroupRows}
          setSelectedGroupRows={setSelectedGroupRows}
        />
      </TabPane>
      <TabPane tab="按设备" key="3">
        <EquipmentsSelect
          isClickable={isClickable}
          setIsClickable={setIsClickable}
          selectedEquipRowKeys={selectedEquipRowKeys}
          setSelctedEquipRowKeys={setSelctedEquipRowKeys}
          selectedEquipRows={selectedEquipRows}
          setSelectedEquipRows={setSelectedEquipRows}
        />
      </TabPane> 
    </Tabs>
    </>
  )
}
