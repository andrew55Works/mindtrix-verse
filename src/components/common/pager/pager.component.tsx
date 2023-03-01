import React, { useContext, useEffect } from 'react';
import * as S from './pager.styles';
import { Text } from '../../../styles/styled-system/text.theme';
import { PagerContext } from './pager-with-dot.component';
import { CommonFlexContainer } from '../flexbox/common-flex.styles';
import { Page } from 'framer';

export interface Pager {
  customLayout: JSX.Element | null;
  description: JSX.Element | null;
  height: string | number;
  img: JSX.Element | null;
  index: number;
  title: string;
  width: string | number;
}

export const Pagers = () => {
  const { currentPageIndex, pagers, setPageIndex, height, width } =
    useContext(PagerContext);

  useEffect(() => {
    const ele = document.getElementById('pager-container');
    if (ele) {
      ele.style.overflowY = 'scroll';
      ele.style.overflowX = 'hidden';
    }
  }, []);

  return (
    <Page
      width={'100%'}
      height={height}
      id={'pager-container'}
      defaultEffect={'cube'}
      gap={0}
      currentPage={currentPageIndex}
      onChangePage={(current, _) => {
        if (setPageIndex) {
          setPageIndex(current);
        }
      }}
    >
      {pagers.map((page, i) => {
        const customLayout = page?.customLayout ?? null;
        const img = page?.img ?? null;
        const isImgExist = !!img;
        const title = page?.title ?? '';
        const description = page?.description ?? '';

        return (
          <S.Page
            key={i}
            aria-hidden={currentPageIndex !== i}
            tabIndex={currentPageIndex === i ? 0 : -1}
          >
            <CommonFlexContainer
              flexDirection={'column'}
              justifyContent={'center'}
              maxWidth={'768px'}
            >
              {title ? (
                <Text.h1
                  status={'primary'}
                  marginTop={0}
                  background={
                    '-webkit-linear-gradient(-45deg, #E6DA44 0%, #FEF392 50%, #E6DA44 100%);'
                  }
                  isGradient={true}
                  isAutoWrap={true}
                  fontSize={'48px'}
                  textAlign={'center'}
                  color={''}
                  children={title}
                />
              ) : null}
              {description ? (
                <Text.h3
                  status={'primary'}
                  marginTop={0}
                  isAutoWrap={true}
                  color={'#ffffff'}
                  paddingRight={'16px'}
                  paddingLeft={'16px'}
                  textAlign={'left'}
                  children={description}
                />
              ) : null}
              {isImgExist ? (
                <S.SvgContainer
                  width={['180px', '350px']}
                  height={['180px', '350px']}
                >
                  {img}
                </S.SvgContainer>
              ) : null}
              {customLayout ? customLayout : null}
            </CommonFlexContainer>
          </S.Page>
        );
      })}
    </Page>
  );
};
