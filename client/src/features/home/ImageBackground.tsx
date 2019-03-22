import { createStyles, Theme, withStyles } from '@material-ui/core'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Grid } from '../../components'
import { useCycleImages } from './images'

const StyledGrid = styled(Grid)`
  && {
    overflow: hidden;
    background: linear-gradient(rgba(0, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0.25) 100%);
    height: 70vw;
    min-height: 400px;
    max-height: 650px;
  }
`

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

interface Props {
  url: string
}

const Image = styled.div<Props>`
  width: 100%;
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
    <StyledGrid container justify="center" alignItems="center">
      <Image url={url} />
    </StyledGrid>
  )
}

export default ImageBackground
