import React, { FC } from 'react';
import * as S from './login-menu.styles';
import { Menu } from './login-menu.styles';
import { Text } from '../../../styles/styled-system/text.theme';
import { useSelector } from 'react-redux';
import { selectCollectorProfile } from '../../../redux/collector/collector.selector';
import { initialWallet } from '../../../types/wallet.type';
import MenuLoginWithWallet from './login-menu-wallet.component';
import { useRouter } from 'next/router';
import { PAGE_URL } from '../../../utils/page-router.utils';
import { useMenuAccountI18n } from '../../../hooks/i18n/i18n-marketplace.hooks';
import { LanguageSwitcher } from '../village-top-navigation/language-switer';
import { useIsMobileLayout } from '../../../hooks/window/resize.hooks';
import { USER_ROLE_ENUM } from '../../../redux/collector/collector.interface';

interface Props {
  isWhiteStyle: boolean;
}
const LoginMenuComponent: FC<Props> = ({ isWhiteStyle }) => {
  const nextRoute = useRouter();
  const { text } = useMenuAccountI18n();
  const { isMobileLayout } = useIsMobileLayout();
  const collectorProfile = useSelector(selectCollectorProfile);
  const collectorWallet = collectorProfile?.wallet ?? initialWallet;
  const collectorWalletAddress = collectorWallet?.blocto?.address ?? '';
  const isLoggedIn = collectorWallet?.blocto?.loggedIn ?? '';
  const flowBalanceRaw = collectorWallet?.blocto?.balance?.flow?.str ?? '0.0';
  const flowBalanceStr = `${flowBalanceRaw} FLOW`;
  const userRole = collectorProfile?.role ?? USER_ROLE_ENUM.COLLECTOR;
  const isCreator = userRole === USER_ROLE_ENUM.CREATOR;
  const roleText = isCreator ? text.label_title_2b : text.label_title_2c;

  const onClick = {
    redirectToMyCollection: () => {
      nextRoute.push(`${PAGE_URL.collectors_my.path}/0x`);
    },
  };

  // const text = {
  //   collector: 'Collector',
  //   language: 'Language',
  //   walletAddress: 'Wallet Address',
  //   myCollection: 'My collections',
  // };
  return (
    <>
      {isMobileLayout ? (
        <S.Menu.Row>
          <Text.h4 status={'basic'} children={text.label_language} my={0} />
          <LanguageSwitcher isHide={false} />
        </S.Menu.Row>
      ) : null}
      <S.Menu.Row isShow={isLoggedIn}>
        <Text.h4 status={'basic'} children={roleText} my={0} />
      </S.Menu.Row>
      <S.Menu.Column isShow={isLoggedIn}>
        <Text.h4 status={'basic'} children={text.label_wallet} my={0} />
        <Text.h2 status={'basic'} children={collectorWalletAddress} my={1} />
        <Text.h2
          status={'basic'}
          children={flowBalanceStr}
          color={'secondary.6'}
          my={1}
        />
      </S.Menu.Column>
      <S.Menu.Row isShow={isLoggedIn}>
        <a
          href={`${PAGE_URL.collectors_my.path}/${collectorWalletAddress}`}
          style={{ textDecoration: 'none' }}
        >
          <Text.h4
            status={'basic'}
            children={text.label_mycollections}
            my={0}
          />
        </a>
      </S.Menu.Row>
      {isCreator ? (
        <S.Menu.Row isShow={isLoggedIn}>
          <a href={PAGE_URL.creators_home} style={{ textDecoration: 'none' }}>
            <Text.h4
              status={'basic'}
              children={text.label_2bdashboard}
              my={0}
            />
          </a>
        </S.Menu.Row>
      ) : null}
      <S.Menu.Row isShow={isLoggedIn}>
        <a
          href={PAGE_URL.collectors_marketplace.path}
          style={{ textDecoration: 'none' }}
        >
          <Text.h4 status={'basic'} children={text.label_marketplace} my={0} />
        </a>
      </S.Menu.Row>
      <S.Menu.Row>
        <MenuLoginWithWallet />
      </S.Menu.Row>
    </>
  );
};

export default LoginMenuComponent;
