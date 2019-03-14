import GridBase, { GridProps } from '@material-ui/core/Grid'
import styled from 'styled-components'

interface Props extends GridProps {
  fullHeight?: boolean
}

export const Grid = styled(GridBase)`
  ${(props: Props) => (props.fullHeight ? 'height: 100%;' : '')}
`
