import { CssBaseline, NoSsr } from '@material-ui/core'
import React from 'react'
import Header from './features/header'
import { Container, Text } from './components'
import ImageBackground from './features/header/ImageBackground'

const App = () => (
  <NoSsr>
    <CssBaseline>
      <React.Fragment>
        <Header />
        <ImageBackground />
        <Container>
          <Text.H1>Who are we?</Text.H1>
        </Container>
      </React.Fragment>
    </CssBaseline>
  </NoSsr>
)

export default App
