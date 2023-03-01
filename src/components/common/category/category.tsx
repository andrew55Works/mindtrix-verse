import React, { FC } from 'react';
import * as S from './category.styles';
import { Text } from '../../../styles/styled-system/text.theme';

interface CategoryProps {
  text: string;
}

const Category: FC<CategoryProps> = ({ children, text }) => {
  return (
    <S.Container>
      {text ? (
        <Text.h5 status={'basic'} color={'basic.0'} children={text} />
      ) : null}
      {children}
    </S.Container>
  );
};

export default Category;
