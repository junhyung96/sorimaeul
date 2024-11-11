import styled from "styled-components";

export const Line = styled.hr<{$color?: string}>`

  width: 100%;
  border-color: ${(props) => (props.$color ? `${props.$color}` : "black")};
`