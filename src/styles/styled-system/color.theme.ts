import _get from 'lodash.get';

export const colors = {
  basic: [
    '#FFFFFF',
    '#F7F9FC',
    '#EDF1F7',
    '#E4E9F2',
    '#C5CEE0',
    '#8F9BB3',
    '#2E3A59',
    '#222B45',
    '#0C0C0C',
  ],
  primary: [
    '#E6E6FA',
    '#CECFF6',
    '#AEAFE5',
    '#8E8FCC',
    '#6667AB',
    '#4A4B93',
    '#33347B',
    '#202163',
    '#131452',
  ],
  secondary: [
    '#DBFDD9',
    '#B4FCB7',
    '#8EF89D',
    '#70F18F',
    '#43E97B',
    '#30C872',
    '#21A769',
    '#15875D',
    '#0C6F55',
  ],
  success: [
    '#DFFDDA',
    '#B9FBB6',
    '#90F496',
    '#72EA85',
    '#46DD6C',
    '#33BE63',
    '#239F5A',
    '#16804F',
    '#0D6A48',
  ],
  info: [
    '#CEF5FF',
    '#9CE7FF',
    '#6CD2FF',
    '#47BDFF',
    '#0A99FF',
    '#0776DB',
    '#0558B7',
    '#033E93',
    '#012C7A',
  ],
  danger: [
    '#FFE4D4',
    '#FFC3AA',
    '#FF9B7F',
    '#FF7460',
    '#FF352B',
    '#DB1F26',
    '#B71529',
    '#930D29',
    '#7A0829',
  ],
};

interface ColorSystem {
  basic: string;
  danger: string;
  disabledBackground: string;
  disabledBorder: string;
  disabledText: string;
  primary: string;
  secondary: string;
  white: string;
}

export const statusColorSystemStr: ColorSystem = {
  white: 'basic.0',
  basic: 'basic.8',
  primary: 'primary.6',
  // secondary: 'secondary.5',
  secondary: 'primary.5',
  danger: 'danger.5',
  disabledBackground: 'basic.3',
  disabledBorder: 'basic.4',
  disabledText: 'basic.5',
};

export const statusColorSystemHex: ColorSystem = {
  basic: _get(colors, statusColorSystemStr.basic, ''),
  primary: _get(colors, statusColorSystemStr.primary, ''),
  secondary: _get(colors, statusColorSystemStr.secondary, ''),
  danger: _get(colors, statusColorSystemStr.danger, ''),
  disabledBackground: _get(colors, statusColorSystemStr.disabledBackground, ''),
  disabledBorder: _get(colors, statusColorSystemStr.disabledBorder, ''),
  disabledText: _get(colors, statusColorSystemStr.disabledText, ''),
  white: _get(colors, statusColorSystemStr.white, ''),
};
