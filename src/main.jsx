import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App.jsx'


// import { ruRU } from '@mui/x-data-grid'
// import { ruRU as pickersRuRU } from '@mui/x-date-pickers'
// import { ruRU as coreRuRU } from '@mui/material/locale'

const darkTheme = createTheme(
	{
		palette: {
			mode: 'dark'
		}
	}
	// ruRU, // x-data-grid translations
	// pickersRuRU, // x-date-pickers translations
	// coreRuRU // core translations
)
const whiteTheme = createTheme({palette: {mode: 'light'}})

ReactDOM.createRoot(document.getElementById('root')).render(
		<ThemeProvider theme={darkTheme}>
			<BrowserRouter>
				<Provider store={store}>
					<App/>
				</Provider>
			</BrowserRouter>
			<CssBaseline/>
		</ThemeProvider>
)
