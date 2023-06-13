import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../axios'


export const fetchAccountingByDate=createAsyncThunk('object/fetchAccountingByDate',async (params)=>{
  const {data} = await axios.post(`/api/building/${params.id}`,{"date": params.date})
  console.log("From fetch date",params)
  var result = data.accounting.find(obj => {
    return obj.date === `${params.date}T00:00:00.000Z`
  })
  return result
})

const initialState = {
  items:null,
  status:'loading'
}

export const accountingSlice = createSlice({
  name: 'accounting',
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
    [fetchAccountingByDate.pending]:(state)=>{
       state.items=null
       state.status='loading'
    },
    [fetchAccountingByDate.fulfilled]:(state,action)=>{
      state.items=action.payload
      state.status='loaded'
    },
    [fetchAccountingByDate.rejected]:(state)=>{
      state.items=null
      state.status='error'
    },
  }

})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = accountingSlice.actions

export default accountingSlice.reducer


