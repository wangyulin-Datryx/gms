import { List, Avatar, Space, Skeleton } from 'antd'

const columns = [
  {
    title: '设备',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>详情</a>
      </Space>
    ),
  },
]


export default function EquipmentsConsumptionTable({ setId }:any) {
  const data: any = [
    {key: '1', name: '快速脱水器', id: 4},
    {key: '2', name: '粉尘处理设备', id: 5},
    {key: '3', name: '吊钩抛瓦清理机1', id: 6},
    {key: '4', name: '吊钩抛瓦清理机2', id: 7},
  ]

  const handleClick = (id: number) => {
    console.log("id", id)
    setId(id)
  }

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item: any) => {
          const id = item.id
          return (
          <List.Item>
            <div>{item.name}</div>
            <div onClick={() => handleClick(id)}>详情查看</div>
          </List.Item>
        )}
      }
      />
    </div>
  )
}
