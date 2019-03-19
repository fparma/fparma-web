import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Text, Grid } from '../../components'
import { Theme, createStyles, withStyles } from '@material-ui/core'
import { useCycleImages } from './images'

const styles = (theme: Theme) =>
  createStyles({
    cover: {
      overflow: 'hidden',
      background: 'linear-gradient(rgba(0, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0.25) 100%)',
      height: '70vw',
      minHeight: '300px',
      maxHeight: '600px',

      [theme.breakpoints.down('md')]: {
        height: '30vw',
      },
    },
  })

const GridContainer = withStyles(styles)(({ classes, children }: any) => (
  <Grid className={classes.cover}>{children}</Grid>
))

interface Props {
  url: string
}

const zoomEffect = keyframes`
  0% {
    transform-origin: center left;
    transform: scale(1.0); 
  }
  50% {
    transform: scale(1.1); 
  }
  100% {
    transform: scale(1.0); 
  }

`

const Image = styled.div<Props>`
  height: 100%;
  background-attachment: scroll;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
  background-position-y: 50%;
  background-image: url('${(props: Props) => props.url}');
  transition: background 0.2s linear;
  animation: ${zoomEffect} 60s ease infinite;
`

const ImageBackground = () => {
  const { url } = useCycleImages()

  return (
    <GridContainer container justify="center" alignItems="center">
      <Image url={url} />
    </GridContainer>
  )
}

export default ImageBackground
