import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../axios'


export const fetchAuth=createAsyncThunk('auth/fetchAuth',async (params)=>{
  const {data} = await axios.post('/auth/login',params)
  return data
})
export const fetchAuthMe=createAsyncThunk('auth/fetchAuthMe',async ()=>{
  const {data} = await axios.get('/auth/me')
  return data
})


const initialState = {
  data:null,
  status:'loading'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data=null
      state.status='error'
    },
  },
  extraReducers:{
    [fetchAuth.pending]:(state)=>{
       state.data=null
       state.status='loading'
    },
    [fetchAuth.fulfilled]:(state,action)=>{
      state.data=action.payload
      state.status='loaded'
    },
    [fetchAuth.rejected]:(state)=>{
      state.items=null
      state.status='error'
    },
    [fetchAuthMe.pending]:(state)=>{
      state.data=null
      state.status='loading'
    },
    [fetchAuthMe.fulfilled]:(state,action)=>{
     state.status='loaded'
     state.data=action.payload
    },
    [fetchAuthMe.rejected]:(state)=>{
     state.data=null
     state.status='error'
    },
  }

})
// state.data=action.payload'

export const selectIsAuth = (state)=> {Boolean(state.auth.data),state.auth.status}
export const { logout } = authSlice.actions

export default authSlice.reducer


