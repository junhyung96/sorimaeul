import styled from "styled-components";
import { ReactComponent as Icon } from "../../assets/public.svg";

const Button = styled.div<{ $color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  height: 1.75rem;
  gap: .5rem;
  
  .hide {
    height: 100%;
    width: 2rem;
  }
`

const CheckBox = styled.input<{ $color: string }>`
  z-index: 1;
  width: 3rem;
  height: 1.625rem;
  border-radius: 1.2rem;
  background: #D9D9D9;
  &::before {
    content: '';
    width: 3rem;
    height: 1.625rem;
    display: block;
    position: absolute;
    border-radius: 1.2rem;
    background-color: #D9D9D9;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  &::after {
    content: '';
    position: relative;
    display: block;
    width: 1.25rem;
    height: 1.25rem;
    top: calc((1.625rem - 1.25rem) / 2);
    left: .25rem;
    border-radius: 50%;
    background: white;
    transition: all 0.2s ease-in-out;
  }
  &:checked {
    background: ${(props) => props.$color};
    transition: all 0.2s ease-in-out;
    &::before {
      background-color: ${(props) => props.$color};
    }
    &::after {
      left: calc(100% - 1.5rem);
    }
  }
`

const ToggleButton: React.FC<{ isPublic: boolean, setIsPublic: React.Dispatch<React.SetStateAction<boolean>>, color: string }> = ({isPublic, setIsPublic, color}) => {
  return (
    <Button $color={color}>
      <CheckBox $color={color} type="checkbox" onChange={() => setIsPublic(prev => !prev)} defaultChecked={isPublic} />
      <Icon fill={isPublic ? color : '#D9D9D9'} width="2rem" height="75%" />
    </Button>
  )
}

export default ToggleButton;