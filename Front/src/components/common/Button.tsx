import styled from "styled-components";

interface buttonInterface {
  $color?: string;
  $fontSize?: number;
  $height?: number;
  $width?: number;
  $marginTop?: number;
  $paddingX?: number;
  $paddingY?: number;
  $fontFamily?: string;
  $marginLeft?: number;
  $background?: string;
  $border?: string;
  $selected?: boolean;
}

export const Button = styled.button<buttonInterface>`
  border: ${(props) => props.$border || "none"};
  border-radius: 5px;
  color: ${(props) => props.$color || "white"};
  font-size: ${(props) => `${props.$fontSize || .875}rem`};
  padding-top: ${(props) =>
    props.$paddingY === 0 || props.$paddingY
      ? `${props.$paddingY}rem`
      : "0.4rem"};
  padding-bottom: ${(props) =>
    props.$paddingY === 0 || props.$paddingY
      ? `${props.$paddingY}rem`
      : "0.2rem"};
  padding-left: ${(props) =>
    props.$paddingX === 0 || props.$paddingX
      ? `${props.$paddingX}rem`
      : "0.4rem"};
  padding-right: ${(props) =>
    props.$paddingX === 0 || props.$paddingX
      ? `${props.$paddingX}rem`
      : "0.4rem"};
  white-space: nowrap;
  height: ${(props) => (props.$height ? `${props.$height}rem` : "auto")};
  width: ${(props) => (props.$width ? `${props.$width}rem` : "auto")};
  margin-top: ${(props) =>
    props.$marginTop === 0 || props.$marginTop
      ? `${props.$marginTop}rem`
      : "auto"};
  margin-left: ${(props) =>
    props.$marginLeft === undefined ? "auto" : `${props.$marginLeft}rem`};
  background-color: ${(props) => props.$background || "black"};
  font-family: ${(props) => props.$fontFamily || "GmarketSansMedium"};
  opacity: ${(props) => props.$selected === undefined ? 'none' : props.$selected ? 'none' : '0.6' };

  &:disabled {
    background-color: #D9D9D9;
    cursor: not-allowed;
    color: white;
  }
`;
