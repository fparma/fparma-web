import * as React from 'react'
import { Icon, ICONS } from '../Icon'
import { Modal } from '../Modal'

export class Datepicker extends React.PureComponent {
  render() {
    return (
      <Modal isActive={true}>
        <Modal.Background />
        <Modal.Card>
          <Modal.CardHead>
            <Modal.CardTitle>Modal title</Modal.CardTitle>
            <Icon icon={ICONS.faCloseX} />
          </Modal.CardHead>
          <Modal.CardBody>body</Modal.CardBody>
          <Modal.CardFooter>
            <button>Cancel</button>
            <button>Save changes</button>
          </Modal.CardFooter>
        </Modal.Card>
      </Modal>
    )
  }
}
