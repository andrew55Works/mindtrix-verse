import styled from 'styled-components';

export const LandmarkContainer = styled.a<{ isHovering: boolean }>`
  cursor: pointer;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 20px;
  height: 60px;
  width: 60px;
  span {
    svg {
      transition: transform 0.3s ease;
      transform: translateY(
        ${(props) => (props?.isHovering ?? false ? '-10px' : '0')}
      );
      path {
        &:nth-child(1) {
          ${(props) => (props?.isHovering ?? false ? 'fill: #f1ff52' : {})};
        }
      }
    }
  }
`;
