import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface WithOutsideClickProps<T> {
  onOutSideClick?: () => void
  excempt: React.RefObject<any>
}

export const withClickOutSide = <P extends object>(Wrapped: React.ComponentType<P>) => {
  return class OutsideClick extends React.PureComponent<P & WithOutsideClickProps<P>> {
    componentWillMount() {
      document.addEventListener('click', this.onClick, false)
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.onClick, false)
    }

    onClick = (e: MouseEvent) => {
      if (this.isClickOnExcempt(e)) return

      const refNode = this.getMountedOn()
      const { onOutSideClick } = this.props

      if (refNode && onOutSideClick && !refNode.contains(e.target as Node)) {
        onOutSideClick()
      }
    }

    getMountedOn() {
      return ReactDOM.findDOMNode(this) as HTMLElement
    }

    isClickOnExcempt(e: MouseEvent): boolean {
      const { excempt } = this.props
      if (!excempt || !excempt.current) return false

      const ref = ReactDOM.findDOMNode(excempt.current)
      return Boolean(ref && e.target === ref)
    }

    render() {
      return <Wrapped {...this.props} />
    }
  }
}
