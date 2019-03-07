import React from 'react'
import './App.css'
import Header from './features/header'
import { ThemeProvider } from 'styled-components'

const theme = {
  fontSizes: [12, 14, 16, 24, 32, 48, 64],
  colors: {
    primary: 'red',
  },
  buttons: {
    primary: {
      color: 'red',
    },
  },
}

const App = () => (
  <ThemeProvider theme={theme}>
    <Header />
  </ThemeProvider>
)

export default App
