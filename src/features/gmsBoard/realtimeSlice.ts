import { 
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit"
import axios from "axios"

import { handleTimeChange } from '../../app/utils'

import type { RootState } from "../../store"

export interface ElectricConsumption {
  quantity: number;
  time: string;
  currentAmount: number;
}

export interface Collector {
  collectorId: number;
  name: string;
  status: number;
  records: ElectricConsumption[]
}

export interface EquipmentType {
  deviceId: number;
  name: string;
  status: number;
  collectors: Collector[]
}

const realtimeAdapter = createEntityAdapter<EquipmentType>({
  selectId: (equipment: EquipmentType) => equipment.deviceId,
  sortComparer: (a, b) => {
    const arecords = a.collectors[0]?.records
    const brecords = b.collectors[0]?.records
    return brecords[brecords.length - 1]?.currentAmount - arecords[arecords.length - 1]?.currentAmount
  }
})

const initialState = realtimeAdapter.getInitialState({
  status: 'idle',
  error: ''
})

//Thunk function
export const fetchEquipments = createAsyncThunk('equipments/fetchEquipments', async () => {
  const response:any = await axios.post('api/history/searchAll',{
    deviceId: 0
  })
  return response.data.data
})

const realtimeSlice = createSlice({
  name: 'realtime',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEquipments.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchEquipments.fulfilled, (state, action) => {
        state.status = 'succeed'
        realtimeAdapter.setAll(state, action.payload)
      })
      .addCase(fetchEquipments.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message as string
      })
  }
})

export default realtimeSlice.reducer
export const { 
  selectAll: selectEquipments,
  selectById: selectEquipmentById
} = realtimeAdapter.getSelectors((state: RootState) => state.realtime)

