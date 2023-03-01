import React, { FC } from 'react';
import * as S from './discord.styles';
import DiscordSVG from '../../../assets/icons/icon_discord.svg';

interface Props {
  onClick: () => void;
  text: string;
}
export const DiscordButton: FC<Props> = ({ onClick, text }) => {
  return (
    <S.Button.Discord onClick={onClick}>
      <S.Button.Icon>
        <DiscordSVG />
      </S.Button.Icon>
      {text ? text : ''}
    </S.Button.Discord>
  );
};
