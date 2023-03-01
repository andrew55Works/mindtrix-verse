import { InputHTMLAttributes } from 'react';
import { DefaultTheme, ThemedCssFunction } from 'styled-components';
import { breakpoints } from '../styles/styled-system/styled-system.config';

export interface IInputProps {
  id?: string | null;
  name?: string;
  placeholder?: string;
  type?: string;
  value?: string | number;
}

export interface ICommonInputStatusProps {
  disabled: boolean;
  isError: boolean;
  isNoneBorderStyle?: boolean;
}

export interface ICommonInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  id?: string | null;
  name?: string;
  placeholder?: string;
  type?: string;
  value?: string | number;
}

export interface ICommonInputTextAreaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  id?: string | null;
  isError: boolean;
  name?: string;
  placeholder?: string;
  type?: string;
  value?: string | number;
}

export interface ICommonTextProps {
  maxTextLine?: number;
}

export interface ICommonImageProps {
  objectFit?: string;
  objectPosition?: string;
  src?: string;
}

export interface IBreakPoint {
  // 目前只有兩個版型
  lg: string;
  md: string;
  sm?: string;
  xl?: string;
}

export interface IBreakPointNumber {
  // 目前只有兩個版型
  lg: number;
  md: number;
  sm?: number;
  xl?: number;
}

export type TBreakPoint = Array<string> & IBreakPoint;

export interface IRwdStyles {
  // _ 為小於 sm breakPoint 的 style
  _: number | string;
  // 目前只有兩個版型
  lg: number | string;
  md: number | string;
  sm?: number | string;
  xl?: number | string;
}

export type IMedia = {
  [key in keyof typeof breakpoints]: ThemedCssFunction<DefaultTheme>;
};
