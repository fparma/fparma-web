import React from 'react'
import styled from 'styled-components'
import { Container, Grid, Text } from '../../components'

const StyledItem = styled(Grid)`
  padding: 2rem 4rem;
  min-height: 150px;

  @media only screen and (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

interface Props {
  title: string
  message: string
}

const messages: Props[] = [
  {
    title: 'FUN FIRST',
    message: `FPARMA has the main goal of being fun. 
  This is not a milsim group, we endorse fun by sprinkling some
  arcade on realism if it makes gameplay more enjoyable.`,
  },
  {
    title: 'CONTENT',
    message: `We have a large dedicated community of mission makers,
    which allows us to have a fantastic variety of scenarios to play mainly every Sunday but also other days.
    `,
  },
  {
    title: 'GLOBAL',
    message: `With players from around the globe,
    you can rest assured knowing your incompetence will be globally recognized.`,
  },
  {
    title: 'OPEN',
    message: `No requirements, applications, interviews, licenses, or tests.
    Anyone is free to download our modpack, slot up and mount up for action.`,
  },
]

const Message = ({ title, message }: Props) => (
  <StyledItem item md={6}>
    <Text.H2 align="center">{title}</Text.H2>
    <Text.Paragraph align="center">{message}</Text.Paragraph>
  </StyledItem>
)

const StyledContainer = styled(Container)`
  padding-top: 3rem;
`

const Home = () => (
  <StyledContainer>
    <Grid container spacing={0}>
      <Grid item xs={12} style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <Text.H1 align="center">Facepunch origin</Text.H1>
        <Text.H3 align="center">Est. 2011</Text.H3>
      </Grid>
      {messages.map(props => (
        <Message key={props.title} {...props} />
      ))}
    </Grid>
  </StyledContainer>
)

export default Home
