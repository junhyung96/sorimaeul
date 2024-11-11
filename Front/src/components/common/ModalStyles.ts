import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  z-index: 5;
`;
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const CloseButton = styled.div`
  width: 1.5rem;
  height: 1.5em;
  border-radius: 50%;
  background: #000000;
  color: #BFEA44;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface ContentInterface {
  $width?: number;
  $height?: number;
  $background?: string;
  $padding?: number;
  $borderRadius?: number;
}

export const Content = styled.section<ContentInterface>`
  width: ${(props) => props.$width ? `${props.$width}rem` : "30rem"};
  height: ${(props) => props.$height? `${props.$height}rem` :  "7rem"};
  background: ${(props) => props.$background || "#fff"};
  border-radius: ${(props) => props.$borderRadius? `${props.$borderRadius}px` : "15px"};
  padding: ${(props) => props.$padding? `${props.$padding}rem` : "2rem"};
  z-index: 1;
  overflow-y: auto;
`;