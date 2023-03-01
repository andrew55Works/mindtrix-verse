import styled from 'styled-components';

export const TableContainer = styled.div`
  align-items: flex-start;
  overflow-x: scroll;
  max-width: 1063px;

  &::-webkit-scrollbar {
    background: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(203, 203, 203, 0.52);
  }
`;
