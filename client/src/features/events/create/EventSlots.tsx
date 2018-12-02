import { IconProp } from '@fortawesome/fontawesome-svg-core'
import * as React from 'react'
import { DropFilesEventHandler } from 'react-dropzone'
import { Container, Field, Grid, Icon, ICONS, SubTitle, Text, TextArea, Tile, Title } from 'src/ui'
import { Button } from 'src/ui/Button'
import { StringUtils } from 'src/util/StringUtils'
import styled from 'styled-components'
import Dropzone from './Dropzone'

const HugeIcon = styled(Icon)`
  && {
    height: 6rem;
    width: 6rem;
  }
`

const AlignedContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const iconWithText = (icon: IconProp, text: string) => (
  <AlignedContainer isFluid>
    <SubTitle>{text}</SubTitle>
    <HugeIcon icon={icon} size="6x" />
  </AlignedContainer>
)

interface State {
  chosenType?: '' | 'upload' | 'paste'
  file?: File
  fileError?: string
  paste?: string
}

export default class EventSlots extends React.PureComponent<State> {
  state = { chosenType: '', file: null, fileError: '', paste: '' }

  handleClick = (type: 'upload' | 'paste') => () => {
    this.clearInputState()
    this.setState({ chosenType: type })
  }

  onManuallyEnter = () => {
    this.clearInputState()
  }

  clearInputState() {
    this.setState({ chosenType: '', fileError: '', file: null, paste: '' })
  }

  onDrop: DropFilesEventHandler = (accepted: File[], rejected: File[]) => {
    if (rejected.length) return this.setState({ file: null, fileError: StringUtils.NBSP + 'Invalid file' })
    if (accepted.length) this.setState({ file: accepted[0], fileError: '' })
  }

  getFileInfo(file: File): string {
    const size = Math.round((file.size / Math.pow(1024, 2)) * 100) / 100
    return `${file.name} (${size} MB)`
  }

  handlePasteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ paste: event.target.value })

  renderPasteArea = () => (
    <React.Fragment>
      <Field label="Paste SQM below">
        <TextArea value={this.state.paste} onChange={this.handlePasteChange} />
      </Field>
      <Button disabled={!this.state.paste}>Submit</Button>
    </React.Fragment>
  )

  renderDropzone = (file: File | null, fileError: string) => (
    <React.Fragment>
      <Dropzone onDrop={this.onDrop} accept=".sqm">
        <Grid.Container isMultiline>
          <Grid.Column isFull>
            <Grid.Container isCentered>
              <Text size={4}>Drop the unbinarized SQM file here (or click)</Text>
            </Grid.Container>
          </Grid.Column>

          {(file || fileError) && (
            <Grid.Column isFull>
              <Icon icon={file ? ICONS.faFile : ICONS.faExclamationTriangle} isError={!!fileError} />
              <Text size={5}>{file ? this.getFileInfo(file) : fileError}</Text>
            </Grid.Column>
          )}
        </Grid.Container>
      </Dropzone>

      <Button disabled={!file}>Submit</Button>
    </React.Fragment>
  )

  render() {
    const { chosenType, file, fileError } = this.state
    return (
      <React.Fragment>
        <Title size={4}>Select slot input</Title>

        <Tile isAncestor>
          <Tile isParent>
            <Tile isChild isBox onClick={this.handleClick('upload')}>
              {iconWithText(ICONS.faFile, 'Upload SQM')}
            </Tile>
          </Tile>
          <Tile isParent>
            <Tile isChild isBox onClick={this.handleClick('paste')}>
              {iconWithText(ICONS.faPaste, 'Paste SQM')}
            </Tile>
          </Tile>
          <Tile isParent>
            <Tile isChild isBox onClick={this.onManuallyEnter}>
              {iconWithText(ICONS.faPencilAlt, 'Enter manually')}
            </Tile>
          </Tile>
        </Tile>

        {chosenType === 'paste' && this.renderPasteArea()}
        {chosenType === 'upload' && this.renderDropzone(file, fileError)}
      </React.Fragment>
    )
  }
}
