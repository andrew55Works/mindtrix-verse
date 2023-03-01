import React, { FC } from 'react';
import Tippy from '@tippyjs/react';
import CircleQuestionSvg from '../../../assets/svg/circle-question-solid.svg';
import styled from 'styled-components';
import 'tippy.js/dist/tippy.css';
import { Text } from '../../../styles/styled-system/text.theme';

interface Props {
  iconColor?: string;
  text: string;
}
interface SvgProps {
  iconColor: string;
}
const SvgContainer = styled.div<SvgProps>`
  flex-shrink: 0;
  display: flex;
  height: 18px;
  width: 18px;
  margin-left: 12px;
  cursor: help;
  svg {
    fill: ${(props) => props?.iconColor ?? '#099fff'};
  }
`;
export const TooltipQuestion: FC<Props> = ({ iconColor = '#a2a0a0', text }) => {
  return (
    <Tippy
      content={
        <Text.h5
          status={'basic'}
          color={'white'}
          isAutoWrap={true}
          children={text}
        />
      }
      arrow={false}
    >
      <SvgContainer iconColor={iconColor}>
        <CircleQuestionSvg />
      </SvgContainer>
    </Tippy>
  );
};
