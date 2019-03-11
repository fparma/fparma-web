import Typography, { TypographyProps } from '@material-ui/core/Typography'
import React from 'react'

const H1: React.SFC<TypographyProps> = ({ children, ...rest }) => <Typography {...rest}>{children}</Typography>
H1.defaultProps = { variant: 'h1' }

const H2: React.SFC<TypographyProps> = ({ children, ...rest }) => <Typography {...rest}>{children}</Typography>
H2.defaultProps = { variant: 'h2' }

const H3: React.SFC<TypographyProps> = ({ children, ...rest }) => <Typography {...rest}>{children}</Typography>
H3.defaultProps = { variant: 'h3' }

const H4: React.SFC<TypographyProps> = ({ children, ...rest }) => <Typography {...rest}>{children}</Typography>
H4.defaultProps = { variant: 'h4' }

const Span: React.SFC<TypographyProps> = ({ children, ...rest }) => <Typography {...rest}>{children}</Typography>
Span.defaultProps = { component: 'span' }

const Paragraph: React.SFC<TypographyProps> = ({ children, ...rest }) => <Typography {...rest}>{children}</Typography>

export abstract class Text {
  static H1 = H1
  static H2 = H2
  static H3 = H3
  static H4 = H4
  static Paragraph = Paragraph
  static Span = Span
}
