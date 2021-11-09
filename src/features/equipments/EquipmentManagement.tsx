import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import axios from 'axios'
import { Button, Modal, Input, Form } from 'antd'
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import AddEquipment from './AddEquipment'
import EditEquipment from './EditEquipment'


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

export default function EquipmentManagement() {
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
      title: '设备名称',
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
      title: '设备',
      dataIndex: 'name',
      hideInTable: true,
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
        all: {text: '全部', status: 'Default'},
        1: {
          text: '在线',
          status: 1
        },
        0: {
          text: '离线',
          status: 0
        }
      }
    },
    {
      title: '功率',
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
      title: '额定电流(A)',
      dataIndex: 'ratedCurrent',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '额定电流(A)',
      dataIndex: 'ratedCurrent',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return(
          <Input.Group compact>
            <Form.Item name="minRatedCurrent">
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
              <Form.Item name="maxRatedCurrent">
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
      responsive: ['md']
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
      responsive: ['md']
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
      responsive: ['md']
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
      title: '电流正常范围(A)',
      dataIndex: 'currentRange',
      hideInSearch: true,
      responsive: ['md']
    },
    {
      title: '电压正常范围(V)',
      dataIndex: 'voltageRange',
      hideInSearch: true,
      responsive: ['md']
    },
    
    {
      title: '备注',
      dataIndex: 'comments',
      hideInSearch: true,
      responsive: ['xl']
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
              indexId: index + 1,
              currentRange: `${data.minCurrent}~${data.maxCurrent}`,
              voltageRange: `${data.minVoltage}~${data.maxVoltage}`,
            }
          })
          console.log('search', sorter)
          // console.log('searchData', response.data.data)
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
        <AddEquipment setVisible={setAddVisible}/>
      </Modal>
      <Modal
        visible={editVisible}
        title="编辑"
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        footer={false}
      >
        <EditEquipment setVisible={setEditVisible} record={record}/>
      </Modal>
    </div>
  )
}

