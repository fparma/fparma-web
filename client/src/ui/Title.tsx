import * as React from 'react'

interface Props {
  size?: number
  className?: string
  children: React.ReactNode
}

export const Title: React.SFC<Props> = ({ className, size = 3, children }) => {
  const As = `h${size}`
  return <As className={`title ${className} is-${size}`}>{children}</As>
}

export const SubTitle: React.SFC<Props> = ({ className, size = 5, children }) => {
  const As = `h${size}`
  return <As className={`subtitle ${className} is-${size}`}>{children}</As>
}
