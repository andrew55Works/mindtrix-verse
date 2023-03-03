import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/styled-system/color.theme';
import { layout, LayoutProps, space, SpaceProps } from 'styled-system';

interface Props {
  isChecked: boolean;
  optionBackgroundColor: string;
  sliderBackgroundColor: string;
}
const Switch = styled.label<SpaceProps>`
  position: relative;
  cursor: pointer;
  display: inline-block;
  width: 96px;
  height: 40px;
  border-radius: 5px;
  margin: 4px 0;
  overflow: hidden;
  border: 1px ${colors.basic[8]} solid;
  ${space};
  ${layout};
`;
const CircleSwitch = styled.label<SpaceProps>`
  position: relative;
  cursor: pointer;
  display: inline-block;
  width: 56px;
  height: 28px;
  border-radius: 50px;
  margin: 4px 0;
  overflow: hidden;
  border: 1px ${colors.basic[8]} solid;
  ${space};
  ${layout};
`;
const Slider = styled.span`
  position: absolute;
  color: ${colors.basic[0]};
  background-color: ${({ optionBackgroundColor }: Props) =>
    optionBackgroundColor};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.2s ease-out;
  &:before {
    position: absolute;
    content: '';
    height: 100%;
    width: 50%;
    left: 0;
    bottom: 0;
    transition: 0.2s ease-out;
    transform: ${({ isChecked }: Props) =>
      `translateX(${isChecked ? '100%' : '0%'});`}
    background-color: ${({ sliderBackgroundColor }: Props) =>
      sliderBackgroundColor};
  }
`;
const CircleSlider = styled.span<Props>`
  position: absolute;
  color: ${colors.basic[0]};
  background: ${(props) =>
    props?.isChecked ?? false
      ? 'linear-gradient(to right, #5972C2 0%, #8C8B8B 100%)'
      : 'linear-gradient(to left, #FFCA00 0%, #F15634 100%)'};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.2s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    position: absolute;
    content: '';
    height: 22px;
    width: 22px;
    border-radius: 50%;
    left: 2px;
    bottom: 3px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50% 50%;
    background-image: url(${(props) =>
      props?.isChecked ?? false
        ? '/svg/icon_moon_stars.svg'
        : '/svg/icon_sun_bright.svg'});
    transition: 0.2s ease-out;
    transform: ${({ isChecked }: Props) =>
      `translateX(${isChecked ? '28px' : '0%'});`}
    background-color: whitesmoke;
  }
`;
const Checkbox = styled.input.attrs(() => ({
  type: 'checkbox',
}))`
  opacity: 0;
  width: 0;
  height: 0;
`;

interface OptionProps {
  isBlendMode: boolean;
  isRight: boolean;
}
const Option: FC<OptionProps> = styled.span`
  position: absolute;
  top: 25%;
  width: fit-content;
  left: ${({ isRight }: OptionProps) => (isRight ? '75%' : '25%')};
  transform: translateX(-50%);
  color: ${colors.basic[0]};
  mix-blend-mode: ${({ isBlendMode }: OptionProps) =>
    isBlendMode ? 'difference' : 'none'};
`;

export interface CommonSwitchProps extends SpaceProps, LayoutProps {
  addressFromQuery: string;
  defaultIsCheck?: boolean;
  isShowFilter: boolean;
  isSvg?: boolean;
  onClick?: (
    e: React.ChangeEvent<HTMLInputElement>,
    switchEnum: SwitchEnum,
  ) => void;
  optionBackgroundColor?: string;
  OptionLeft: JSX.Element;
  OptionRight: JSX.Element;
  sliderBackgroundColor?: string;
}

export enum SwitchEnum {
  PRIMARY_LEFT = 'PRIMARY_LEFT',
  SECONDARY_RIGHT = 'SECONDARY_RIGHT',
}

export const CommonSwitch: FC<CommonSwitchProps> = ({
  defaultIsCheck = false,
  sliderBackgroundColor = colors.primary[6],
  optionBackgroundColor = colors.basic[0],
  onClick,
  OptionLeft,
  OptionRight,
  isShowFilter,
  isSvg = false,
  ...styledProps
}) => {
  const [isChecked, setIsChecked] = useState(defaultIsCheck);
  const onChange = {
    toggleCheck: (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      setIsChecked(newChecked);
      const switchEnum = newChecked
        ? SwitchEnum.SECONDARY_RIGHT
        : SwitchEnum.PRIMARY_LEFT;
      onClick && onClick(e, switchEnum);
    },
  };
  const isBlendModeLeft = isSvg ? isSvg && isChecked : true;
  const isBlendModeRight = isSvg ? !(isSvg && isChecked) : true;
  if (!isShowFilter) return null;
  return (
    <Switch {...styledProps}>
      <Checkbox checked={isChecked} onChange={onChange.toggleCheck} />
      <Slider
        sliderBackgroundColor={sliderBackgroundColor}
        optionBackgroundColor={optionBackgroundColor}
        isChecked={isChecked}
      />
      <Option isBlendMode={isBlendModeLeft} isRight={false}>
        {OptionLeft}
      </Option>
      <Option isBlendMode={isBlendModeRight} isRight={true}>
        {OptionRight}
      </Option>
    </Switch>
  );
};

export const CommonCircleSwitch: FC<
  Omit<CommonSwitchProps, 'OptionLeft' | 'OptionRight'>
> = ({
  defaultIsCheck = false,
  sliderBackgroundColor = colors.primary[6],
  optionBackgroundColor = colors.basic[0],
  onClick,
  isShowFilter,
  isSvg = false,
  ...styledProps
}) => {
  const [isChecked, setIsChecked] = useState(defaultIsCheck);
  const onChange = {
    toggleCheck: (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      setIsChecked(newChecked);
      const switchEnum = newChecked
        ? SwitchEnum.SECONDARY_RIGHT
        : SwitchEnum.PRIMARY_LEFT;
      onClick && onClick(e, switchEnum);
    },
  };
  if (!isShowFilter) return null;
  return (
    <CircleSwitch {...styledProps}>
      <Checkbox checked={isChecked} onChange={onChange.toggleCheck} />
      <CircleSlider
        sliderBackgroundColor={sliderBackgroundColor}
        optionBackgroundColor={optionBackgroundColor}
        isChecked={isChecked}
      />
    </CircleSwitch>
  );
};
