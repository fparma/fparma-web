import { CssBaseline, NoSsr } from '@material-ui/core'
import React from 'react'
import Header from './features/header'

const App = () => (
  <NoSsr>
    <CssBaseline>
      <React.Fragment>
        <Header />
        <div style={{ height: '100%' }} />
      </React.Fragment>
    </CssBaseline>
  </NoSsr>
)

export default App
