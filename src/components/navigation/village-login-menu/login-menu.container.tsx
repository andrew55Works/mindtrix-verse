import { FC } from 'react';
import LoginMenuComponent from '../village-login-menu/login-menu.component';
import * as S from './login-menu.styles';

interface Props {}
const LoginMenuContainer: FC<Props> = () => {
  return (
    <S.Container className={'menu-content'}>
      <LoginMenuComponent />
    </S.Container>
  );
};

export default LoginMenuContainer;
