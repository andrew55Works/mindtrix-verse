import React from 'react';
import styled from 'styled-components';

export const LeftImgAndTextContainer = styled.div`
  display: flex;
  flex: 20;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 20px;
`;

export const LeftContentContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  padding: 20px 20px 10px 127px;
  z-index: 2;
  min-height: 160px;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;

export const LeftTextScrollContainer = styled.div`
  margin-left: 40px;
  height: 100%;
  max-height: 200px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 14px;
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border: 4px solid rgba(0, 0, 0, 0);
    border-radius: 9999px;
    background-clip: padding-box;
    background-color: #aaaaaa80;
  }
`;

export const LeftBackgroundColor = styled.div<{ themeColor: string }>`
  position: absolute;
  left: 0;
  bottom: 0;
  background: ${(props) => props?.themeColor ?? '#8C8477'};
  height: 310px;
  width: 100%;
  padding: 0 100px;
  margin: 0 -100px;
  transform: rotate(-4deg) translateY(50px);
`;

export const LandmarkMaskSvg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  opacity: 0;
  svg {
    height: 100%;
    width: 100%;
  }
`;

export const LocationDetailImgContainer = styled.div`
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-self: flex-start;
  align-items: flex-end;
  margin-right: 20px;
  max-height: 660px;
  height: auto;
  max-width: 1000px;
  width: auto;
  margin-left: 20px;
  transform: translateY(40px);
`;

export const LocationDetailImg = styled.img`
  height: auto;
  width: auto;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
`;

export const PaymentContainer = styled.div`
  display: flex;
  flex: 10;
  position: relative;
  margin-right: 60px;
  margin-left: 70px;
  width: 100%;
  max-width: 450px;
  z-index: 3;
`;
