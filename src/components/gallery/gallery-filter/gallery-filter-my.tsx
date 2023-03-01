import { CommonFlexContainer } from '../../common/flexbox/common-flex.styles';
import React, { FC } from 'react';
import GallerySwitch, {
  GallerySwitcherProps,
} from '../gallery-switch/gallery-switch';
import { useBreadcrumb } from '../../../hooks/common/breadcrumb/breadcrumb.hooks';
import { useNFTNameFromMyGalleryPath } from '../../../hooks/seo/get-dynamic-path-param.hooks';

const GalleryFilterMy: FC<GallerySwitcherProps> = ({
  addressFromQuery,
  onClick,
  isShowFilter,
}) => {
  const { breadcrumbEle: Breadcrumb } = useBreadcrumb(addressFromQuery);
  const { name: nftName } = useNFTNameFromMyGalleryPath();
  const isShowGallerySwitch = !nftName;
  return (
    <CommonFlexContainer
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      marginTop={5}
    >
      {Breadcrumb}
      {isShowGallerySwitch && (
        <GallerySwitch
          addressFromQuery={addressFromQuery}
          onClick={onClick}
          isShowFilter={isShowFilter}
        />
      )}
    </CommonFlexContainer>
  );
};

export default GalleryFilterMy;
