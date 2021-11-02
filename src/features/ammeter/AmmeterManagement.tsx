import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import axios from 'axios'

type DataSourceType = {
  id: React.Key;
  collectorId?: number;
  type?: string;
  status?: number;
  GPRSID?: string;
  sensor?: string;
  equipment?: string;
  info?: string;
}

export default function AmmeterManagement (){
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      editable: false,
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '电表编号',
      dataIndex: 'collectorId',
      key: 'collectorId',
      editable: false,
    },
    {
      title: '电表型号',
      dataIndex: 'type',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:  [{ required: true, message: '此项为必填项' }] ,
        };
      },
      responsive: ['md']
    },
    {
      title: '电表状态',
      key: 'status',
      dataIndex: 'status',
      render: (text: any) => text === 1? "在线":"离线" ,
      editable: false,
    },
    {
      title: 'GPRSID',
      key: 'GPRSID',
      dataIndex: 'GPRSID',
      responsive: ['md']
    },
    {
      title: '互感器型号',
      dataIndex: 'sensor',
      responsive: ['md']
    },
    {
      title: '对应设备',
      dataIndex: 'equipment',
      valueType: 'select',
      valueEnum: {
        1: 2,
        2: 3
      }
    },
    {
      title: '备注',
      dataIndex: 'info',
      hideInSearch: true,
      responsive: ['xl']
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id))
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <div className="bg-white pa3">
      <EditableProTable<DataSourceType>
        rowKey="id"
        columns={columns}
        value={dataSource}
        onChange={setDataSource}
        pagination={{
          pageSize: 10,
        }}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const response:any = await axios('api/collector/searchAll')
          const data = response.data.data.map((ammeter: any, index: number) => ({
            ...ammeter,
            id: index
          }))
          return {data: data, success: true}
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(data);
            
          },
          onChange: setEditableRowKeys,
        }}
        maxLength={100}
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: position as 'top',
                record: () => ({ id: dataSource.length+1 }),
              }
            : false
        }
      />
    </div>
  );
};