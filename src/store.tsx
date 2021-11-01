import { configureStore } from "@reduxjs/toolkit"

import realtimeReducer from './features/gmsBoard/realtimeSlice'
import ammetersReducer from './features/ammeter/ammeterSlice'
import equipmentsReducer from './features/equipments/equipmentsSlice'

const store = configureStore({
  reducer: {
    realtime: realtimeReducer,
    ammeters: ammetersReducer,
    equipments: equipmentsReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch