import React from 'react'
import styled, { css, keyframes } from 'styled-components'

interface ILoading {
  isLoading: boolean
  size?: string
}

const Container = styled.div`
  position: relative;
`

const BlurriedDiv = styled.div<{ isLoading: boolean }>`
  transition: 200ms;
  ${(props) => props.isLoading &&
    css`
      filter: blur(10px);
    `
  }
`

const LoadingContainer = styled.div`
  z-index: 9;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Load = styled.div<{ size: string }>`
  ${(props) => props.size &&
    css`
      width: ${props.size};
      height: ${props.size};
    `
  }
  border: 2px solid white;
  border-right: 2px solid black;
  border-left: 2px solid black;
  border-radius: 50%;
  animation: ${rotate} 500ms linear infinite;
`

const Loading: React.FC<ILoading> = ({ isLoading, size='35px', children }) => {
  return (
    <Container>
      {isLoading &&
        <LoadingContainer>
          <Load size={size} />
        </LoadingContainer>
      }
      <BlurriedDiv isLoading={isLoading}>
        {children}
      </BlurriedDiv>
    </Container>
  )
}

export default Loading
