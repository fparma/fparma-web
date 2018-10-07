import * as React from 'react'
import { printClass } from './utils'

interface IContainerProps {
  centered?: boolean
}

const Container: React.SFC<IContainerProps> = ({ centered, children }) => (
  <section className={printClass('columns', { 'is-centered': centered })}>{children}</section>
)

interface IColumnProps {
  size?: number
}

const Column: React.SFC<IColumnProps> = ({ size, children }) => {
  if (size != null && (size < 2 || size > 12)) throw new Error('Size must be value between 2-12')
  return <div className={printClass('column', { [`is-${size}`]: !!size })}>{children}</div>
}

export const Grid = {
  Container,
  Column,
}
