import { Table, Button, DatePicker, Input, Select, Spin, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook'
import { selectAllAmmeters, fetchAmmeters } from './ammeterSlice'
import { useEffect } from 'react'

const { RangePicker } = DatePicker
const { Option } = Select

const columns = [
  {
    title: '电表编号',
    dataIndex: 'collectorId',
    key: 'collectorId',
  },
  {
    title: '电表型号',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'GPRSID',
    dataIndex: 'GPRSID',
    key: 'GPRSID',
  },
  {
    title: '互感器型号',
    key: 'sensor',
    dataIndex: 'sensor',
  },
  // {
  //   title: '时间',
  //   key: 'time',
  //   dataIndex: 'time',
  // },
  {
    title: '操作',
    key: 'action',
    render: (text: any, record: any) => (
      <Space size="middle">
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
    quantity: 200,
    voltage: 20
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

export default function AmmeterManagement() {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const allAmmeters = useAppSelector(selectAllAmmeters)
  const fetchStatus = useAppSelector(state => state.ammeters.status)

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchAmmeters())
    }
  }, [fetchStatus, dispatch])

  let content

  if (fetchStatus === 'loading') {
    content = <Spin />
  } else if (fetchStatus === 'succeed') {
    content = <Table columns={columns} dataSource={allAmmeters}/>
  }

  const handleAddButton = () => {
    history.push("/add-ammeter")
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
