import * as React from 'react'

interface IFormProps {
  onSubmit: React.FormEventHandler
}

export const Form: React.SFC<IFormProps> = props => <form onSubmit={props.onSubmit}>{props.children}</form>

const defs = {
  setValue: (key: string, value: any) => {},
}

const { Consumer, Provider } = React.createContext(defs)

interface INProps {
  onSubmit: React.FormEventHandler
  defaultVaules: object
}

interface State {
  formValues: object
}

export class NewForm extends React.PureComponent<INProps, State> {
  constructor(props: INProps) {
    super(props)
    this.state = {
      formValues: props.defaultVaules,
    }
  }

  setValue = (key: string, value: any) => {
    this.setState(prevState => ({ formValues: { ...prevState.formValues, [key]: value } }))
  }

  private ctx = {
    setValue: this.setValue,
  }

  render() {
    return (
      <Provider value={this.ctx}>
        <form onSubmit={this.props.onSubmit}>{this.props.children}</form>
      </Provider>
    )
  }
}

interface WrappedProps {
  setValue?: (key: string, value: any) => void
}

export function withForm<P extends WrappedProps>(Component: React.SFC<P> | React.ComponentType<P>) {
  return function ThemedComponent(props: Pick<P, Exclude<keyof P, keyof WrappedProps>>) {
    return <Consumer>{ctx => <Component {...props} {...ctx} />}</Consumer>
  }
}
