import { createMuiTheme } from '@material-ui/core'
import { PaletteOptions } from '@material-ui/core/styles/createPalette'
import { TypographyOptions } from '@material-ui/core/styles/createTypography'

const palette: PaletteOptions = {
  type: 'dark',
  background: {
    default: '#262728',
  },
}

const typography: TypographyOptions = {
  useNextVariants: true,
  fontSize: 16,
  htmlFontSize: 10,
  fontFamily: ['Merriweather', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  h1: {
    fontSize: '6rem',
  },
  h2: {
    fontSize: '4.2rem',
  },
  h3: {
    fontSize: '3.8rem',
  },
  h4: {
    fontSize: '3.2rem',
  },
}

export default createMuiTheme({ palette, typography })
