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
import { useAppSelector } from "../../../hook"
import { selectEquipmentById } from "../../gmsBoard/realtimeSlice"
import axios from "axios"
import { useState, useEffect } from 'react'
import moment from 'moment'

export default function EquipmentCurrentChart({ status, data }:any) {
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
        <Line dot={false} name="A相电流" type="monotone" dataKey="A" stroke="#82ca9d" />
        <Line dot={false} name="B相电流" type="monotone" dataKey="B" stroke="#c3b6e6" />
        <Line dot={false} name="C相电流" type="monotone" dataKey="C" stroke="#71d4d4" />
      </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
