import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode | React.ReactNode[];
  message: string;
  className?: string;
}

const Tooltip: React.FC<Props> = ({ children, message, className }) => {
  return (
    <ScRTooltip className={className}>
      {children}
      <p className='tooltip'>{message}</p>
    </ScRTooltip>
  )
}

const ScRTooltip = styled.span`
  position: relative;
  
  .tooltip {
    position: absolute;
    left: 100%;
    top: -100%;
    min-width: 400px;
    min-height: 50px;
    padding: 7px;
    background-color: #777;
    color: #fff;
    font-size: 15px;
    border-radius: 4px;
    z-index: 10;
    display: none;
  }

  &:hover {
    .tooltip {
      display: block;
    }
  }
`

export default Tooltip;