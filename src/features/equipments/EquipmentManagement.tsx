import { Table, Button, Form, DatePicker, Input, Select, Tag, Space, Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook'
import { useEffect } from 'react'
import { fetchAllEquipments, selectAllEquipments } from './equipmentsSlice'
import { EditableProTable } from '@ant-design/pro-table';
import EditableTable from './editableTable'

const { RangePicker } = DatePicker
const { Option } = Select

export default function EquipmentManagement() {

  return (
    <div className='bg-white pa3 h-100'>
      <EditableTable />
    </div>
  )
}

