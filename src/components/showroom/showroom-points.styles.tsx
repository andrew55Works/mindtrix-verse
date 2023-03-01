import styled from 'styled-components';

export const ShowroomPointStyles = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  &.text {
    position: absolute;
    top: 30px;
    left: -120px;
    width: 200px;
    padding: 20px;
    border-radius: 4px;
    background: #00000077;
    border: 1px solid #ffffff77;
    color: #ffffff;
    line-height: 1.3em;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 100;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  &.label {
    position: absolute;
    top: -25px;
    left: -25px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    line-height: 50px;
    font-weight: 100;
    font-size: 14px;
    cursor: pointer;
    transform: scale(0, 0);
    transition: transform 0.3s;
  }
  &:hover .text {
    opacity: 1;
  }
`;
