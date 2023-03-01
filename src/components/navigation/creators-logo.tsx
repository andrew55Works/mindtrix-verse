import React, { FC } from 'react';
import { useRouter } from 'next/router';
import * as S from './logo.styles';
import MindtrixCreatorsLSvg from '../../assets/svg/logo_mindtrix_creators.svg';
import MindtrixCreatorsLWhiteSvg from '../../assets/svg/logo_mindtrix_creators_white.svg';
import { PAGE_URL } from '../../utils/page-router.utils';

interface Props {
  isWhiteStyle: boolean;
}
export const CreatorsLogo: FC<Props> = ({ isWhiteStyle = false }) => {
  const siteURL = PAGE_URL.collectors_marketplace.path;
  const router = useRouter();
  const redirectToMarketplace = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(siteURL);
  };

  return (
    <S.LogoContainer
      href={'#'}
      onClick={redirectToMarketplace}
      target={'_blank'}
    >
      {isWhiteStyle ? <MindtrixCreatorsLWhiteSvg /> : <MindtrixCreatorsLSvg />}
    </S.LogoContainer>
  );
};
