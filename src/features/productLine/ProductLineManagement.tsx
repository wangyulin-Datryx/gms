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


type LineDataType = {
  id: React.Key;
  indexId?: number;
  lineNo?: string;
  lineName?: string;
  groupAmount?: number;
  minGroupAmount: number;
  maxGroupAmount: number;
  deviceAmount?: number;
  minDeviceAmount?: number;
  maxDeviceAmount?: number;
  comments?: string;
  createTime?:string;
  beginDate?: string;
  endDate?: string;
  deviceGroup?: string;
}

export default function ProductLineManagement() {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<LineDataType[]>([]);
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

  const columns: ProColumns<LineDataType>[] = [
    {
      title: '序号',
      dataIndex: 'indexId',
      key: 'indexId',
      editable: false,
      hideInSearch: true,
    },
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


