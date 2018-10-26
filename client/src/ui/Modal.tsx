import * as React from 'react'
import { classnames } from './utils'

interface IModalProps {
  isActive?: boolean
}

interface IModalBackgroundProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

interface IModalCloseProps {
  isLarge?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ModalCard: React.SFC = ({ children }) => <div className="modal-card">{children}</div>
const ModalCardHead: React.SFC = ({ children }) => <div className="modal-card-head">{children}</div>
const ModalCardTitle: React.SFC = ({ children }) => <div className="modal-card-title">{children}</div>
const ModalCardBody: React.SFC = ({ children }) => <section className="modal-card-body">{children}</section>
const ModalCardFoot: React.SFC = ({ children }) => <div className="modal-card-foot">{children}</div>

const ModalBackground: React.SFC<IModalBackgroundProps> = ({ onClick, children }) => (
  <section onClick={onClick} className="modal-background">
    {children}
  </section>
)
const ModalContent: React.SFC = ({ children }) => <div className="modal-content">{children}</div>

const ModalClose: React.SFC<IModalCloseProps> = ({ isLarge, onClick }) => (
  <button
    aria-label="close"
    className={classnames('modal-close', {
      'is-large': isLarge,
    })}
    onClick={onClick}
  />
)

export class Modal extends React.PureComponent<IModalProps> {
  static Background = ModalBackground
  static Close = ModalClose
  static Content = ModalContent

  static Card = ModalCard
  static CardHead = ModalCardHead
  static CardTitle = ModalCardTitle
  static CardBody = ModalCardBody
  static CardFooter = ModalCardFoot

  render() {
    const { isActive } = this.props

    const className = classnames('modal', {
      'is-active': isActive,
    })

    return <div className={className}>{this.props.children}</div>
  }
}
