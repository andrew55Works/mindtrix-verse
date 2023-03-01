import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  colors,
  statusColorSystemHex,
} from '../../../styles/styled-system/color.theme';
import {
  BottomProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from 'styled-system';

export const PagerContainer = styled.div`
  max-width: 768px;
`;

export const PagerAnimatedContainer = styled(motion.div)`
  flex-direction: row;
  direction: ltr;
  cursor: grab;
  will-change: transform;
  min-height: 0;
  flex: 1;
  display: flex;
`;

export const Page = styled.div<SpaceProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  height: fit-content;
  overflow: hidden;
  outline: none;
  ${space};
`;

export const Dot = styled.div`
  cursor: pointer;
  border-radius: 50%;
  background: ${(props: { isSelected: boolean }) =>
    props?.isSelected ?? false
      ? 'linear-gradient(90deg, #E6DA44 0%, #FEF392 47%, #E5DB57 100%);'
      : '#ffffff'};
  margin: 0 12px;
  height: ${(props: { isSelected: boolean }) =>
    props?.isSelected ?? false ? '30px' : '24px'};
  width: ${(props: { isSelected: boolean }) =>
    props?.isSelected ?? false ? '30px' : '24px'};
  &:hover {
    filter: ${(props: { isSelected: boolean }) =>
      props?.isSelected ?? false ? 'brightness(1)' : 'brightness(1.5)'};
  }
`;

export const DotContainer = styled.div<BottomProps & SpaceProps & LayoutProps>`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  bottom: 0;
  height: 60px;
  width: 100%;
  ${space};
  ${layout};
`;

export const PagerWithDotContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const SvgContainer = styled.div<LayoutProps & SpaceProps>`
  cursor: ${(props) => (props.onClick ? 'pointer' : 'normal')};
  align-self: center;
  height: 100%;
  width: 100%;
  ${layout};
  ${space};
`;

export const RecordPagerContainer = styled.div`
  margin: 0 auto;
  max-width: 768px;
  padding: 0 12px;
`;

export const BlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  padding: 16px;
  margin-bottom: 12px;
`;

export const QuestionBox = styled.div`
  display: flex;
  padding: 12px 0;
  width: 99%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  border: 1px dashed ${statusColorSystemHex.primary};
`;

export const AudioRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  min-width: 200px;
  width: 100%;
  max-width: 300px;
  margin-bottom: 16px;
`;

export const CampaignDate = styled.div`
  padding: 4px 8px;
  border-radius: 45px;
  border: 2px solid white;
  background: linear-gradient(90deg, #e6da44 0%, #fef392 47%, #e5db57 100%);
  margin-bottom: 16px;
  min-width: 150px;
`;
