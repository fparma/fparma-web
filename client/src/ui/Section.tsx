import * as React from 'react'

interface Props {
  children: React.ReactNode
}

export const Section = (props: Props) => {
  return <section className="section">{props.children}</section>
}
