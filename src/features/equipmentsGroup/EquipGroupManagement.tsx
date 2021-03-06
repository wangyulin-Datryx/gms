import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import axios from 'axios'
import { Button, Modal, Input, Form, Popconfirm, message } from 'antd'
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import AddGroup from './AddGroup'
import EditGroup from './EditGroup'
import DetailGroup from './DetailGroup'

export type GroupDataType = {
  id: React.Key;
  indexId?: number;
  deviceGroupName?: string;
  deviceNo?: string;
  deviceAmount?: number;
  comments?: string;
  createTime?:string;
  beginDate?: string;
  endDate?: string;
  minDeviceAmount?: number;
  maxDeviceAmount?: number;
  deviceName?: string;
}

export default function EquipGroupManagement() {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<GroupDataType[]>([]);
  const [addVisible, setAddVisible] = useState<boolean>(false);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [record, setRecord] = useState<any>({})

  const showModal = () => {
    setAddVisible(true);
  }

  const handleDetailOk = () => {
    setDetailVisible(false);
  }

  const handleDetailCancel = () => {
    setDetailVisible(false)
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
    console.log("deleteRecord", record)
    try {
      const deleteResponse: any = await axios.post(`api/deviceGroup/deleteDevice?id=${record.id}`)
      console.log('delete', deleteResponse)
        if (deleteResponse.status == 200) {
          message.success('Click on Yes');
          setDataSource(dataSource.filter((item) => item.id !== record.id))
        }
      } catch (err) {
        console.log("Failed to delete equipmentGroup: ", err)
      }
  }

  function cancel(e:any) {
    console.log(e);
    message.error('Click on No');
  }

  const columns: ProColumns<GroupDataType>[] = [
    {
      title: '??????',
      dataIndex: 'indexId',
      hideInSearch: true,
    },
    {
      title: '??????????????????',
      dataIndex: 'deviceGroupName',
      hideInSearch: true,
    },
    {
      title: '????????????',
      dataIndex: 'deviceGroupName',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return (
          <Form.Item name="deviceGroupName">
            <Input placeholder="???????????????????????????/??????"/>
          </Form.Item>
        )
      }
    },
    {
      title: '??????',
      dataIndex: 'deviceName',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return (
          <Form.Item name="deviceName">
            <Input placeholder="?????????????????????/??????"/>
          </Form.Item>
        )
      }
    },
    {
      title: '??????????????????',
      dataIndex: 'deviceNo',
      hideInSearch: true,
    },
    {
      title: '????????????',
      dataIndex: 'deviceAmount',
      sorter: true,
      hideInSearch: true,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log("record", record)
            setDetailVisible(true)
            setRecord(record)
            // setEditVisible(true)
          }}
        >
          {text}
        </a>,
      ],
    },
    {
      title: '????????????',
      dataIndex: 'deviceAmount',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return(
          <Input.Group compact>
            <Form.Item name="minDeviceAmount">
              <Input style={{ width: 120, textAlign: 'center' }} placeholder="?????????" />
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
                  placeholder="?????????"
                />
              </Form.Item>
            </Input.Group>
        )
      }
    },
    {
      title: '??????',
      dataIndex: 'comments',
      hideInSearch: true,
    },
    {
      title: '????????????',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '????????????',
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
      title: '??????',
      valueType: 'option',
      width: 100,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            
            setRecord(record)
            setEditVisible(true)
          }}
        >
          ??????
        </a>,
        <Popconfirm
          title="??????????????????????????????"
          onConfirm={() => confirm(record)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
          key="delete"
        >
        <a>
          ??????
        </a>
        </Popconfirm>,
      ],
    },
  ];

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
          // ????????????????????? params ?????????????????????????????????
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
            id: params.id?.trim() || null,
            orderByClause: sortColumn ? `${sortColumn} ${sortDirParams}` : null
          }
          console.log('searchParams', searchParams)
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
        toolBarRender={() => [
        <Button 
          key="button" 
          icon={<PlusOutlined />} 
          type="primary"
          onClick={showModal}
        >
          ??????
        </Button>,
        <Button key="button" type="primary">
          ????????????
        </Button>,
        <Button key="button" type="primary">
          ??????
        </Button>
      ]}
      />
      <Modal
        visible={addVisible}
        title="??????"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={700}
      >
        <AddGroup setVisible={setAddVisible}/>
      </Modal>
      <Modal
        visible={editVisible}
        title="??????"
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        footer={false}
        width={700}
      >
        <EditGroup setVisible={setEditVisible} record={record}/>
      </Modal>
      <Modal
        visible={detailVisible}
        title="??????????????????"
        onOk={handleDetailOk}
        onCancel={handleDetailCancel}
        footer={false}
      >
        <DetailGroup setVisible={setDetailVisible} record={record}/>
      </Modal>
    </div>
  )
}

