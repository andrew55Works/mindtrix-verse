import styled from 'styled-components';

export const Button = {
  Discord: styled.div`
    font-family: Roboto-Regular, sans-serif;
    font-size: 20px;
    display: flex;
    cursor: pointer;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    min-height: 44px;
    margin-top: 20px;
    margin-bottom: 16px;
    padding: 6px 24px;
    background-color: #5865f2;
    color: white;

    &:hover {
      background-color: #7a81f1;
    }
  `,
  Icon: styled.div`
    width: 25px;
    height: 25px;
    padding-right: 12px;
  `,
};

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const Name = styled.div`
  font-family: Roboto-Regular, sans-serif;
  margin-left: 10px;
`;
