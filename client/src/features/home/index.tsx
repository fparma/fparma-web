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

const messages: Props[] = [
  {
    title: 'FUN FIRST',
    message: `FPARMA has the main goal of being fun. 
  This is not a milsim group, we make it fun by sprinkling some
  arcade on realism if it makes gameplay more enjoyable.`,
  },
  {
    title: 'CONTENT',
    message: `Each sunday is a new operation made by our many mission makers.
    Our modpack is battle-tested and tuned to our liking.`,
  },
  {
    title: 'PLAYERS',
    message: `We take pride in having dedicated players from all over the world,
    where a majority has been with us for a long time.`,
  },
]

interface Props {
  title: string
  message: string
}

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
        <Text.H1 align="center">Warcrimes since 2011</Text.H1>
      </Grid>
      {messages.map(props => (
        <Message {...props} />
      ))}
    </Grid>
  </StyledContainer>
)

export default Home
