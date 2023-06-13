import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../axios'


export const fetchDeliveryByObject=createAsyncThunk('object/fetchDeliveryByObject',async (params)=>{
  const {data} = await axios.get(`/api/delivery/${params}`)
  console.log("From fetch delivery by obj",data)
  return data
})
export const fetchDeliveryAll=createAsyncThunk('object/fetchDeliveryAll',async ()=>{
  const {data} = await axios.get(`/api/delivery`)
  console.log("From fetch all delivery",data)
  return data
})

const initialState = {
  deliverys:null,
  status:'loading'
}

export const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers:{
    [fetchDeliveryByObject.pending]:(state)=>{
       state.deliverys=null
       state.status='loading'
    },
    [fetchDeliveryByObject.fulfilled]:(state,action)=>{
      state.deliverys=action.payload
      state.status='loaded'
    },
    [fetchDeliveryByObject.rejected]:(state)=>{
      state.deliverys=null
      state.status='error'
    },
    [fetchDeliveryAll.pending]:(state)=>{
      state.deliverys=null
      state.status='loading'
   },
   [fetchDeliveryAll.fulfilled]:(state,action)=>{
     state.deliverys=action.payload
     state.status='loaded'
   },
   [fetchDeliveryAll.rejected]:(state)=>{
     state.deliverys=null
     state.status='error'
   },
  }

})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = accountingSlice.actions

export default deliverySlice.reducer


