import React from 'react';
import { CommonFlexContainer } from '../../common/flexbox/common-flex.styles';
import { Text } from '../../../styles/styled-system/text.theme';
import EmptyDataSvg from '../../../assets/svg/img_empty_data.svg';

const GalleryNotLogin = () => {
  const text = {
    unLoginDefault: 'Please login to explore your collections.',
  };
  return (
    <CommonFlexContainer
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <EmptyDataSvg />
      <Text.h2 status={'basic'} margin={4} children={text.unLoginDefault} />
    </CommonFlexContainer>
  );
};

export default GalleryNotLogin;
