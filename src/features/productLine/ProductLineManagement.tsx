import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import axios from 'axios'
import { Button, Modal, Input, Form, Popconfirm, message } from 'antd'
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import AddProductLine from './AddProductLine';
import EditProductLine from './EditProductLine';
import DetailProductLine from './DetailProductLine';


export type LineDataType = {
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
  const [dataSource, setDataSource] = useState<LineDataType[]>([]);
  const [addVisible, setAddVisible] = useState<boolean>(false);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
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

  const handleDetailOk = () => {
    setDetailVisible(false);
  }

  const handleDetailCancel = () => {
    setDetailVisible(false);
  }

  const confirm = async (record: any) => {
    console.log("id", record)
    try {
      const deleteResponse: any = await axios.post(`api/deviceProduction/deleteDevice?id=${record.id}`)
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

  const columns: ProColumns<LineDataType>[] = [
    {
      title: '??????',
      dataIndex: 'indexId',
      key: 'indexId',
      editable: false,
      hideInSearch: true,
    },
    {
      title: '????????????',
      dataIndex: 'lineName',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:  [{ required: true, message: '??????????????????' }] ,
        };
      },
      hideInSearch: true,
    },
    {
      title: '??????',
      dataIndex: 'lineName',
      hideInTable: true,
    },
    {
      title: '??????/??????',
      dataIndex: 'deviceGroup',
      hideInTable: true,
    }, 
    {
      title: '??????????????????',
      dataIndex: 'groupAmount',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return(
          <Input.Group compact>
            <Form.Item name="minGroupAmount">
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
              <Form.Item name="maxGroupAmount">
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
      title: '????????????',
      dataIndex: 'lineNo',
      key: 'lineNo',
      hideInSearch: true,
    },
    {
      title: '??????????????????',
      dataIndex: 'groupAmount',
      hideInSearch: true,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log("record", record)
            setRecord(record)
            setDetailVisible(true)
          }}
        >
          {text}
        </a>,
      ]
    }, 
    {
      title: '???????????????',
      dataIndex: 'deviceAmount',
      hideInSearch: true,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log("record", record)
            setRecord(record)
            setDetailVisible(true)
          }}
        >
          {text}
        </a>,
      ]
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
            console.log("record", record)
            setRecord(record)
            setEditVisible(true)
          }}
        >
          ??????
        </a>,
        <Popconfirm
          title="???????????????????????????"
          onConfirm={() => confirm(record)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
          key="delete"
        >
        <a>
          ??????
        </a>
        </Popconfirm>
      ],
    },
  ];

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
          // ????????????????????? params ?????????????????????????????????
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
      >
        <AddProductLine setVisible={setAddVisible}/>
      </Modal>
      <Modal
        visible={editVisible}
        title="??????"
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        footer={false}
      >
        <EditProductLine setVisible={setEditVisible} record={record}/>
      </Modal>
      <Modal
        visible={detailVisible}
        title="????????????"
        onOk={handleDetailOk}
        onCancel={handleDetailCancel}
        footer={false}
      >
        <DetailProductLine setVisible={setDetailVisible} record={record}/>
      </Modal>
    </div>
  )
}


