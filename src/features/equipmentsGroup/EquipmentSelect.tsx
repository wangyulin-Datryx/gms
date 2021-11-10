import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import axios from 'axios'
import { Button, Modal, Input, Form, Popconfirm, message } from 'antd'
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';


type DataSourceType = {
  id: React.Key;
  indexId?: number;
  deviceNo?: string;
  name?: string;
  info?: string;
  status?: number;
  kwh?: string;
  minKwh?: string;
  maxKwh?: string;
  ratedCurrent?: number;
  minRatedCurrent?: number;
  maxRatedCurrent?: number;
  capacity?: string;
  minCapacity?: string;
  maxCapacity?: string;
  comments?: string;
  energyConsumption?:string;
  minEnergyConsumption?: string;
  maxEnergyConsumption?: string;
  standardWorkHour?: number;
  minStandardWorkHour?: number;
  maxStandardWorkHour?: number;
  createDt?:string;
  beginDate?: string;
  endDate?: string;
  createBy?: string;
  updateDt?: string;
  updateBy?: string;
  maxCurrent?: number;
  minCurrent?: number;
  maxVoltage?: number;
  minVoltage?: number;
}

export default function EquipmentSelect({ 
  selectedRowKeys, setSelctedRowKeys, selectedRows, setSelectedRows
  }: any) {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [record, setRecord] = useState<any>({})

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '设备名称',
      dataIndex: 'name',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:  [{ required: true, message: '此项为必填项' }] ,
        };
      },
      hideInSearch: true,
      width: 100,
      fixed: 'left',
    },
    {
      title: '设备',
      dataIndex: 'name',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return (
          <Form.Item name="name">
            <Input placeholder="请输入设备名称/编号"/>
          </Form.Item>
        )
      }
    },
    {
      title: '设备编号',
      dataIndex: 'deviceNo',
      hideInSearch: true,
    },
    {
      title: '设备状态',
      dataIndex: 'status',
      hideInSearch: true,
      render: (text: any) => text === 1? "在线":"离线" ,
    },
    {
      title: '设备状态',
      dataIndex: 'status',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        null: {text: '全部'},
        1: {
          text: '在线',
        },
        0: {
          text: '离线',
        }
      }
    },
    {
      title: '功率/kw',
      dataIndex: 'kwh',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '功率',
      dataIndex: 'kwh',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return(
          <Input.Group compact>
            <Form.Item name="minKwh">
              <Input style={{ width: 120, textAlign: 'center' }} placeholder="最小值" />
            </Form.Item>
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: 'none',
                }}
                placeholder="~"
                disabled
              />
              <Form.Item name="maxKwh">
                <Input
                  className="site-input-right"
                  style={{
                    width: 120,
                    textAlign: 'center',
                  }}
                  placeholder="最大值"
                />
              </Form.Item>
            </Input.Group>
        )
      }
    },
    {
      title: '能耗(kw/h)',
      dataIndex: 'energyConsumption',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '能耗(kw/h)',
      dataIndex: 'energyConsumption',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return(
          <Input.Group compact>
            <Form.Item name="minEnergyConsumption">
              <Input style={{ width: 120, textAlign: 'center' }} placeholder="最小值" />
            </Form.Item>
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: 'none',
                }}
                placeholder="~"
                disabled
              />
              <Form.Item name="maxEnergyConsumption">
                <Input
                  className="site-input-right"
                  style={{
                    width: 120,
                    textAlign: 'center',
                  }}
                  placeholder="最大值"
                />
              </Form.Item>
            </Input.Group>
        )
      }
    },
    {
      title: '标准工时(h)',
      dataIndex: 'standardWorkHour',
      sorter: true,
      hideInSearch: true,
      width: 80
    },
    {
      title: '标准工时(h)',
      dataIndex: 'standardWorkHour',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return(
          <Input.Group compact>
            <Form.Item name="minStandardWorkHour">
              <Input style={{ width: 120, textAlign: 'center' }} placeholder="最小值" />
            </Form.Item>
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: 'none',
                }}
                placeholder="~"
                disabled
              />
              <Form.Item name="maxStandardWorkHour">
                <Input
                  className="site-input-right"
                  style={{
                    width: 120,
                    textAlign: 'center',
                  }}
                  placeholder="最大值"
                />
              </Form.Item>
            </Input.Group>
        )
      }
    },
    {
      title: '产能',
      dataIndex: 'capacity',
      hideInSearch: true,
    },
    {
      title: '产能',
      dataIndex: 'capacity',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return(
          <Input.Group compact>
            <Form.Item name="minCapacity">
              <Input style={{ width: 120, textAlign: 'center' }} placeholder="最小值" />
            </Form.Item>
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: 'none',
                }}
                placeholder="~"
                disabled
              />
              <Form.Item name="maxCapacity">
                <Input
                  className="site-input-right"
                  style={{
                    width: 120,
                    textAlign: 'center',
                  }}
                  placeholder="最大值"
                />
              </Form.Item>
            </Input.Group>
        )
      }
    },
    {
      title: '备注',
      dataIndex: 'comments',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createDt',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createDt',
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
  ];

  const onSelectChange = 
  (selectedRowKeys: React.Key[], selectedRows: DataSourceType[]) => {
    setSelctedRowKeys(selectedRowKeys)
    setSelectedRows(selectedRows)
  }

  const handleCancelClick = (id: any) => {
    const filteredRowKeys = selectedRowKeys.filter(
      (rowKey:any) => rowKey !== id)
    const filteredRows = selectedRows.filter(
      (row: DataSourceType) => row.id !== id
    )
    setSelctedRowKeys(filteredRowKeys)
    setSelectedRows(filteredRows)
  }

  const rowSelection = {
    selectedRowKeys,
    selectedRows,
    onChange: onSelectChange
  }

  return (
    <div className='bg-white pa3 h-100'>
      <EditableProTable<DataSourceType>
        rowKey="id"
        scroll={{ x: 'calc(700px + 50%)'}}
        columns={columns}
        value={dataSource}
        onChange={setDataSource}
        pagination={{
          pageSize: 10,
        }}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const sortColumn = sorter && Object.keys(sorter)[0]
          const sortDir = sortColumn && sorter[sortColumn]
          let sortDirParams
          if (sortDir === "ascend") {
            sortDirParams = "asc"
          } else if (sortDir === "descend") {
            sortDirParams = "desc"
          }
          const searchParams = {
            ...params, 
            name: params.name?.trim() || null, 
            id: params.id?.trim() || null,
            kwh: params.kwh?.trim() || null,
            capacity: params.capacity?.trim() || null,
            orderByClause: sortColumn ? `${sortColumn} ${sortDirParams}` : null
          }
          const response:any = await axios.post('api/device/searchAll', searchParams)
          const data = response.data.data.map((data:any, index: number) => {
            return {
              ...data,
              indexId: index + 1,
              currentRange: `${data.minCurrent}~${data.maxCurrent}`,
              voltageRange: `${data.minVoltage}~${data.maxVoltage}`,
            }
          })
          console.log('search', searchParams)
          // console.log('searchData', response.data.data)
          return {data, success: true}
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: true,
        }}
        recordCreatorProps={false}
        rowSelection={rowSelection}
        toolBarRender={false}
        tableAlertRender={
          ({onCleanSelected}) => {
            const selectedCard = selectedRows?.map((row: any) => (
                <>
                <p 
                  key={row.id} 
                  onClick={() => handleCancelClick(row.id)}
                  className="dim pointer mr3"
                >
                  {row.name}  &#10005;
                </p>
                </>
              )
            )
            return (
              <div className="flex flex-wrap">
                {selectedCard}
              </div>
            )
          }}
      />
    </div>
  )
}
