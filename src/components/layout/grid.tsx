import styled from 'styled-components';
import { withDefaultPropsStyled } from '../../utils/styled-system.utils';
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from 'styled-system';
import { FC } from 'react';
import { GalleryDisplayEnum } from '../gallery/gallery-card/gallery-card-animation.component';

interface GalleryGridProps
  extends ColorProps,
    FlexboxProps,
    GridProps,
    LayoutProps,
    SpaceProps {
  galleryDisplayEnum?: GalleryDisplayEnum;
}

// const getGridTemplateColumnsStyle = ({
//   galleryDisplayEnum,
// }: GalleryGridProps) => {
//   const isGroupByCreation =
//     galleryDisplayEnum === GalleryDisplayEnum.GROUP_BY_CREATION;
//   return css`
//     grid-template-columns: ${isGroupByCreation
//       ? styleGridTemplateRowsObj.gallery.cardGroupByCreation
//       : styleGridTemplateRowsObj.gallery.cardGroupByShow};
//   `;
// };

export const GalleryGrid: FC<GalleryGridProps> = withDefaultPropsStyled(
  styled.article`
    display: grid;
    ${color};
    ${grid};
    ${flexbox};
    ${layout};
    ${space};
  `,
  {
    marginTop: 5,
    gridGap: 5,
    gridTemplateRows: 'auto',
    justifyItems: 'center',
  },
);
