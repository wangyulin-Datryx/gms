import React, { useState, useEffect } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import axios from 'axios'
import moment from 'moment'

type DataSourceType = {
  id: React.Key;
  collectorId?: number;
  collectorSn?: string;
  deviceId?: number;
  deviceName?: string;
  info?: string;
  status?: number;
  name?: string;
  transformerCoefficient?: string;
}

export default function AmmeterManagement (){
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '电表编号',
      dataIndex: 'id',
      key: 'id',
      editable: false,
    },
    {
      title: '电表型号',
      dataIndex: 'info',
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
      key: 'collectorSn',
      dataIndex: 'collectorSn',
      responsive: ['md']
    },
    {
      title: '互感器型号',
      dataIndex: 'transformerCoefficient',
      responsive: ['md']
    },
    {
      title: '对应设备',
      dataIndex: 'deviceName',
      editable: false
    },
    // {
    //   title: '备注',
    //   dataIndex: 'comments',
    //   hideInSearch: true,
    //   responsive: ['xl']
    // },
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
          onClick={async() => {
            try {
              const response: any = await axios.post(
                `api/collector/deleteCollector?id=${record.id}`
              )
              if (response.status === 200) {
                setDataSource(dataSource.filter((item) => item.id !== record.id))
              }
            } catch(err) {
              console.log('Failed to delete collector: ', err)
            }
          }}
        >
          删除
        </a>,
      ],
    },
  ]

  function transferStatus(status: any) {
    if (status === '在线') {
      return '1'
    } else if (status === '离线') {
      return '0'
    }
    return null
  }

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
          const searchParams = {...params, status: transferStatus(params.status)}
          const response:any = await axios.post(
            'api/collector/searchAll', searchParams
          )
          return {data: response.data.data, success: true}
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: true,
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log("updateParams", data);
            const response:any = await axios.post(
              'api/collector/updateCollector', data
            )
          },
          onChange: setEditableRowKeys,
        }}
        recordCreatorProps={false}
        // maxLength={100}
        // recordCreatorProps={
        //   position !== 'hidden'
        //     ? {
        //         position: position as 'top',
        //         record: () => ({ indexId: dataSource.length+1 }),
        //       }
        //     : false
        // }
      />
    </div>
  );
};