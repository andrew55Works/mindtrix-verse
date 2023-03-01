import styled from 'styled-components';

export const Button = styled.div`
  font-family: Roboto-Regular, sans-serif;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-direction: row;
  width: calc(340px - (12px * 2));
  height: calc(64px - (4px * 2));
  padding: 4px 12px;
  border: 1px solid #2e3a59;
  color: #ffffff;
  border-radius: 30px;
  background: #33347b;
  letter-spacing: 0.2px;
  margin-bottom: 20px;

  &:hover {
    filter: brightness(1.2);
  }
`;

export const ButtonSVG = styled.div`
  margin-right: 12px;
  height: 36px;
  width: 36px;
`;
