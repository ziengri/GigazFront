import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../axios'


export const fetchWorkers=createAsyncThunk('object/fetchWorkers',async ()=>{
  const {data} = await axios.get('/api/worker')

  console.log(data)
  return data
})

const initialState = {
  workers:[],
  status:'loading'
}

export const workerSlice = createSlice({
  name: 'worker',
  initialState,
  extraReducers:{
    [fetchWorkers.pending]:(state)=>{
       state.workers=[]
       state.status='loading'
    },
    [fetchWorkers.fulfilled]:(state,action)=>{
      state.workers=action.payload
      state.status='loaded'
    },
    [fetchWorkers.rejected]:(state)=>{
      state.workers=[]
      state.status='error'
    },
  }

})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = workerSlice.actions

export default workerSlice.reducer


