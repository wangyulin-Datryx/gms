import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import axios from 'axios'
import { Button, Modal, Input, Form, Popconfirm, message } from 'antd'
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';


export type DataSourceType = {
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

export default function DetailGroup({ setVisible, record }: any) {
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '序号',
      dataIndex: 'indexId',
      key: 'indexId',
      editable: false,
      hideInSearch: true,
      width: 50,
      fixed: 'left',
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
      width: 100,
      fixed: 'left',
    },
    {
      title: '设备',
      dataIndex: 'name',
      hideInTable: true,
      renderFormItem: (schema,config,form) => {
        return (
          <Form.Item name="name">
            <Input placeholder="请输入设备名称/编号"/>
          </Form.Item>
        )
      }
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
    // {
    //   title: '额定电流(A)',
    //   dataIndex: 'ratedCurrent',
    //   hideInTable: true,
    //   renderFormItem: (schema,config,form) => {
    //     return(
    //       <Input.Group compact>
    //         <Form.Item name="minRatedCurrent">
    //           <Input style={{ width: 120, textAlign: 'center' }} placeholder="最小值" />
    //         </Form.Item>
    //           <Input
    //             className="site-input-split"
    //             style={{
    //               width: 30,
    //               borderLeft: 0,
    //               borderRight: 0,
    //               pointerEvents: 'none',
    //             }}
    //             placeholder="~"
    //             disabled
    //           />
    //           <Form.Item name="maxRatedCurrent">
    //             <Input
    //               className="site-input-right"
    //               style={{
    //                 width: 120,
    //                 textAlign: 'center',
    //               }}
    //               placeholder="最大值"
    //             />
    //           </Form.Item>
    //         </Input.Group>
    //     )
    //   }
    // },
    {
      title: '能耗(kw/h)',
      dataIndex: 'energyConsumption',
      sorter: true,
      hideInSearch: true,
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
      width: 80
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
      width: 80
    },
    {
      title: '电压正常范围(V)',
      dataIndex: 'voltageRange',
      hideInSearch: true,
      width: 80
    },
    
    {
      title: '备注',
      dataIndex: 'comments',
      hideInSearch: true,
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
  ];

  return (
    <div className='bg-white  h-100'>
      <p>
        <span className="mr4">设备群组：{record.deviceGroupName}</span>
        <span>设备群组编号：{record.deviceNo}</span>
      </p>
      <h5>组内设备列表</h5>
      <EditableProTable<DataSourceType>
        rowKey="id"
        scroll={{ x: 'calc(700px + 50%)'}}
        columns={columns}
        value={dataSource}
        onChange={setDataSource}
        pagination={{
          pageSize: 10,
        }}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log("groupRecord", record)
          const sortColumn = sorter && Object.keys(sorter)[0]
          const sortDir = sortColumn && sorter[sortColumn]
          let sortDirParams
          if (sortDir === "ascend") {
            sortDirParams = "asc"
          } else if (sortDir === "descend") {
            sortDirParams = "desc"
          }
          const searchParams = {
            // ...params, 
            // name: params.name?.trim() || null, 
            id: record.id,
            // kwh: params.kwh?.trim() || null,
            // capacity: params.capacity?.trim() || null,
            // orderByClause: sortColumn ? `${sortColumn} ${sortDirParams}` : null
          }
          console.log('detailSearch', searchParams)
          const response:any = await axios.post(
            `api/deviceGroup/searchGroupDeviceAll?id=${record.id}`
          )
          const data = response.data.data.map((data:any, index: number) => {
            return {
              ...data,
              indexId: index + 1,
              currentRange: `${data.minCurrent}~${data.maxCurrent}`,
              voltageRange: `${data.minVoltage}~${data.maxVoltage}`,
            }
          })
          console.log('DetailsearchData', response.data.data)
          return {data, success: true}
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: true,
        }}
        recordCreatorProps={false}
        toolBarRender={false}
      />
    </div>
  )
}

