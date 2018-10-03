import * as React from 'react'
import { printClass } from './utils'

interface Props {
  as?: string
  fluid?: boolean
  children: React.ReactNode
}

export const Container = (props: Props) => {
  const As = props.as || 'div'
  return <As className={printClass('container', { 'is-fluid': props.fluid })}>{props.children}</As>
}
