import React, { FC } from 'react';
import * as S from './mindtrix-button.styles';

interface Props {
  onClick: () => void;
  text: string;
}
export const MindtrixButton: FC<Props> = ({ onClick, text }) => {
  return <S.Button.Discord onClick={onClick}>{text}</S.Button.Discord>;
};
