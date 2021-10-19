import { 
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit"
import axios from "axios"

import type { RootState } from "../../store"

export interface ElectricConsumption {
  quantity: number;
  time: string;
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

const equipmentsAdapter = createEntityAdapter<EquipmentType>({
  selectId: (equipment: EquipmentType) => equipment.deviceId,
})

const initialState = equipmentsAdapter.getInitialState({
  status: 'idle',
  error: ''
})

//Thunk function
export const fetchEquipments = createAsyncThunk('equipments/fetchEquipments', async () => {
  const response:any = await axios.post('http://8.130.177.91:8080/history/search',{
        deviceId: 0
    })
  return response.data.data
})

const equipmentsSlice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEquipments.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchEquipments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        equipmentsAdapter.upsertOne(state, action.payload)
      })
      .addCase(fetchEquipments.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message as string
      })
  }
})

export default equipmentsSlice.reducer
export const { 
  selectAll: selectEquipments,
  selectById: selectEquipmentById
} = equipmentsAdapter.getSelectors((state: RootState) => state.equipments)