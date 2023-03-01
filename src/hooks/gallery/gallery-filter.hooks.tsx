import React, { useEffect, useState } from 'react';
import { SwitchEnum } from '../../components/common/input/common-switch';
import { GalleryDisplayEnum } from '../../components/gallery/gallery-card/gallery-card-animation.component';
import GalleryFilterPublic from '../../components/gallery/gallery-filter/gallery-filter-public';
import GalleryFilterMy from '../../components/gallery/gallery-filter/gallery-filter-my';
import { BreadcrumbListItemJsonLd } from '../../redux/breadcrumb/breadcrumb.interface';
import { updateLevelsBreadcrumbAction } from '../../redux/breadcrumb/breadcrumb.slice';
import { useAppDispatch } from '../../redux/store';
import { useNFTNameFromMyGalleryPath } from '../seo/get-dynamic-path-param.hooks';

interface Props {
  addressFromQuery: string;
  fnOnUseEffect?: () => void;
}
export const useGalleryFilter = ({
  addressFromQuery,
  fnOnUseEffect,
}: Props) => {
  const dispatch = useAppDispatch();
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);
  const [isShowFilter, setIsShowFilter] = useState(true);

  const [switchEnum, setSwitchEnum] = useState(SwitchEnum.PRIMARY_LEFT);
  const galleryDisplayEnum =
    switchEnum === SwitchEnum.PRIMARY_LEFT
      ? GalleryDisplayEnum.GROUP_BY_SHOW
      : GalleryDisplayEnum.GROUP_BY_ESSENCE;
  const updateBreadcrumbs = (breadcrumbs: Array<BreadcrumbListItemJsonLd>) => {
    const isExist = breadcrumbs && (breadcrumbs?.length ?? 0) > 0;
    if (!isExist) return;
    dispatch(updateLevelsBreadcrumbAction(breadcrumbs));
  };

  const isGroupByCreation =
    galleryDisplayEnum === GalleryDisplayEnum.GROUP_BY_ESSENCE;

  const onClick = {
    galleryFilter: (
      e: React.ChangeEvent<HTMLInputElement>,
      _switchEnum: SwitchEnum,
    ) => {
      setIsGalleryLoading(true);
      setSwitchEnum(_switchEnum);
    },
  };

  const GalleryFilterPublicElm = (
    <GalleryFilterPublic
      addressFromQuery={addressFromQuery}
      onClick={onClick.galleryFilter}
      isShowFilter={true}
    />
  );
  const GalleryFilterMyElm = (
    <GalleryFilterMy
      addressFromQuery={addressFromQuery}
      onClick={onClick.galleryFilter}
      isShowFilter={isShowFilter}
    />
  );

  useEffect(() => {
    fnOnUseEffect && fnOnUseEffect();
    const loadedDateTimeout = setTimeout(() => {
      // setNFTs([...]);
      setIsGalleryLoading(false);
    }, 1000);
    return () => {
      clearTimeout(loadedDateTimeout);
    };
  }, [switchEnum]);

  return {
    switchEnum,
    setIsShowFilter,
    setSwitchEnum,
    isGroupByCreation,
    isGalleryLoading,
    setIsGalleryLoading,
    galleryDisplayEnum,
    updateBreadcrumbs,
    onClick,
    GalleryFilterPublic: GalleryFilterPublicElm,
    GalleryFilterMy: GalleryFilterMyElm,
  };
};
