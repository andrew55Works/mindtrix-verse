import styled from 'styled-components';

export const MainContainer = styled.div<{
  isShowPadding: boolean;
}>`
  display: flex;
  flex-direction: row;
  flex: 1;
  padding: ${(props) => (props?.isShowPadding ?? false ? '24px' : 0)};
`;

interface TopNavigationContainerProps {
  isAbsolutePosition?: boolean;
  pageBackground?: string;
  pageBackgroundImageUrl?: string;
}
export const TopNavigationContainer = styled.div<TopNavigationContainerProps>`
  ${(props) =>
    props.pageBackground ? ` background: ${props.pageBackground}` : {}};
  ${(props) =>
    props.pageBackgroundImageUrl
      ? `
      background-position: center;
      background-repeat: no-repeat;
      background-image: url('${props.pageBackgroundImageUrl}');`
      : {}};
  width: 100%;
  min-height: 100vh;
  position: ${(props) =>
    props?.isAbsolutePosition ?? false ? 'absolute' : 'inherit'};
`;
