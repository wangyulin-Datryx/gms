import moment from 'moment'
import { useState, useEffect } from 'react'
import type { EquipmentType, ElectricConsumption } from '../features/gmsBoard/realtimeSlice'
import axios from 'axios'

export const handleTimeChange = (data: any) => {
  if (data) {
    const time = data.split("T")[1]
    const hourAndMin = time ? time.split(":").slice(0, 2) : null
    return hourAndMin ? hourAndMin.join(":") : null
  }
}

export function getXAxisPoints(interval: number): any[] {
  let XAxisPoints: any[] = []
  let i = 1440 / interval
  let point = moment("2021-10-10T24:00")
  while (i > 0) {
    XAxisPoints.push({time: point.format('HH:mm')})
    i--
    point = point.add(interval, 'minute')
  }
  return XAxisPoints
}



export function useFetchSomeDayData(date: string) {
  const [realData, setRealData] = useState<any[]>()
  const [somedayTotal, setSomedayTotal] = useState<number>(0)
  const [requestStatus, setRequestStatus] = useState('idle')

  useEffect(() => {
    const fetchData = async (date: string) => {
      try {
        setRequestStatus('loading')
        const response: any = await axios.post('api/history/search',
        {deviceId: 0, time: date})
        setRequestStatus('succeed')
        const records = response.data.data.collectors[0].records
        const somedayRealtimeData = records?.map((record: any) => {
          return {
            time: handleTimeChange(record.time),
            somedayQuantity: record.quantity,
          }
        })
        const somedayTotalAmount = records[records.length - 1]?.currentAmount
        setRealData(somedayRealtimeData)
        setSomedayTotal(somedayTotalAmount)
      } catch (err) {
        console.log(`Failed to get ${date} data: `, err)
      } finally {
        setRequestStatus('idle')
      }
    } 
    if (requestStatus === 'idle' && date !== 'Invalid date') {
      fetchData(date)
    }
  }, [date])

  return {realData, somedayTotal, requestStatus}
}


export function useRealtimeFetch(interval: number) {
  const [todayData, setTodayData] = useState<any[]>()
  const [todayCurrent, setTodayCurrent] = useState<number>()
  const [currentTime, setCurrentTime] = useState<string>()

  const fetchData = async () => {
    try {
      const response: any = await axios.post('api/history/search',
      {deviceId: 0})
      const records = response.data.data.collectors[0].records
      const todayRealtimeData = records?.map((record: any) => {
        return {
          time: handleTimeChange(record.time),
          todayQuantity: record.quantity,
        }
      })
      const todayTotalAmount = records[records.length - 1]?.currentAmount
      const todayCurrentTime = records[records.length - 1]?.time
      setTodayData(todayRealtimeData)
      setTodayCurrent(todayTotalAmount)
      setCurrentTime(todayCurrentTime)
    } catch (err) {
      console.log(`Failed to get today data: `, err)
    } 
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    let timer = setTimeout(() => {
      fetchData()
    }, interval * 1000 * 60)
    return () => clearTimeout(timer)
  })

  return { todayData, todayCurrent, currentTime }
}