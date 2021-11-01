import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit"
import axios from "axios"

import type { RootState } from '../../store'

interface Iequipment {
  deviceId: number;
  name: string;
  status: number;
  info: string;
  collectors: any[]
}

const equipmentsAdapter = createEntityAdapter<Iequipment>({
  selectId: (equipment: Iequipment) => equipment.deviceId
})

const initialState = equipmentsAdapter.getInitialState({
  status: 'idle',
  error: ''
})

//Thunk
export const fetchAllEquipments = createAsyncThunk(
  'allEquipments/fetchAllEquipments',
  async () => {
    const response:any = await axios('api/device/searchAll')
    return response.data.data
  }
)

export const addEquipment = createAsyncThunk(
  'allEquipments/addEquipment',
  async (equipment: any) => {
    const {name, type, info, capacity, comment} = equipment
    const response: any = await axios.post('api/device/addDevice', {
      name,
      type,
      info,
      capacity,
      comment
    })
    return response.data.data
  }
)

const equipmentsSlice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllEquipments.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchAllEquipments.fulfilled, (state, action) => {
        state.status = 'succeed'
        equipmentsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchAllEquipments.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error?.message as string
      })
      .addCase(addEquipment.fulfilled, equipmentsAdapter.addOne)
  }
})

export default equipmentsSlice.reducer
export const {
  selectAll: selectAllEquipments,
  selectById: selectEquipmentById
} = equipmentsAdapter.getSelectors((state: RootState) => state.equipments)
