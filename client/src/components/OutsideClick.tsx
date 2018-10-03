import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface WithOutsideClickProps<T> {
  onOutSideClick?: () => void
}

export const withClickOutSide = <P extends object>(Wrapped: React.ComponentType<P>) => {
  return class OutsideClick extends React.Component<P & WithOutsideClickProps<P>> {
    componentWillMount() {
      document.addEventListener('mousedown', e => this.onClick(e), false)
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', e => this.onClick(e), false)
    }

    onClick(e: MouseEvent) {
      const ref = this.getChildRef()
      const { onOutSideClick } = this.props

      if (ref && onOutSideClick && !ref.contains(e.target as Node)) onOutSideClick()
    }

    getChildRef() {
      return ReactDOM.findDOMNode(this) as HTMLElement
    }

    render() {
      return <Wrapped {...this.props} />
    }
  }
}
