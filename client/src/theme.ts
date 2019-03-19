import { createMuiTheme } from '@material-ui/core'
import { PaletteOptions } from '@material-ui/core/styles/createPalette'
import { TypographyOptions } from '@material-ui/core/styles/createTypography'

const palette: PaletteOptions = {
  type: 'dark',
  background: {
    default: '#1c1c1c',
  },
  primary: {
    main: '#ff9895',
  },
  secondary: {
    main: '#D97FA5',
  },
}

const defaultTheme = createMuiTheme({ palette })
const {
  breakpoints,
  typography: { pxToRem },
} = defaultTheme

const typography: TypographyOptions = {
  useNextVariants: true,
  fontSize: 18,
  htmlFontSize: 10,
  fontFamily: ['Merriweather', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  h1: {
    fontSize: '4.8rem',
    [breakpoints.down('md')]: {
      fontSize: '3.6rem',
    },
  },
  h2: {
    fontSize: '3.6rem',
    [breakpoints.down('md')]: {
      fontSize: '2.8rem',
    },
  },
  h3: {
    fontSize: '2.8rem',
    [breakpoints.down('md')]: {
      fontSize: '2.2rem',
    },
  },
  h4: {
    fontSize: '2.2rem',
    [breakpoints.down('md')]: {
      fontSize: '1.8em',
    },
  },
}

export default createMuiTheme({ palette, typography })
