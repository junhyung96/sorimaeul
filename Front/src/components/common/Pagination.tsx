import React from "react";
import styled from "styled-components";

interface PaginationProps {
  totalPages: number;
  onPageChange: (newPage: number) => void;
  currentPage: number;
  color: string;
}

const Container = styled.div<{ $color: string }>`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  .active {
    border-color: ${(props) => props.$color};
    color: ${(props) => props.$color};
  }
  :disabled {
    cursor: default;
    opacity: .8;
    color: grey;
    background-color: lightgrey;
  }
`
const PaginationButton = styled.button`
  margin: 0 5px;
  width: 2rem;
  height: 2rem;
  text-align: center;
  cursor: pointer;
  background-color: #ffffff;
  color: black;
  border: 1px solid #DFE3E8;
  border-radius: 4px;
  outline: none;
  font-size: .8rem;
`;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, color }) => {
  return (
    <Container $color={color}>
        <PaginationButton onClick={() => onPageChange(1)} disabled={currentPage === 1}>{'<<'}</PaginationButton>
        <PaginationButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>{'<'}</PaginationButton>
        {Array(5).fill(undefined).map((_,idx) => (
          !(idx+1+5*(Math.ceil(currentPage/5)-1) > totalPages) &&
          <PaginationButton
            id={`${(idx + 1)+5*(Math.ceil(currentPage/5)-1)}`}
            key={(idx + 1)+5*(Math.ceil(currentPage/5)-1)}
            onClick={() => onPageChange((idx+1)+5*(Math.ceil(currentPage/5)-1))}
            className={currentPage === (idx + 1)+5*(Math.ceil(currentPage/5)-1) ? "active" : "none"}
          >
            {(idx+1)+5*(Math.ceil(currentPage/5)-1)}
          </PaginationButton>
        ))}
        <PaginationButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>{'>'}</PaginationButton>
        <PaginationButton onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>{'>>'}</PaginationButton>
      </Container>
  )
}

export default Pagination;