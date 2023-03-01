import React, { FC } from 'react';
import { CommonFlexContainer } from '../common/flexbox/common-flex.styles';
import CoverImage from '../common/cover/cover-image.component';
import bannerImg from '../../../public/img/mp_banner.jpg';

const Banner: FC<{}> = () => {
  return (
    <CommonFlexContainer width={'100%'} height={'200px'}>
      <CoverImage
        alt={'banner'}
        src={bannerImg}
        fill={true}
        objectFit={'cover'}
      />
    </CommonFlexContainer>
  );
};

export default Banner;
