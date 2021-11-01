import { Table, Button, DatePicker, Input, Select, Tag, Space, Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook'
import { useEffect } from 'react'
import { fetchAllEquipments, selectAllEquipments } from './equipmentsSlice'

const { RangePicker } = DatePicker
const { Option } = Select

const columns = [
  {
    title: '设备编号',
    dataIndex: 'deviceId',
    key: 'deviceId',
  },
  {
    title: '设备名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '设备类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '功率',
    key: 'kwh',
    dataIndex: 'kwh',
  },
  {
    title: '产能',
    key: 'capacity',
    dataIndex: 'capacity',
  },
  {
    title: '备注',
    key: 'comments',
    dataIndex: 'comments',
  },
  {
    title: '操作',
    key: 'action',
    render: (text: any, record: any) => (
      <Space size="middle" key={text}>
        <a>修改</a>
        <a>删除</a>
      </Space>
    ),
  },
]

const data = [
  {
    key: '1',
    number: 1,
    name: "吊瓦机",
    kwh: 20
  },
  {
    key: '2',
    quantity: 200,
  },
  {
    key: '3',
    voltage: 20
  },
];

export default function EquipmentManagement() {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const allEquipmentsInfo = useAppSelector(selectAllEquipments)
  const fetchStatus = useAppSelector((state) => state.equipments.status)
  const error = useAppSelector(state => state.equipments.error)
  const tableData = allEquipmentsInfo.map(equipment => {
    return {
      ...equipment,
      key: equipment.deviceId
    }
  })

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchAllEquipments())
    }
  }, [fetchStatus, dispatch])

  let content

  if (fetchStatus === 'loading') {
    content = <Spin />
  } else if (fetchStatus === 'succeed') {
    content = <Table columns={columns} dataSource={tableData}/>
  }

  const handleAddButton = () => {
    history.push("/add-equipment")
  }
  return (
    <div className='bg-white pa3 vh-100'>
      <div className='flex justify-around mb3'>
        <Button 
          type='primary'
          onClick={handleAddButton}
        >新增数据</Button>
        <RangePicker />
        <Input style={{width: 150}}/>
        <Select defaultValue="Option1" >
          <Option value="Option1">Option1</Option>
          <Option value="Option2">Option2</Option>
      </Select>
      <Button type="primary" icon={<SearchOutlined />}>
        Search
      </Button>
      </div>
      {content}
    </div>
  )
}

