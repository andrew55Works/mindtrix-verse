import React, { FC } from 'react';
import styled from 'styled-components';

export const image = {
  border: '1px solid #000',
  height: '280px',
  width: '280px',
};

interface ContainerProps {
  height: string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  width: string;
}
export const Container: FC<ContainerProps> = styled.div`
  position: relative;
  height: ${(props: ContainerProps) => props?.height ?? '280px'};
  width: ${(props: ContainerProps) => props?.width ?? '280px'};
`;

export const ContentLoaderContainer: FC<ContainerProps> = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${(props: ContainerProps) => props?.height ?? '280px'};
  width: ${(props: ContainerProps) => props?.width ?? '280px'};
`;
