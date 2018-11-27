import * as React from 'react'
import { Route } from 'react-router-dom'
import { EventCreate } from 'src/features/events/create'
import { Header } from './components/Header'
import { Container } from './ui'
import { Section } from './ui/Section'

export default class App extends React.Component {
  render = () => (
    <React.Fragment>
      <Header />
      <Section>
        <Container>
          <Route exact path="/" />
          <Route exact path="/events" component={EventCreate} />
        </Container>
      </Section>
    </React.Fragment>
  )
}
