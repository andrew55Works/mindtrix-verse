import { CommonFlexContainer } from '../../common/flexbox/common-flex.styles';
import React, { FC } from 'react';
import GallerySwitch, {
  GallerySwitcherProps,
} from '../gallery-switch/gallery-switch';

const GalleryFilterPublic: FC<GallerySwitcherProps> = ({
  onClick,
  isShowFilter,
}) => {
  return (
    <CommonFlexContainer
      flexDirection={'row'}
      justifyContent={'flex-end'}
      alignItems={'center'}
      marginTop={5}
      width={'100%'}
    >
      {/*<Button.Square*/}
      {/*  status={'primary'}*/}
      {/*  appearance={'filled'}*/}
      {/*  marginLeft={0}*/}
      {/*  size={'medium'}*/}
      {/*  children={'Filter'}*/}
      {/*  onClick={() => alert('filter')}*/}
      {/*  justifyContent={'center'}*/}
      {/*/>*/}
      {GallerySwitch({ onClick, isShowFilter })}
    </CommonFlexContainer>
  );
};

export default GalleryFilterPublic;
