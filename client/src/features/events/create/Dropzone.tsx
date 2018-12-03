import * as React from 'react'
import Dropzone, { DropFilesEventHandler, DropzoneRenderArgs } from 'react-dropzone'
import styled from 'styled-components'
import { Container } from '../../../ui/Container'

interface Props {
  onDrop?: DropFilesEventHandler
  accept?: string
}

const DropZone: React.SFC<Props> = ({ onDrop, accept, children }) => (
  <Dropzone onDrop={onDrop} style={{}} accept={accept}>
    {({ isDragActive, isDragReject }) => (
      <DropZoneContainer isDragActive={isDragActive} isDragReject={isDragReject}>
        {children}
      </DropZoneContainer>
    )}
  </Dropzone>
)

const DropZoneContainer = styled(Container)<Props & Partial<DropzoneRenderArgs>>`
  && {
    min-height: 5rem;
    border: 2px dashed grey;
    padding: 2rem;
    margin-bottom: 15px;
    border-color: ${({ isDragActive }) => (isDragActive ? 'green' : 'inherit')};
  }

  &:hover {
    cursor: pointer;
  }
`

export default DropZone
