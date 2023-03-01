import React, { FC, useContext, useEffect, useRef } from 'react';
import * as S from './vienna-woods-pre-scene.styles';
import { Text } from '../../../../styles/styled-system/text.theme';
import { Button } from '../../../../styles/styled-system/button.theme';
import MindtrixLogoWhite from '../../../../assets/svg/logo_mindtrix_creators_white.svg';
import { AnimatePresence, motion, MotionStyle } from 'framer-motion';
import { ViennaWoodsContext } from '../../../../pages/world/vienna-woods';
import PackLanding from '../../../../assets/svg/vienna_world/pack_landing.svg';

interface Props {
  enterWorld: () => void;
  isPreSceneAnimating: boolean;
  isShow: boolean;
  setIsPreSceneAnimating: React.Dispatch<boolean>;
}
export const ViennaWoodsPreScene: FC<Props> = ({
  enterWorld,
  isPreSceneAnimating,
  isShow,
  setIsPreSceneAnimating,
}) => {
  const context = useContext(ViennaWoodsContext);
  const texts = context?.texts.viennaWoodsCommonI18nText;
  const isInitAnimateRef = useRef(false);
  const cloudImgUrls = {
    end: '/img/world/vienna_woods/cloud_before_entering.png',
    bottom: '/img/world/vienna_woods/cloud_go_down.png',
    top: '/img/world/vienna_woods/cloud_go_up.png',
  };
  const seagullImgUrls = {
    first: '/img/world/vienna_woods/seagull_1.gif',
    second: '/img/world/vienna_woods/seagull_2.gif',
    third: '/img/world/vienna_woods/seagull_3.gif',
    fourth: '/img/world/vienna_woods/seagull_4.gif',
    fifth: '/img/world/vienna_woods/seagull_5.gif',
  };
  const text = {
    enter_description: texts?.label_introduction ?? '',
    enter_button: texts?.button_explore ?? '',
  };

  const onClick = {
    enterWorld,
  };

  const framerVariants = {
    backgroundCover: {
      visible: { opacity: 1 },
      hidden: { opacity: 0 },
    },
    endingCloud: {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
      },
    },
  };

  const _style = {
    container: (): MotionStyle => ({
      position: 'relative',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: 'rgba(0, 0, 0, 0.6)',
      zIndex: 3,
    }),
    endingCloud: (): MotionStyle => ({
      position: 'absolute',
      height: '100%',
      width: '100%',
      left: 0,
      top: 0,
    }),
  };

  useEffect(() => {
    if (!isShow || isInitAnimateRef.current) return;

    const timeout = setTimeout(() => {
      setIsPreSceneAnimating(true);
    }, 800);
    return () => clearTimeout(timeout);
  }, [isShow]);

  return (
    <AnimatePresence exitBeforeEnter={true}>
      {isShow ? (
        <motion.div
          style={_style.container()}
          variants={framerVariants.backgroundCover}
          initial={'hidden'}
          animate={'visible'}
          exit={'hidden'}
        >
          <S.CloudTopImg
            isAnimating={isPreSceneAnimating}
            src={cloudImgUrls.top}
          />
          <S.CloudBottomImg
            isAnimating={isPreSceneAnimating}
            src={cloudImgUrls.bottom}
          />

          <S.Seagull1
            isAnimating={isPreSceneAnimating}
            src={seagullImgUrls.first}
          />
          <S.Seagull2
            isAnimating={isPreSceneAnimating}
            src={seagullImgUrls.second}
          />
          <S.Seagull3
            isAnimating={isPreSceneAnimating}
            src={seagullImgUrls.third}
          />
          <S.Seagull4
            isAnimating={isPreSceneAnimating}
            src={seagullImgUrls.fourth}
          />
          <S.Seagull5
            isAnimating={isPreSceneAnimating}
            src={seagullImgUrls.fifth}
          />

          <motion.div
            style={_style.endingCloud()}
            variants={framerVariants.endingCloud}
          >
            <S.CloudEndImg
              isAnimating={isPreSceneAnimating}
              src={cloudImgUrls.end}
            />
          </motion.div>
          <S.EnterView isAnimating={isPreSceneAnimating}>
            <S.MindtrixLogo>
              <MindtrixLogoWhite />
            </S.MindtrixLogo>
            <Text.h4
              status={'basic'}
              color={'white'}
              marginTop={'20px'}
              marginBottom={'20px'}
              isAutoWrap={true}
              children={text.enter_description}
            />
            <Button.Square
              status={'basic'}
              size={'medium'}
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              appearance={'filled'}
              fontSize={'20px'}
              fontWeight={800}
              borderRadius={'31px'}
              color={'black'}
              onClick={onClick.enterWorld}
            >
              <Text.h2
                status={'basic'}
                my={0}
                fontWeight={700}
                isAutoWrap={true}
                marginRight={'12px'}
                children={text.enter_button}
              />
              <PackLanding />
            </Button.Square>
          </S.EnterView>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
