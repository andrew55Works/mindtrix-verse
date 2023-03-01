import React, { FC, useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import { DistributionPlatformDto } from '../../redux/show/show.interface';
import { openNewWindow } from '../../utils/window.utils';

interface Props {
  borderRadius?: string;
  distributionPlatforms: Array<DistributionPlatformDto>;
  height?: number;
  isLoading: boolean;
  setIsShowroomMounted: React.Dispatch<boolean>;
}
export const Showroom: FC<Props> = React.forwardRef<HTMLCanvasElement, Props>(
  (
    {
      borderRadius = '5px',
      distributionPlatforms,
      height = '576',
      isLoading,
      setIsShowroomMounted,
    },
    ref,
  ) => {
    const heightStr = `${height ? height.toString() : '576'}px`;

    useEffect(() => {
      setIsShowroomMounted(true);
    }, []);

    const LoadingComponent = () => (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: heightStr,
        }}
      >
        <ContentLoader
          speed={2}
          width={'100%'}
          height={'100%'}
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='0' y='0' rx='5' ry='5' width='100%' height={height} />
        </ContentLoader>
      </div>
    );

    const getDistributionPlatformElms = () => {
      return distributionPlatforms.map((p, index) => {
        const platformId = p?.platform_id ?? '';
        const platformName = p?.name ?? '';
        const url = p?.url ?? '';
        const eleId = `podcast_platform_${platformId}`;
        const eleClassName = `point point-${index}`;
        const onClick = () => {
          if (!url) return;
          openNewWindow(url);
        };
        return (
          <div
            key={index}
            id={eleId}
            className={eleClassName}
            onClick={onClick}
          >
            <div className='label' />
            <div className='text'>{platformName}</div>
          </div>
        );
      });
    };

    const Canvas = React.useMemo(() => {
      return (
        <canvas
          id='three-js-canvas'
          height={heightStr}
          ref={ref}
          style={{ borderRadius }}
        />
      );
    }, []);

    return (
      <div
        id={'scene'}
        style={{
          // cursor: 'none',
          position: 'relative',
          overflow: 'hidden',
          margin: '0 auto',
          width: '100%',
          height: heightStr,
          display: 'flex',
          flexShrink: 0,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        {isLoading && <LoadingComponent />}
        {Canvas}
        {/*<ShowroomCursorStyles />*/}
        {getDistributionPlatformElms()}
        {/*<canvas id='c' />*/}
        {/*<canvas id='gl' />*/}
        {/*<div className='cursor' />*/}
      </div>
    );
  },
);
