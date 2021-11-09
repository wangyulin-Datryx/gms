import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import axios from 'axios'
import { Button, Modal, Input, Form } from 'antd'
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import AddProductLine from './AddProductLine';
import EditProductLine from './EditProductLine';


type DataSourceType = {
  id: React.Key;
  indexId?: number;
  lineNo?: string;
  name?: string;
  groupNums?: string;
  equipNums?: number;
  comments?: string;
  createTime?:string;
}

export default function ProductLineManagement() {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');
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

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '序号',
      dataIndex: 'indexId',
      key: 'indexId',
      editable: false,
      hideInSearch: true,
    },
    {
      title: '产线名称',
      dataIndex: 'name',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:  [{ required: true, message: '此项为必填项' }] ,
        };
      },
      hideInSearch: true,
      responsive: ['md']
    },
    {
      title: '产线',
      dataIndex: 'name',
      hideInTable: true,
    },
    {
      title: '设备/群组',
      dataIndex: 'equip/group',
      hideInTable: true,
    }, 
    {
      title: '设备群组数量',
      dataIndex: 'groupNums',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return(
          <Input.Group compact>
            <Form.Item name="groupNumsMin">
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
              <Form.Item name="groupNumsMax">
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
      dataIndex: 'equipNums',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return(
          <Input.Group compact>
            <Form.Item name="equipNumsMin">
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
              <Form.Item name="equipNumsMax">
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
      dataIndex: 'groupNums',
      hideInSearch: true,
    }, 
    {
      title: '设备数量',
      dataIndex: 'equipNums',
      hideInSearch: true,
    }, 
    {
      title: '备注',
      dataIndex: 'comments',
      hideInSearch: true,
      responsive: ['xl']
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
      responsive: ['md']
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
      responsive: ['md']
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
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
        <a
          key="delete"
          onClick={async() => {
            try {
              const deleteResponse: any = await axios.post(`api/device/deleteDevice?id=${record.id}`)
              if (deleteResponse.status == 200) {
                setDataSource(dataSource.filter((item) => item.id !== record.id))
              }
              console.log('delete', deleteResponse)
            } catch (err) {
              console.log("Failed to delete equipment: ", err)
            }
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  function transferStatus(status: any) {
    if (status === '在线') {
      return '1'
    } else if (status === '离线') {
      return '0'
    }
    return null
  }

  return (
    <div className='bg-white pa3 h-100'>
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
          let status = transferStatus(params.status)
          const searchParams = {
            ...params, 
            status, 
            name: params.name?.trim() || null, 
            id: params.id?.trim() || null,
            kwh: params.kwh?.trim() || null,
            capacity: params.capacity?.trim() || null
          }
          const response:any = await axios.post('api/device/searchAll', searchParams)
          const data = response.data.data.map((data:any, index: number) => {
            return {
              ...data,
              indexId: index + 1
            }
          })
          console.log('search', params)
          console.log('searchData', response.data.data)
          return {data, success: true}
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: true,
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log('update', data)
            try {
              const response: any = await axios.post('api/device/updateDevice',data)
              if (response.status === 200) {
                console.log("update success")
              }
            } catch (err) {
              console.log('Failed to update the equipment info: ', err)
            }
          },
          onChange: setEditableRowKeys,
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
      >
        <AddProductLine setVisible={setAddVisible}/>
      </Modal>
      <Modal
        visible={editVisible}
        title="编辑"
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        footer={false}
      >
        <EditProductLine setVisible={setEditVisible} record={record}/>
      </Modal>
    </div>
  )
}


