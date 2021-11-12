import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import axios from 'axios'
import { Button, Modal, Input, Form, Popconfirm, message } from 'antd'
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';

import type { LineDataType } from "../productLine/ProductLineManagement"

export default function LineSelect({ 
  isClickable, setIsClickable,
  selectedLineRowKeys, setSelctedLineRowKeys,
  selectedLineRows, setSelectedLineRows
  }: any) {
  const [dataSource, setDataSource] = useState<LineDataType[]>([]);
  const [record, setRecord] = useState<any>({})

  const columns: ProColumns<LineDataType>[] = [
    // {
    //   title: '序号',
    //   dataIndex: 'indexId',
    //   key: 'indexId',
    //   editable: false,
    //   hideInSearch: true,
    // },
    {
      title: '产线名称',
      dataIndex: 'lineName',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:  [{ required: true, message: '此项为必填项' }] ,
        };
      },
      hideInSearch: true,
    },
    {
      title: '产线',
      dataIndex: 'lineName',
      hideInTable: true,
    },
    {
      title: '设备/群组',
      dataIndex: 'deviceGroup',
      hideInTable: true,
    }, 
    {
      title: '设备群组数量',
      dataIndex: 'groupAmount',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return(
          <Input.Group compact>
            <Form.Item name="minGroupAmount">
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
              <Form.Item name="maxGroupAmount">
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
      title: '设备数量',
      dataIndex: 'deviceAmount',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return(
          <Input.Group compact>
            <Form.Item name="minDeviceAmount">
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
              <Form.Item name="maxDeviceAmount">
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
      title: '产线编号',
      dataIndex: 'lineNo',
      key: 'lineNo',
      hideInSearch: true,
    },
    {
      title: '设备群组数量',
      dataIndex: 'groupAmount',
      hideInSearch: true,
    }, 
    {
      title: '设备总数量',
      dataIndex: 'deviceAmount',
      hideInSearch: true,
    }, 
    {
      title: '备注',
      dataIndex: 'comments',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
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
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      width: 100,
      render: (text, record, _, action) => {
        const isSelected = selectedLineRowKeys[0] === record.id
        return [
        <Button
          type="primary"
          key={record.id}
          onClick={() => {
            if (isClickable) {
              setSelctedLineRowKeys([record.id])
              setSelectedLineRows([record])
              setIsClickable(false)
            }
            if (!isClickable && isSelected) {
              setSelctedLineRowKeys([])
              setSelectedLineRows([])
              setIsClickable(true)
            }
          }}
        >
          { isSelected ? "取消选择" : "选择" }
        </Button>,
      ]},
    },
  ];

  const onSelectChange = 
  (selectedLineRowKeys: React.Key[], selectedLineRows: LineDataType[]) => {
    setSelctedLineRowKeys(selectedLineRowKeys)
    setSelectedLineRows(selectedLineRows)
  }

  const rowSelection = {
    selectedRowKeys: selectedLineRowKeys,
    selectedRows: selectedLineRows,
    onChange: onSelectChange,
    renderCell: () => false,
    columnTitle: " "
  }

  return (
    <div className='bg-white pa3 h-100'>
      <EditableProTable<LineDataType>
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
          }
          const response:any = await axios.post('api/deviceProduction/searchAll', searchParams)
          const data = response.data.data.map((data:any, index: number) => {
            return {
              ...data,
              indexId: index + 1
            }
          })
          console.log('search', searchParams)
          console.log('searchData', response.data.data)
          return {data, success: true}
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: true,
        }}
        recordCreatorProps={false}
        toolBarRender={false}
        tableAlertRender={false}
        rowSelection={rowSelection}
      />
    </div>
  )
}
