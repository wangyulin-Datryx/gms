import { configureStore } from "@reduxjs/toolkit"

import equipmentsReducer from './features/equipments/equipmentsSlice'

const store = configureStore({
  reducer: {
    equipments: equipmentsReducer,
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch