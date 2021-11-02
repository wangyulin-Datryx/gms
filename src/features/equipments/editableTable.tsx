import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import axios from 'axios'

type DataSourceType = {
  id: React.Key;
  deviceId?: number;
  name?: string;
  type?: string;
  status?: number;
  kwh?: number;
  capacity?: number;
  comments?: string;
}

export default function EditableTable (){
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
      title: '设备编号',
      dataIndex: 'deviceId',
      key: 'deviceId',
      editable: false,
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:  [{ required: true, message: '此项为必填项' }] ,
        };
      },
      responsive: ['md']
    },
    {
      title: '设备状态',
      key: 'status',
      dataIndex: 'status',
      render: (text: any) => text === 1? "在线":"离线" ,
      editable: false,
    },
    {
      title: '功率',
      key: 'kwh',
      dataIndex: 'kwh',
      responsive: ['md']
    },
    {
      title: '产能',
      dataIndex: 'capacity',
      responsive: ['md']
    },
    {
      title: '备注',
      dataIndex: 'comments',
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
    <>
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
          const response:any = await axios('api/device/searchAll')
          const data = response.data.data.map((device: any, index: number) => ({
            ...device,
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
    </>
  );
};