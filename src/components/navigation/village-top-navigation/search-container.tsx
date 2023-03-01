import * as S from './village-top-navigation.styles';
import CommonSearchInput from '../../common/input/common-search-input';
import React, { FC } from 'react';
import { useIsMobileLayout } from '../../../hooks/window/resize.hooks';

interface Props {
  isMobileLayout: boolean;
  isShow?: boolean;
}
export const SearchContainer: FC<Props> = ({
  isMobileLayout,
  isShow = true,
}) => {
  const pathsExcludeSearchInput = ['/room'];
  const pathname = window?.location?.pathname ?? '';
  const isHideSearchInput = pathsExcludeSearchInput.some(
    (excludedPath) => pathname.indexOf(excludedPath) >= 0,
  );

  const onChange = {
    searchInput: (value: any, isValid: boolean) => {},
  };
  return !isMobileLayout ? (
    <S.SearchContainer>
      {!isHideSearchInput && isShow && (
        <CommonSearchInput onChange={onChange.searchInput} />
      )}
    </S.SearchContainer>
  ) : null;
};
