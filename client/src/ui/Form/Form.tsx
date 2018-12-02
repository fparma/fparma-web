import * as React from 'react'

interface IFormProps {
  onSubmit?: React.FormEventHandler
}

export const Form: React.SFC<IFormProps> = props => <form onSubmit={props.onSubmit}>{props.children}</form>
