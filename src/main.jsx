import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContextProvider.jsx'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme/theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </AuthContextProvider >
)
