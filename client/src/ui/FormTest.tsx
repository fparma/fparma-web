import * as React from 'react'

const { Consumer, Provider } = React.createContext({})

interface IProps<P> {
  defaultValues: P,
  onSubmit: React.FormEventHandler,
}

class Form<T> extends React.PureComponent<IProps<T>, { values: T, update: Function }> {
  constructor(props: IProps<T>) {
    super(props)

    this.state = {
      values: Object.assign({}, props.defaultValues),
      update: this.updateValue.bind(this)
    }
  }

  updateValue(key: string, value: any) {
    this.setState((prevState) => {
      if (prevState[key] === value) return null
      return {
        values: Object.assign({}, prevState.values, { [key]: value })
      }
    })
  }

  render() {
    const { onSubmit, children } = this.props
    return <Provider value={this.state}>
      <form onSubmit={onSubmit}>{children}</form>
    </Provider>
  }
}


export { Form, Consumer }
