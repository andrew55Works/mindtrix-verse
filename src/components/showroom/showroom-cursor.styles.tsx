import styled from 'styled-components';

export const ShowroomCursorStyles = styled.div.attrs((props) => ({
  className: 'cursor',
}))`
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: #00000077;
  border: 1px solid #ffffff77;
  pointer-events: none;
`;

