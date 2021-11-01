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

const today = moment().format('YYYY-MM-DDTHH:mm:ss[Z]')

export default function EquipmentCurrentChart({ status, data }:any) {
  // const [currentEquipment, setCurrentEquipment] = useState([])

  // const fetchEquipment = async () => {
  //   const response: any = await axios.post('api/device/currentSearch', {
  //     deviceId: id,
  //     time: today
  //   })
  //   console.log('current', response.data.data)
  //   setCurrentEquipment(response.data.data)
  // }

  // useEffect(() => {
  //   fetchEquipment()
  // }, [id])

  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     fetchEquipment()
  //   }, 2 * 1000 * 60);
  //   return () => clearTimeout(timer)
  // },[id])

  // const currentData = currentEquipment?.map((data: any) => {
  //   return {
  //     time: handleTimeChange(data.time),
  //     A: data.electricCurrentA,
  //     B: data.electricCurrentB,
  //     C: data.electricCurrentC,
  //   }
  // })

  // function handleTimeChange (data: any) {
  //   if (data) {
  //     const time = data.split("T")[1]
  //     const hourAndMin = time ? time.split(":").slice(0, 2) : null
  //     return hourAndMin ? hourAndMin.join(":") : null
  //   }
    
  // }
  
  return (
    <div>
      <ResponsiveContainer width='100%' height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 20,
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
