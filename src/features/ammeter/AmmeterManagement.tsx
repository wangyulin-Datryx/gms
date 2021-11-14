import React, { useState, useEffect } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Modal, Input, Form, Popconfirm, message } from 'antd'
import axios from 'axios'
import moment from 'moment'

import AddAmmeter from "./AddAmmeter"
import EditAmmeter from "./EditAmmeter"

export type AmmeterDataType = {
  id: React.Key;
  indexId?: number; 
  ammeterNo?: string;
  ammeterType?: string;
  status?: number;
  GPRSID?: string;
  transformerCoefficient?: number;
  collectedObjectType?: string;
  collectedObjectName?: string;
  collectedObjectNo?: string;
  comments?: string;
  createTime?: string;
  beginDate?: string;
  endDate?: string;
}

export default function AmmeterManagement (){
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<AmmeterDataType[]>([]);
  const [addVisible, setAddVisible] = useState<boolean>(false);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [record, setRecord] = useState<any>({})

  const showModal = () => {
    setAddVisible(true);
  }

  const handleOk = () => {
    setAddLoading(true);
    setTimeout(() => {
      setAddLoading(false);
      setAddVisible(false);
    }, 3000);
  }

  const handleCancel = () => {
    setAddVisible(false);
  }

  const handleEditOk = () => {
    setEditLoading(true);
    setTimeout(() => {
      setEditLoading(false);
      setEditVisible(false);
    }, 3000);
  }

  const handleEditCancel = () => {
    setEditVisible(false);
  }

  const confirm = async (record: any) => {
    try {
      const deleteResponse: any = await axios.post(
        `api/collector/deleteCollector?id=${record.id}`
      )
        if (deleteResponse.status == 200) {
          message.success('Click on Yes');
          setDataSource(dataSource.filter((item) => item.id !== record.id))
        }
        console.log('delete', deleteResponse)
      } catch (err) {
        console.log("Failed to delete equipment: ", err)
      }
  }

  function cancel(e:any) {
    console.log(e);
    message.error('Click on No');
  }

  const columns: ProColumns<AmmeterDataType>[] = [
    {
      title: '序号',
      dataIndex: 'indexId',
      hideInSearch: true,
      width: 50,
      fixed: 'left',
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
      title: '电表状态',
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
      title: '电表编号',
      dataIndex: 'ammeterNo',
      fixed: 'left',
      width: 100
    },
    {
      title: '电表型号',
      dataIndex: 'ammeterType',
      hideInSearch: true,
    },
    {
      title: '电表状态',
      dataIndex: 'status',
      hideInSearch: true,
      render: (text: any) => text === 1? "在线":"离线" ,
    },
    {
      title: 'GPRSID',
      dataIndex: 'GPRSID',
    },
    {
      title: '电表型号',
      dataIndex: 'ammeterType',
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
      title: '互感器型号',
      dataIndex: 'transformerCoefficient',
      width: 100
    },
    {
      title: '采集对象',
      dataIndex: 'collectedObjectName',
      hideInTable: true,
    },
    {
      title: '采集对象-类型',
      dataIndex: 'collectedObjectType',
      hideInSearch: true,
      width: 120
    },
    {
      title: '采集对象-类型',
      dataIndex: 'collectedObjectType',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        null: {text: '全部'},
        device: {
          text: '设备',
        },
        deviceGroup: {
          text: '设备群组',
        },
        line: {
          text: '产线',
        }
      }
    },
    {
      title: '采集对象-名称',
      dataIndex: 'collectedObjectName',
      hideInSearch: true,
      width: 120
    },
    {
      title: '采集对象-编号',
      dataIndex: 'collectedObjectNo',
      hideInSearch: true,
      width: 120
    },
    {
      title: '备注',
      dataIndex: 'comments',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log("record", record)
            setRecord(record)
            setEditVisible(true)
          }}
        >
          编辑
        </a>,
        <Popconfirm
          title="确认删除此设备？"
          onConfirm={() => confirm(record)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
          key="delete"
        >
          <a>
            删除
          </a>
        </Popconfirm>,
      ],
    },
  ]

  return (
    <div className="bg-white pa3">
      <EditableProTable<AmmeterDataType>
        rowKey="id"
        columns={columns}
        value={dataSource}
        onChange={setDataSource}
        scroll={{ x: 'calc(700px + 50%)'}}
        pagination={{
          pageSize: 10,
        }}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const response:any = await axios.post(
            'api/collector/searchAll', params
          )
          const data = response.data.data?.map((data:any, index: number) => {
            return {
              ...data,
              indexId: index+1
            }
          })
          console.log("ammeters", response.data.data)
          return {data, success: true}
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: true,
        }}
        recordCreatorProps={false}
        toolBarRender={() => [
          <Button 
            key="button" 
            icon={<PlusOutlined />} 
            type="primary"
            onClick={showModal}
          >
            新增
          </Button>,
          <Button key="button" type="primary">
            批量导入
          </Button>,
          <Button key="button" type="primary">
            导出
          </Button>
        ]}
      />
      <Modal
        visible={addVisible}
        title="新增"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={700}
      >
        <AddAmmeter setVisible={setAddVisible}/>
      </Modal>
      <Modal
        visible={editVisible}
        title="编辑"
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        footer={false}
        width={700}
      >
        <EditAmmeter setVisible={setEditVisible} record={record}/>
      </Modal>
    </div>
  );
};