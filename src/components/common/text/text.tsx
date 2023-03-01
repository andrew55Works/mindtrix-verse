import React, { FC, HTMLAttributes } from 'react';
import ContentLoader from 'react-content-loader';
import * as Comp from '../../../types/component-status.type';
import { TextWithEllipsis } from './text.styles';
import { Text } from '../../../styles/styled-system/text.theme';

interface Props extends Comp.IStatus {
  fontSize: number;
  value: string;
  x: number; // 置中：(40-30)/2=5
  y: number; // 置中：(100-52)/2=24
}

export const AnimatedText = ({ fontSize, value, status, x, y }: Props) => {
  const isDataExist = !!value;
  if (isDataExist && status === Comp.STATUS_ENUM.LOADED) {
    return (
      <TextWithEllipsis fontSize={fontSize} maxTextLine={1}>
        {value}
      </TextWithEllipsis>
    );
  } else {
    const speed = status === Comp.STATUS_ENUM.LOADING ? 2 : 0;
    return (
      <ContentLoader
        speed={speed}
        width={100}
        height={42}
        viewBox='0 0 100 40'
        backgroundColor='#dad7d7'
        foregroundColor='#ababab'
      >
        <rect x={x} y={y} rx='3' ry='3' width='52' height='30' />
      </ContentLoader>
    );
  }
};

export const InputLabel180: FC<{ text: string }> = ({ text }) => (
  <Text.label
    status={'basic'}
    width={'180px'}
    mr={'20px'}
    mt={'0px'}
    mb={'0px'}
    py={2}
    fontWeight={'bold'}
    isAutoWrap={true}
  >
    {text}
  </Text.label>
);

export const InputLabelModal180: FC<{ text: string }> = ({ text }) => (
  <Text.h3
    status={'basic'}
    width={'180px'}
    mr={'20px'}
    mt={'0px'}
    mb={'0px'}
    textAlign={'left'}
    fontWeight={'bold'}
    isAutoWrap={true}
  >
    {text}
  </Text.h3>
);

export const InputLabel150: FC<
  { text: string } & HTMLAttributes<HTMLLabelElement>
> = ({ text, ...props }) => (
  <Text.label
    status={'basic'}
    width={'150px'}
    mr={'20px'}
    mt={'0xp'}
    mb={'0px'}
    py={2}
    fontWeight={'bold'}
    isAutoWrap={true}
    onClick={props.onClick}
  >
    {text}
  </Text.label>
);

export const InputLabel120: FC<
  { text: string } & HTMLAttributes<HTMLLabelElement>
> = ({ text, ...props }) => (
  <Text.label
    status={'basic'}
    width={'120px'}
    mr={'20px'}
    mt={'0px'}
    mb={'0px'}
    py={2}
    fontWeight={'bold'}
    isAutoWrap={true}
    onClick={props.onClick}
  >
    {text}
  </Text.label>
);

export const CalendarText: FC<
  { text: string } & HTMLAttributes<HTMLLabelElement>
> = ({ text, ...props }) => (
  <Text.label status={'basic'} py={2} onClick={props.onClick} color={'info.5'}>
    {text}
  </Text.label>
);
