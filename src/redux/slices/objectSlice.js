import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../axios'


export const fetchObjects=createAsyncThunk('object/fetchObjects',async ()=>{
  const {data} = await axios.get('/api/building')
  return data
})

const initialState = {
  items:[],
  status:'loading'
}

export const objectSlice = createSlice({
  name: 'object',
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
    [fetchObjects.pending]:(state)=>{
       state.items=[]
       state.status='loading'
    },
    [fetchObjects.fulfilled]:(state,action)=>{
      state.items=action.payload
      state.status='loaded'
    },
    [fetchObjects.rejected]:(state)=>{
      state.items=[]
      state.status='error'
    },
  }

})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = objectSlice.actions

export default objectSlice.reducer


