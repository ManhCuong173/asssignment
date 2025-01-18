import Box from 'components/Box/Box'
import { BoxProps } from 'components/Box/types'
import useKeydownListener from 'hooks/useKeydownListener'
import React from 'react'
import styled from 'styled-components'

export interface ModalProps<T = any> {
  id?: string
  onDismiss?: (id?: string) => void
  data?: T
}

const Modal: React.FC<ModalProps & BoxProps> = ({ id, onDismiss, children, ...props }) => {
  const handleOnDismiss = () => {
    if (onDismiss) {
      onDismiss(id)
    }
  }

  useKeydownListener((event) => {
    if (event && event.key === 'Escape') {
      handleOnDismiss()
    }
  })

  return (
    <StyledModal id={id} {...props}>
      <StyledCloseButton className="modal-closebutton" id="modal-closebutton" onClick={handleOnDismiss}>
        close
      </StyledCloseButton>
      {children}
    </StyledModal>
  )
}

const StyledModal = styled(Box)`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(100vw - 24px);
  min-height: 100px;
  max-width: 512px;
  max-height: calc(var(--screen-height) - 24px);
  overflow: auto;

`

const StyledCloseButton = styled.button`
  position: absolute;
  right: 8px;
  top: 0px;
  z-index: 1000;

  svg {
    width: 20px;
  }
`

export default Modal
