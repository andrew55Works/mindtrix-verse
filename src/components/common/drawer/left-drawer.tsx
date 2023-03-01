import { View } from 'react-native';
import Button, { ButtonAppearanceEnum, ButtonStatusEnum } from '../button';
import { PAGE_URL } from '../../../utils/page-router.utils';
import React, { FC } from 'react';
import { _styles } from './drawer.styles';
import { openNewWindow } from '../../../utils/window.utils';
import HomeSVG from '../../../assets/icons/icon_home.svg';
import NotificationSVG from '../../../assets/icons/icon_notification.svg';
import LogoutSvg from '../../../assets/icons/icon_logout.svg';
import AddEssenceSvg from '../../../assets/svg/icon_add_essence.svg';
import DonationSvg from '../../../assets/svg/icon_donate.svg';
import FeedbackSvg from '../../../assets/icons/icon_feedback.svg';
import theme from '../../../styles/eva-styled-system.json';
import { LeftDrawerProps } from './index';
import { useCreatorCommonI18n } from '../../../hooks/i18n/i18n.hooks';
import { useRouter } from 'next/router';
import { useIsMobileLayout } from '../../../hooks/window/resize.hooks';
import { toggleIsShowHamburgerAction } from '../../../redux/page/page.slice';
import { useAppDispatch } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { selectIsCreatorSignIn } from '../../../redux/creator/creator.selector';
import * as S from './drawer.styles';

export const LeftDrawer: FC<LeftDrawerProps> = (props) => {
  const { text } = useCreatorCommonI18n();
  const dispatch = useAppDispatch();
  const nextRouter = useRouter();
  const { isMobileLayout } = useIsMobileLayout();
  const backgroundColor = props?.backgroundColor ?? theme['system-bg-gray-500'];
  const isCreatorSignIn = useSelector(selectIsCreatorSignIn);
  const onClick = props?.onClick ?? null;
  const styles = _styles(backgroundColor, isMobileLayout);

  const _onClick = {
    openGoogleForm: () => {
      openNewWindow('https://forms.gle/VNfmqv9mMeHgB95T9');
    },
  };

  const HomeIcon = () => (
    <S.LeftDrawerImgButton>
      <HomeSVG />
    </S.LeftDrawerImgButton>
  );

  const NotificationIcon = () => (
    <S.LeftDrawerImgButton>
      <NotificationSVG />
    </S.LeftDrawerImgButton>
  );
  const LogoutIcon = () => (
    <S.LeftDrawerImgButton>
      <LogoutSvg />
    </S.LeftDrawerImgButton>
  );

  const AddEssenceIcon = () => (
    <S.LeftDrawerImgButton>
      <AddEssenceSvg />
    </S.LeftDrawerImgButton>
  );
  const DonationIcon = () => (
    <S.LeftDrawerImgButton>
      <DonationSvg />
    </S.LeftDrawerImgButton>
  );

  const FeedbackIcon = () => (
    <S.LeftDrawerImgButton>
      <FeedbackSvg />
    </S.LeftDrawerImgButton>
  );
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Button.Square
          appearance={ButtonAppearanceEnum.filled}
          accessoryLeft={HomeIcon}
          isShow={isCreatorSignIn}
          status={ButtonStatusEnum.drawer}
          label={text.navigation_side_menu_item_home}
          style={styles.buttonSecondary}
          onClick={() => {
            dispatch(toggleIsShowHamburgerAction());
            nextRouter.push(PAGE_URL.creators_home);
          }}
        />
        {/*<Button.Square*/}
        {/*  appearance={ButtonAppearanceEnum.filled}*/}
        {/*  accessoryLeft={NotificationIcon}*/}
        {/*  status={ButtonStatusEnum.drawer}*/}
        {/*  label={i18n.sidebar.notification}*/}
        {/*  style={styles.buttonSecondary}*/}
        {/*/>*/}
        {/*<Button.Square*/}
        {/*  isShow={isCreatorSignIn}*/}
        {/*  appearance={ButtonAppearanceEnum.filled}*/}
        {/*  accessoryLeft={AddEssenceIcon}*/}
        {/*  status={ButtonStatusEnum.drawer}*/}
        {/*  label={text.navigation_side_menu_item_add_audio_essence}*/}
        {/*  style={styles.buttonSecondary}*/}
        {/*  onClick={() => {*/}
        {/*    dispatch(toggleIsShowHamburgerAction());*/}
        {/*    nextRouter.push(PAGE_URL.creators_create_audio_essence);*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Button.Square*/}
        {/*  isShow={isCreatorSignIn}*/}
        {/*  appearance={ButtonAppearanceEnum.filled}*/}
        {/*  accessoryLeft={AddEssenceIcon}*/}
        {/*  status={ButtonStatusEnum.drawer}*/}
        {/*  label={text.navigation_side_menu_item_add_image_essence}*/}
        {/*  style={styles.buttonSecondary}*/}
        {/*  onClick={() => {*/}
        {/*    dispatch(toggleIsShowHamburgerAction());*/}
        {/*    nextRouter.push(PAGE_URL.creators_create_image_essence);*/}
        {/*  }}*/}
        {/*/>*/}
        <Button.Square
          isShow={isCreatorSignIn}
          appearance={ButtonAppearanceEnum.filled}
          accessoryLeft={DonationIcon}
          status={ButtonStatusEnum.drawer}
          label={text.navigation_side_menu_donation}
          style={styles.buttonSecondary}
          onClick={() => {
            dispatch(toggleIsShowHamburgerAction());
            nextRouter.push(PAGE_URL.creators_monetization_donation_setting);
          }}
        />
        <Button.Square
          appearance={ButtonAppearanceEnum.filled}
          accessoryLeft={LogoutIcon}
          status={ButtonStatusEnum.drawer}
          label={text.navigation_side_menu_item_logout}
          style={styles.buttonSecondary}
          onClick={onClick().signInOrOut}
        />
      </View>
      <View style={styles.footer}>
        <Button.Square
          appearance={ButtonAppearanceEnum.filled}
          accessoryLeft={FeedbackIcon}
          status={ButtonStatusEnum.drawer}
          label={text.navigation_button_give_feedback}
          style={styles.buttonSecondary}
          onClick={_onClick.openGoogleForm}
        />
      </View>
    </View>
  );
};
