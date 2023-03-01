import styled from 'styled-components';
import { statusColorSystemHex } from '../../styles/styled-system/color.theme';

export const RoleContainer = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 400px;
  padding: 20px;
`;

export const Container = styled.div`
  max-width: 600px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const Border = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  width: 100%;
  border-bottom: 1px solid ${statusColorSystemHex.disabledBorder};
`;

export const ImageContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 16px;
`;

export const ModalBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
  max-width: 350px;
  height: 21vh;
`;
