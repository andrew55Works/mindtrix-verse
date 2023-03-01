import { FC } from 'react';
import * as S from './hamburger.styles';
import { useAppDispatch } from '../../redux/store';
import { toggleIsShowHamburgerAction } from '../../redux/page/page.slice';

interface Props {
  isShow: boolean;
}
export const Hamburger: FC<Props> = ({ isShow }) => {
  const dispatch = useAppDispatch();
  if (!isShow) return null;
  const onClick = {
    hamburger: () => {
      dispatch(toggleIsShowHamburgerAction());
    },
  };
  return (
    <S.Container onClick={onClick.hamburger}>
      <svg viewBox='0 0 100 80'>
        <rect width='100' height='10' />
        <rect y='30' width='100' height='10' />
        <rect y='60' width='100' height='10' />
      </svg>
    </S.Container>
  );
};
