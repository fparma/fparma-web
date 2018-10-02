import * as React from 'react'
import { Header } from './components/Header'
import { Route } from 'react-router-dom';
import Events from './features/events/Events';
import { Container } from './ui';
import { Section } from './ui/Section';

export default class App extends React.Component {
  render = () => (
    <React.Fragment>
      <Header />
      <Section>
        <Container>
          <Route exact path='/' />
          <Route exact path='/events' component={Events} />
        </Container>
      </Section>
    </React.Fragment>
  )
}
