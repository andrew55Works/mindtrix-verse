import React, { FC } from 'react';
import { LandmarkContainer } from './vienna-wood-landmark.styles';
import dynamic from 'next/dynamic';

interface LandmarkProps {
  index: number;
  landmarkName: string;
  onBlur: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onHover: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onHoverLandmarkName: string;
}

export const Landmark: FC<LandmarkProps> = ({
  landmarkName,
  onBlur,
  onClick,
  onHover,
  onHoverLandmarkName,
}) => {
  const isHovering = onHoverLandmarkName === landmarkName;
  const SVG = dynamic(
    () =>
      import(
        `../../../../assets/svg/vienna_world/icon_${landmarkName}_default.svg`
      ),
  );
  // if (landmarkName === 'kabbalah_cape') {
  //   SVG = KabbalahCapSvg;
  // } else if (landmarkName === 'kabbalah_sacred_trees') {
  //   SVG = KabbalahSacredTreesSvg;
  // }

  return (
    <LandmarkContainer
      id={`hover_button_${landmarkName}`}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
      isHovering={isHovering}
    >
      <span>{SVG ? <SVG /> : null}</span>
    </LandmarkContainer>
  );
};
