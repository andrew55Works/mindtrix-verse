import { DOMAttributes, FC } from 'react';
import styled, { css } from 'styled-components';

const BaseText: FC<DOMAttributes<HTMLDivElement>> = styled.div`
  font-family: Roboto-Regular, sans-serif;
  font-size: 16px;
`;

export const getTextEllipsisCss = (props: ICommonTextProps) => {
  const { isAutoWrap = false, maxTextLine = 1 } = props;
  return isAutoWrap
    ? css``
    : css`
        word-break: break-word;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box !important;
        -webkit-line-clamp: ${maxTextLine};
        -webkit-box-orient: vertical;
        white-space: normal;
      `;
};

export const getTextDecoration = ({ textDecorator = 'inherit' }) => {
  return css`
    text-decoration: ${textDecorator};
  `;
};

export const getCursor = ({ onClick = null }) => {
  return css`
    cursor: ${onClick ? 'pointer' : 'inherit'};
  `;
};

export const getFontSizeCss = ({ fontSize = 0 }) => {
  return css`
    font-size: ${fontSize}px;
  `;
};

export interface ICommonTextProps {
  fontSize?: number;
  isAutoWrap?: boolean;
  maxTextLine?: number;
}

export const TextWithEllipsis: FC<ICommonTextProps> = styled(BaseText)`
  ${getTextEllipsisCss};
  ${getFontSizeCss};
`;
