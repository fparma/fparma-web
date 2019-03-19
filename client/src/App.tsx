import { CssBaseline, NoSsr } from '@material-ui/core'
import React from 'react'
import Header from './features/header'
import ImageBackground from './features/home/ImageBackground'
import Home from './features/home'

const App = () => (
  <NoSsr>
    <CssBaseline>
      <React.Fragment>
        <Header />
        <ImageBackground />
        <Home />
      </React.Fragment>
    </CssBaseline>
  </NoSsr>
)

export default App
