import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as S from './hamburger.styles';
import LoginMenuComponent from '../village-login-menu/login-menu.component';
import { CommonFlexContainer } from '../../common/flexbox/common-flex.styles';

interface Props {
  isShow: boolean;
  isWhiteStyle: boolean;
  pageBackground?: string;
}

export const VillageTopNavigationHamburger: FC<Props> = ({
  isShow,
  isWhiteStyle,
  pageBackground,
}) => {
  const onChange = {
    searchInput: (value: any, isValid: boolean) => {},
  };
  return (
    <AnimatePresence exitBeforeEnter={true}>
      {isShow && (
        <motion.div
          style={S.framer.style.modal(pageBackground)}
          variants={S.framer.variant.modal()}
          initial={'hidden'}
          animate={'visible'}
          exit={'hidden'}
        >
          {/*<CommonFlexContainer*/}
          {/*  paddingLeft={'18px'}*/}
          {/*  paddingRight={'18px'}*/}
          {/*  width={'100%'}*/}
          {/*>*/}
          {/*  <CommonSearchInput*/}
          {/*    maxWidth={'100%'}*/}
          {/*    onChange={onChange.searchInput}*/}
          {/*  />*/}
          {/*</CommonFlexContainer>*/}
          <CommonFlexContainer
            flexDirection={'column'}
            width={'100%'}
            justifyContent={'flex-start'}
          >
            <LoginMenuComponent isWhiteStyle={isWhiteStyle} />
          </CommonFlexContainer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
