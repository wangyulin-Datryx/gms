import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { Form, Input } from 'antd';
import { useState } from 'react';
import axios from 'axios';

import type { GroupDataType } from "../equipmentsGroup/EquipGroupManagement"

export default function GroupsSelect({ 
  selectedGroupRowKeys, setSelctedGroupRowKeys, 
  selectedGroupRows, setSelectedGroupRows
  }: any) {
  const [dataSource, setDataSource] = useState<GroupDataType[]>([]);

  const columns: ProColumns<GroupDataType>[] = [
    {
      title: '序号',
      dataIndex: 'indexId',
      hideInSearch: true,
      width: 50
    },
    {
      title: '设备群组名称',
      dataIndex: 'deviceGroupName',
      hideInSearch: true,
      width: 100
    },
    {
      title: '设备/群组',
      dataIndex: 'deviceGroupName',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return (
          <Form.Item name="deviceGroupName">
            <Input placeholder="请输入设备群组名称/编号"/>
          </Form.Item>
        )
      }
    },
    // {
    //   title: '设备',
    //   dataIndex: 'deviceName',
    //   hideInTable: true,
    //   renderFormItem: (schema,config,form) => {
    //     return (
    //       <Form.Item name="deviceName">
    //         <Input placeholder="请输入设备名称/编号"/>
    //       </Form.Item>
    //     )
    //   }
    // },
    {
      title: '设备群组编号',
      dataIndex: 'deviceNo',
      hideInSearch: true,
      width: 100
    },
    {
      title: '设备数量',
      dataIndex: 'deviceAmount',
      sorter: true,
      hideInSearch: true,
      width: 100
    },
    // {
    //   title: '设备数量',
    //   dataIndex: 'deviceAmount',
    //   hideInTable: true,
    //   renderFormItem: (schema,config,form) => {
    //     return(
    //       <Input.Group compact>
    //         <Form.Item name="minDeviceAmount">
    //           <Input style={{ width: 120, textAlign: 'center' }} placeholder="最小值" />
    //         </Form.Item>
    //           <Input
    //             className="site-input-split"
    //             style={{
    //               width: 30,
    //               borderLeft: 0,
    //               borderRight: 0,
    //               pointerEvents: 'none',
    //             }}
    //             placeholder="~"
    //             disabled
    //           />
    //           <Form.Item name="maxDeviceAmount">
    //             <Input
    //               className="site-input-right"
    //               style={{
    //                 width: 120,
    //                 textAlign: 'center',
    //               }}
    //               placeholder="最大值"
    //             />
    //           </Form.Item>
    //         </Input.Group>
    //     )
    //   }
    // },
    // {
    //   title: '创建时间',
    //   dataIndex: 'createTime',
    //   valueType: 'dateTime',
    //   sorter: true,
    //   hideInSearch: true,
    //   responsive: ['md']
    // },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
      transform: (value) => {
        return {
          beginDate: value[0],
          endDate: value[1],
        };
      },
    },
    },
    {
      title: '备注',
      dataIndex: 'comments',
      hideInSearch: true,
    },
  ];

  const onSelectChange = 
  (selectedGroupRowKeys: React.Key[], selectedGroupRows: GroupDataType[]) => {
    setSelctedGroupRowKeys(selectedGroupRowKeys)
    setSelectedGroupRows(selectedGroupRows)
  }

  const rowSelection = {
    selectedRowKeys: selectedGroupRowKeys,
    selectedRows: selectedGroupRows,
    onChange: onSelectChange
  }

  return (
    <div className='bg-white pa3 h-100'>
      <EditableProTable<GroupDataType>
        rowKey="id"
        columns={columns}
        value={dataSource}
        onChange={setDataSource}
        pagination={{
          pageSize: 10,
        }}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const searchParams = {
            ...params, 
            id: params.id?.trim() || null,
          }
          const response:any = await axios.post('api/deviceGroup/searchAll', searchParams)
          const data = response.data.data.map((data:any, index: number) => {
            return {
              ...data,
              indexId: index + 1
            }
          })
          console.log('search', response)
          return {data, success: true}
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: true,
        }}
        recordCreatorProps={false}
        toolBarRender={false}
        rowSelection={rowSelection}
      />
    </div>
  )
}
