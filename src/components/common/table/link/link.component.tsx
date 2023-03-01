import * as S from '../option/option.styles';
import WebLinkSvg from '../../../../assets/svg/icon_web_link.svg';
import React, { FC } from 'react';

interface Props {
  onClick: () => void;
}
export const TableLink: FC<Props> = ({ onClick }) => (
  <S.SVG onClick={onClick}>
    <WebLinkSvg />
  </S.SVG>
);
