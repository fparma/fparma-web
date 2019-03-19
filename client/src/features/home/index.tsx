import React from 'react'
import { Container, Text, Grid } from '../../components'
import styled from 'styled-components'

const H2 = styled(Text.H2)`
  padding-bottom: 1rem;
`

const Paragraph = styled(Text.Paragraph)`
  && {
    line-height: 2;
  }
`

const text = (title: string, message: string) => (
  <Grid item md={6}>
    <H2 align="center">{title}</H2>
    <Paragraph align="center">{message}</Paragraph>
  </Grid>
)

const StyledContainer = styled(Container)`
  padding-top: 3rem;
`

const Home = () => (
  <StyledContainer>
    <Grid container spacing={40}>
      {text(
        'FUN FIRST',
        `FPARMA has the main goal of being fun. 
        This is not a milsim group, we make it fun by sprinkling some
        arcade on realism if it makes gameplay more enjoyable.`
      )}
      {text(
        'CONTENT',
        `Each sunday is a new operation made by our many mission makers.
        Our modpack is battle-tested and tuned to our liking.`
      )}
      {text(
        'PLAYERS',
        `We take pride in having dedicated players from all over the world,
          where a majority has been with us for a long time.`
      )}
    </Grid>
  </StyledContainer>
)

export default Home
