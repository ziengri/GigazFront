

import React, { useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import './index.css'
import Header from './assets/components/Header'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import WorkersNew from './assets/screens/Workers/WorkersNew.jsx'
import Objects from './assets/screens/Objects/Objects.jsx'
import Login from './assets/screens/Login/Login.jsx'
import Accounting from './assets/screens/Accounting/Accounting.jsx'
import Storage from './assets/screens/Storage/Storage.jsx'
import StorageOptionButton from './assets/components/StorageOptionButton'
import Delivery from './assets/screens/Delivery/Delivery'
import Profile from './assets/screens/Profile/Profile'
import Admin from './assets/screens/Admin/Admin'

function App() {
    return(
    <>
    <Header/>
    <Routes >
        <Route path="/login" element={<Login/>}/>
        <Route path="/objects" element={<Objects/>}/>
        <Route path="/objects/accounting/:id" element={<Accounting/>}/>
        <Route path="/objects/storage/:id" element={<Storage/>}/>
        <Route path="/delivery" element={<Delivery/>}/>
        <Route path="/workers" element={<WorkersNew/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/but" element={<StorageOptionButton/>}/>

        {/* <Workers /> */}
    </Routes>

    </>
  
)
}
export default App



