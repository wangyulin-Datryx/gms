import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit'
import axios from 'axios'
import type { RootState } from '../../store'

export interface IAmmeterType {
  collectorId: number,
  time: string,
  equipmentId: number
}

const ammeterAdapter = createEntityAdapter<IAmmeterType>({
  selectId: (ammeter) => ammeter?.collectorId
})

const initialState = ammeterAdapter.getInitialState({
  status: 'idle',
  error: ''
})

//Thunk
export const fetchAmmeters = createAsyncThunk('ammters/fetchAmmeters', async () => {
  const response: any = await axios('api/collector/searchAll')
  return response.data.data
})



const ammeterSlice = createSlice({
  name: 'ammeters',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAmmeters.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchAmmeters.fulfilled, (state, action) => {
        state.status = 'succeed'
        ammeterAdapter.setAll(state, action.payload)
      })
      .addCase(fetchAmmeters.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message as string
      })
  }
})

export default ammeterSlice.reducer
export const {
  selectAll: selectAllAmmeters,
  selectById: selectAmmeterById
} = ammeterAdapter.getSelectors((state: RootState) => state.ammeters)