import Image from 'next/image';
import React, { FC, ImgHTMLAttributes, useState } from 'react';
import { Property } from 'csstype';
import * as S from './cover-image.styles';
import ContentLoader from 'react-content-loader';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  borderRadius?: string;
  fill?: boolean;
  height?: string;
  heightNumber?: number;
  objectFit?: Property.ObjectFit;
  objectPosition?: Property.ObjectPosition;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onErrorImg?: string;
  src: any;
  width?: string;
  widthNumber?: number;
}

const CoverImage: FC<Props> = React.memo(
  ({
    src,
    onLoad,
    id,
    alt = 'cover',
    fill = false,
    objectFit,
    objectPosition,
    width = '100%',
    widthNumber,
    height = '100%',
    heightNumber,
    borderRadius = '6px',
    onErrorImg = '',
    onClick,
  }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const onLoadComplete = ({
      naturalWidth,
      naturalHeight,
    }: {
      naturalHeight: number;
      naturalWidth: number;
    }) => setIsLoading(false);

    const onError = () => {
      if (!isError) {
        setIsError(true);
      }
    };
    const loadingRx = borderRadius.toString() === '0' ? '0' : '10';
    const css = {
      width,
      height,
      borderRadius,
      objectPosition,
      objectFit,
    };
    return (
      <S.Container id={id} width={width} height={height} onClick={onClick}>
        {isLoading && (
          <S.ContentLoaderContainer width={width} height={height}>
            <ContentLoader
              speed={2}
              width={'100%'}
              height={'100%'}
              backgroundColor='#f3f3f3'
              foregroundColor='#ecebeb'
            >
              <rect
                x='0'
                y='0'
                rx={loadingRx}
                ry={loadingRx}
                width='100%'
                height='100%'
              />
            </ContentLoader>
          </S.ContentLoaderContainer>
        )}
        <Image
          alt={alt}
          src={isError ? onErrorImg : src}
          style={css}
          width={widthNumber}
          height={heightNumber}
          fill={fill}
          sizes={fill ? '100vw' : 'inherit'}
          onLoad={onLoad}
          onLoadingComplete={onLoadComplete}
          onError={onError}
          draggable={false}
        />
      </S.Container>
    );
  },
  (prevMovie, nextMovie) => {
    return (
      prevMovie.src === nextMovie.src &&
      prevMovie.fill === nextMovie.fill &&
      prevMovie.objectFit === nextMovie.objectFit
    );
  },
);

CoverImage.displayName = 'CoverImage';
export default CoverImage;
