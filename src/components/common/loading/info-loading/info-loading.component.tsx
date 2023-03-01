import ContentLoader from 'react-content-loader';
import React, { FC } from 'react';

interface Props {
  borderRadius?: string;
  height: string;
  width: string;
}
export const InfoLoadingComponent: FC<Props> = ({
  height,
  width,
  borderRadius = '5',
}) => (
  <ContentLoader
    speed={2}
    width={width}
    height={height}
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <rect
      x='0'
      y='0'
      rx={borderRadius}
      ry={borderRadius}
      width={width}
      height={height}
    />
  </ContentLoader>
);
