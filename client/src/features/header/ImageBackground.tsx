import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Text, Grid } from '../../components'
import { Theme, createStyles, withStyles } from '@material-ui/core'

const urls = [
  'https://cdn.discordapp.com/attachments/333712698808205312/544267574943416337/Desktop_Screenshot_2019.02.10_-_21.50.52.46.png',
  'https://my.mixtape.moe/cevkaw.png',
]

const styles = (theme: Theme) =>
  createStyles({
    cover: {
      background: 'linear-gradient(rgba(0, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0.25) 100%)',
      padding: '20rem 0',

      [theme.breakpoints.up('sm')]: {
        padding: '25rem 0',
      },
      [theme.breakpoints.up('lg')]: {
        padding: '30rem 0',
      },
    },
  })

const GridContainer = withStyles(styles)(({ classes, children }: any) => (
  <Grid className={classes.cover}>{children}</Grid>
))

interface Props {
  url: string
}

const Image = styled.div<Props>`
  width: 100%;
  background-attachment: scroll;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
  background-position-y: 50%;
  background-image: url('${(props: Props) => props.url}');
  transition: background 0.2s linear;
`

const rand = (items: string[]) => items[~~(items.length * Math.random())]

const ImageBackground = () => {
  const [url, setUrl] = useState(rand(urls))

  useEffect(() => {
    const interval = setInterval(() => setUrl(rand(urls.filter(u => u != url))), 8000)
    return () => clearInterval(interval)
  })

  return (
    <Image url={url}>
      <GridContainer container direction="column" justify="center" alignItems="center">
        <Text.H1 style={{ padding: '0 3rem' }} align="center">
          Chucklefucks since 2011
        </Text.H1>
      </GridContainer>
    </Image>
  )
}

export default ImageBackground
