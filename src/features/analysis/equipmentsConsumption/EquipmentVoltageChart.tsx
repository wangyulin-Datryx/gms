import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import { useState, useEffect } from "react"
import axios from "axios"
import moment from 'moment'

const today = moment().format('YYYY-MM-DDTHH:mm:ss[Z]')

export default function EquipmentVoltageChart({ status, data }: any) {
  return (
    <div>
      <ResponsiveContainer width='100%' height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 0,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="time"
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dot={false} name="A相电压" type="monotone" dataKey="A" stroke="#82ca9d" />
        <Line dot={false} name="B相电压" type="monotone" dataKey="B" stroke="#c3b6e6" />
        <Line dot={false} name="C相电压" type="monotone" dataKey="C" stroke="#71d4d4" />
      </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
