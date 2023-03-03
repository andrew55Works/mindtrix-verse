import React, { FC } from 'react';
import CommonInputWithWarning from './common-input';
import SearchSvg from '../../../assets/svg/icon_search_default.svg';
import { noneValidation } from '../../../utils/form-validation.utils';

interface Props {
  maxWidth?: number | string;
  onChange: (value: any, isValid: boolean) => void;
}
const CommonSearchInput: FC<Props> = ({ maxWidth = 412, onChange }) => {
  return (
    <CommonInputWithWarning
      autocomplete={'on'}
      maxLength={100}
      maxWidth={maxWidth}
      minWidth={225}
      width={'100%'}
      placeholder={'Search podcast, creators, or episodes'}
      name={'search-input'}
      marginBottom={0}
      isNoneBorderStyle={true}
      customValidation={noneValidation}
      onChange={onChange}
      isShowCrossIcon={true}
      rightIcon={<SearchSvg />}
    />
  );
};

export default CommonSearchInput;
