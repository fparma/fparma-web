import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  display: flex;
`

interface Props {
  url: string
}

const Image = styled.div`
  background-image: ${({ url }: Props) => `url('${url}');`}
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
  width: 100%;
`

export class BackgroundImage extends React.PureComponent<Props> {
  render() {
    const { url } = this.props
    if (!url) return null

    return (
      <Container>
        <Image url={url} />
      </Container>
    )
  }
}
