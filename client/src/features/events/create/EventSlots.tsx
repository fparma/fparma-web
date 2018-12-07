import { IconProp } from '@fortawesome/fontawesome-svg-core'
import * as React from 'react'
import styled from 'styled-components'
import { Button, Container, Field, Grid, Icon, ICONS, SubTitle, Text, TextArea, Tile, Title } from '../../../ui'
import { StringUtils } from '../../../util/StringUtils'
import Dropzone from './Dropzone'
import { getSidesAndGroups, parseSqm } from '../../../util/sqmHelpers'
import { Groups } from '../../../util/sqmTypes'

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

  onDrop = (accepted: File[], rejected: File[]) => {
    if (rejected.length) return this.setFileError('Invalid file')
    if (accepted.length) this.setState({ file: accepted[0], fileError: '' })
  }

  getFileInfo(file: File): string {
    const size = Math.round((file.size / Math.pow(1024, 2)) * 100) / 100
    return `${file.name} (${size} MB)`
  }

  onDropSubmit = () => {
    const { file } = this.state
    if (!file) return

    const reader = new FileReader()
    reader.readAsBinaryString(file)

    reader.addEventListener('loadend', () => {
      this.convertSqmStringToGroups(reader.result as string)
    })

    reader.addEventListener('error', () => {
      this.setFileError(`Error reading file: ${reader.error!.message}`)
    })
  }

  convertSqmStringToGroups(sqm: string) {
    if (!sqm) {
      return this.setFileError('Failed to parse sqm. Empty?')
    }

    try {
      const data = getSidesAndGroups(parseSqm(sqm))
      this.onInputSelectionFinished(data)
    } catch (e) {
      console.error(e)
      this.setFileError(`Error parsing sqm, maybe it's binarized?: ${e.message}`)
    }
  }

  setFileError(fileError: string) {
    this.setState({ file: null, fileError })
  }

  onInputSelectionFinished(data: Groups[]) {
    console.log('ready', data)
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

      <Button disabled={!file} onClick={this.onDropSubmit}>
        Submit
      </Button>
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
