import { configureStore } from '@reduxjs/toolkit'
import objectReducer from './slices/objectSlice'
import authReducer from './slices/authSlice'
import accountingReducer from './slices/accountingSlice'
import workerReducer from './slices/workerSlice'
import deliveryReducer from './slices/deliverySlice'






const store = configureStore({
  reducer: {
    object:objectReducer,
    auth:authReducer,
    accounting:accountingReducer,
    worker:workerReducer,
    delivery:deliveryReducer

  },
})

export default store