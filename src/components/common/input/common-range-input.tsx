import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from 'styled-system';
import { colors } from '../../../styles/styled-system/color.theme';

type Props = ColorProps &
  LayoutProps &
  SpaceProps &
  HTMLAttributes<HTMLInputElement>;
export const RangedInput = styled.input.attrs((props: Props) => ({
  type: 'range',
  defaultValue: 0,
}))<Props>`
  appearance: none;
  position: relative;
  height: 4px;
  width: 100%;
  background-color: ${colors.primary[1]};
  margin-top: 0;
  margin-bottom: 0;
  outline: none;
  ${color};
  ${layout};
  ${space};
  &::-webkit-slider-thumb {
    position: relative;
    -webkit-appearance: none;
    cursor: pointer;
    background: ${colors.primary[6]};
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-top: -5px;
    box-sizing: border-box;
    //z-index: 3;
  }
  &::-moz-range-thumb {
    position: relative;
    cursor: pointer;
    background: ${colors.primary[6]};
    width: 15px;
    height: 15px;
    border-radius: 50%;
    box-sizing: border-box;
    //z-index: 3;
  }
  &:active::-webkit-slider-thumb {
    background-color: ${colors.primary[5]};
  }
  &:active::-moz-range-thumb {
    background-color: ${colors.primary[5]};
  }
  &::-webkit-slider-runnable-track {
    background-color: ${colors.primary[1]};
    height: 4px;
    width: 100%;
    border-radius: 1.3px;
    outline: none;
  }
  &::-moz-range-track {
    background-color: ${colors.primary[1]};
    height: 4px;
    width: 100%;
    border-radius: 1.3px;
    outline: none;
  }
  &::-moz-focus-outer {
    border: 0;
  }
  &::before {
    content: '';
    height: 4px;
    width: var(--seek-before-width);
    background-color: ${colors.primary[6]};
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }
  &::-moz-range-progress {
    background-color: ${colors.primary[6]};
    height: 4px;
  }
`;
