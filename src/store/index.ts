// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import calendar from '../store/apps/calendar/index'

export const store = configureStore({
  reducer: {
    calendar
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
