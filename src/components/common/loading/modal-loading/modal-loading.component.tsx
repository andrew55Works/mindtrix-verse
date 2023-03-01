import React, { FC } from 'react';
import * as S from './modal-loading.styles';
import Lottie from 'react-lottie';
import LoadingSquareLottie from '../../../../assets/lottie/mindtrix_logo_loading.json';
import { Text } from '../../../../styles/styled-system/text.theme';

interface Props {
  isShow: boolean;
  message?: string | null;
}
export const ModalLoading: FC<Props> = ({ isShow, message }) => {
  const options = {
    animationData: LoadingSquareLottie,
    loop: true,
    autoplay: true,
    isClickToPauseDisabled: true,
  };
  if (!isShow) return null;
  return (
    <S.Cover>
      <S.LottieContainer>
        <Lottie options={options} height={150} width={150} />
      </S.LottieContainer>
      {message ? (
        <Text.h3
          status={'primary'}
          color={'#ffffff'}
          fontWeight={800}
          marginTop={'8px'}
          marginBottom={'8px'}
          children={message}
        />
      ) : null}
    </S.Cover>
  );
};
