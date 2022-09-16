// import { api } from 'services'
// import { configureStore } from '@reduxjs/toolkit'
//
// const isDebug = process.env.NODE_ENV !== 'production'
//
// export const store = configureStore({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//     redirect: redirectReducer,
//     modal: modalReducer,
//     navigation: navigationReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),
//   devTools: isDebug,
// })
//
// export const makeStore = () => store

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { api } from 'services'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export default store

export const makeStore = () => store

export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>
