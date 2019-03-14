import React from 'react'
import styled from 'styled-components'
import { Container, Text, Grid } from '../../components'

const urls = [
  'https://cdn.discordapp.com/attachments/333712698808205312/429724962882977813/107410_20180331213023_1.png',
]

const Hello = styled(Grid)`
  padding: 200px 0;
  background: linear-gradient(rgba(0, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0.25) 100%);
`

const Image = styled.div`
  width: 100%;
  background: #fff;
  background-attachment: scroll;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
  background-position-y: 50%;
  background-image: url('https://cdn.discordapp.com/attachments/333712698808205312/544267574943416337/Desktop_Screenshot_2019.02.10_-_21.50.52.46.png');
`

const ImageBackground = () => (
  <Image>
    <Hello container direction="column" justify="center" alignItems="center">
      <Text.H1>Facepunch ARMA</Text.H1>
      <Text.H3 style={{ paddingTop: 20 }}>Chucklefucks since 2011</Text.H3>
    </Hello>
  </Image>
)

export default ImageBackground
