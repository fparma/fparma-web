import styled from 'styled-components'

const HEIGHT = '68px'

const ShadowContainer = styled.div`
  height: ${HEIGHT};
  border-bottom: 1px solid rgba(225, 255, 255, 0.4);
  border-top: 1px solid black;

  &:before {
    z-index: -5;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: ${HEIGHT};
    content: '';
    background-image: linear-gradient(to top, transparent, #000);
    opacity: 0.5;
  }
`

export default ShadowContainer