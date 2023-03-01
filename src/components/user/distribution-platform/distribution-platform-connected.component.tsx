import React, { FC } from 'react';
import PlatformSavedSvg from '../../../assets/svg/icon_platform_saved.svg';
import * as S from './distribution-platform.styles';
interface Props {
  isShow: boolean;
}
const DistributionPlatformConnected: FC<Props> = ({ isShow }) => {
  if (!isShow) return null;
  return (
    <S.PlatformSavedIcon>
      <PlatformSavedSvg />
    </S.PlatformSavedIcon>
  );
};

export default DistributionPlatformConnected;
