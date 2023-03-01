import React from 'react';
import { useCreatorReadyI18n } from '../../../hooks/i18n/i18n.hooks';
import * as S from './connect-button.styles';
import BloctoSVG from '../../../assets/svg/icon_blocto.svg';
import {
  MindtrixUserEnum,
  useSignInOutBlocto,
} from '../../../hooks/wallet/wallet.hooks';

interface Props {
  userEnum: MindtrixUserEnum;
}
const FlowSignInOutButtonContainer: React.FC<Props> = ({ userEnum }) => {
  const { text } = useCreatorReadyI18n();
  const { onClick, loggedIn } = useSignInOutBlocto(userEnum);

  return (
    <S.Button onClick={onClick().signInOrOut}>
      {loggedIn ? text.button_disconnect_wallet : text.button_connect_wallet}
    </S.Button>
  );
};

export default FlowSignInOutButtonContainer;
