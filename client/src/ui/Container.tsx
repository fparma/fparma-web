import * as React from 'react'

interface Props {
  as?: string
  fluid?: boolean
  children: React.ReactNode
}

export const Container = (props: Props) => {
  const As = props.as || 'div'
  return <As className={`container ${props.fluid ? 'is-fluid' : ''}`}>{props.children}</As>
}
