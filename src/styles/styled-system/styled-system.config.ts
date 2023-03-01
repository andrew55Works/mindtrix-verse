/* ## WaCourse lg 介面尺寸
 * 1. 總寬: 992px
 * 2. grid: 66px => 66*12 = 792
 * 3. gutter: 15px => 15*12 = 180
 * 4. padding: 15/2 = 7.5px
 * 5. 內容寬度: 792 + 15*11 = 957px
 * 6. 容器寬度(實際刻板寬度): 792 + 15*12 = 972px (含左右各一個 padding)
 * 7. 兩邊留空: (992 - 792 - 180)/2 = 10px
 */

/* ## WaCourse md 介面尺寸
 * 1. 總寬: 576px
 * 2. grid: 126px => 126*4 = 504
 * 3. gutter: 10px => 10*4 = 40
 * 4. padding: 10/2 = 5px
 * 5. 內容寬度: 504 + 10*3 = 534px
 * 6. 容器寬度(實際刻板寬度): 504 + 10*4 = 528px (含左右各一個 padding)
 * 7. 兩邊留空: (576 - 504 - 40)/2 = 16px
 */

import {
  IBreakPointNumber,
  IRwdStyles,
} from '../../types/styled-system.interface';
import { colors } from './color.theme';
import space from './space.theme';
import {
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
} from './typography.theme';

export const hoverEffectWhite = 'hsla(0, 0%, 95%, 1)';
export const toastBgBlack = 'hsla(0, 0%, 0%, 0.5)';
export const videoBgBlack = 'hsla(0, 0%, 0%, 1)';
export const headerHeight = '70';
export const formInputMinLength = '309';
export const commonMargin = {
  marginBottom: 4,
};
export const commonBorder = {
  border: `1px solid ${colors.basic[4]}`,
  borderRadius: 1,
};
export const modalBorder = {
  backgroundColor: colors.basic[0],
  borderWidth: '3px',
  borderStyle: 'solid',
  borderColor: 'basic.8',
  borderRadius: 3,
};
export const inputRWD = {
  disabled: {
    backgroundColor: colors.basic[4],
    border: `1px solid ${colors.primary[4]}`,
  },
  error: {
    border: `2px solid ${colors.danger[5]}`,
  },
  normal: {
    ...commonBorder,
    fontFamily: 'default',
    flexGrow: 1,
    fontSize: '1rem',
    minHeight: '24px',
    paddingBottom: '7px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '7px',
  },
};

export const textareaRWD = {
  normal: {
    ...inputRWD.normal,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    minHeight: '72px',
  },
};

export const selectRWD = {
  normal: inputRWD.normal,
  paddingRight: 10,
};

export const styleImageObj = {
  avatar: [10, 20, 25, 30, 40, 50, 60, 80, 100, 120, 145, 150],
};

export const gutters = [0, 3, 5, 8, 10, 12, 14, 16, 20, 24, 30, 40];

export const styleOpacityObj = {
  card: 0.9,
};

export const buttonRWD = {
  withoutOutLine: {
    background: 'transparent',
  },
};

export const buttonMinWidth = {
  formButton: 146,
};

export const styleGridsObj = [35, 65, 70, 90];
export const textLimitNums = {
  input: {
    normal: 30,
  },
};

const defaultColumns = 12;
const sideBarColumns = 3;
const dashboardFunColumns = 1;

export const indicatorNumsInSingleRow =
  defaultColumns - sideBarColumns - dashboardFunColumns;

export const waCareCaseGrid = defaultColumns - sideBarColumns;

export const styleGridTemplateRowsObj = {
  gallery: {
    cardGroupByCreation: 'repeat(auto-fit, minmax(304px, 1fr))',
    cardGroupByShow: [
      'repeat(auto-fit, minmax(328px, 1fr))',
      'repeat(auto-fit, minmax(428px, 1fr))',
      'repeat(auto-fit, minmax(628px, 1fr))',
    ],
  },
  dashboard: {
    container: 'minmax(75px, auto)',
    label: 'minmax(40px, auto)',
    pagination: 'minmax(40px, auto)',
  },
  normal: 'auto',
  signUp: {
    body: {
      _: 'minmax(auto, 1fr)',
      lg: 'minmax(390px, 40%) minmax(150px, 60%)',
      md: 'minmax(auto, 1fr)',
    },
  },
  waCareCase: {
    dashboard: 'minmax(130px, auto)',
  },
};

export const displayNoneRwd = {
  lgAndMd: { lg: 'block', md: 'none', _: 'none' },
};

export const breakpointNumbers: IBreakPointNumber = {
  lg: 992,
  md: 576,
};
// @ts-ignore
export const breakpoints: TBreakPoint = [
  `${breakpointNumbers.md}px`,
  `${breakpointNumbers.lg}px`,
];
breakpoints.md = breakpoints[0];
breakpoints.lg = breakpoints[1];

export const paddingRwd: IRwdStyles = { lg: 2, md: 11, _: 2 };
export const paddingFormTopRwd = {
  lg: 4,
  md: 4,
  _: 3,
};
export const paddingFormBottomRwd = {
  lg: 3,
  md: 3,
  _: 3,
};
export const paddingMdFullRwd: IRwdStyles = { lg: 2, md: 2, _: 2 };
export const paddingFormLeftAndRightRwd = { lg: 9, md: 9, _: 7 };
export const paddingFormTopAndBottomRwd = { lg: '48px', md: '48px', _: 7 };
export const fontSizeRwd: IRwdStyles = { lg: 2, md: 2, _: 2 };
export const maxWidthRwd: IRwdStyles = { lg: '992px', md: '100%', _: '100%' };

export const layoutRWD = {
  signUpForm: {
    maxWidth: {
      _: '100%',
      lg: '490px',
      md: '490px',
    },
    minHeight: {
      _: '450px',
      lg: '450px',
      md: '450px',
    },
  },
};

export const theme = {
  borders: [
    0,
    '1px solid',
    '2px solid',
    '4px solid',
    '8px solid',
    '16px solid',
    '32px solid',
  ],
  breakpoints,
  colors,
  fontSizes,
  fontWeights,
  fonts,
  letterSpacings,
  lineHeights,
  opacities: styleOpacityObj,
  radii: [0, 5, 10, 16, 20, 22, 24, 32, 45, 9999, '100%'],
  shadows: {
    card: 'rgb(0 0 0 / 20%) 2px 2px 2px',
    menu: 'rgb(0 0 0 / 30%) 0px 1px 3px',
    signUpForm: 'rgba(0, 0, 0, 0.5) 5px 5px 5px 1px',
  },
  sizes: [
    '100%',
    '50%',
    4,
    8,
    12,
    16,
    20,
    24,
    28,
    32,
    36,
    40,
    44,
    48,
    52,
    56,
    60,
  ],
  space,
};
