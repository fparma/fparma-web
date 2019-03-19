import React from 'react'
import { Container, Text, Grid } from '../../components'
import styled from 'styled-components'

const StyledItem = styled(Grid)`
  padding: 3rem 1rem;
  min-height: 150px;
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
      <Grid item xs={12} style={{ paddingTop: '4rem', paddingBottom: '8rem' }}>
        <Text.H1 align="center">Tactical rea... nah, just fun</Text.H1>
      </Grid>
      {messages.map(props => (
        <Message {...props} />
      ))}
    </Grid>
  </StyledContainer>
)

export default Home
